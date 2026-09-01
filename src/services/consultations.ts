import type { ConsultationRecord, Proposal } from '../types';
import { delay } from '../utils/format';
import { enrichProposal } from '../utils/proposal';
import { mockConsultationHistory } from '../mocks/consultationHistory';

let consultationHistory: ConsultationRecord[] = [...mockConsultationHistory];

export async function registerConsultation(
  proposal: Proposal,
  usuarioId: string,
  usuarioNome: string,
): Promise<ConsultationRecord> {
  const enriched = enrichProposal(proposal);

  const record: ConsultationRecord = {
    id: `cons-${Date.now()}`,
    propostaId: enriched.id,
    numeroProposta: enriched.numero,
    clienteNome: enriched.cliente.nome,
    cpf: enriched.cliente.cpf,
    produto: enriched.produto,
    dataCriacao: enriched.dataCriacao,
    dataVencimento: enriched.dataVencimento!,
    status: enriched.status,
    dataHora: new Date().toISOString(),
    usuarioId,
    usuarioNome,
  };

  consultationHistory = [record, ...consultationHistory];
  return record;
}

export async function getConsultationHistory(): Promise<ConsultationRecord[]> {
  await delay(500);
  return [...consultationHistory];
}
