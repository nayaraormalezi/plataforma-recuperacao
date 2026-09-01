import type { ConsultationRecord, ProductType, Proposal, ProposalStatus } from '../types';

export function isProposalVencida(dataVencimento: string): boolean {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const vencimento = new Date(dataVencimento);
  vencimento.setHours(0, 0, 0, 0);
  return vencimento < hoje;
}

export function getProposalSituacao(row: {
  dataVencimento: string;
  status: ProposalStatus;
}): 'ativa' | 'cancelada' {
  return isProposalCancelada(row) ? 'cancelada' : 'ativa';
}

export function isProposalCancelada(proposal: {
  dataVencimento: string;
  status: ProposalStatus;
}): boolean {
  return (
    isProposalVencida(proposal.dataVencimento) ||
    proposal.status === 'expirada' ||
    proposal.status === 'indisponivel'
  );
}

export function enrichProposal(proposal: Proposal): Proposal {
  if (proposal.dataVencimento) return proposal;

  const criacao = new Date(proposal.dataCriacao);
  const vencimento = new Date(criacao);
  vencimento.setDate(vencimento.getDate() + 30);

  if (proposal.status === 'expirada' || proposal.status === 'indisponivel') {
    vencimento.setMonth(vencimento.getMonth() - 2);
  }

  return { ...proposal, dataVencimento: vencimento.toISOString() };
}

export interface ProposalTableRow {
  id: string;
  clienteNome: string;
  cpf: string;
  numeroProposta: string;
  produto: ProductType;
  dataCriacao: string;
  dataVencimento: string;
  status: ProposalStatus;
}

export function toTableRow(proposal: Proposal): ProposalTableRow {
  const enriched = enrichProposal(proposal);
  return {
    id: enriched.id,
    clienteNome: enriched.cliente.nome,
    cpf: enriched.cliente.cpf,
    numeroProposta: enriched.numero,
    produto: enriched.produto,
    dataCriacao: enriched.dataCriacao,
    dataVencimento: enriched.dataVencimento!,
    status: enriched.status,
  };
}

export function consultationToTableRow(record: ConsultationRecord): ProposalTableRow {
  return {
    id: record.propostaId,
    clienteNome: record.clienteNome,
    cpf: record.cpf,
    numeroProposta: record.numeroProposta,
    produto: record.produto,
    dataCriacao: record.dataCriacao,
    dataVencimento: record.dataVencimento,
    status: record.status,
  };
}
