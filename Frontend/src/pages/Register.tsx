import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Wallet, Loader2, CheckCircle2, ArrowLeft, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Register() {
  return <Navigate to="/auth/register" replace />;
}