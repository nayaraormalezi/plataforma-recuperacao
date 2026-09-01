type LogoVariant = 'light' | 'dark';

interface CaixaConsorcioLogoProps {
  variant: LogoVariant;
  className?: string;
  height?: number;
}

const LOGO_SRC: Record<LogoVariant, string> = {
  light: '/assets/logo/caixa-consorcio-light.svg',
  dark: '/assets/logo/caixa-consorcio-dark.svg',
};

export function CaixaConsorcioLogo({
  variant,
  className = '',
  height = 40,
}: CaixaConsorcioLogoProps) {
  const width = Math.round((height / 116) * 250);

  return (
    <img
      src={LOGO_SRC[variant]}
      alt="CAIXA Consórcio"
      width={width}
      height={height}
      className={`block object-contain object-left ${className}`}
    />
  );
}
