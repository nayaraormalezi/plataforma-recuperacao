import {
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  Smartphone,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { DispatchChannel, DispatchQueue, Proposal } from '../../types';
import {
  enqueueProposalDispatch,
  getActiveQueue,
  isChannelAvailable,
  subscribeToQueue,
} from '../../services/dispatch';
import { maskEmail } from '../../utils/format';
import { getChannelLabel } from '../../utils/dispatch';
import { getProposalRecoveryLink } from '../../utils/proposalLink';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const CHANNELS: {
  id: DispatchChannel;
  label: string;
  icon: typeof Mail;
}[] = [
  { id: 'email', label: 'E-mail', icon: Mail },
  { id: 'sms', label: 'SMS', icon: Smartphone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
];

interface SendProposalSectionProps {
  proposal: Proposal;
}

export function SendProposalSection({ proposal }: SendProposalSectionProps) {
  const [selected, setSelected] = useState<DispatchChannel[]>([]);
  const [queue, setQueue] = useState<DispatchQueue | null>(null);
  const [isEnqueueing, setIsEnqueueing] = useState(false);
  const [copied, setCopied] = useState(false);

  const recoveryLink = getProposalRecoveryLink(proposal.numero);
  const isDispatching = queue?.canais.some(
    (c) => c.status === 'na_fila' || c.status === 'enviando',
  );

  useEffect(() => {
    const active = getActiveQueue(proposal.id);
    if (active) setQueue(active);
  }, [proposal.id]);

  useEffect(() => {
    if (!queue) return;
    return subscribeToQueue(queue.id, setQueue);
  }, [queue?.id]);

  const toggleChannel = (channel: DispatchChannel) => {
    setSelected((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel],
    );
  };

  const handleSend = useCallback(async () => {
    if (selected.length === 0 || isEnqueueing) return;
    setIsEnqueueing(true);
    try {
      const newQueue = await enqueueProposalDispatch(proposal, selected);
      setQueue(newQueue);
      setSelected([]);
    } finally {
      setIsEnqueueing(false);
    }
  }, [proposal, selected, isEnqueueing]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(recoveryLink);
    } catch {
      const input = document.createElement('input');
      input.value = recoveryLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4">
      <Card className="border-caixa-blue-200 bg-caixa-blue-50/30">
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">Enviar proposta</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Selecione um ou mais canais para enfileirar o envio ao cliente.
            </p>
          </div>

          <fieldset>
            <legend className="sr-only">Canais de envio</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {CHANNELS.map(({ id, label, icon: Icon }) => {
                const available = isChannelAvailable(id, proposal);
                const checked = selected.includes(id);

                return (
                  <label
                    key={id}
                    className={`
                      flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors
                      ${!available ? 'cursor-not-allowed opacity-50 border-neutral-200 bg-neutral-50' : ''}
                      ${available && checked ? 'border-caixa-blue-500 bg-white ring-1 ring-caixa-blue-500' : ''}
                      ${available && !checked ? 'border-neutral-200 bg-white hover:border-caixa-blue-300' : ''}
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!available || isDispatching}
                      onChange={() => toggleChannel(id)}
                      className="h-4 w-4 rounded border-neutral-300 text-caixa-blue-500 focus:ring-caixa-blue-500"
                    />
                    <Icon className="h-4 w-4 text-neutral-500 shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-900">{label}</p>
                      <p className="text-xs text-neutral-500 truncate">
                        {!available
                          ? 'Indisponível'
                          : id === 'email'
                            ? maskEmail(proposal.cliente.email)
                            : proposal.cliente.telefone}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <Button
            onClick={handleSend}
            loading={isEnqueueing}
            disabled={selected.length === 0 || !!isDispatching}
            size="lg"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Enviar proposta
          </Button>

          {queue && (
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <h4 className="text-sm font-semibold text-neutral-900 mb-3">
                Status do envio
              </h4>
              <ul className="space-y-3" aria-label="Status dos canais enfileirados">
                {queue.canais.map((item) => (
                  <li
                    key={item.channel}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {item.status === 'enviando' && (
                        <Loader2 className="h-4 w-4 animate-spin text-caixa-blue-500 shrink-0" aria-hidden="true" />
                      )}
                      {item.status === 'concluido' && (
                        <CheckCircle2 className="h-4 w-4 text-success-500 shrink-0" aria-hidden="true" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-900">
                          {getChannelLabel(item.channel)}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {item.destino}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <Badge status={item.status} />
                      {item.mensagemErro && (
                        <p className="mt-1 text-xs text-error-500 max-w-[140px]">
                          {item.mensagemErro}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              Ou copie o código da proposta
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              Compartilhe manualmente o link de continuidade com o cliente.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={recoveryLink}
              aria-label="Código da proposta para copiar"
              className="h-10 flex-1 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm font-mono text-neutral-700 select-all"
              onFocus={(e) => e.target.select()}
            />
            <Button
              variant={copied ? 'secondary' : 'ghost'}
              onClick={handleCopyCode}
              className="shrink-0"
              aria-label={copied ? 'Código copiado' : 'Copiar código da proposta'}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copiar
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
