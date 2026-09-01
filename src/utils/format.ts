export function maskCpf(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return cpf;
  return `***.***.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    nao_concluida: 'Não concluída',
    link_enviado: 'Link enviado',
    expirada: 'Expirada',
    indisponivel: 'Indisponível',
    cancelada: 'Cancelada',
    ativa: 'Ativa',
    na_fila: 'Na fila',
    enviando: 'Enviando',
    concluido: 'Concluído',
    falhou: 'Falha no envio',
  };
  return labels[status] ?? status;
}

export function detectSearchType(query: string): 'cpf' | 'numero' | 'nome' {
  const digits = query.replace(/\D/g, '');
  if (digits.length === 11) return 'cpf';
  if (/^\d{6,}$/.test(query.replace(/\s/g, ''))) return 'numero';
  return 'nome';
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
