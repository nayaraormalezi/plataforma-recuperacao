import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`
            h-10 w-full rounded-md border bg-white px-3 text-sm text-neutral-900
            placeholder:text-neutral-500
            transition-colors duration-150
            focus:border-caixa-blue-500 focus:ring-1 focus:ring-caixa-blue-500
            disabled:bg-neutral-100 disabled:cursor-not-allowed
            ${error ? 'border-error-500' : 'border-neutral-300'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
