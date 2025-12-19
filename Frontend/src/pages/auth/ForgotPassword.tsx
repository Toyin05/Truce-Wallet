import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthFeedback from '@/components/auth/AuthFeedback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, CheckCircle2, Wallet } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { resetPassword, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const isLoading = loading || isSubmitting;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError('');
      setSuccess('');
      
      await resetPassword(data.email);
      
      // Redirect to check email page instead of showing success state
      navigate(`/auth/check-email?type=reset&email=${encodeURIComponent(data.email)}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset link';
      setError(errorMessage);
      
      toast({
        title: 'Reset Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  const forgotPasswordContent = (
    <div className="space-y-6 lg:space-y-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Reset your password</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Truce Wallet powered by BlockDAG</p>
          </div>
        </div>
        
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          <span className="hidden sm:inline">Don't worry! We'll help you get back into your account quickly and securely.</span>
          <span className="sm:hidden">We'll help you reset your password securely.</span>
        </p>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Secure Reset</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Email verification required</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Quick Recovery</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Get back to your wallet fast</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-500 rounded-full flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base">Safe & Trusted</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Powered by BlockDAG security</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20">
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          "Security is paramount. Password resets are time-limited and require email verification."
        </p>
        <p className="text-xs sm:text-sm font-medium mt-2">— Truce Wallet Security Team</p>
      </div>
    </div>
  );

  return (
    <AuthLayout
      title="Forgot Password?"
      description="Enter your email to reset your password"
      showBackToLogin={true}
      leftContent={forgotPasswordContent}
    >
      <div className="space-y-4">
        {/* Error/Success Feedback */}
        <AuthFeedback type="error" message={error} />
        <AuthFeedback type="success" message={success} />

        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-muted-foreground">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className="h-11 bg-background/50"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Sending Reset Link...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                Send Reset Link
              </>
            )}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}