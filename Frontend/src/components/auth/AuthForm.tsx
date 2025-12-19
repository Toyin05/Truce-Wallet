import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export interface AuthFormProps {
  schema: z.ZodSchema<any>;
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => Promise<void>;
  submitText: string;
  loading?: boolean;
  children: ReactNode;
  showForgotPassword?: boolean;
  onForgotPassword?: () => void;
}

export default function AuthForm({
  schema,
  defaultValues = {},
  onSubmit,
  submitText,
  loading = false,
  children,
  showForgotPassword = false,
  onForgotPassword
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const isLoading = loading || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {children}
      
      {showForgotPassword && onForgotPassword && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-sm"
            onClick={onForgotPassword}
          >
            Forgot password?
          </Button>
        </div>
      )}
      
      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : submitText}
      </Button>
    </form>
  );
}

// Re-export UI components for convenience
export { Input, Label };