import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-caixa-blue-500 text-white hover:bg-caixa-blue-600 active:bg-caixa-blue-700 disabled:bg-neutral-300',
  secondary:
    'bg-white text-caixa-blue-500 border border-caixa-blue-500 hover:bg-caixa-blue-50 active:bg-caixa-blue-100 disabled:border-neutral-300 disabled:text-neutral-400',
  ghost:
    'bg-transparent text-caixa-blue-500 hover:bg-caixa-blue-50 active:bg-caixa-blue-100',
  danger:
    'bg-error-500 text-white hover:bg-error-700 active:bg-error-700 disabled:bg-neutral-300',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 rounded-md font-medium
          transition-colors duration-150 cursor-pointer
          disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
