import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-caixa-blue-50 text-caixa-blue-500">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-neutral-600">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-200 ${className}`}
      aria-hidden="true"
    />
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-3" aria-label="Carregando resultados">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
