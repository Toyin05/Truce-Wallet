# Truce Wallet Frontend
**Modern React-based Crypto Wallet Interface**

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)
![Supabase](https://img.shields.io/badge/Supabase-2.83.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## Overview

Truce Wallet Frontend is a modern React application that provides a comprehensive crypto wallet interface. Built with TypeScript, React 18, and Vite, it features a complete authentication system, dashboard layout, and multiple functional pages for crypto wallet management.

**🚀 Production-Ready Frontend Application**

## What's Implemented

### 📱 Core Pages
- **Landing Page (`/`)**: Marketing homepage with project information
- **Authentication**: Login (`/login`) and Register (`/register`) pages
- **Dashboard (`/dashboard`)**: Main portfolio overview and analytics
- **Wallet (`/dashboard/wallet`)**: Multi-chain wallet interface
- **Swap (`/dashboard/swap`)**: Token swapping functionality
- **Staking (`/dashboard/staking`)**: Staking opportunities and management
- **Market (`/dashboard/market`)**: Live market data and analytics
- **AI Assistant (`/dashboard/ai`)**: AI-powered crypto assistant
- **Learn (`/dashboard/learn`)**: Educational resources and tutorials
- **Presale (`/dashboard/presale`)**: Presale opportunities and management
- **Security (`/dashboard/security`)**: Security settings and management
- **Profile (`/dashboard/profile`)**: User profile and account settings

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with responsive layout
- **Sidebar Navigation**: Collapsible sidebar with active route highlighting
- **Glassmorphism Elements**: Modern visual effects and styling
- **Mobile Responsive**: Fully responsive design for all devices
- **Dark/Light Theme**: Theme switching capability
- **Toast Notifications**: User feedback system

## Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 5.4.19**: Fast build tool and dev server
- **React Router 6.30.1**: Client-side routing

### UI Components & Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Radix UI**: Accessible component primitives (40+ components)
- **Lucide React**: Modern icon library
- **Recharts**: Data visualization library

### State Management & Data Fetching
- **Tanstack React Query 5.83.0**: Server state management
- **React Hook Form 7.61.1**: Form handling and validation
- **Zod 3.25.76**: Schema validation

### Backend Integration
- **Supabase 2.83.0**: Backend-as-a-Service for authentication and database
- **Authentication**: Email/password and social authentication

### Development Tools
- **ESLint 9.32.0**: Code linting
- **TypeScript ESLint**: TypeScript-specific linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Project Structure

```
src/
<<<<<<< HEAD
├── components/              # Reusable UI components
=======
├── components/              # Contains reusable UI components
>>>>>>> upstream/main
│   ├── ui/                 # shadcn-ui components (40+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── toast.tsx
│   │   └── ... (40+ components)
│   └── DashboardLayout.tsx # Main app layout with sidebar
├── pages/                  # Page components
│   ├── Index.tsx          # Landing page
│   ├── Login.tsx          # Login page
│   ├── Register.tsx       # Registration page
│   ├── Dashboard.tsx      # Main dashboard
│   ├── Wallet.tsx         # Wallet interface
│   ├── Swap.tsx           # Token swapping
│   ├── Staking.tsx        # Staking management
│   ├── Market.tsx         # Market data
│   ├── AIAssistant.tsx    # AI chat interface
│   ├── Learn.tsx          # Educational resources
│   ├── Presale.tsx        # Presale portal
│   ├── Security.tsx       # Security settings
│   ├── Profile.tsx        # User profile
│   └── NotFound.tsx       # 404 page
├── lib/                   # Core functionality
│   ├── auth.tsx          # Supabase authentication
│   └── utils.ts          # Utility functions
├── integrations/          # External service integrations
│   └── supabase/         # Supabase client & types
├── hooks/                # Custom React hooks
│   ├── use-mobile.tsx    # Mobile detection hook
│   └── use-toast.ts      # Toast notification hook
├── App.tsx               # Main app component with routing
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or bun package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   cd "Truce Wallet Buildathon/Truce-Wallet/Frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
<<<<<<< HEAD
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
=======
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
>>>>>>> upstream/main
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open in browser**
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

## Key Features

### 🔐 Authentication System
- **Supabase Integration**: Complete auth system with email/password
- **Protected Routes**: Route-based access control
- **User Session Management**: Persistent login sessions
- **Logout Functionality**: Secure logout with cleanup

### 🎛️ Dashboard Layout
- **Responsive Sidebar**: Collapsible navigation with active state
- **Professional Navigation**: Clean menu with icons and labels
- **Mobile-Friendly**: Responsive design for all screen sizes
- **Active Route Highlighting**: Visual feedback for current page

### 📊 Multiple Functional Pages
- **Portfolio Dashboard**: Asset overview and analytics
- **Wallet Interface**: Multi-chain wallet management
- **Trading Features**: Swap and staking functionality
- **Market Data**: Real-time cryptocurrency information
- **AI Integration**: Assistant for crypto guidance
- **Learning Resources**: Educational content and tutorials
- **Security Management**: User security settings

<<<<<<< HEAD
### 🎨 Modern UI/UX
- **Component Library**: 40+ pre-built UI components
- **Consistent Design**: Unified design system
- **Smooth Animations**: CSS transitions and effects
- **Accessibility**: ARIA labels and keyboard navigation
- **Theme Support**: Dark/light mode capability

=======
>>>>>>> upstream/main
## Configuration

### Supabase Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Configure environment variables
4. Set up authentication providers as needed

### Build Configuration
- **Vite Config**: Optimized for React + TypeScript
- **Tailwind Config**: Custom design system
- **TypeScript Config**: Strict type checking enabled

## Development

### Code Quality
- **ESLint**: Code linting with React and TypeScript rules
- **TypeScript**: Full type safety
- **Component Structure**: Modular and reusable components
- **Custom Hooks**: Reusable logic in custom hooks

### UI Components
The project uses shadcn/ui component library with 40+ components:
- Form components (Button, Input, Select, etc.)
- Layout components (Card, Dialog, Sheet, etc.)
- Navigation components (Tabs, Navigation Menu, etc.)
- Feedback components (Toast, Alert, Progress, etc.)
- Data display components (Table, Chart, Avatar, etc.)

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel** (recommended): Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting for public repos
- **Any static hosting**: Works with any static file hosting

### Environment Variables
Ensure production environment variables are set:
- `VITE_SUPABASE_URL`
<<<<<<< HEAD
- `VITE_SUPABASE_PUBLISHABLE_KEY`
=======
- `VITE_SUPABASE_ANON_KEY`
>>>>>>> upstream/main

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT License - see LICENSE file for details

---

**Built with modern web technologies for the future of crypto wallets** 🚀
