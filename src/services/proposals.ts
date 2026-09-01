import { mockProposals } from '../mocks/proposals';
import type { Proposal } from '../types';
import { delay, detectSearchType } from '../utils/format';
import { enrichProposal } from '../utils/proposal';

export async function searchProposals(query: string): Promise<Proposal[]> {
  await delay(800);

  const trimmed = query.trim();
  if (!trimmed) return [];

  const searchType = detectSearchType(trimmed);

  return mockProposals
    .filter((proposal) => {
      switch (searchType) {
        case 'cpf': {
          const digits = trimmed.replace(/\D/g, '');
          return proposal.cliente.cpf.includes(digits);
        }
        case 'numero':
          return proposal.numero.includes(trimmed.replace(/\s/g, ''));
        case 'nome':
          return proposal.cliente.nome
            .toLowerCase()
            .includes(trimmed.toLowerCase());
        default:
          return false;
      }
    })
    .map(enrichProposal);
}

export async function getProposalById(id: string): Promise<Proposal | null> {
  await delay(400);
  const proposal = mockProposals.find((p) => p.id === id);
  return proposal ? enrichProposal(proposal) : null;
}
