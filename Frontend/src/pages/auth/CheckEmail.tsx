import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import AuthFeedback from '@/components/auth/AuthFeedback';
import { Loader2, Mail, ExternalLink, RefreshCw } from 'lucide-react';

type CheckEmailType = 'signup' | 'reset';

export default function CheckEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resendConfirmation } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string>('');
  
  const type = (searchParams.get('type') as CheckEmailType) || 'signup';
  const email = searchParams.get('email') || '';

  const handleOpenGmail = () => {
    window.open('https://mail.google.com', '_blank', 'noopener,noreferrer');
  };

  const handleOpenOutlook = () => {
    window.open('https://outlook.live.com', '_blank', 'noopener,noreferrer');
  };

  const handleResendEmail = async () => {
    if (!email) return;
    
    try {
      setIsResending(true);
      setError('');
      await resendConfirmation(email);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend email';
      setError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  const getTitle = () => {
    return type === 'signup' ? 'Check your email' : 'Reset your password';
  };

  const getDescription = () => {
    if (type === 'signup') {
      return 'We\'ve sent you a confirmation link';
    }
    return 'We\'ve sent you a password reset link';
  };

  const getMainMessage = () => {
    if (type === 'signup') {
      return 'Click the link in the email to activate your account. The link will expire in 24 hours.';
    }
    return 'Click the link in the email to reset your password. The link will expire in 1 hour.';
  };

  const getActionButtonText = () => {
    return type === 'signup' ? 'Continue to Sign In' : 'Back to Sign In';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel - Content */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Check your inbox</h1>
                <p className="text-muted-foreground text-lg">Truce Wallet powered by BlockDAG</p>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {type === 'signup' 
                ? 'Welcome! We\'re excited to have you join the future of crypto management. Please verify your email to get started.'
                : 'Don\'t worry, we\'ll help you get back into your account. Follow the instructions in your email to reset your password.'
              }
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0" />
                <div>
                  <p className="font-semibold">Check your spam folder</p>
                  <p className="text-sm text-muted-foreground">Sometimes emails end up there by mistake</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0" />
                <div>
                  <p className="font-semibold">Links expire quickly</p>
                  <p className="text-sm text-muted-foreground">For security, confirmation links are time-limited</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 backdrop-blur border border-border/50">
                <div className="w-5 h-5 bg-purple-500 rounded-full flex-shrink-0" />
                <div>
                  <p className="font-semibold">Need help?</p>
                  <p className="text-sm text-muted-foreground">Contact our support team anytime</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20">
            <p className="text-sm text-muted-foreground italic">
              "Security is our top priority. That's why we require email verification for all new accounts."
            </p>
            <p className="text-sm font-medium mt-2">— Truce Wallet Security Team</p>
          </div>
        </div>

        {/* Right Panel - Check Email Interface */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-card/80 backdrop-blur border-border/50 shadow-xl rounded-xl p-8">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              
              {/* Title and Description */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{getTitle()}</h2>
                <p className="text-muted-foreground">{getDescription()}</p>
              </div>

              {/* Email Address */}
              {email && (
                <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                  <p className="text-sm text-muted-foreground">Sent to:</p>
                  <p className="font-medium">{email}</p>
                </div>
              )}

              {/* Main Message */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {getMainMessage()}
                </p>
              </div>

              {/* Email Client Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleOpenGmail}
                  variant="outline"
                  className="w-full h-11 text-white hover:text-white"
                  style={{ color: 'white !important' }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" style={{ color: 'white !important' }} />
                  Open Gmail
                </Button>
                
                <Button
                  onClick={handleOpenOutlook}
                  variant="outline"
                  className="w-full h-11 text-white hover:text-white"
                  style={{ color: 'white !important' }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" style={{ color: 'white !important' }} />
                  Open Outlook
                </Button>
              </div>

              {/* Error Feedback */}
              <AuthFeedback type="error" message={error} />

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleBackToLogin}
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                >
                  {getActionButtonText()}
                </Button>
                
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full h-11"
                  disabled={isResending || !email}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Email
                    </>
                  )}
                </Button>
              </div>

              {/* Help Text */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  {type === 'signup' ? (
                    <>
                      Already have an account?{' '}
                      <Link to="/auth/login" className="text-primary hover:underline font-medium">
                        Sign in
                      </Link>
                    </>
                  ) : (
                    <>
                      Remember your password?{' '}
                      <Link to="/auth/login" className="text-primary hover:underline font-medium">
                        Back to Sign In
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}