import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProposalTable } from '../components/proposal/ProposalTable';
import { TableSkeleton } from '../components/ui/EmptyState';
import { getConsultationHistory } from '../services/consultations';
import { consultationToTableRow, type ProposalTableRow } from '../utils/proposal';

export function HistoryPage() {
  const [rows, setRows] = useState<ProposalTableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConsultationHistory().then((data) => {
      setRows(data.map(consultationToTableRow));
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para busca
        </Link>
        <h1 className="text-2xl font-semibold text-neutral-900">Últimas consultas</h1>
        <p className="mt-1 text-neutral-600">
          Histórico das propostas consultadas recentemente.
        </p>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : rows.length === 0 ? (
        <p className="text-center text-neutral-500 py-12">
          Nenhuma consulta registrada ainda.
        </p>
      ) : (
        <ProposalTable
          rows={rows}
          variant="consultation"
          ariaLabel="Histórico de consultas"
        />
      )}
    </div>
  );
}
