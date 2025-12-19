// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title StakingPool
 * @dev Flexible staking pool contract for Truce Wallet
 * Supports multiple tokens with different APYs and lock periods
 */
contract StakingPool is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 lockPeriod;
        uint256 lastClaimTime;
        bool isActive;
    }

    struct Pool {
        IERC20 token;
        uint256 apy; // Annual percentage yield in basis points (1% = 100)
        uint256 minStake;
        uint256 maxStake;
        uint256 lockPeriod; // 0 for flexible staking
        uint256 totalStaked;
        uint256 rewardRate; // Rewards per second per token staked
        bool isActive;
    }

    // Pool storage
    mapping(uint256 => Pool) public pools;
    mapping(uint256 => mapping(address => Stake)) public stakes;
    mapping(uint256 => mapping(address => uint256)) public userTotalStaked;

    uint256 public poolCount;
    uint256 public constant SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
    uint256 public constant BASIS_POINTS = 10000;

    // Events
    event PoolCreated(uint256 indexed poolId, address indexed token, uint256 apy, uint256 lockPeriod);
    event Staked(uint256 indexed poolId, address indexed user, uint256 amount);
    event Unstaked(uint256 indexed poolId, address indexed user, uint256 amount);
    event RewardsClaimed(uint256 indexed poolId, address indexed user, uint256 amount);
    event PoolUpdated(uint256 indexed poolId, uint256 newApy);

    constructor() {}

    /**
     * @dev Create a new staking pool
     * @param token Address of the token to stake
     * @param apy Annual percentage yield in basis points
     * @param minStake Minimum stake amount
     * @param maxStake Maximum stake amount
     * @param lockPeriod Lock period in seconds (0 for flexible)
     */
    function createPool(
        address token,
        uint256 apy,
        uint256 minStake,
        uint256 maxStake,
        uint256 lockPeriod
    ) external onlyOwner returns (uint256) {
        require(token != address(0), "Invalid token address");
        require(apy > 0 && apy <= BASIS_POINTS * 10, "Invalid APY"); // Max 1000%
        require(minStake < maxStake, "Invalid stake limits");

        uint256 poolId = poolCount;
        poolCount++;

        pools[poolId] = Pool({
            token: IERC20(token),
            apy: apy,
            minStake: minStake,
            maxStake: maxStake,
            lockPeriod: lockPeriod,
            totalStaked: 0,
            rewardRate: apy.mul(1e18).div(BASIS_POINTS).div(SECONDS_PER_YEAR),
            isActive: true
        });

        emit PoolCreated(poolId, token, apy, lockPeriod);
        return poolId;
    }

    /**
     * @dev Update pool APY
     * @param poolId Pool ID to update
     * @param newApy New APY in basis points
     */
    function updatePoolApy(uint256 poolId, uint256 newApy) external onlyOwner {
        require(poolId < poolCount, "Pool does not exist");
        require(newApy > 0 && newApy <= BASIS_POINTS * 10, "Invalid APY");

        pools[poolId].apy = newApy;
        pools[poolId].rewardRate = newApy.mul(1e18).div(BASIS_POINTS).div(SECONDS_PER_YEAR);

        emit PoolUpdated(poolId, newApy);
    }

    /**
     * @dev Stake tokens in a pool
     * @param poolId Pool ID to stake in
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 poolId, uint256 amount) external nonReentrant {
        require(poolId < poolCount, "Pool does not exist");
        Pool storage pool = pools[poolId];
        require(pool.isActive, "Pool is not active");
        require(amount >= pool.minStake && amount <= pool.maxStake, "Invalid stake amount");

        // Transfer tokens from user to contract
        require(pool.token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Update or create stake
        Stake storage userStake = stakes[poolId][msg.sender];
        if (userStake.isActive) {
            // Claim pending rewards before adding new stake
            _claimRewards(poolId, msg.sender);
            userStake.amount = userStake.amount.add(amount);
        } else {
            userStake.amount = amount;
            userStake.startTime = block.timestamp;
            userStake.lockPeriod = pool.lockPeriod;
            userStake.lastClaimTime = block.timestamp;
            userStake.isActive = true;
        }

        userTotalStaked[poolId][msg.sender] = userTotalStaked[poolId][msg.sender].add(amount);
        pool.totalStaked = pool.totalStaked.add(amount);

        emit Staked(poolId, msg.sender, amount);
    }

    /**
     * @dev Unstake tokens from a pool
     * @param poolId Pool ID to unstake from
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 poolId, uint256 amount) external nonReentrant {
        require(poolId < poolCount, "Pool does not exist");
        Stake storage userStake = stakes[poolId][msg.sender];
        require(userStake.isActive, "No active stake");
        require(amount <= userStake.amount, "Insufficient staked amount");

        // Check lock period
        if (userStake.lockPeriod > 0) {
            require(
                block.timestamp >= userStake.startTime.add(userStake.lockPeriod),
                "Tokens are still locked"
            );
        }

        // Claim pending rewards
        _claimRewards(poolId, msg.sender);

        // Update stake
        userStake.amount = userStake.amount.sub(amount);
        if (userStake.amount == 0) {
            userStake.isActive = false;
        }

        userTotalStaked[poolId][msg.sender] = userTotalStaked[poolId][msg.sender].sub(amount);
        pools[poolId].totalStaked = pools[poolId].totalStaked.sub(amount);

        // Transfer tokens back to user
        require(pools[poolId].token.transfer(msg.sender, amount), "Transfer failed");

        emit Unstaked(poolId, msg.sender, amount);
    }

    /**
     * @dev Claim staking rewards
     * @param poolId Pool ID to claim rewards from
     */
    function claimRewards(uint256 poolId) external nonReentrant {
        _claimRewards(poolId, msg.sender);
    }

    /**
     * @dev Internal function to claim rewards
     * @param poolId Pool ID
     * @param user User address
     */
    function _claimRewards(uint256 poolId, address user) internal {
        Stake storage userStake = stakes[poolId][user];
        require(userStake.isActive, "No active stake");

        uint256 rewards = calculateRewards(poolId, user);
        if (rewards > 0) {
            userStake.lastClaimTime = block.timestamp;
            // Note: In production, this would mint reward tokens
            // For now, we'll assume rewards are in the same token
            require(pools[poolId].token.transfer(user, rewards), "Reward transfer failed");
            emit RewardsClaimed(poolId, user, rewards);
        }
    }

    /**
     * @dev Calculate pending rewards for a user
     * @param poolId Pool ID
     * @param user User address
     * @return Pending rewards amount
     */
    function calculateRewards(uint256 poolId, address user) public view returns (uint256) {
        Stake storage userStake = stakes[poolId][user];
        if (!userStake.isActive) return 0;

        uint256 timeElapsed = block.timestamp.sub(userStake.lastClaimTime);
        uint256 rewards = userStake.amount.mul(pools[poolId].rewardRate).mul(timeElapsed).div(1e18);

        return rewards;
    }

    /**
     * @dev Get user's stake information
     * @param poolId Pool ID
     * @param user User address
     * @return amount, startTime, lockPeriod, lastClaimTime, isActive
     */
    function getUserStake(uint256 poolId, address user) external view returns (
        uint256 amount,
        uint256 startTime,
        uint256 lockPeriod,
        uint256 lastClaimTime,
        bool isActive
    ) {
        Stake storage userStake = stakes[poolId][user];
        return (
            userStake.amount,
            userStake.startTime,
            userStake.lockPeriod,
            userStake.lastClaimTime,
            userStake.isActive
        );
    }

    /**
     * @dev Get pool information
     * @param poolId Pool ID
     * @return token, apy, minStake, maxStake, lockPeriod, totalStaked, isActive
     */
    function getPool(uint256 poolId) external view returns (
        address token,
        uint256 apy,
        uint256 minStake,
        uint256 maxStake,
        uint256 lockPeriod,
        uint256 totalStaked,
        bool isActive
    ) {
        Pool storage pool = pools[poolId];
        return (
            address(pool.token),
            pool.apy,
            pool.minStake,
            pool.maxStake,
            pool.lockPeriod,
            pool.totalStaked,
            pool.isActive
        );
    }

    /**
     * @dev Emergency withdraw function (only owner)
     * @param poolId Pool ID
     * @param tokenAddress Token address to withdraw
     */
    function emergencyWithdraw(uint256 poolId, address tokenAddress) external onlyOwner {
        require(poolId < poolCount, "Pool does not exist");
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Emergency withdraw failed");
    }
}