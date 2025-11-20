import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Wallet, Loader2, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithMetaMask } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
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
        {/* Left Panel - Content */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome back to your smart crypto hub</h1>
                <p className="text-muted-foreground text-lg">Truce Wallet powered by BlockDAG</p>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access your multi-chain wallet, AI-powered trading insights, and seamless DeFi operations. 
              Built for speed and security on the BlockDAG network.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <Zap className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold">Lightning Fast</p>
                  <p className="text-sm text-muted-foreground">Instant transactions on BlockDAG</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-semibold">Non-Custodial</p>
                  <p className="text-sm text-muted-foreground">Your keys, your crypto</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-semibold">AI-Powered</p>
                  <p className="text-sm text-muted-foreground">Smart insights for better trading</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20">
            <p className="text-sm text-muted-foreground italic">
              "Truce Wallet has revolutionized how I manage my crypto portfolio. The AI insights are game-changing."
            </p>
            <p className="text-sm font-medium mt-2">— Early Beta User</p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-card/80 backdrop-blur border-border/50 shadow-xl">
            <CardHeader className="text-center space-y-2 pb-6">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <p className="text-muted-foreground">Welcome back to your Truce Wallet</p>
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
                  <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link to="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline font-medium inline-flex items-center">
                    Sign Up
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </p>
                
                {/* Mobile Only Content */}
                <div className="lg:hidden space-y-3 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-center">Welcome back to your smart crypto hub</p>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-blue-500" />
                      <span>Lightning fast on BlockDAG</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span>Non-custodial security</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3 text-purple-500" />
                      <span>AI-powered insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}