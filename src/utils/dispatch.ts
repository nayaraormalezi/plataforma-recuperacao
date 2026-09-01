export const CHANNEL_LABELS: Record<string, string> = {
  email: 'E-mail',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
};

export function getChannelLabel(channel: string): string {
  return CHANNEL_LABELS[channel] ?? channel;
}
