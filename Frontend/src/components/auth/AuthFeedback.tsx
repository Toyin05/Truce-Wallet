import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export type FeedbackType = 'success' | 'error' | 'info';

interface AuthFeedbackProps {
  type: FeedbackType;
  message: string;
  show?: boolean;
}

export default function AuthFeedback({ type, message, show = true }: AuthFeedbackProps) {
  if (!show || !message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'info':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Alert variant={getVariant()} className="flex items-start space-x-2">
      {getIcon()}
      <AlertDescription className="text-sm">
        {message}
      </AlertDescription>
    </Alert>
  );
}