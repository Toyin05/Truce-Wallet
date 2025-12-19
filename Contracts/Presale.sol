// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title Presale
 * @dev Token presale contract for Truce Wallet
 * Allows users to purchase BDAG tokens with ETH or other tokens
 */
contract Presale is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    IERC20 public token; // BDAG token
    address public treasury; // Where funds are sent

    uint256 public tokenPrice; // Price per token in wei (for ETH) or token units
    uint256 public minPurchase; // Minimum purchase amount
    uint256 public maxPurchase; // Maximum purchase amount per user
    uint256 public hardCap; // Maximum tokens to sell
    uint256 public softCap; // Minimum tokens to sell for success

    uint256 public startTime;
    uint256 public endTime;

    uint256 public totalSold;
    uint256 public totalRaised;

    bool public finalized;
    bool public emergencyStop;

    // Payment methods
    enum PaymentMethod { ETH, USDC, USDT }
    mapping(PaymentMethod => bool) public paymentEnabled;
    mapping(PaymentMethod => address) public paymentTokens;

    // User purchases
    mapping(address => uint256) public userPurchases;
    mapping(address => mapping(PaymentMethod => uint256)) public userPayments;

    // Vesting
    bool public vestingEnabled;
    uint256 public vestingDuration;
    uint256 public vestingStartTime;

    // Events
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost, PaymentMethod paymentMethod);
    event PresaleFinalized(bool success);
    event EmergencyStop();
    event FundsWithdrawn(address indexed to, uint256 amount, PaymentMethod paymentMethod);

    modifier onlyActive() {
        require(!emergencyStop, "Presale is stopped");
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Presale not active");
        require(!finalized, "Presale finalized");
        _;
    }

    modifier onlyAfterEnd() {
        require(block.timestamp > endTime || finalized, "Presale not ended");
        _;
    }

    constructor(
        address _token,
        address _treasury,
        uint256 _tokenPrice,
        uint256 _minPurchase,
        uint256 _maxPurchase,
        uint256 _hardCap,
        uint256 _softCap,
        uint256 _startTime,
        uint256 _endTime
    ) {
        require(_token != address(0), "Invalid token address");
        require(_treasury != address(0), "Invalid treasury address");
        require(_tokenPrice > 0, "Invalid token price");
        require(_minPurchase < _maxPurchase, "Invalid purchase limits");
        require(_hardCap > _softCap, "Invalid caps");
        require(_startTime < _endTime && _endTime > block.timestamp, "Invalid timing");

        token = IERC20(_token);
        treasury = _treasury;
        tokenPrice = _tokenPrice;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
        hardCap = _hardCap;
        softCap = _softCap;
        startTime = _startTime;
        endTime = _endTime;

        // Enable ETH by default
        paymentEnabled[PaymentMethod.ETH] = true;

        // Set vesting parameters (optional)
        vestingEnabled = false;
        vestingDuration = 365 days; // 1 year
    }

    /**
     * @dev Set payment token addresses
     * @param paymentMethod Payment method
     * @param tokenAddress Token contract address
     */
    function setPaymentToken(PaymentMethod paymentMethod, address tokenAddress) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token address");
        paymentTokens[paymentMethod] = tokenAddress;
        paymentEnabled[paymentMethod] = true;
    }

    /**
     * @dev Enable/disable payment method
     * @param paymentMethod Payment method
     * @param enabled Whether to enable
     */
    function setPaymentEnabled(PaymentMethod paymentMethod, bool enabled) external onlyOwner {
        paymentEnabled[paymentMethod] = enabled;
    }

    /**
     * @dev Set vesting parameters
     * @param enabled Whether vesting is enabled
     * @param duration Vesting duration in seconds
     */
    function setVesting(bool enabled, uint256 duration) external onlyOwner {
        vestingEnabled = enabled;
        vestingDuration = duration;
    }

    /**
     * @dev Purchase tokens with ETH
     */
    function purchaseWithETH() external payable nonReentrant onlyActive {
        require(paymentEnabled[PaymentMethod.ETH], "ETH payments not enabled");

        uint256 tokenAmount = msg.value.mul(1e18).div(tokenPrice);
        _purchaseTokens(tokenAmount, msg.value, PaymentMethod.ETH);
    }

    /**
     * @dev Purchase tokens with ERC-20 tokens
     * @param paymentMethod Payment method
     * @param paymentAmount Amount of payment tokens
     */
    function purchaseWithToken(PaymentMethod paymentMethod, uint256 paymentAmount) external nonReentrant onlyActive {
        require(paymentMethod != PaymentMethod.ETH, "Use purchaseWithETH for ETH");
        require(paymentEnabled[paymentMethod], "Payment method not enabled");
        require(paymentTokens[paymentMethod] != address(0), "Payment token not set");

        IERC20 paymentToken = IERC20(paymentTokens[paymentMethod]);
        require(paymentToken.transferFrom(msg.sender, treasury, paymentAmount), "Payment transfer failed");

        uint256 tokenAmount = paymentAmount.mul(1e18).div(tokenPrice);
        _purchaseTokens(tokenAmount, paymentAmount, paymentMethod);
    }

    /**
     * @dev Internal purchase function
     * @param tokenAmount Amount of tokens to purchase
     * @param paymentAmount Amount paid
     * @param paymentMethod Payment method used
     */
    function _purchaseTokens(uint256 tokenAmount, uint256 paymentAmount, PaymentMethod paymentMethod) internal {
        require(tokenAmount >= minPurchase, "Below minimum purchase");
        require(userPurchases[msg.sender].add(tokenAmount) <= maxPurchase, "Exceeds maximum purchase");
        require(totalSold.add(tokenAmount) <= hardCap, "Exceeds hard cap");

        userPurchases[msg.sender] = userPurchases[msg.sender].add(tokenAmount);
        userPayments[msg.sender][paymentMethod] = userPayments[msg.sender][paymentMethod].add(paymentAmount);
        totalSold = totalSold.add(tokenAmount);
        totalRaised = totalRaised.add(paymentAmount);

        emit TokensPurchased(msg.sender, tokenAmount, paymentAmount, paymentMethod);
    }

    /**
     * @dev Finalize presale (only owner)
     */
    function finalizePresale() external onlyOwner onlyAfterEnd {
        require(!finalized, "Already finalized");

        bool success = totalSold >= softCap;
        finalized = true;

        if (vestingEnabled && success) {
            vestingStartTime = block.timestamp;
        }

        // If successful, transfer tokens to buyers
        if (success) {
            // In a real implementation, tokens would be minted or transferred here
            // For now, we assume the contract has enough tokens
        }

        emit PresaleFinalized(success);
    }

    /**
     * @dev Claim tokens after presale (if vesting is enabled)
     */
    function claimTokens() external nonReentrant onlyAfterEnd {
        require(finalized, "Presale not finalized");
        require(totalSold >= softCap, "Presale failed");
        require(userPurchases[msg.sender] > 0, "No tokens to claim");

        uint256 claimableAmount;

        if (vestingEnabled) {
            uint256 vestedAmount = calculateVestedAmount(msg.sender);
            claimableAmount = vestedAmount.sub(0); // Subtract already claimed (not implemented)
        } else {
            claimableAmount = userPurchases[msg.sender];
        }

        require(claimableAmount > 0, "No tokens available to claim");
        require(token.transfer(msg.sender, claimableAmount), "Token transfer failed");

        // Update claimed amount (not implemented in this simplified version)
    }

    /**
     * @dev Calculate vested amount for a user
     * @param user User address
     * @return Vested token amount
     */
    function calculateVestedAmount(address user) public view returns (uint256) {
        if (!vestingEnabled || vestingStartTime == 0) {
            return userPurchases[user];
        }

        uint256 elapsedTime = block.timestamp.sub(vestingStartTime);
        if (elapsedTime >= vestingDuration) {
            return userPurchases[user];
        }

        return userPurchases[user].mul(elapsedTime).div(vestingDuration);
    }

    /**
     * @dev Withdraw funds (only owner, after successful presale)
     */
    function withdrawFunds() external onlyOwner onlyAfterEnd {
        require(finalized && totalSold >= softCap, "Presale not successful");

        // Withdraw ETH
        if (address(this).balance > 0) {
            payable(treasury).transfer(address(this).balance);
            emit FundsWithdrawn(treasury, address(this).balance, PaymentMethod.ETH);
        }

        // Withdraw other tokens would be implemented here
    }

    /**
     * @dev Emergency stop (only owner)
     */
    function emergencyStopPresale() external onlyOwner {
        emergencyStop = true;
        emit EmergencyStop();
    }

    /**
     * @dev Resume presale (only owner)
     */
    function resumePresale() external onlyOwner {
        emergencyStop = false;
    }

    /**
     * @dev Get presale status
     * @return _totalSold Total tokens sold
     * @return _totalRaised Total funds raised
     * @return _isActive Whether presale is active
     * @return _isFinalized Whether presale is finalized
     */
    function getPresaleStatus() external view returns (
        uint256 _totalSold,
        uint256 _totalRaised,
        bool _isActive,
        bool _isFinalized
    ) {
        bool _isActive = !emergencyStop &&
                        block.timestamp >= startTime &&
                        block.timestamp <= endTime &&
                        !finalized &&
                        totalSold < hardCap;

        return (totalSold, totalRaised, _isActive, finalized);
    }

    /**
     * @dev Get user info
     * @param user User address
     * @return purchased Total tokens purchased
     * @return ethPaid ETH paid
     * @return usdcPaid USDC paid
     * @return usdtPaid USDT paid
     */
    function getUserInfo(address user) external view returns (
        uint256 purchased,
        uint256 ethPaid,
        uint256 usdcPaid,
        uint256 usdtPaid
    ) {
        return (
            userPurchases[user],
            userPayments[user][PaymentMethod.ETH],
            userPayments[user][PaymentMethod.USDC],
            userPayments[user][PaymentMethod.USDT]
        );
    }

    // Fallback function to receive ETH
    receive() external payable {}
}