// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BDAGToken
 * @dev ERC-20 token for Truce Wallet on BlockDAG network
 * Total supply: 1,000,000,000 BDAG (1 billion)
 */
contract BDAGToken is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant INITIAL_SUPPLY = 200_000_000 * 10**18; // 200 million initial supply

    // Addresses for different allocations
    address public stakingContract;
    address public presaleContract;
    address public liquidityContract;

    // Events
    event StakingContractSet(address indexed stakingContract);
    event PresaleContractSet(address indexed presaleContract);
    event LiquidityContractSet(address indexed liquidityContract);

    constructor() ERC20("BlockDAG Token", "BDAG") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Set the staking contract address
     * @param _stakingContract Address of the staking contract
     */
    function setStakingContract(address _stakingContract) external onlyOwner {
        require(_stakingContract != address(0), "Invalid staking contract address");
        stakingContract = _stakingContract;
        emit StakingContractSet(_stakingContract);
    }

    /**
     * @dev Set the presale contract address
     * @param _presaleContract Address of the presale contract
     */
    function setPresaleContract(address _presaleContract) external onlyOwner {
        require(_presaleContract != address(0), "Invalid presale contract address");
        presaleContract = _presaleContract;
        emit PresaleContractSet(_presaleContract);
    }

    /**
     * @dev Set the liquidity contract address
     * @param _liquidityContract Address of the liquidity contract
     */
    function setLiquidityContract(address _liquidityContract) external onlyOwner {
        require(_liquidityContract != address(0), "Invalid liquidity contract address");
        liquidityContract = _liquidityContract;
        emit LiquidityContractSet(_liquidityContract);
    }

    /**
     * @dev Mint tokens for staking rewards (only staking contract can call)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mintForStaking(address to, uint256 amount) external {
        require(msg.sender == stakingContract, "Only staking contract can mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    /**
     * @dev Mint tokens for presale (only presale contract can call)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mintForPresale(address to, uint256 amount) external {
        require(msg.sender == presaleContract, "Only presale contract can mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Burn tokens from a specific address (requires allowance)
     * @param account Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount) external {
        _spendAllowance(account, msg.sender, amount);
        _burn(account, amount);
    }
}