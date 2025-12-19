import { Check, X } from 'lucide-react';
import { validatePasswordRealTime, type PasswordValidationStatus } from '@/lib/password-validation';

interface PasswordValidationProps {
  password: string;
  show?: boolean;
  className?: string;
}

export default function PasswordValidation({ password, show = true, className = '' }: PasswordValidationProps) {
  if (!show || !password) return null;

  const validation = validatePasswordRealTime(password);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Validation Status */}
      <div className="flex items-center gap-2">
        {validation.isValid ? (
          <div className="flex items-center gap-1 text-green-600">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Strong password</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600">
            <X className="w-4 h-4" />
            <span className="text-sm font-medium">Weak password</span>
          </div>
        )}
      </div>

      {/* Password Rules Checklist */}
      <div className="space-y-1">
        <div className="text-xs font-medium text-muted-foreground mb-2">Password must contain:</div>
        
        <div className="space-y-1">
          <div className={`flex items-center gap-2 text-xs ${
            validation.checks.minLength ? 'text-green-600' : 'text-muted-foreground'
          }`}>
            {validation.checks.minLength ? (
              <Check className="w-3 h-3" />
            ) : (
              <X className="w-3 h-3" />
            )}
            At least 8 characters
          </div>
          
          <div className={`flex items-center gap-2 text-xs ${
            validation.checks.hasUppercase ? 'text-green-600' : 'text-muted-foreground'
          }`}>
            {validation.checks.hasUppercase ? (
              <Check className="w-3 h-3" />
            ) : (
              <X className="w-3 h-3" />
            )}
            One uppercase letter
          </div>
          
          <div className={`flex items-center gap-2 text-xs ${
            validation.checks.hasLowercase ? 'text-green-600' : 'text-muted-foreground'
          }`}>
            {validation.checks.hasLowercase ? (
              <Check className="w-3 h-3" />
            ) : (
              <X className="w-3 h-3" />
            )}
            One lowercase letter
          </div>
          
          <div className={`flex items-center gap-2 text-xs ${
            validation.checks.hasNumber ? 'text-green-600' : 'text-muted-foreground'
          }`}>
            {validation.checks.hasNumber ? (
              <Check className="w-3 h-3" />
            ) : (
              <X className="w-3 h-3" />
            )}
            One number
          </div>
        </div>
      </div>

      {/* Warnings */}
      {validation.warnings.length > 0 && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="text-xs text-yellow-800">
            {validation.warnings.map((warning, index) => (
              <div key={index}>• {warning}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}