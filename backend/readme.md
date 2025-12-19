# Truce Wallet Backend API

A comprehensive NestJS backend API for the Truce Wallet application - an AI-powered multi-chain crypto wallet and DEX built on BlockDAG.

## 🚀 Overview

This backend provides RESTful APIs for all Truce Wallet functionality including:
- User authentication and authorization
- Multi-chain wallet management
- Decentralized exchange operations
- Staking and yield farming
- Market data and analytics
- AI-powered insights and recommendations
- Token presale and vesting
- Security and compliance features

## 🛠️ Technology Stack

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Blockchain**: Ethers.js for Web3 integration
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Security**: Rate limiting, CORS, Helmet

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.module.ts                 # Main application module
│   ├── main.ts                       # Application entry point
│   ├── database/                     # Database configuration
│   │   ├── database.module.ts
│   │   └── entities/                 # TypeORM entities
│   │       ├── user.entity.ts
│   │       ├── wallet.entity.ts
│   │       ├── transaction.entity.ts
│   │       ├── staking-position.entity.ts
│   │       ├── swap-order.entity.ts
│   │       ├── market-data.entity.ts
│   │       ├── ai-insight.entity.ts
│   │       ├── security-settings.entity.ts
│   │       └── presale-participation.entity.ts
│   ├── blockchain/                   # Blockchain integration
│   │   ├── blockchain.module.ts
│   │   ├── blockchain.service.ts
│   │   ├── token.service.ts
│   │   ├── staking.service.ts
│   │   ├── dex.service.ts
│   │   ├── presale.service.ts
│   │   └── ai-oracle.service.ts
│   ├── auth/                         # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   ├── local.strategy.ts
│   │   └── dto/
│   ├── wallet/                       # Wallet management
│   │   ├── wallet.module.ts
│   │   ├── wallet.service.ts
│   │   └── wallet.controller.ts
│   ├── dex/                          # DEX operations
│   │   ├── dex.module.ts
│   │   ├── dex.service.ts
│   │   └── dex.controller.ts
│   ├── staking/                      # Staking operations
│   │   ├── staking.module.ts
│   │   ├── staking.service.ts
│   │   └── staking.controller.ts
│   ├── market/                       # Market data
│   │   ├── market.module.ts
│   │   ├── market.service.ts
│   │   └── market.controller.ts
│   ├── ai/                           # AI insights
│   │   ├── ai.module.ts
│   │   ├── ai.service.ts
│   │   └── ai.controller.ts
│   ├── presale/                      # Presale operations
│   │   ├── presale.module.ts
│   │   ├── presale.service.ts
│   │   └── presale.controller.ts
│   └── security/                     # Security features
│       ├── security.module.ts
│       ├── security.service.ts
│       └── security.controller.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=truce_wallet

   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h

   # Blockchain RPC URLs
   BLOCKDAG_RPC_URL=https://rpc.blockdag.network
   ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
   POLYGON_RPC_URL=https://polygon-rpc.com
   BSC_RPC_URL=https://bsc-dataseed.binance.org

   # Wallet
   WALLET_PRIVATE_KEY=your_wallet_private_key

   # External APIs
   COINGECKO_API_KEY=your_coingecko_api_key
   AI_ORACLE_API_KEY=your_ai_api_key
   ```

4. **Database Setup**
   ```bash
   # Create database
   createdb truce_wallet

   # Run migrations (if using)
   npm run migration:run
   ```

5. **Start the application**
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

## 📚 API Documentation

The API documentation is available at `http://localhost:3000/api-docs` when the server is running.

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## 🌐 API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `PUT /auth/change-password` - Change password
- `DELETE /auth/deactivate` - Deactivate account
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `POST /auth/verify-email` - Request email verification
- `POST /auth/confirm-email` - Confirm email
- `GET /auth/session-info` - Get session information
- `POST /auth/logout` - Logout user

### Wallet Management (`/wallet`)
- `POST /wallet` - Create new wallet
- `GET /wallet` - Get user wallets
- `GET /wallet/:id` - Get wallet by ID
- `PUT /wallet/:id` - Update wallet
- `DELETE /wallet/:id` - Delete wallet
- `GET /wallet/:id/balance` - Get wallet balance
- `GET /wallet/:id/transactions` - Get wallet transactions
- `POST /wallet/:id/send` - Send transaction
- `POST /wallet/generate` - Generate new wallet
- `POST /wallet/:id/import` - Import existing wallet
- `POST /wallet/:id/backup` - Create wallet backup
- `GET /wallet/:id/nonce` - Get transaction nonce
- `POST /wallet/:id/estimate-gas` - Estimate gas
- `GET /wallet/:id/token-balances` - Get token balances
- `POST /wallet/:id/validate-address` - Validate address
- `GET /wallet/:id/gas-price` - Get gas price
- `POST /wallet/:id/set-default` - Set as default wallet
- `GET /wallet/portfolio/summary` - Get portfolio summary
- `GET /wallet/portfolio/history` - Get portfolio history

### DEX Operations (`/dex`)
- `POST /dex/swap` - Swap tokens
- `POST /dex/liquidity/add` - Add liquidity
- `POST /dex/liquidity/remove` - Remove liquidity
- `GET /dex/pools` - Get liquidity pools
- `GET /dex/pools/:poolId` - Get pool details
- `GET /dex/quote` - Get swap quote
- `GET /dex/route` - Get optimal swap route
- `GET /dex/orders` - Get user swap orders
- `GET /dex/orders/:orderId` - Get order details
- `POST /dex/estimate-slippage` - Estimate slippage
- `GET /dex/gas-estimate` - Estimate gas for swap
- `GET /dex/impact` - Calculate price impact
- `GET /dex/pools/:poolId/liquidity` - Get pool liquidity
- `GET /dex/pools/:poolId/volume` - Get pool volume
- `GET /dex/tokens` - Get supported tokens
- `GET /dex/tokens/:tokenAddress` - Get token info
- `POST /dex/pools/create` - Create liquidity pool
- `GET /dex/stats` - Get DEX statistics
- `GET /dex/user/stats` - Get user DEX statistics

### Staking Operations (`/staking`)
- `GET /staking/pools` - Get staking pools
- `GET /staking/pools/:poolId` - Get pool details
- `POST /staking/stake` - Stake tokens
- `POST /staking/unstake` - Unstake tokens
- `POST /staking/claim-rewards/:positionId` - Claim rewards
- `GET /staking/positions` - Get user positions
- `GET /staking/positions/:positionId` - Get position details
- `GET /staking/rewards/:positionId` - Get pending rewards
- `GET /staking/pools/:poolId/stats` - Get pool statistics
- `GET /staking/calculate-rewards` - Calculate potential rewards
- `GET /staking/apy/:poolId` - Get pool APY
- `GET /staking/user/stats` - Get user staking stats
- `GET /staking/pools/:poolId/lock-periods` - Get lock periods
- `POST /staking/pools/:poolId/update-apy` - Update pool APY
- `GET /staking/rewards/history` - Get rewards history
- `GET /staking/pools/:poolId/performance` - Get pool performance
- `GET /staking/global/stats` - Get global staking stats
- `POST /staking/emergency-unstake/:positionId` - Emergency unstake

### Market Data (`/market`)
- `GET /market/prices` - Get cryptocurrency prices
- `GET /market/price/:symbol` - Get specific price
- `GET /market/trending` - Get trending coins
- `GET /market/global` - Get global market stats
- `GET /market/chart/:symbol` - Get price chart data
- `GET /market/volume/:symbol` - Get trading volume
- `GET /market/fear-greed` - Get fear and greed index
- `GET /market/news` - Get crypto news
- `GET /market/top-gainers` - Get top gaining coins
- `GET /market/top-losers` - Get top losing coins
- `GET /market/market-cap` - Get market capitalization
- `GET /market/defi` - Get DeFi statistics
- `GET /market/nft` - Get NFT statistics
- `GET /market/exchanges` - Get exchange data
- `GET /market/derivatives` - Get derivatives data

### AI Insights (`/ai`)
- `GET /ai/insights` - Get AI insights
- `GET /ai/predictions/:symbol` - Get price predictions
- `GET /ai/signals/:symbol` - Get trading signals
- `GET /ai/analysis/portfolio` - Get portfolio analysis
- `GET /ai/analysis/market` - Get market analysis
- `GET /ai/recommendations` - Get AI recommendations
- `POST /ai/chat` - AI chat interaction
- `GET /ai/risk-assessment` - Get risk assessment
- `GET /ai/sentiment/:symbol` - Get sentiment analysis
- `GET /ai/alerts` - Get AI alerts
- `POST /ai/alerts/:alertId/read` - Mark alert as read
- `GET /ai/performance` - Get AI performance metrics
- `GET /ai/backtesting` - Get backtesting results
- `GET /ai/correlation/:symbol` - Get correlation analysis
- `GET /ai/volatility/:symbol` - Get volatility analysis
- `GET /ai/yield-optimization` - Get yield optimization
- `GET /ai/dca-strategy` - Get DCA strategy

### Presale Operations (`/presale`)
- `GET /presale/status` - Get presale status
- `GET /presale/stats` - Get presale statistics
- `POST /presale/participate` - Participate in presale
- `GET /presale/my-participations` - Get user participations
- `POST /presale/claim/:participationId` - Claim tokens
- `GET /presale/token-price` - Get token price
- `GET /presale/vesting-schedule/:participationId` - Get vesting schedule
- `GET /presale/claimable-amount/:participationId` - Get claimable amount
- `GET /presale/whitelist` - Check whitelist status
- `POST /presale/whitelist/add` - Add to whitelist
- `GET /presale/tiers` - Get presale tiers
- `GET /presale/allocation/:address` - Get address allocation
- `GET /presale/referral/stats` - Get referral statistics
- `POST /presale/referral/generate` - Generate referral code
- `GET /presale/referral/:code` - Validate referral code
- `GET /presale/kyc/status` - Get KYC status
- `POST /presale/kyc/submit` - Submit KYC
- `GET /presale/bonus` - Get bonus structure
- `GET /presale/vesting-info` - Get vesting information

### Security Features (`/security`)
- `GET /security/settings` - Get security settings
- `PUT /security/settings` - Update security settings
- `POST /security/2fa/enable` - Enable 2FA
- `POST /security/2fa/disable` - Disable 2FA
- `POST /security/2fa/verify` - Verify 2FA code
- `POST /security/2fa/setup` - Setup 2FA
- `GET /security/devices` - Get trusted devices
- `POST /security/devices/add` - Add trusted device
- `DELETE /security/devices/:deviceId` - Remove trusted device
- `GET /security/login-history` - Get login history
- `POST /security/suspicious-activity/report` - Report suspicious activity
- `GET /security/suspicious-activity` - Get suspicious activity
- `POST /security/password/change` - Change password securely
- `POST /security/session/terminate` - Terminate all sessions
- `GET /security/session/active` - Get active sessions
- `POST /security/session/terminate/:sessionId` - Terminate session
- `GET /security/audit-log` - Get audit log
- `POST /security/backup-codes/generate` - Generate backup codes
- `POST /security/backup-codes/verify` - Verify backup code
- `GET /security/risk-score` - Get risk score
- `POST /security/freeze-account` - Freeze account
- `POST /security/unfreeze-account` - Unfreeze account
- `GET /security/security-score` - Get security score
- `POST /security/emergency-contact/add` - Add emergency contact
- `GET /security/emergency-contact` - Get emergency contacts

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive request validation
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Data Encryption**: Sensitive data encryption at rest
- **Audit Logging**: Comprehensive security event logging
- **Two-Factor Authentication**: Optional 2FA for enhanced security
- **Session Management**: Secure session handling and timeout

## 🔄 Blockchain Integration

The backend integrates with multiple blockchain networks:

- **BlockDAG**: Primary network for Truce Wallet
- **Ethereum**: ERC-20 token support
- **Polygon**: Layer 2 scaling support
- **BSC**: Binance Smart Chain support

### Smart Contract Services

- **Token Service**: BDAG token operations
- **Staking Service**: Staking pool management
- **DEX Service**: Decentralized exchange operations
- **Presale Service**: Token presale management
- **AI Oracle Service**: AI-powered data feeds

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts and profiles
- **Wallets**: Multi-chain wallet management
- **Transactions**: Blockchain transaction records
- **StakingPositions**: Staking position tracking
- **SwapOrders**: DEX swap order management
- **MarketData**: Cryptocurrency market data
- **AIInsights**: AI-generated insights and predictions
- **SecuritySettings**: User security configurations
- **PresaleParticipations**: Presale participation records

## 🚀 Deployment

### Environment Variables

See the `.env` file configuration above for all required environment variables.

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL/TLS certificates configured
- [ ] Rate limiting configured
- [ ] Monitoring and logging set up
- [ ] Backup strategy implemented
- [ ] Security headers configured

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📈 Monitoring & Logging

The application includes comprehensive logging and monitoring:

- **Winston Logger**: Structured logging
- **Health Checks**: Application health monitoring
- **Metrics**: Performance metrics collection
- **Error Tracking**: Centralized error reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check the API docs at `/api-docs`
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

---

**Built with ❤️ for the Truce Wallet ecosystem**