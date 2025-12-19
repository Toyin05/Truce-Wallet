import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthFeedback from '@/components/auth/AuthFeedback';
import PasswordValidation from '@/components/auth/PasswordValidation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { passwordSchema, passwordConfirmationSchema } from '@/lib/password-validation';

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [status, setStatus] = useState<'validating' | 'valid' | 'invalid' | 'success'>('validating');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updatePassword, loading, getErrorMessage } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const watchedPassword = watch('password', '');
  const isLoading = loading || isSubmitting;



  useEffect(() => {
    // Validate the reset token
    const validateToken = async () => {
      try {
        // Get tokens from URL hash (Supabase sends them in hash)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');
        
        if (type === 'recovery' && accessToken && refreshToken) {
          // Set the session with the tokens from URL
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (sessionError) {
            throw new Error(getErrorMessage(sessionError));
          }
          
          setStatus('valid');
        } else {
          setStatus('invalid');
          setError('Invalid or missing reset token');
        }
      } catch (err) {
        setStatus('invalid');
        setError('Invalid or expired reset token');
      }
    };

    validateToken();
  }, []);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setError('');
      setSuccess('');
      
      await updatePassword(data.password);
      
      setStatus('success');
      setSuccess('Password updated successfully!');
      
      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully updated.',
      });
      
      // Explicitly sign out user
      await supabase.auth.signOut();
      
      // Redirect to login with success param after a short delay
      setTimeout(() => {
        navigate('/auth/login?reset=success', { replace: true });
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password';
      setError(errorMessage);
      
      toast({
        title: 'Update Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleGoToLogin = () => {
    navigate('/auth/login');
  };

  // Show loading while validating token
  if (status === 'validating') {
    return (
      <AuthLayout
        title="Validating Reset Link"
        description="Please wait while we verify your reset link"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-muted-foreground">
            Verifying your reset link...
          </p>
        </div>
      </AuthLayout>
    );
  }

  // Show invalid token message
  if (status === 'invalid') {
    return (
      <AuthLayout
        title="Invalid Reset Link"
        description="This password reset link is invalid or has expired"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Reset link is invalid</h3>
            <AuthFeedback type="error" message={error} />
            <p className="text-sm text-muted-foreground">
              This password reset link may be expired, invalid, or already used.
              Please request a new password reset.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/auth/forgot-password')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            >
              Request New Reset Link
            </Button>
            
            <Button
              onClick={handleGoToLogin}
              variant="outline"
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Show success message
  if (status === 'success') {
    return (
      <AuthLayout
        title="Password Updated!"
        description="Your password has been successfully changed"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Password updated successfully!</h3>
            <p className="text-muted-foreground">
              Your password has been changed. You can now sign in with your new password.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to sign in...
            </p>
          </div>
          
          <Button
            onClick={handleGoToLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
          >
            Continue to Sign In
          </Button>
        </div>
      </AuthLayout>
    );
  }

  // Show reset password form
  return (
    <AuthLayout
      title="Set New Password"
      description="Choose a strong password for your account"
    >
      <div className="space-y-4">
        {/* Error/Success Feedback */}
        <AuthFeedback type="error" message={error} />
        <AuthFeedback type="success" message={success} />

        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-muted-foreground">
            Please enter your new password below. Make sure it's strong and unique.
          </p>
        </div>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register('password')}
                className="h-11 bg-background/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordValidation password={watchedPassword} />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register('confirmPassword')}
                className="h-11 bg-background/50 pr-10"
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
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Updating Password...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Update Password
              </>
            )}
          </Button>
        </form>

        {/* Security Tips */}
        <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
          <h4 className="text-sm font-medium mb-2">Password Tips:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use at least 8 characters</li>
            <li>• Include uppercase and lowercase letters</li>
            <li>• Add numbers and special characters</li>
            <li>• Avoid common words or personal information</li>
          </ul>
        </div>
      </div>
    </AuthLayout>
  );
}