import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
<<<<<<< HEAD
import ProtectedRoute from "./routes/ProtectedRoute";

// Import pages
=======
>>>>>>> upstream/main
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import AIAssistant from "./pages/AIAssistant";
import Market from "./pages/Market";
import Learn from "./pages/Learn";
import Presale from "./pages/Presale";
import Security from "./pages/Security";
import Staking from "./pages/Staking";
import Swap from "./pages/Swap";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

<<<<<<< HEAD
// Import auth pages
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AuthCheckEmail from "./pages/auth/CheckEmail";
import AuthConfirmEmail from "./pages/auth/ConfirmEmail";
import AuthForgotPassword from "./pages/auth/ForgotPassword";
import AuthResetPassword from "./pages/auth/ResetPassword";
=======

>>>>>>> upstream/main

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
<<<<<<< HEAD
            
            {/* Auth routes - redirect authenticated users away */}
            <Route 
              path="/auth/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthLogin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/register" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthRegister />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/check-email" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthCheckEmail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/confirm" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthConfirmEmail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/forgot-password" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthForgotPassword />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/reset-password" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthResetPassword />
                </ProtectedRoute>
              } 
            />
            
            {/* Legacy auth routes - redirect to new auth routes */}
            <Route path="/login" element={<Navigate to="/auth/login" replace />} />
            <Route path="/register" element={<Navigate to="/auth/register" replace />} />
            
            {/* Protected routes - require authentication */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/wallet" 
              element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/ai" 
              element={
                <ProtectedRoute>
                  <AIAssistant />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/market" 
              element={
                <ProtectedRoute>
                  <Market />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/swap" 
              element={
                <ProtectedRoute>
                  <Swap />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/staking" 
              element={
                <ProtectedRoute>
                  <Staking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/learn" 
              element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/security" 
              element={
                <ProtectedRoute>
                  <Security />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/presale" 
              element={
                <ProtectedRoute>
                  <Presale />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
=======
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/wallet" element={<Wallet />} />
            <Route path="/dashboard/ai" element={<AIAssistant />} />
            <Route path="/dashboard/market" element={<Market />} />
            <Route path="/dashboard/swap" element={<Swap />} />
            <Route path="/dashboard/staking" element={<Staking />} />
            <Route path="/dashboard/learn" element={<Learn />} />
            <Route path="/dashboard/security" element={<Security />} />
            <Route path="/dashboard/presale" element={<Presale />} />
            <Route path="/dashboard/profile" element={<Profile />} />
>>>>>>> upstream/main
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

