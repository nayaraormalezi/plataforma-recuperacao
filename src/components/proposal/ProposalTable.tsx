import { useNavigate } from 'react-router-dom';
import { formatDate, maskCpf } from '../../utils/format';
import { getProposalSituacao, isProposalCancelada, type ProposalTableRow } from '../../utils/proposal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProposalTableProps {
  rows: ProposalTableRow[];
  variant?: 'search' | 'consultation';
  ariaLabel?: string;
}

export function ProposalTable({
  rows,
  variant = 'search',
  ariaLabel = 'Propostas',
}: ProposalTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm">
      <table className="w-full text-sm" aria-label={ariaLabel}>
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th scope="col" className="px-4 py-3 text-left font-medium text-neutral-600 whitespace-nowrap">
              Cliente
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium text-neutral-600 whitespace-nowrap">
              CPF
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium text-neutral-600 whitespace-nowrap">
              Proposta
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium text-neutral-600 whitespace-nowrap">
              Produto
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium text-neutral-600 whitespace-nowrap">
              Data da criação
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium text-neutral-600 whitespace-nowrap">
              Data de vencimento
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium text-neutral-600 whitespace-nowrap">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium text-neutral-600 whitespace-nowrap">
              Ação
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {rows.map((row) => {
            const cancelada = isProposalCancelada(row);
            const situacao = getProposalSituacao(row);

            return (
              <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3 font-medium text-neutral-900 whitespace-nowrap">
                  {row.clienteNome}
                </td>
                <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
                  {maskCpf(row.cpf)}
                </td>
                <td className="px-4 py-3 text-neutral-600 font-mono text-xs whitespace-nowrap">
                  {row.numeroProposta}
                </td>
                <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
                  {row.produto}
                </td>
                <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
                  {formatDate(row.dataCriacao)}
                </td>
                <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
                  {formatDate(row.dataVencimento)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Badge status={situacao} />
                </td>
                <td className="px-4 py-3 text-right">
                  {variant === 'consultation' && cancelada ? (
                    <span className="text-xs text-neutral-500 max-w-[160px] inline-block text-right">
                      Não é possível reenviar o link
                    </span>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/proposta/${row.id}`)}
                    >
                      Ver proposta
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
