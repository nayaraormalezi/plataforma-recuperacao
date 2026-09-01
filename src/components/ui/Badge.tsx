import type { ProposalStatus, QueueStatus } from '../../types';
import { getStatusLabel } from '../../utils/format';

interface BadgeProps {
  status: ProposalStatus | QueueStatus | 'sucesso' | 'erro' | 'pendente' | 'cancelada' | 'ativa';
}

const statusStyles: Record<string, string> = {
  nao_concluida: 'bg-warning-50 text-warning-700 border-warning-500/30',
  link_enviado: 'bg-info-50 text-info-500 border-info-500/30',
  expirada: 'bg-neutral-100 text-neutral-600 border-neutral-300',
  indisponivel: 'bg-error-50 text-error-500 border-error-500/30',
  cancelada: 'bg-error-50 text-error-700 border-error-500/30',
  ativa: 'bg-success-50 text-success-700 border-success-500/30',
  sucesso: 'bg-success-50 text-success-700 border-success-500/30',
  erro: 'bg-error-50 text-error-500 border-error-500/30',
  pendente: 'bg-warning-50 text-warning-700 border-warning-500/30',
  na_fila: 'bg-neutral-100 text-neutral-700 border-neutral-300',
  enviando: 'bg-info-50 text-info-500 border-info-500/30',
  concluido: 'bg-success-50 text-success-700 border-success-500/30',
  falhou: 'bg-error-50 text-error-500 border-error-500/30',
};

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full border px-2.5 py-0.5
        text-xs font-medium
        ${statusStyles[status] ?? 'bg-neutral-100 text-neutral-600'}
      `}
    >
      {getStatusLabel(status)}
    </span>
  );
}
