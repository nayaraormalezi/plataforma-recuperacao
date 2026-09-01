# Plataforma de Recuperação de Propostas — CAIXA Consórcio

Ferramenta operacional interna para a Central de Atendimento localizar propostas de consórcio não concluídas e enviar o link de continuidade ao cliente por e-mail.

## Jornada principal

**Login SSO → Buscar cliente/proposta → Visualizar proposta → Copiar link → Enviar ao cliente**

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (tokens CAIXA Consórcio)
- React Router v7
- Lucide React (ícones)

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

## Dados mockados para teste

### Fluxo feliz (envio de link)

| Busca | Cliente | Proposta |
|-------|---------|----------|
| `11111111111` | Lucas Mendes Ferreira | 44556677 |
| `22222222222` | Patrícia Gomes Rocha | 55667799 |
| `33333333333` | Ricardo Souza Barbosa | 66778800 |
| `88888888888` | Camila Rodrigues Azevedo | 30334455 |
| `99999999999` | Eduardo Nascimento Filho | 40445566 |
| `13131313131` | Amanda Vieira Duarte | 70778899 (elegível) |

### Múltiplos resultados

| Busca | Resultado |
|-------|-----------|
| `Silva` | João, Mariana e Pedro (3 propostas) |
| `Santos` | Maria, Juliana e Gabriel (3 propostas) |
| `12345678901` | João da Silva (2 propostas elegíveis) |
| `Amanda` | Amanda Duarte (2 propostas) |

### Cenários de erro / bloqueio

| Busca | Cenário |
|-------|---------|
| `55667788` | Ana Paula Costa — sem e-mail cadastrado |
| `11223344` | Carlos Eduardo — proposta expirada |
| `99887766` | Roberto Almeida — proposta cancelada |
| `80889900` | Amanda Duarte — proposta expirada (2ª proposta) |
| `xyz` | Nenhum resultado encontrado |

## Estrutura

```
src/
├── components/
│   ├── ui/          # Button, Input, Modal, Badge, Card, EmptyState
│   ├── layout/      # AppHeader, AppLayout, ProtectedRoute
│   ├── search/      # SearchForm, ProposalTable
│   └── proposal/    # ProposalDetailView
├── pages/           # Login, Search, ProposalDetail, History
├── services/        # auth, proposals, dispatch (mocks)
├── mocks/           # Dados fictícios
├── context/         # AuthContext
├── types/           # Interfaces TypeScript
└── utils/           # Formatação e máscaras
```

## Design System

Tokens visuais baseados na identidade CAIXA Consórcio (azul `#005CA9`, laranja `#F39200`), alinhados ao DSC referenciado no Figma.
