import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';
import AuthFeedback from '@/components/auth/AuthFeedback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Wallet, Mail, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithMetaMask, signInWithOAuth, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Check for email confirmation success
  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    if (confirmed === 'true') {
      setSuccess('Your email has been successfully confirmed. Please sign in to continue.');
    }
    
    const resetSuccess = searchParams.get('reset');
    if (resetSuccess === 'success') {
      setSuccess('Your password has been updated successfully. Please sign in to continue.');
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const isLoading = loading || isSubmitting;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      setSuccess('');
      
      await signIn(data.email, data.password);
      
      toast({
        title: 'Success',
        description: 'Welcome back to your Truce Wallet!',
      });
      
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign in';
      setError(errorMessage);
      
      // Check if the error is about email not confirmed
      if (errorMessage.toLowerCase().includes('email not confirmed') || 
          errorMessage.toLowerCase().includes('confirm your email')) {
        // Add a more helpful message with action
        const confirmedMessage = errorMessage + ' Need help? Check your email or request a new confirmation link.';
        setError(confirmedMessage);
      }
      
      toast({
        title: 'Sign In Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleMetaMask = async () => {
    try {
      setError('');
      setSuccess('');
      
      await signInWithMetaMask();
      
      toast({
        title: 'Success',
        description: 'Connected with MetaMask!',
      });
      
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect with MetaMask';
      setError(errorMessage);
      
      toast({
        title: 'MetaMask Connection Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'discord') => {
    try {
      setError('');
      setSuccess('');
      
      await signInWithOAuth(provider);
      
      // Success - user will be redirected automatically
      // No need to show toast here as the redirect will handle it
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : `Failed to sign in with ${provider}`;
      setError(errorMessage);
      
      toast({
        title: 'Social Sign In Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const loginContent = (
    <div className="space-y-6 lg:space-y-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome to your smart crypto hub</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Truce Wallet powered by BlockDAG</p>
          </div>
        </div>
        
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          <span className="hidden sm:inline">Experience the next generation of crypto management with AI-powered insights, 
          lightning-fast transactions, and comprehensive DeFi tools — all secured by BlockDAG's revolutionary consensus.</span>
          <span className="sm:hidden">Experience the next generation of crypto management with AI-powered insights and lightning-fast transactions.</span>
        </p>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Lightning Fast</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Instant transactions on BlockDAG</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Non-Custodial</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Your keys, your crypto</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">AI-Powered</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Smart insights for better trading</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20">
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          "The future of crypto wallets is here. Truce Wallet makes DeFi accessible to everyone."
        </p>
        <p className="text-xs sm:text-sm font-medium mt-2">— Crypto Enthusiast</p>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your Truce Wallet"
      showBackToRegister={true}
      isLoginPage={true}
      leftContent={loginContent}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Social Authentication with Encouragement */}
        <div className="space-y-4">
          {/* Encouragement Text */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              <span className="font-medium text-foreground">Quick Sign In - Choose your preferred method below</span>
            </p>
          </div>
          
          {/* Professional Social Authentication Grid */}
          <div className="space-y-3 sm:space-y-4">
            {/* First Row: Google & GitHub */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Google */}
              <button
                type="button"
                className="relative flex items-center justify-center h-10 sm:h-12 px-2 sm:px-4 border-2 border-border/60 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-lg hover:from-blue-500/25 hover:to-purple-600/25 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <>
                    <img 
                      src="/icons/google.svg" 
                      alt="Google" 
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="text-xs sm:text-sm font-semibold group-hover:text-white transition-colors duration-300">Google</span>
                  </>
                )}
              </button>

              {/* GitHub */}
              <button
                type="button"
                className="relative flex items-center justify-center h-10 sm:h-12 px-2 sm:px-4 border-2 border-border/60 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-lg hover:from-blue-500/25 hover:to-purple-600/25 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <>
                    <img 
                      src="/icons/github.svg" 
                      alt="GitHub" 
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="text-xs sm:text-sm font-semibold group-hover:text-white transition-colors duration-300">GitHub</span>
                  </>
                )}
              </button>
            </div>

            {/* Second Row: Discord & MetaMask */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Discord */}
              <button
                type="button"
                className="relative flex items-center justify-center h-10 sm:h-12 px-2 sm:px-4 border-2 border-border/60 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-lg hover:from-blue-500/25 hover:to-purple-600/25 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={() => handleOAuthSignIn('discord')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <>
                    <img 
                      src="/icons/discord.svg" 
                      alt="Discord" 
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="text-xs sm:text-sm font-semibold group-hover:text-white transition-colors duration-300">Discord</span>
                  </>
                )}
              </button>

              {/* MetaMask */}
              <button
                type="button"
                className="relative flex items-center justify-center h-10 sm:h-12 px-2 sm:px-4 border-2 border-border/60 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-lg hover:from-blue-500/25 hover:to-purple-600/25 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={handleMetaMask}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <>
                    <img 
                      src="/icons/metamask.svg" 
                      alt="MetaMask" 
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="text-xs sm:text-sm font-semibold group-hover:text-white transition-colors duration-300">MetaMask</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Additional Encouragement */}
          <div className="text-center mt-2 sm:mt-3">
            <p className="text-xs text-muted-foreground">
              ⚡ <span className="font-medium hidden xs:inline">No passwords needed!</span>
              <span className="font-medium xs:hidden">Quick access!</span> 
              <span className="hidden sm:inline">Sign in instantly with your preferred account</span>
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Error/Success Feedback */}
        <AuthFeedback type="error" message={error} />
        <AuthFeedback type="success" message={success} />

        {/* Email Confirmation Helper */}
        {error && (error.toLowerCase().includes('email not confirmed') || error.toLowerCase().includes('confirm your email')) && (
          <div className="text-center">
            <Button
              onClick={() => navigate('/auth/check-email?type=signup')}
              variant="outline"
              className="w-full h-11"
            >
              <Mail className="w-4 h-4 mr-2" />
              Resend Confirmation Email
            </Button>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className="h-10 sm:h-11 bg-background/50 text-sm sm:text-base"
            />
            {errors.email && (
              <p className="text-xs sm:text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register('password')}
                className="h-10 sm:h-11 bg-background/50 pr-10 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs sm:text-sm text-red-600">{errors.password.message}</p>
            )}
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
                className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="hidden xs:inline">Remember Me</span>
                <span className="xs:hidden">Remember Me</span>
              </label>
            </div>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-xs sm:text-sm cursor-pointer"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </Button>
          </div>
          
          <Button
            type="submit"
            className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 cursor-pointer text-sm sm:text-base"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : 'Sign In'}
          </Button>
        </form>


      </div>
    </AuthLayout>
  );
}


