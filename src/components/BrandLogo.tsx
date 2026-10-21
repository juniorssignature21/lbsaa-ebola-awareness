import type { ImgHTMLAttributes } from 'react';

type LogoTheme = 'navy' | 'blue' | 'white';
type LogoVariant = 'lockup' | 'emblem';

interface BrandLogoProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  theme?: LogoTheme;
  variant?: LogoVariant;
  alt?: string;
}

const LBSAA_LOCKUPS: Record<LogoTheme, string> = {
  navy: '/assets/lbsaa-logo-navy.png',
  blue: '/assets/lbsaa-logo-blue.png',
  white: '/assets/lbsaa-logo-white.png',
};

const LBSAA_EMBLEMS: Record<LogoTheme, string> = {
  navy: '/assets/lbsaa-emblem-navy.png',
  blue: '/assets/lbsaa-emblem-blue.png',
  white: '/assets/lbsaa-emblem-white.png',
};

const SCHOOL_LOCKUPS: Record<LogoTheme, string> = {
  navy: '/assets/lbs-school-logo-navy.png',
  blue: '/assets/lbs-school-logo-blue.png',
  white: '/assets/lbs-school-logo-white.png',
};

const SCHOOL_EMBLEMS: Record<LogoTheme, string> = {
  navy: '/assets/lbs-school-emblem-navy.png',
  blue: '/assets/lbs-school-emblem-blue.png',
  white: '/assets/lbs-school-emblem-white.png',
};

export function BrandLogo({
  theme = 'navy',
  variant = 'lockup',
  alt = 'Lagos Business School Alumni Association logo',
  className,
  ...rest
}: BrandLogoProps) {
  const src = variant === 'lockup' ? LBSAA_LOCKUPS[theme] : LBSAA_EMBLEMS[theme];

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

export function SchoolLogo({
  theme = 'navy',
  variant = 'lockup',
  alt = 'Lagos Business School, Pan-Atlantic University logo',
  className,
  ...rest
}: BrandLogoProps) {
  const src = variant === 'lockup' ? SCHOOL_LOCKUPS[theme] : SCHOOL_EMBLEMS[theme];

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

interface BrandMarksProps {
  theme?: LogoTheme;
  variant?: LogoVariant;
  className?: string;
  logoClassName?: string;
  schoolLogoClassName?: string;
  divider?: boolean;
  decorative?: boolean;
}

/**
 * The LBSAA and Lagos Business School marks belong together. Use this
 * anywhere a logo appears so the pair is never split apart.
 */
export function BrandMarks({
  theme = 'navy',
  variant = 'lockup',
  className,
  logoClassName,
  schoolLogoClassName,
  divider = false,
  decorative = true,
}: BrandMarksProps) {
  const classes = ['brand-marks', className].filter(Boolean).join(' ');
  const logoClasses = ['brand-marks__logo', logoClassName].filter(Boolean).join(' ');
  const schoolLogoClasses = ['brand-marks__school-logo', schoolLogoClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <BrandLogo
        theme={theme}
        variant={variant}
        alt={decorative ? '' : 'Lagos Business School Alumni Association logo'}
        className={logoClasses}
      />
      {divider ? <span className="brand-marks__divider" aria-hidden="true" /> : null}
      <SchoolLogo
        theme={theme}
        variant={variant}
        alt={
          decorative
            ? ''
            : 'Lagos Business School, Pan-Atlantic University logo'
        }
        className={schoolLogoClasses}
      />
    </span>
  );
}
