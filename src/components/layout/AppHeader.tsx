import { History, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { CaixaConsorcioLogo } from '../ui/CaixaConsorcioLogo';

export function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Ir para busca">
            <CaixaConsorcioLogo variant="light" height={32} />
            <p className="hidden sm:block text-xs text-neutral-500 leading-tight border-l border-neutral-200 pl-3">
              Recuperação de proposta
            </p>
          </Link>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Navegação principal">
          <Link
            to="/historico"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <History className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Últimas consultas</span>
          </Link>

          {user && (
            <div className="flex items-center gap-3 border-l border-neutral-200 pl-3 sm:pl-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                <div>
                  <p className="font-medium text-neutral-900 leading-tight">{user.nome}</p>
                  <p className="text-xs text-neutral-500 leading-tight">{user.matricula}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                aria-label="Sair do sistema"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
