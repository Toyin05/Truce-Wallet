// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title LiquidityPool
 * @dev Liquidity pool contract for AMM DEX functionality
 * Implements constant product formula: x * y = k
 */
contract LiquidityPool is ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public token0;
    IERC20 public token1;

    uint256 public reserve0;
    uint256 public reserve1;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    uint256 public constant MINIMUM_LIQUIDITY = 10**3;
    uint256 public constant FEE_PERCENTAGE = 3; // 0.3% fee

    address public factory;
    address public router;

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );
    event Sync(uint256 reserve0, uint256 reserve1);

    constructor(address _token0, address _token1) {
        require(_token0 != _token1, "Identical tokens");
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
        factory = msg.sender;
    }

    /**
     * @dev Set router address (only factory can call)
     * @param _router Router contract address
     */
    function setRouter(address _router) external {
        require(msg.sender == factory, "Only factory can set router");
        router = _router;
    }

    /**
     * @dev Get reserves
     * @return _reserve0 Reserve of token0
     * @return _reserve1 Reserve of token1
     */
    function getReserves() public view returns (uint256 _reserve0, uint256 _reserve1) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
    }

    /**
     * @dev Add liquidity to the pool
     * @param amount0Desired Amount of token0 to add
     * @param amount1Desired Amount of token1 to add
     * @param amount0Min Minimum amount of token0 to add
     * @param amount1Min Minimum amount of token1 to add
     * @param to Address to mint LP tokens to
     * @return amount0 Amount of token0 added
     * @return amount1 Amount of token1 added
     * @return liquidity Amount of LP tokens minted
     */
    function addLiquidity(
        uint256 amount0Desired,
        uint256 amount1Desired,
        uint256 amount0Min,
        uint256 amount1Min,
        address to
    ) external nonReentrant returns (uint256 amount0, uint256 amount1, uint256 liquidity) {
        (uint256 _reserve0, uint256 _reserve1) = getReserves();

        if (_reserve0 == 0 && _reserve1 == 0) {
            (amount0, amount1) = (amount0Desired, amount1Desired);
        } else {
            uint256 amount1Optimal = quote(amount0Desired, _reserve0, _reserve1);
            if (amount1Optimal <= amount1Desired) {
                require(amount1Optimal >= amount1Min, "Insufficient token1 amount");
                (amount0, amount1) = (amount0Desired, amount1Optimal);
            } else {
                uint256 amount0Optimal = quote(amount1Desired, _reserve1, _reserve0);
                require(amount0Optimal <= amount0Desired, "Insufficient token0 amount");
                require(amount0Optimal >= amount0Min, "Insufficient token0 amount");
                (amount0, amount1) = (amount0Optimal, amount1Desired);
            }
        }

        require(amount0 >= amount0Min && amount1 >= amount1Min, "Insufficient amounts");

        // Transfer tokens to pool
        require(token0.transferFrom(msg.sender, address(this), amount0), "Token0 transfer failed");
        require(token1.transferFrom(msg.sender, address(this), amount1), "Token1 transfer failed");

        // Mint LP tokens
        if (totalSupply == 0) {
            liquidity = sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
            _mint(address(0), MINIMUM_LIQUIDITY); // Permanently lock minimum liquidity
        } else {
            liquidity = min(
                amount0.mul(totalSupply).div(_reserve0),
                amount1.mul(totalSupply).div(_reserve1)
            );
        }
        require(liquidity > 0, "Insufficient liquidity minted");
        _mint(to, liquidity);

        _update(reserve0.add(amount0), reserve1.add(amount1));

        emit Mint(msg.sender, amount0, amount1);
    }

    /**
     * @dev Remove liquidity from the pool
     * @param liquidity Amount of LP tokens to burn
     * @param amount0Min Minimum amount of token0 to receive
     * @param amount1Min Minimum amount of token1 to receive
     * @param to Address to send tokens to
     * @return amount0 Amount of token0 received
     * @return amount1 Amount of token1 received
     */
    function removeLiquidity(
        uint256 liquidity,
        uint256 amount0Min,
        uint256 amount1Min,
        address to
    ) external nonReentrant returns (uint256 amount0, uint256 amount1) {
        require(balanceOf[msg.sender] >= liquidity, "Insufficient liquidity");

        (uint256 _reserve0, uint256 _reserve1) = getReserves();
        amount0 = liquidity.mul(_reserve0).div(totalSupply);
        amount1 = liquidity.mul(_reserve1).div(totalSupply);

        require(amount0 >= amount0Min && amount1 >= amount1Min, "Insufficient amounts");

        _burn(msg.sender, liquidity);
        require(token0.transfer(to, amount0), "Token0 transfer failed");
        require(token1.transfer(to, amount1), "Token1 transfer failed");

        _update(_reserve0.sub(amount0), _reserve1.sub(amount1));

        emit Burn(msg.sender, amount0, amount1, to);
    }

    /**
     * @dev Swap tokens
     * @param amount0Out Amount of token0 to send
     * @param amount1Out Amount of token1 to send
     * @param to Address to send tokens to
     */
    function swap(uint256 amount0Out, uint256 amount1Out, address to) external nonReentrant {
        require(amount0Out > 0 || amount1Out > 0, "Insufficient output amount");
        require(amount0Out < reserve0 && amount1Out < reserve1, "Insufficient liquidity");

        uint256 amount0In;
        uint256 amount1In;

        // Determine input amounts
        if (amount0Out > 0) {
            amount0In = getAmountIn(amount0Out, reserve0.sub(amount0Out), reserve1.sub(amount1Out));
            require(token0.transferFrom(msg.sender, address(this), amount0In), "Token0 transfer failed");
        }
        if (amount1Out > 0) {
            amount1In = getAmountIn(amount1Out, reserve1.sub(amount1Out), reserve0.sub(amount0Out));
            require(token1.transferFrom(msg.sender, address(this), amount1In), "Token1 transfer failed");
        }

        // Send output tokens
        if (amount0Out > 0) require(token0.transfer(to, amount0Out), "Token0 output transfer failed");
        if (amount1Out > 0) require(token1.transfer(to, amount1Out), "Token1 output transfer failed");

        // Update reserves
        uint256 balance0 = token0.balanceOf(address(this));
        uint256 balance1 = token1.balanceOf(address(this));
        _update(balance0, balance1);

        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

    /**
     * @dev Get amount of tokens to receive for a given input
     * @param amountIn Input amount
     * @param reserveIn Input reserve
     * @param reserveOut Output reserve
     * @return Amount out
     */
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256) {
        require(amountIn > 0, "Insufficient input amount");
        require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity");

        uint256 amountInWithFee = amountIn.mul(1000 - FEE_PERCENTAGE);
        uint256 numerator = amountInWithFee.mul(reserveOut);
        uint256 denominator = reserveIn.mul(1000).add(amountInWithFee);

        return numerator.div(denominator);
    }

    /**
     * @dev Get amount of tokens needed for a given output
     * @param amountOut Output amount
     * @param reserveIn Input reserve
     * @param reserveOut Output reserve
     * @return Amount in
     */
    function getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256) {
        require(amountOut > 0, "Insufficient output amount");
        require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity");

        uint256 numerator = reserveIn.mul(amountOut).mul(1000);
        uint256 denominator = reserveOut.sub(amountOut).mul(1000 - FEE_PERCENTAGE);

        return numerator.div(denominator).add(1);
    }

    /**
     * @dev Quote amount of token1 for token0
     * @param amount0 Amount of token0
     * @param reserve0 Reserve of token0
     * @param reserve1 Reserve of token1
     * @return Amount of token1
     */
    function quote(uint256 amount0, uint256 reserve0, uint256 reserve1) public pure returns (uint256) {
        require(amount0 > 0, "Insufficient amount");
        require(reserve0 > 0 && reserve1 > 0, "Insufficient liquidity");
        return amount0.mul(reserve1).div(reserve0);
    }

    /**
     * @dev Update reserves
     * @param balance0 New balance of token0
     * @param balance1 New balance of token1
     */
    function _update(uint256 balance0, uint256 balance1) private {
        reserve0 = balance0;
        reserve1 = balance1;
        emit Sync(reserve0, reserve1);
    }

    /**
     * @dev Mint LP tokens
     * @param to Address to mint to
     * @param amount Amount to mint
     */
    function _mint(address to, uint256 amount) private {
        balanceOf[to] = balanceOf[to].add(amount);
        totalSupply = totalSupply.add(amount);
    }

    /**
     * @dev Burn LP tokens
     * @param from Address to burn from
     * @param amount Amount to burn
     */
    function _burn(address from, uint256 amount) private {
        balanceOf[from] = balanceOf[from].sub(amount);
        totalSupply = totalSupply.sub(amount);
    }

    /**
     * @dev Calculate square root using Babylonian method
     * @param x Number to calculate square root of
     * @return Square root
     */
    function sqrt(uint256 x) private pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        uint256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    /**
     * @dev Return minimum of two numbers
     * @param a First number
     * @param b Second number
     * @return Minimum
     */
    function min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
}