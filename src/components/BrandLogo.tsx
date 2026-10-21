import type { ImgHTMLAttributes } from 'react';

type LogoTheme = 'navy' | 'blue' | 'white';
type LogoVariant = 'lockup' | 'emblem';

interface BrandLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  theme?: LogoTheme;
  variant?: LogoVariant;
  alt?: string;
}

const LOCKUPS: Record<LogoTheme, string> = {
  navy: '/assets/lbsaa-logo-navy.png',
  blue: '/assets/lbsaa-logo-blue.png',
  white: '/assets/lbsaa-logo-white.png',
};

const EMBLEMS: Record<LogoTheme, string> = {
  navy: '/assets/lbsaa-emblem-navy.png',
  blue: '/assets/lbsaa-emblem-blue.png',
  white: '/assets/lbsaa-emblem-white.png',
};

export function BrandLogo({
  theme = 'navy',
  variant = 'lockup',
  alt = 'Lagos Business School Alumni Association logo',
  className,
  ...rest
}: BrandLogoProps) {
  const src = variant === 'lockup' ? LOCKUPS[theme] : EMBLEMS[theme];

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      decoding="async"
      {...rest}
    />
  );
}
