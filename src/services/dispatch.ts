import type {
  ChannelDispatchItem,
  DispatchChannel,
  DispatchQueue,
  Proposal,
  QueueStatus,
} from '../types';
import { delay } from '../utils/format';

const queues = new Map<string, DispatchQueue>();
const listeners = new Map<string, Set<(queue: DispatchQueue) => void>>();

function getDestino(channel: DispatchChannel, proposal: Proposal): string | null {
  switch (channel) {
    case 'email':
      return proposal.cliente.email || null;
    case 'sms':
    case 'whatsapp':
      return proposal.cliente.telefone || null;
    default:
      return null;
  }
}

function notify(queueId: string) {
  const queue = queues.get(queueId);
  if (!queue) return;
  listeners.get(queueId)?.forEach((cb) => cb({ ...queue, canais: [...queue.canais] }));
}

async function simulateChannelProgress(
  queueId: string,
  channel: DispatchChannel,
) {
  const updateStatus = (status: QueueStatus, mensagemErro?: string) => {
    const queue = queues.get(queueId);
    if (!queue) return;
    const item = queue.canais.find((c) => c.channel === channel);
    if (!item) return;
    item.status = status;
    item.atualizadoEm = new Date().toISOString();
    if (mensagemErro) item.mensagemErro = mensagemErro;
    notify(queueId);
  };

  await delay(800 + Math.random() * 600);
  updateStatus('enviando');

  await delay(1200 + Math.random() * 800);

  if (Math.random() < 0.08) {
    updateStatus('falhou', 'Não foi possível concluir o envio neste canal.');
    return;
  }

  updateStatus('concluido');
}

export async function enqueueProposalDispatch(
  proposal: Proposal,
  channels: DispatchChannel[],
): Promise<DispatchQueue> {
  await delay(400);

  const canais: ChannelDispatchItem[] = channels.map((channel) => ({
    channel,
    status: 'na_fila' as QueueStatus,
    destino: getDestino(channel, proposal) ?? '—',
    atualizadoEm: new Date().toISOString(),
  }));

  const queue: DispatchQueue = {
    id: `queue-${Date.now()}`,
    propostaId: proposal.id,
    canais,
    criadoEm: new Date().toISOString(),
  };

  queues.set(queue.id, queue);
  notify(queue.id);

  canais.forEach((item) => {
    simulateChannelProgress(queue.id, item.channel);
  });

  return { ...queue, canais: [...queue.canais] };
}

export function getActiveQueue(propostaId: string): DispatchQueue | null {
  const all = [...queues.values()].filter((q) => q.propostaId === propostaId);
  if (all.length === 0) return null;
  return all.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))[0];
}

export function subscribeToQueue(
  queueId: string,
  callback: (queue: DispatchQueue) => void,
): () => void {
  if (!listeners.has(queueId)) listeners.set(queueId, new Set());
  listeners.get(queueId)!.add(callback);
  return () => listeners.get(queueId)?.delete(callback);
}

export function isChannelAvailable(
  channel: DispatchChannel,
  proposal: Proposal,
): boolean {
  return getDestino(channel, proposal) !== null;
}
