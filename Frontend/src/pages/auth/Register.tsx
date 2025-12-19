import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthFeedback from '@/components/auth/AuthFeedback';
import PasswordValidation from '@/components/auth/PasswordValidation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Wallet, Eye, EyeOff } from 'lucide-react';
import { passwordSchema, passwordConfirmationSchema } from '@/lib/password-validation';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, signInWithMetaMask, signInWithOAuth, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password', '');
  const isLoading = loading || isSubmitting;



  const onSubmit = async (data: RegisterFormData) => {
    if (!agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      setError('');
      setSuccess('');
      
      const result = await signUp(data.email, data.password, data.fullName);
      
      if (result.needsConfirmation) {
        // Redirect to check email page instead of showing success state
        navigate(`/auth/check-email?type=signup&email=${encodeURIComponent(data.email)}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration';
      setError(errorMessage);
      
      toast({
        title: 'Registration Failed',
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
      
      navigate('/dashboard');
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

  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'discord') => {
    try {
      setError('');
      setSuccess('');
      
      await signInWithOAuth(provider);
      
      // Success - user will be redirected automatically
      // No need to show toast here as the redirect will handle it
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : `Failed to sign up with ${provider}`;
      setError(errorMessage);
      
      toast({
        title: 'Social Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const registerContent = (
    <div className="space-y-6 lg:space-y-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Start your crypto journey</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Be part of the BlockDAG revolution</p>
          </div>
        </div>
        
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          <span className="hidden sm:inline">Join thousands of users already managing their crypto smarter with Truce Wallet. 
          Experience the power of BlockDAG technology and unlock the future of decentralized finance today.</span>
          <span className="sm:hidden">Join thousands of users already managing their crypto smarter with Truce Wallet.</span>
        </p>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Advanced Security</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Military-grade encryption & 2FA</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Multi-Chain Support</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Manage all your assets in one place</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-pink-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Earn & Learn</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Staking rewards & educational content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-600/10 border border-purple-500/20">
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          "BlockDAG is the next evolution in blockchain technology. Join early and be part of the future."
        </p>
        <p className="text-xs sm:text-sm font-medium mt-2">— BlockDAG Research Team</p>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Create Your Account"
      description="Join the future of crypto management"
      showBackToLogin={true}
      isLoginPage={false}
      leftContent={registerContent}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Social Authentication with Encouragement */}
        <div className="space-y-4">
          {/* Encouragement Text */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
            <span className="font-medium text-foreground">Quick Registration - Sign up instantly with your preferred account</span> 
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
                      src="/src/google-icon-logo.svg" 
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
                      src="/src/github-icon-logo.svg" 
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
                      src="/src/discord-icon-logo.svg" 
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
                      src="/src/metamask-icon-logo.svg" 
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
              ⚡ <span className="font-medium hidden xs:inline">No password required!</span>
              <span className="font-medium xs:hidden">Quick access!</span> 
              <span className="hidden sm:inline">Create your account in seconds</span>
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
          </div>
        </div>

        {/* Error/Success Feedback */}
        <AuthFeedback type="error" message={error} />
        <AuthFeedback type="success" message={success} />

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register('fullName')}
              className="h-10 sm:h-11 bg-background/50 text-sm sm:text-base"
            />
            {errors.fullName && (
              <p className="text-xs sm:text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

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
            <PasswordValidation password={password} />
            {errors.password && (
              <p className="text-xs sm:text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register('confirmPassword')}
                className="h-10 sm:h-11 bg-background/50 pr-10 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs sm:text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-xs sm:text-sm leading-relaxed text-muted-foreground"
            >
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button
            type="submit"
            className="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-colors duration-200 text-sm sm:text-base"
            disabled={isLoading || !agreeToTerms}
          >
            {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : 'Create Account'}
          </Button>
        </form>


      </div>
    </AuthLayout>
  );
}


