import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-white shadow-sm ${className}`}
    >
      {title && (
        <div className="border-b border-neutral-200 px-6 py-4">
          <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
            {title}
          </h3>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: ReactNode;
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="text-sm text-neutral-500 sm:w-40 shrink-0">{label}</dt>
      <dd className="text-sm font-medium text-neutral-900">{value}</dd>
    </div>
  );
}
