import type { Proposal } from '../types';

/**
 * Base mockada para simulação da jornada de recuperação.
 *
 * Cenários cobertos:
 * - Proposta elegível para envio (fluxo feliz)
 * - Múltiplas propostas do mesmo cliente (CPF)
 * - Múltiplos resultados por nome (ex.: "Silva", "Santos")
 * - Link já enviado
 * - Proposta expirada
 * - Proposta cancelada/indisponível
 * - Cliente sem e-mail cadastrado
 */
export const mockProposals: Proposal[] = [
  // ── João da Silva — 2 propostas (testar busca por CPF e múltiplos resultados) ──
  {
    id: 'prop-001',
    numero: '12345678',
    cliente: {
      nome: 'João da Silva',
      cpf: '12345678901',
      email: 'joao.silva@gmail.com',
      telefone: '(11) 98765-4321',
    },
    produto: 'Veículos Leves',
    grupoCota: 'Grupo 1234 / Cota 56',
    dataCriacao: '2026-09-01T10:30:00',
    ultimaAtualizacao: '2026-09-01T14:22:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },
  {
    id: 'prop-007',
    numero: '77889900',
    cliente: {
      nome: 'João da Silva',
      cpf: '12345678901',
      email: 'joao.silva@gmail.com',
      telefone: '(11) 98765-4321',
    },
    produto: 'Imobiliário',
    grupoCota: 'Grupo 7890 / Cota 03',
    dataCriacao: '2026-07-10T13:00:00',
    ultimaAtualizacao: '2026-07-12T10:00:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // ── Maria Oliveira Santos — link já enviado ──
  {
    id: 'prop-002',
    numero: '87654321',
    cliente: {
      nome: 'Maria Oliveira Santos',
      cpf: '98765432100',
      email: 'maria.oliveira@outlook.com',
      telefone: '(21) 99876-5432',
    },
    produto: 'Imobiliário',
    grupoCota: 'Grupo 5678 / Cota 12',
    dataCriacao: '2026-08-28T09:15:00',
    ultimaAtualizacao: '2026-08-30T16:45:00',
    status: 'link_enviado',
    elegivelParaEnvio: true,
  },

  // ── Carlos Eduardo — expirada ──
  {
    id: 'prop-003',
    numero: '11223344',
    cliente: {
      nome: 'Carlos Eduardo Pereira',
      cpf: '45678912345',
      email: 'carlos.pereira@yahoo.com',
      telefone: '(11) 91234-5678',
    },
    produto: 'Veículos Leves',
    dataCriacao: '2026-07-15T11:00:00',
    ultimaAtualizacao: '2026-07-20T08:30:00',
    status: 'expirada',
    elegivelParaEnvio: false,
    motivoIndisponivel: 'Proposta expirada após 30 dias sem conclusão.',
  },

  // ── Ana Paula — sem e-mail (erro de envio) ──
  {
    id: 'prop-004',
    numero: '55667788',
    cliente: {
      nome: 'Ana Paula Costa',
      cpf: '32165498700',
      email: '',
      telefone: '(31) 97654-3210',
    },
    produto: 'Veículos Leves',
    dataCriacao: '2026-08-25T14:20:00',
    ultimaAtualizacao: '2026-08-25T14:20:00',
    status: 'nao_concluida',
    elegivelParaEnvio: false,
    motivoIndisponivel: 'E-mail não cadastrado na proposta.',
  },

  // ── Roberto — cancelada ──
  {
    id: 'prop-005',
    numero: '99887766',
    cliente: {
      nome: 'Roberto Almeida',
      cpf: '78912345600',
      email: 'roberto.almeida@hotmail.com',
      telefone: '(41) 99123-4567',
    },
    produto: 'Veículos Pesados',
    grupoCota: 'Grupo 9012 / Cota 34',
    dataCriacao: '2026-08-30T16:00:00',
    ultimaAtualizacao: '2026-09-01T09:10:00',
    status: 'indisponivel',
    elegivelParaEnvio: false,
    motivoIndisponivel: 'Proposta cancelada pelo cliente.',
  },

  // ── Fernanda Lima — elegível (fluxo feliz rápido) ──
  {
    id: 'prop-006',
    numero: '33445566',
    cliente: {
      nome: 'Fernanda Lima',
      cpf: '65432198700',
      email: 'fernanda.lima@gmail.com',
      telefone: '(51) 98888-7777',
    },
    produto: 'Imobiliário',
    grupoCota: 'Grupo 3456 / Cota 78',
    dataCriacao: '2026-08-29T08:45:00',
    ultimaAtualizacao: '2026-08-31T11:30:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // ── Novos clientes para simulação ──

  // CPF fácil: 111.111.111-11 — fluxo feliz imediato
  {
    id: 'prop-008',
    numero: '44556677',
    cliente: {
      nome: 'Lucas Mendes Ferreira',
      cpf: '11111111111',
      email: 'lucas.mendes@uol.com.br',
      telefone: '(11) 99999-1111',
    },
    produto: 'Veículos Leves',
    grupoCota: 'Grupo 2100 / Cota 15',
    dataCriacao: '2026-09-01T08:00:00',
    ultimaAtualizacao: '2026-09-01T08:45:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // CPF fácil: 222.222.222-22
  {
    id: 'prop-009',
    numero: '55667799',
    cliente: {
      nome: 'Patrícia Gomes Rocha',
      cpf: '22222222222',
      email: 'patricia.gomes@empresa.com.br',
      telefone: '(21) 98888-2222',
    },
    produto: 'Imobiliário',
    grupoCota: 'Grupo 4100 / Cota 22',
    dataCriacao: '2026-08-31T15:30:00',
    ultimaAtualizacao: '2026-09-01T09:00:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // CPF fácil: 333.333.333-33 — serviços
  {
    id: 'prop-010',
    numero: '66778800',
    cliente: {
      nome: 'Ricardo Souza Barbosa',
      cpf: '33333333333',
      email: 'ricardo.souza@gmail.com',
      telefone: '(31) 97777-3333',
    },
    produto: 'Veículos Pesados',
    grupoCota: 'Grupo 5500 / Cota 08',
    dataCriacao: '2026-08-30T11:20:00',
    ultimaAtualizacao: '2026-08-31T16:10:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // Sobrenome Silva — múltiplos resultados ao buscar "Silva"
  {
    id: 'prop-011',
    numero: '88990011',
    cliente: {
      nome: 'Mariana Silva Costa',
      cpf: '44444444444',
      email: 'mariana.silva@icloud.com',
      telefone: '(41) 96666-4444',
    },
    produto: 'Veículos Leves',
    grupoCota: 'Grupo 6200 / Cota 41',
    dataCriacao: '2026-08-29T14:00:00',
    ultimaAtualizacao: '2026-08-30T10:30:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },
  {
    id: 'prop-012',
    numero: '99001122',
    cliente: {
      nome: 'Pedro Henrique Silva',
      cpf: '55555555555',
      email: 'pedro.silva@hotmail.com',
      telefone: '(51) 95555-5555',
    },
    produto: 'Veículos Leves',
    grupoCota: 'Grupo 7100 / Cota 19',
    dataCriacao: '2026-08-28T09:30:00',
    ultimaAtualizacao: '2026-08-29T17:00:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // Sobrenome Santos — múltiplos resultados ao buscar "Santos"
  {
    id: 'prop-013',
    numero: '10112233',
    cliente: {
      nome: 'Juliana Martins Santos',
      cpf: '66666666666',
      email: 'juliana.santos@yahoo.com.br',
      telefone: '(11) 94444-6666',
    },
    produto: 'Imobiliário',
    grupoCota: 'Grupo 8300 / Cota 07',
    dataCriacao: '2026-08-27T16:45:00',
    ultimaAtualizacao: '2026-08-28T11:20:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },
  {
    id: 'prop-014',
    numero: '20223344',
    cliente: {
      nome: 'Gabriel Santos Oliveira',
      cpf: '77777777777',
      email: 'gabriel.santos@outlook.com',
      telefone: '(21) 93333-7777',
    },
    produto: 'Veículos Leves',
    dataCriacao: '2026-08-26T10:15:00',
    ultimaAtualizacao: '2026-08-27T14:50:00',
    status: 'link_enviado',
    elegivelParaEnvio: true,
  },

  // CPF fácil: 888.888.888-88 — moto elegível
  {
    id: 'prop-015',
    numero: '30334455',
    cliente: {
      nome: 'Camila Rodrigues Azevedo',
      cpf: '88888888888',
      email: 'camila.azevedo@gmail.com',
      telefone: '(61) 92222-8888',
    },
    produto: 'Veículos Leves',
    grupoCota: 'Grupo 9400 / Cota 33',
    dataCriacao: '2026-09-01T07:30:00',
    ultimaAtualizacao: '2026-09-01T12:00:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // CPF fácil: 999.999.999-99 — imóvel de alto valor
  {
    id: 'prop-016',
    numero: '40445566',
    cliente: {
      nome: 'Eduardo Nascimento Filho',
      cpf: '99999999999',
      email: 'eduardo.nascimento@caixa.gov.br',
      telefone: '(71) 91111-9999',
    },
    produto: 'Imobiliário',
    grupoCota: 'Grupo 1050 / Cota 01',
    dataCriacao: '2026-08-31T18:00:00',
    ultimaAtualizacao: '2026-09-01T07:15:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // Busca por número de proposta específico
  {
    id: 'prop-017',
    numero: '50556677',
    cliente: {
      nome: 'Beatriz Carvalho Lima',
      cpf: '10101010101',
      email: 'beatriz.carvalho@terra.com.br',
      telefone: '(85) 90000-1010',
    },
    produto: 'Veículos Leves',
    grupoCota: 'Grupo 1160 / Cota 50',
    dataCriacao: '2026-08-30T13:40:00',
    ultimaAtualizacao: '2026-08-31T09:25:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // Cliente com nome incomum — testar busca parcial
  {
    id: 'prop-018',
    numero: '60667788',
    cliente: {
      nome: 'Thiago Augusto Moura',
      cpf: '12121212121',
      email: 'thiago.moura@proton.me',
      telefone: '(48) 98888-1212',
    },
    produto: 'Veículos Pesados',
    dataCriacao: '2026-08-29T11:00:00',
    ultimaAtualizacao: '2026-08-30T08:00:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // Proposta recente — simula atendimento em andamento
  {
    id: 'prop-019',
    numero: '70778899',
    cliente: {
      nome: 'Amanda Vieira Duarte',
      cpf: '13131313131',
      email: 'amanda.duarte@live.com',
      telefone: '(27) 97777-1313',
    },
    produto: 'Imobiliário',
    grupoCota: 'Grupo 1270 / Cota 62',
    dataCriacao: '2026-09-01T14:50:00',
    ultimaAtualizacao: '2026-09-01T15:10:00',
    status: 'nao_concluida',
    elegivelParaEnvio: true,
  },

  // Segunda proposta da Amanda — múltiplos resultados por CPF
  {
    id: 'prop-020',
    numero: '80889900',
    cliente: {
      nome: 'Amanda Vieira Duarte',
      cpf: '13131313131',
      email: 'amanda.duarte@live.com',
      telefone: '(27) 97777-1313',
    },
    produto: 'Veículos Leves',
    dataCriacao: '2026-07-05T10:00:00',
    ultimaAtualizacao: '2026-07-08T14:30:00',
    status: 'expirada',
    elegivelParaEnvio: false,
    motivoIndisponivel: 'Proposta expirada após 30 dias sem conclusão.',
  },
];

/** Referência rápida para testes manuais */
export const mockSearchHints = [
  { busca: '11111111111', descricao: 'Lucas Mendes — fluxo feliz imediato' },
  { busca: '22222222222', descricao: 'Patrícia Gomes — imóvel elegível' },
  { busca: '33333333333', descricao: 'Ricardo Souza — serviços elegível' },
  { busca: '13131313131', descricao: 'Amanda Duarte — 2 propostas (1 elegível, 1 expirada)' },
  { busca: '12345678901', descricao: 'João da Silva — 2 propostas elegíveis' },
  { busca: 'Silva', descricao: 'João, Mariana e Pedro — múltiplos resultados' },
  { busca: 'Santos', descricao: 'Maria, Juliana e Gabriel — múltiplos resultados' },
  { busca: 'Amanda', descricao: 'Amanda Vieira Duarte — 2 propostas' },
  { busca: '50556677', descricao: 'Beatriz Carvalho — busca por número' },
  { busca: '55667788', descricao: 'Ana Paula Costa — sem e-mail (erro)' },
  { busca: '11223344', descricao: 'Carlos Eduardo — proposta expirada' },
  { busca: '99887766', descricao: 'Roberto Almeida — proposta cancelada' },
  { busca: 'xyz', descricao: 'Nenhum resultado — estado vazio' },
];
