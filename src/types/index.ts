export type UserRole = 'atendente' | 'supervisor' | 'admin';

export interface User {
  id: string;
  nome: string;
  matricula: string;
  perfil: UserRole;
  unidade: string;
}

export type ProposalStatus =
  | 'nao_concluida'
  | 'link_enviado'
  | 'expirada'
  | 'indisponivel';

export type ProductType = 'Imobiliário' | 'Veículos Leves' | 'Veículos Pesados';

export interface Proposal {
  id: string;
  numero: string;
  cliente: {
    nome: string;
    cpf: string;
    email: string;
    telefone?: string;
  };
  produto: ProductType;
  grupoCota?: string;
  dataCriacao: string;
  dataVencimento?: string;
  ultimaAtualizacao: string;
  status: ProposalStatus;
  elegivelParaEnvio: boolean;
  motivoIndisponivel?: string;
}

export type ConsultationRecord = {
  id: string;
  propostaId: string;
  numeroProposta: string;
  clienteNome: string;
  cpf: string;
  produto: ProductType;
  dataCriacao: string;
  dataVencimento: string;
  status: ProposalStatus;
  dataHora: string;
  usuarioId: string;
  usuarioNome: string;
};

/** @deprecated use ConsultationRecord */
export type DispatchRecord = ConsultationRecord;

export type SearchState = 'idle' | 'loading' | 'results' | 'empty' | 'error';

export type DispatchChannel = 'email' | 'sms' | 'whatsapp';

export type QueueStatus = 'na_fila' | 'enviando' | 'concluido' | 'falhou';

export interface ChannelDispatchItem {
  channel: DispatchChannel;
  status: QueueStatus;
  destino: string;
  atualizadoEm: string;
  mensagemErro?: string;
}

export interface DispatchQueue {
  id: string;
  propostaId: string;
  canais: ChannelDispatchItem[];
  criadoEm: string;
}
