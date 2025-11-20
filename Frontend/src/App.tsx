import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
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
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
