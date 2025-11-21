# Truce Wallet

A smart crypto wallet that actually helps you make better decisions.

**AI-Powered Multi-Chain Wallet and DEX Built on BlockDAG**

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)
![Supabase](https://img.shields.io/badge/Supabase-2.83.0-green)
![Status](https://img.shields.io/badge/Status-Frontend%20Complete-green)
![Buildathon](https://img.shields.io/badge/Buildathon-BlockDAG%202025-blue)

---

## What is Truce Wallet?

Truce Wallet is a multi-chain wallet built on BlockDAG that combines secure storage, token swapping, and AI-powered insights in one clean interface.

Store your crypto, swap tokens, stake for rewards, and get intelligent recommendations—all without leaving the app.

Think of it as your crypto command center: wallet, exchange, and financial advisor rolled into one.

**🚀 Fully Implemented Frontend** | **🔗 [View on GitHub](https://github.com/Toyin05/Truce-Wallet)**

---

## The Problem

Most crypto wallets do one of two things:
- They're secure but complicated
- They're simple but lack features

Meanwhile, users are stuck:
- Managing multiple wallets across different chains
- Switching between apps just to swap tokens
- Making trades based on gut feeling instead of data
- Missing out on staking rewards because it's too confusing
- Getting overwhelmed by technical jargon

The barrier to entry is still too high, and even experienced users waste time navigating fragmented tools.

---

## Our Solution

Truce Wallet brings together everything you need:

### 🔐 Multi-Chain Wallet
Manage assets across Ethereum, Polygon, Arbitrum, and BlockDAG from a single dashboard. No more switching between wallets or tracking multiple seed phrases.

### 💱 Built-In DEX
Swap tokens instantly with our integrated decentralized exchange. We've modeled the experience after PancakeSwap—familiar, fast, and frictionless.

### 🤖 AI-Powered Insights
Get personalized price predictions, trading tips, and risk alerts based on real market data. Make informed decisions instead of gambling.

### 💰 Staking & Rewards
Put your crypto to work. Stake supported tokens directly from the wallet and watch your portfolio grow with transparent APY tracking.

### 📚 Learning Hub
New to DeFi? Our built-in Crypto Academy breaks down complex concepts into simple lessons. Learn about swaps, liquidity pools, and wallet security as you go.

### 🔒 Security First
Biometric authentication, 2FA protection, and support for hardware wallets like Ledger and Trezor. Your keys, your crypto—always.

---

## Who This Is For

**Crypto Newcomers**  
Getting started shouldn't feel like defusing a bomb. We guide you through every step with clear explanations and safety features.

**Active Traders**  
Stop tab-switching. Get market insights, execute swaps, and manage positions all in one place.

**Multi-Chain Users**  
Tired of managing separate wallets for every blockchain? We handle the complexity so you don't have to.

**DeFi Enthusiasts**  
Access liquidity pools, track yields, and stay updated on market movements with a wallet that actually understands DeFi.

---

## What's Implemented

### 📱 Complete Frontend Application

- **Landing Page**: Marketing homepage with project information
- **Authentication System**: Login and register pages with Supabase integration
- **Dashboard**: Main portfolio overview and analytics
- **Wallet Interface**: Multi-chain wallet management
- **Token Swapping**: DEX functionality for token exchanges
- **Staking Portal**: Staking opportunities and management
- **Market Data**: Live cryptocurrency prices and analytics
- **AI Assistant**: AI-powered crypto guidance and chat
- **Learning Resources**: Educational content and tutorials
- **Presale Portal**: Token presale opportunities
- **Security Settings**: User security and privacy controls
- **User Profile**: Account management and preferences

### 🎨 Modern UI/UX Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Glassmorphism Elements**: Modern visual effects and styling
- **Dark/Light Theme**: Theme switching capability
- **Professional Navigation**: Collapsible sidebar with active state highlighting
- **Toast Notifications**: User feedback system
- **40+ UI Components**: Complete component library from shadcn/ui

---

## Key Features

### Currently Implemented
- Real-time price tracking interface for major tokens
- Portfolio dashboard with performance metrics
- Transaction history and detailed breakdowns
- Mobile-responsive design that works everywhere
- Educational content library for continuous learning
- Modern authentication with Supabase
- Complete routing system with protected pages

### Coming Soon
- One-tap token swaps with live exchange rates
- Biometric authentication and 2FA protection
- Hardware wallet integration (Ledger, Trezor)
- AI-powered price predictions and trading tips
- Staking functionality with APY tracking
- Cross-chain asset management

---

## Tech Stack

### Frontend Implementation
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 5.4.19**: Fast build tool and dev server
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **React Router 6.30.1**: Client-side routing

### UI Components & Design
- **shadcn/ui**: High-quality React components
- **Radix UI**: Accessible component primitives (40+ components)
- **Lucide React**: Modern icon library
- **Recharts**: Data visualization library

### Backend Integration
- **Supabase 2.83.0**: Backend-as-a-Service for authentication and database
- **Authentication**: Email/password authentication system
- **Protected Routes**: Route-based access control

### Planned Blockchain Integration
- **Web3 Integration**: Ethers.js for blockchain interactions
- **Solidity Smart Contracts**: Deployed on BlockDAG
- **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, BlockDAG
- **AI Integration**: Machine learning models for price prediction

---

## Architecture Overview

### Current Implementation
```
React Frontend (TypeScript + Tailwind)
    ↓
React Router (Client-side routing)
    ↓
Supabase (Authentication + Database)
    ↓
shadcn/ui Components (40+ components)
```

### Planned Full Architecture
```
User Interface (React + Tailwind)
         ↓
Web3 Integration Layer (Ethers.js)
         ↓
Smart Contracts (BlockDAG + Multi-Chain)
         ↓
AI Analysis Engine
         ↓
Price Feeds + Database (Supabase + CoinGecko API)
```

**Architecture Diagram**: [View on Canva](https://www.canva.com/design/DAG4QD4NUwc/yDnfS71q_BzoWUYoXrbEtA/edit?utm_content=DAG4QD4NUwc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## Project Structure

```
Truce-Wallet/
├── Frontend/                 # Complete React application
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── ui/          # shadcn/ui components (40+)
│   │   │   └── DashboardLayout.tsx
│   │   ├── pages/           # All functional pages
│   │   │   ├── Index.tsx    # Landing page
│   │   │   ├── Login.tsx    # Authentication
│   │   │   ├── Dashboard.tsx # Main dashboard
│   │   │   ├── Wallet.tsx   # Wallet interface
│   │   │   ├── Swap.tsx     # Token swapping
│   │   │   ├── Staking.tsx  # Staking portal
│   │   │   ├── Market.tsx   # Market data
│   │   │   ├── AIAssistant.tsx # AI chat
│   │   │   ├── Learn.tsx    # Learning hub
│   │   │   ├── Presale.tsx  # Presale portal
│   │   │   ├── Security.tsx # Security settings
│   │   │   └── Profile.tsx  # User profile
│   │   ├── lib/             # Core functionality
│   │   │   ├── auth.tsx     # Supabase authentication
│   │   │   └── utils.ts     # Utility functions
│   │   ├── integrations/    # External services
│   │   │   └── supabase/    # Supabase client
│   │   └── hooks/           # Custom React hooks
│   ├── package.json         # Dependencies
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or bun package manager
- Modern web browser

### Installation

1. **Navigate to Frontend Directory**
   ```bash
   cd "Truce Wallet Buildathon/Truce-Wallet/Frontend"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Create a `.env` file:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open in Browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- **`npm run dev`**: Start development server
- **`npm run build`**: Build for production
- **`npm run build:dev`**: Build for development
- **`npm run preview`**: Preview production build
- **`npm run lint`**: Run ESLint
- **`npm run type-check`**: Run TypeScript type checking

---

## Team

**Oluwatoyin Ojumoro** – Technical Lead  
Oversees the technical architecture and ensures seamless integration across all platform components. Drives technical strategy, coordinates development workflows, and maintains code quality standards.

**Emmanuel Adewumi** – Smart Contract Developer  
Architects and deploys Solidity smart contracts on BlockDAG with multi-chain compatibility. Responsible for contract security, gas optimization, and blockchain integration logic.

**Vivian Peters** – Frontend Developer  
Builds the user interface with React and Tailwind CSS, ensuring responsive design and intuitive user experiences. Focuses on component architecture, state management, and cross-device compatibility.

**Emmanuel Ogba** – Frontend Developer / Prompt Engineer  
Develops frontend features while engineering AI prompts for intelligent wallet insights. Bridges the gap between user interface and machine learning models to deliver contextual recommendations.

**Samuel Obarine** – Project Manager  
Coordinates team efforts, manages timelines, and ensures alignment between technical execution and project goals. Facilitates communication across development streams and tracks milestone delivery.

---

## Market Opportunity

The global crypto wallet market is projected to exceed $50 billion by 2030. Users are increasingly demanding:
- Non-custodial solutions with institutional-grade security
- AI-powered tools for smarter decision-making
- Seamless multi-chain experiences
- Educational resources built into the platform

Truce Wallet is positioned at the intersection of all four trends.

---

## Repository & Links

**GitHub Repository**: [https://github.com/Toyin05/Truce-Wallet](https://github.com/Toyin05/Truce-Wallet)  
**Frontend Directory**: `/Frontend`  
**Architecture Overview**: [View on Canva](https://www.canva.com/design/DAG4QD4NUwc/yDnfS71q_BzoWUYoXrbEtA/edit?utm_content=DAG4QD4NUwc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## The Truce Wallet Advantage

We're not just building another wallet. We're solving real problems:
- Fragmented user experience across platforms
- Lack of intelligent guidance for users
- Complexity that keeps millions on the sidelines

Truce Wallet makes crypto accessible, intelligent, and secure. That's how we onboard the next billion users.

---

## Contact

Have questions? Want to collaborate? Let's talk.

**GitHub**: [@Toyin05](https://github.com/Toyin05)  
**Project**: Truce Wallet on BlockDAG  
**Buildathon**: BlockDAG Buildathon 2025

---

**Built with ❤️ on BlockDAG**  
*Making crypto accessible for everyone* 🌟

**License**: MIT License
