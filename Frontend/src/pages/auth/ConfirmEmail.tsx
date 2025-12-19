import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthFeedback from '@/components/auth/AuthFeedback';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react';

export default function ConfirmEmail() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { confirmPassword, user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleConfirmation = async () => {
      try {
        setError('');
        
        // Get tokens from URL params (Supabase sends them in hash)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');
        const email = hashParams.get('email');
        
        if (type === 'signup' && accessToken) {
          // Confirm the email but DO NOT auto-login
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          });
          
          if (sessionError) {
            throw new Error(getErrorMessage(sessionError));
          }
          
          // Explicitly sign out after confirmation
          await supabase.auth.signOut();
          
          setStatus('success');
          setEmail(email || '');
          
          toast({
            title: 'Email Confirmed',
            description: 'Your email has been successfully confirmed. Please sign in to continue.',
          });
          
          // Redirect to login with success param after a short delay
          setTimeout(() => {
            navigate('/auth/login?confirmed=true', { replace: true });
          }, 2000);
        } else {
          throw new Error('Invalid confirmation link');
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to confirm email';
        setError(errorMessage);
        setStatus('error');
        
        toast({
          title: 'Confirmation Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    };

    handleConfirmation();
  }, [navigate, toast]);

  const handleResendConfirmation = async () => {
    try {
      if (email) {
        // Redirect to check email page for resending
        navigate(`/auth/check-email?type=signup&email=${encodeURIComponent(email)}`);
      } else {
        navigate('/auth/check-email?type=signup');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend confirmation';
      setError(errorMessage);
    }
  };

  const handleGoToLogin = () => {
    navigate('/auth/login');
  };

  if (loading || status === 'loading') {
    return (
      <AuthLayout
        title="Confirming Email"
        description="Please wait while we verify your email"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-muted-foreground">
            Verifying your email address...
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (status === 'success') {
    return (
      <AuthLayout
        title="Email Confirmed!"
        description="Your account has been successfully verified"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Welcome to Truce Wallet!</h3>
            <p className="text-muted-foreground">
              Your email has been successfully confirmed
              {email && (
                <>
                  {' '}for <strong>{email}</strong>
                </>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              You will be redirected to sign in shortly...
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

  if (status === 'error') {
    return (
      <AuthLayout
        title="Confirmation Failed"
        description="We couldn't verify your email"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Email confirmation failed</h3>
            <AuthFeedback type="error" message={error} />
            <p className="text-sm text-muted-foreground">
              The confirmation link may be expired, invalid, or already used.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleGoToLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            >
              Go to Sign In
            </Button>
            
            <Button
              onClick={handleResendConfirmation}
              variant="outline"
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Need Help?
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return null;
}