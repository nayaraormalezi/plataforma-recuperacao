import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProposalDetailView } from '../components/proposal/ProposalDetailView';
import { Button } from '../components/ui/Button';
import { TableSkeleton } from '../components/ui/EmptyState';
import { useAuth } from '../context/AuthContext';
import { registerConsultation } from '../services/consultations';
import { getProposalById } from '../services/proposals';
import type { Proposal } from '../types';

export function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProposalById(id).then((p) => {
      setProposal(p);
      setLoading(false);

      if (p && user) {
        registerConsultation(p, user.id, user.nome);
      }
    });
  }, [id, user]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <TableSkeleton />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h2 className="text-xl font-semibold text-neutral-900">Proposta não encontrada</h2>
        <p className="mt-2 text-neutral-600">
          Não foi possível localizar a proposta solicitada.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Voltar para busca</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para busca
          </Link>
        </div>
      </div>

      <ProposalDetailView proposal={proposal} />
    </div>
  );
}
