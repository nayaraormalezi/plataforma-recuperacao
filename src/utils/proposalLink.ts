export function getProposalRecoveryLink(numero: string): string {
  return `https://contratacao.caixaconsorcio.com.br/continuar/${numero}`;
}

export function canShowRecoveryLink(status: string): boolean {
  return status === 'nao_concluida' || status === 'link_enviado';
}
