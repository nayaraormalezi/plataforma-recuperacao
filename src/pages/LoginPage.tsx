import { Lock } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CaixaConsorcioLogo } from '../components/ui/CaixaConsorcioLogo';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { user, login, isLoading } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-caixa-blue-700 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <CaixaConsorcioLogo variant="dark" height={48} className="mb-8" />
          <h1 className="text-3xl font-bold leading-tight">
            Recuperação de propostas
          </h1>
          <p className="mt-4 text-caixa-blue-100 text-lg leading-relaxed">
            Encontre propostas não concluídas e envie o link para o cliente
            continuar sua contratação.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <CaixaConsorcioLogo variant="light" height={40} className="mb-4" />
            <h1 className="text-xl font-bold text-neutral-900">
              Recuperação de propostas
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-neutral-900">
            Acessar plataforma
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Entre com suas credenciais corporativas para acessar a ferramenta.
          </p>

          <div className="mt-8">
            <Button
              fullWidth
              size="lg"
              onClick={login}
              loading={isLoading}
            >
              Entrar com SSO
            </Button>
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
            <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Acesso exclusivo para colaboradores autorizados.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
