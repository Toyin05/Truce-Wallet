import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  showBackToLogin?: boolean;
  showBackToRegister?: boolean;
  isLoginPage?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export default function AuthLayout({ 
  children, 
  title, 
  description, 
  showBackToLogin = false,
  showBackToRegister = false,
  isLoginPage = true,
  leftContent,
  rightContent
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-3 sm:p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
        {/* Dynamic Content based on page type */}
        <div className={`${isLoginPage ? 'order-1' : 'order-2'} hidden lg:block`}>
          {leftContent || rightContent}
        </div>


        {/* Form Panel */}
        <div className={`${isLoginPage ? 'order-2' : 'order-1'} w-full max-w-md mx-auto`}>
          <Card className="bg-card/80 backdrop-blur border-border/50 shadow-xl">
            <CardHeader className="text-center space-y-2 pb-4 sm:pb-6">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold">{title}</CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
            </CardHeader>
            
            <CardContent className="space-y-3 sm:space-y-4">
              {children}
              
              {/* Navigation Links */}
              <div className="text-center space-y-3 sm:space-y-4">
                {showBackToLogin && (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    <span className="hidden xs:inline">Already have an account?</span>
                    <span className="xs:hidden">Have an account?</span>{' '}
                    <Link to="/auth/login" className="text-primary hover:underline font-medium">
                      <span className="hidden xs:inline">Sign In</span>
                      <span className="xs:inline">Sign In</span>
                    </Link>
                  </p>
                )}
                
                {showBackToRegister && (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    <span className="hidden xs:inline">Don't have an account?</span>
                    <span className="xs:hidden">No account?</span>{' '}
                    <Link to="/auth/register" className="text-primary hover:underline font-medium">
                      <span className="hidden xs:inline">Sign Up</span>
                      <span className="xs:inline">Sign Up</span>
                    </Link>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
