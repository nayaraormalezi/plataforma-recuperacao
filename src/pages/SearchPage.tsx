import { FileSearch, SearchX } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ProposalTable } from '../components/proposal/ProposalTable';
import { SearchForm } from '../components/search/SearchComponents';
import { Button } from '../components/ui/Button';
import { EmptyState, TableSkeleton } from '../components/ui/EmptyState';
import { searchProposals } from '../services/proposals';
import type { Proposal, SearchState } from '../types';
import { toTableRow } from '../utils/proposal';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [results, setResults] = useState<Proposal[]>([]);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setSearchState('loading');
    try {
      const proposals = await searchProposals(query);
      setResults(proposals);
      setSearchState(proposals.length > 0 ? 'results' : 'empty');
    } catch {
      setSearchState('error');
    }
  }, [query]);

  const handleNewSearch = () => {
    setQuery('');
    setResults([]);
    setSearchState('idle');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Recuperar proposta</h1>
        <p className="mt-1 text-neutral-600">
          Busque uma proposta não concluída para obter o link de continuidade ao cliente.
        </p>
      </div>

      <SearchForm
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        loading={searchState === 'loading'}
      />

      <div className="mt-8">
        {searchState === 'idle' && (
          <EmptyState
            icon={<FileSearch className="h-8 w-8" />}
            title="Encontre uma proposta para continuar o atendimento"
            description="Digite o CPF, número da proposta ou nome do cliente para começar."
          />
        )}

        {searchState === 'loading' && <TableSkeleton />}

        {searchState === 'empty' && (
          <EmptyState
            icon={<SearchX className="h-8 w-8" />}
            title="Nenhuma proposta encontrada"
            description="Não encontramos propostas para os dados informados. Verifique as informações e tente novamente."
            action={
              <Button variant="secondary" onClick={handleNewSearch}>
                Nova busca
              </Button>
            }
          />
        )}

        {searchState === 'results' && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Propostas encontradas
                </h2>
                <p className="text-sm text-neutral-500">
                  {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </p>
              </div>
            </div>
            <ProposalTable
              rows={results.map(toTableRow)}
              variant="search"
              ariaLabel="Propostas encontradas"
            />
          </div>
        )}

        {searchState === 'error' && (
          <EmptyState
            icon={<SearchX className="h-8 w-8" />}
            title="Erro na busca"
            description="Ocorreu um erro ao buscar propostas. Tente novamente."
            action={
              <Button onClick={handleSearch}>Tentar novamente</Button>
            }
          />
        )}
      </div>
    </div>
  );
}
