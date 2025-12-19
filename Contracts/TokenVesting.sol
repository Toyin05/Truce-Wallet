// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title TokenVesting
 * @dev Token vesting contract for locked token releases
 * Supports linear vesting with cliff periods
 */
contract TokenVesting is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    struct VestingSchedule {
        uint256 totalAmount;      // Total tokens to vest
        uint256 claimedAmount;    // Tokens already claimed
        uint256 startTime;        // Vesting start time
        uint256 cliffDuration;    // Cliff period in seconds
        uint256 vestingDuration;  // Total vesting duration in seconds
        bool revocable;          // Whether vesting can be revoked
        bool revoked;            // Whether vesting has been revoked
    }

    IERC20 public token;

    mapping(address => VestingSchedule) public vestingSchedules;
    mapping(address => bool) public authorizedCallers;

    uint256 public totalVested;
    uint256 public totalClaimed;

    // Events
    event VestingScheduleCreated(
        address indexed beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration
    );
    event TokensClaimed(address indexed beneficiary, uint256 amount);
    event VestingRevoked(address indexed beneficiary, uint256 refundAmount);
    event AuthorizedCallerSet(address indexed caller, bool authorized);

    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    constructor(address _token) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
        authorizedCallers[msg.sender] = true;
    }

    /**
     * @dev Set authorized caller
     * @param caller Address to authorize
     * @param authorized Whether to authorize
     */
    function setAuthorizedCaller(address caller, bool authorized) external onlyOwner {
        authorizedCallers[caller] = authorized;
        emit AuthorizedCallerSet(caller, authorized);
    }

    /**
     * @dev Create vesting schedule for a beneficiary
     * @param beneficiary Address to receive vested tokens
     * @param totalAmount Total tokens to vest
     * @param startTime Vesting start time
     * @param cliffDuration Cliff period in seconds
     * @param vestingDuration Total vesting duration in seconds
     * @param revocable Whether vesting can be revoked
     */
    function createVestingSchedule(
        address beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool revocable
    ) external onlyAuthorized {
        require(beneficiary != address(0), "Invalid beneficiary");
        require(totalAmount > 0, "Invalid amount");
        require(vestingDuration > 0, "Invalid vesting duration");
        require(cliffDuration <= vestingDuration, "Cliff longer than vesting");
        require(vestingSchedules[beneficiary].totalAmount == 0, "Schedule already exists");

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: totalAmount,
            claimedAmount: 0,
            startTime: startTime,
            cliffDuration: cliffDuration,
            vestingDuration: vestingDuration,
            revocable: revocable,
            revoked: false
        });

        totalVested = totalVested.add(totalAmount);

        emit VestingScheduleCreated(
            beneficiary,
            totalAmount,
            startTime,
            cliffDuration,
            vestingDuration
        );
    }

    /**
     * @dev Claim vested tokens
     */
    function claim() external nonReentrant {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "No vesting schedule");
        require(!schedule.revoked, "Vesting revoked");

        uint256 claimableAmount = getClaimableAmount(msg.sender);
        require(claimableAmount > 0, "No tokens available to claim");

        schedule.claimedAmount = schedule.claimedAmount.add(claimableAmount);
        totalClaimed = totalClaimed.add(claimableAmount);

        require(token.transfer(msg.sender, claimableAmount), "Token transfer failed");

        emit TokensClaimed(msg.sender, claimableAmount);
    }

    /**
     * @dev Revoke vesting schedule (only if revocable)
     * @param beneficiary Address whose vesting to revoke
     */
    function revokeVesting(address beneficiary) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        require(schedule.totalAmount > 0, "No vesting schedule");
        require(schedule.revocable, "Vesting not revocable");
        require(!schedule.revoked, "Already revoked");

        schedule.revoked = true;

        uint256 refundAmount = schedule.totalAmount.sub(schedule.claimedAmount);
        if (refundAmount > 0) {
            totalVested = totalVested.sub(refundAmount);
            require(token.transfer(owner(), refundAmount), "Refund transfer failed");
            emit VestingRevoked(beneficiary, refundAmount);
        }
    }

    /**
     * @dev Get claimable amount for a beneficiary
     * @param beneficiary Address to check
     * @return Claimable token amount
     */
    function getClaimableAmount(address beneficiary) public view returns (uint256) {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];

        if (schedule.totalAmount == 0 || schedule.revoked) {
            return 0;
        }

        uint256 currentTime = block.timestamp;

        // Before cliff period
        if (currentTime < schedule.startTime.add(schedule.cliffDuration)) {
            return 0;
        }

        // After vesting period ends
        if (currentTime >= schedule.startTime.add(schedule.vestingDuration)) {
            return schedule.totalAmount.sub(schedule.claimedAmount);
        }

        // During vesting period
        uint256 timeElapsed = currentTime.sub(schedule.startTime);
        uint256 vestedAmount = schedule.totalAmount.mul(timeElapsed).div(schedule.vestingDuration);

        return vestedAmount.sub(schedule.claimedAmount);
    }

    /**
     * @dev Get vesting schedule details
     * @param beneficiary Address to check
     * @return totalAmount Total tokens
     * @return claimedAmount Tokens claimed
     * @return startTime Vesting start time
     * @return cliffDuration Cliff duration
     * @return vestingDuration Total vesting duration
     * @return revocable Whether revocable
     * @return revoked Whether revoked
     */
    function getVestingSchedule(address beneficiary) external view returns (
        uint256 totalAmount,
        uint256 claimedAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool revocable,
        bool revoked
    ) {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        return (
            schedule.totalAmount,
            schedule.claimedAmount,
            schedule.startTime,
            schedule.cliffDuration,
            schedule.vestingDuration,
            schedule.revocable,
            schedule.revoked
        );
    }

    /**
     * @dev Get vesting progress percentage
     * @param beneficiary Address to check
     * @return Progress percentage (0-100)
     */
    function getVestingProgress(address beneficiary) external view returns (uint256) {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];

        if (schedule.totalAmount == 0) {
            return 0;
        }

        uint256 currentTime = block.timestamp;

        if (currentTime < schedule.startTime) {
            return 0;
        }

        if (currentTime >= schedule.startTime.add(schedule.vestingDuration)) {
            return 100;
        }

        uint256 timeElapsed = currentTime.sub(schedule.startTime);
        return timeElapsed.mul(100).div(schedule.vestingDuration);
    }

    /**
     * @dev Emergency withdraw tokens (only owner)
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(token.transfer(owner(), amount), "Emergency withdraw failed");
    }

    /**
     * @dev Get contract statistics
     * @return _totalVested Total tokens vested
     * @return _totalClaimed Total tokens claimed
     * @return _activeSchedules Number of active vesting schedules
     */
    function getContractStats() external view returns (
        uint256 _totalVested,
        uint256 _totalClaimed,
        uint256 _activeSchedules
    ) {
        uint256 activeCount = 0;
        // In a real implementation, you'd iterate through all beneficiaries
        // For now, return basic stats

        return (totalVested, totalClaimed, activeCount);
    }
}