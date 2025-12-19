import { z } from 'zod';

// Enterprise-grade password validation rules
export const passwordValidationRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: false, // Optional as per requirements
} as const;

// Create a reusable Zod schema for password validation
export const passwordSchema = z.string()
  .min(
    passwordValidationRules.minLength,
    `Password must be at least ${passwordValidationRules.minLength} characters long`
  )
  .refine(
    (password) => !passwordValidationRules.requireUppercase || /[A-Z]/.test(password),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (password) => !passwordValidationRules.requireLowercase || /[a-z]/.test(password),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (password) => !passwordValidationRules.requireNumber || /\d/.test(password),
    'Password must contain at least one number'
  )
  .refine(
    (password) => !passwordValidationRules.requireSpecialChar || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    'Password should contain at least one special character'
  );

// Password confirmation schema
export const passwordConfirmationSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

// Helper function to get password validation status for real-time feedback
export interface PasswordValidationStatus {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar?: boolean; // Optional
  };
}

export function validatePasswordRealTime(password: string): PasswordValidationStatus {
  const checks = {
    minLength: password.length >= passwordValidationRules.minLength,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: passwordValidationRules.requireSpecialChar ? /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) : undefined,
  };

  const errors: string[] = [];
  const warnings: string[] = [];

  if (!checks.minLength) {
    errors.push(`Must be at least ${passwordValidationRules.minLength} characters`);
  }
  if (!checks.hasUppercase) {
    errors.push('Must contain at least one uppercase letter');
  }
  if (!checks.hasLowercase) {
    errors.push('Must contain at least one lowercase letter');
  }
  if (!checks.hasNumber) {
    errors.push('Must contain at least one number');
  }
  if (passwordValidationRules.requireSpecialChar && !checks.hasSpecialChar) {
    errors.push('Should contain at least one special character');
  }

  // Add warnings for better UX (not blocking validation)
  if (password.length >= passwordValidationRules.minLength && password.length < 12) {
    warnings.push('Consider using 12+ characters for better security');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    checks,
  };
}