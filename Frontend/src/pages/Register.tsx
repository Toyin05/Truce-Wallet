<<<<<<< HEAD
import { Navigate } from 'react-router-dom';

export default function Register() {
  return <Navigate to="/auth/register" replace />;
}
=======
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
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithMetaMask } = useAuth();
  const { toast } = useToast();

  const getPasswordStrength = (pass: string) => {
    if (pass.length < 6) return { strength: 0, text: 'Too short', color: 'bg-destructive' };
    if (pass.length < 8) return { strength: 33, text: 'Weak', color: 'bg-orange-500' };
    if (!/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) return { strength: 66, text: 'Medium', color: 'bg-yellow-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, fullName);
      toast({
        title: 'Success',
        description: 'Account created successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMetaMask = async () => {
    setLoading(true);
    try {
      await signInWithMetaMask();
      toast({
        title: 'Success',
        description: 'Connected with MetaMask',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel - Form */}
        <div className="w-full max-w-md mx-auto lg:order-1">
          <Card className="bg-card/80 backdrop-blur border-border/50 shadow-xl">
            <CardHeader className="text-center space-y-2 pb-6">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Create Your Truce Wallet</CardTitle>
              <p className="text-muted-foreground">Join the future of crypto management</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-border hover:bg-muted/50 transition-all duration-200 bg-background/50"
                onClick={handleMetaMask}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect MetaMask
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="h-11 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 bg-background/50"
                  />
                  {passwordStrength && (
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {passwordStrength.strength === 100 && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                        Password strength: {passwordStrength.text}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 bg-background/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium inline-flex items-center">
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Content */}
        <div className="space-y-8 lg:order-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Start managing your crypto smarter</h1>
                <p className="text-muted-foreground text-lg">Join thousands of users on BlockDAG</p>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Experience the next generation of crypto management with AI-powered insights, 
              lightning-fast transactions, and comprehensive DeFi tools — all secured by BlockDAG's revolutionary consensus.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <Zap className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold">Instant Transactions</p>
                  <p className="text-sm text-muted-foreground">Powered by BlockDAG's speed</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-semibold">Enterprise Security</p>
                  <p className="text-sm text-muted-foreground">Military-grade encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-semibold">AI Trading Assistant</p>
                  <p className="text-sm text-muted-foreground">Smart portfolio optimization</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">What you'll get:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">Multi-chain wallet support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">Built-in DEX for swaps</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">Staking opportunities</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">Presale participation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">Real-time market insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm">Non-custodial control</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20">
            <p className="text-sm text-muted-foreground italic">
              "The future of crypto wallets is here. Truce Wallet makes DeFi accessible to everyone."
            </p>
            <p className="text-sm font-medium mt-2">— Crypto Enthusiast</p>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> upstream/main
