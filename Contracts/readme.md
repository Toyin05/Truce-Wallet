# Truce Wallet Smart Contracts

This directory contains all the Solidity smart contracts for the Truce Wallet application on BlockDAG. These contracts implement the core blockchain functionality including token management, staking, DEX operations, presales, security features, and AI integration.

## Contract Overview

### Core Token Contract
- **BDAGToken.sol**: ERC-20 implementation of the BDAG token with controlled minting for staking rewards and presales

### DeFi Contracts
- **StakingPool.sol**: Flexible staking pools with configurable APYs, lock periods, and reward calculations
- **LiquidityPool.sol**: AMM liquidity pool implementing constant product formula (x*y=k)
- **DEXRouter.sol**: Router contract for DEX operations, handling token swaps and liquidity management

### Fundraising Contracts
- **Presale.sol**: Token presale contract supporting multiple payment methods (ETH, USDC, USDT) with vesting options
- **TokenVesting.sol**: Linear vesting contract with cliff periods for locked token releases

### Security Contracts
- **MultiSigWallet.sol**: Multi-signature wallet requiring multiple approvals for transactions
- **Timelock.sol**: Time-delayed execution contract for governance actions

### AI Integration
- **AIOracle.sol**: Oracle contract storing AI-generated price predictions, market insights, and trading signals

## Contract Details

### BDAGToken.sol
**Purpose**: Native ERC-20 token for the Truce Wallet ecosystem
**Key Features**:
- Total supply: 1,000,000,000 BDAG (1 billion)
- Initial supply: 200,000,000 BDAG
- Controlled minting for staking rewards and presales
- Burn functionality
- Integration with staking and presale contracts

### StakingPool.sol
**Purpose**: Staking pools for earning rewards on crypto assets
**Key Features**:
- Multiple staking pools with different tokens (ETH, MATIC, BNB, USDC, BDAG)
- Configurable APYs and lock periods
- Flexible staking (no lock) or time-locked staking
- Automatic reward calculations and claiming
- Emergency withdrawal functions

### LiquidityPool.sol
**Purpose**: Automated Market Maker (AMM) liquidity pools
**Key Features**:
- Constant product formula implementation
- Add/remove liquidity functionality
- Token swapping with 0.3% fee
- Price calculations and slippage protection
- Reserve tracking and sync events

### DEXRouter.sol
**Purpose**: Router for DEX operations and multi-hop swaps
**Key Features**:
- Token-to-token swaps with optimal routing
- Add/remove liquidity through router
- Support for exact input/output amounts
- Deadline protection for transactions
- Integration with liquidity pools

### Presale.sol
**Purpose**: Token presale with multiple payment options
**Key Features**:
- Support for ETH, USDC, and USDT payments
- Configurable token price and purchase limits
- Soft and hard caps
- Optional vesting integration
- Emergency stop functionality
- Fund withdrawal after successful presale

### TokenVesting.sol
**Purpose**: Token vesting with linear release schedules
**Key Features**:
- Cliff periods before vesting begins
- Linear vesting over time
- Revocable vesting schedules
- Multiple beneficiaries support
- Progress tracking and claimable amount calculations

### MultiSigWallet.sol
**Purpose**: Secure multi-signature wallet for fund management
**Key Features**:
- Configurable number of required confirmations
- Transaction queuing and approval system
- Owner management (add/remove owners)
- Transaction execution with multiple signatures
- Deposit tracking and balance management

### Timelock.sol
**Purpose**: Time-delayed execution for governance actions
**Key Features**:
- Configurable delay periods (2-30 days)
- Transaction queuing with ETA
- Grace period for execution (14 days)
- Admin management with pending admin system
- Cancel functionality for queued transactions

### AIOracle.sol
**Purpose**: Oracle for AI-generated market data and predictions
**Key Features**:
- Price predictions with confidence scores
- Market insights with sentiment analysis
- Trading signals (BUY/SELL/HOLD) with strength indicators
- Authorized predictor management
- Data freshness controls and emergency stops

## Deployment Order

1. **BDAGToken.sol** - Deploy first as it's referenced by other contracts
2. **AIOracle.sol** - Deploy early for AI integration
3. **StakingPool.sol** - Deploy after BDAG token
4. **LiquidityPool.sol** - Can be deployed as needed for token pairs
5. **DEXRouter.sol** - Deploy after liquidity pools are available
6. **Presale.sol** - Deploy after BDAG token
7. **TokenVesting.sol** - Deploy independently
8. **MultiSigWallet.sol** - Deploy for treasury management
9. **Timelock.sol** - Deploy for governance

## Security Considerations

- All contracts use OpenZeppelin standards and security practices
- ReentrancyGuard implemented where necessary
- Access controls with Ownable and custom modifiers
- Input validation and overflow protection
- Emergency stop mechanisms
- Time-based protections and deadlines

## Testing

Each contract includes comprehensive functionality for:
- Normal operation flows
- Edge cases and error conditions
- Access control validation
- Mathematical calculations accuracy
- Integration with other contracts

## Integration with Frontend

The contracts are designed to integrate with the React frontend through:
- Web3.js or Ethers.js libraries
- Contract ABIs for function calls
- Event listening for transaction confirmations
- Gas estimation and transaction handling

## Future Enhancements

- Upgradeable contracts using OpenZeppelin's upgradeable patterns
- Cross-chain functionality for multi-chain support
- Governance token integration
- Advanced AI prediction models
- Layer 2 scaling solutions
