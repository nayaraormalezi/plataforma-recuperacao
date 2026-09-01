import { SearchX } from 'lucide-react';
import type { Proposal } from '../../types';
import { formatDate, maskCpf, maskEmail } from '../../utils/format';
import { canShowRecoveryLink } from '../../utils/proposalLink';
import { Card, InfoRow } from '../ui/Card';
import { SendProposalSection } from './SendProposalSection';

interface ProposalDetailViewProps {
  proposal: Proposal;
}

export function ProposalDetailView({ proposal }: ProposalDetailViewProps) {
  const { cliente } = proposal;
  const canSend = canShowRecoveryLink(proposal.status);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm text-neutral-500 font-mono">Proposta nº {proposal.numero}</p>
        <h1 className="mt-1 text-2xl font-semibold text-neutral-900">{cliente.nome}</h1>
        <p className="mt-1 text-sm text-neutral-600">CPF: {maskCpf(cliente.cpf)}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <Card title="Cliente">
          <dl className="space-y-3">
            <InfoRow label="Nome" value={cliente.nome} />
            <InfoRow label="CPF" value={maskCpf(cliente.cpf)} />
            <InfoRow label="E-mail" value={cliente.email ? maskEmail(cliente.email) : '—'} />
            {cliente.telefone && (
              <InfoRow label="Telefone" value={cliente.telefone} />
            )}
          </dl>
        </Card>

        <Card title="Proposta">
          <dl className="space-y-3">
            <InfoRow label="Número" value={<span className="font-mono">{proposal.numero}</span>} />
            <InfoRow label="Produto" value={proposal.produto} />
            {proposal.grupoCota && (
              <InfoRow label="Grupo/Cota" value={proposal.grupoCota} />
            )}
            <InfoRow label="Criada em" value={formatDate(proposal.dataCriacao)} />
            <InfoRow label="Atualizada em" value={formatDate(proposal.ultimaAtualizacao)} />
          </dl>
        </Card>
      </div>

      {canSend ? (
        <SendProposalSection proposal={proposal} />
      ) : (
        <Card>
          <div className="flex items-center gap-3 text-neutral-600">
            <SearchX className="h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm">
                Esta proposta não está disponível para envio.
              </p>
              {proposal.motivoIndisponivel && (
                <p className="mt-1 text-sm text-error-500">{proposal.motivoIndisponivel}</p>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
