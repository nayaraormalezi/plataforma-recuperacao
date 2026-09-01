import { Search } from 'lucide-react';
import { Button } from '../ui/Button';

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchForm({ value, onChange, onSearch, loading }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !loading) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3" role="search">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite CPF, número da proposta ou nome"
          aria-label="Buscar proposta por CPF, número ou nome"
          className="h-12 w-full rounded-md border border-neutral-300 bg-white pl-10 pr-4 text-sm placeholder:text-neutral-500 focus:border-caixa-blue-500 focus:ring-1 focus:ring-caixa-blue-500"
          disabled={loading}
        />
      </div>
      <Button type="submit" size="lg" loading={loading} disabled={!value.trim()}>
        Buscar
      </Button>
    </form>
  );
}
