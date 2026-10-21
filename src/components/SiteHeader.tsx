import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMarks } from './BrandLogo';

interface HeaderProps {
  invert?: boolean;
}

export function SiteHeader({ invert = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeWithEscape);
    return () => window.removeEventListener('keydown', closeWithEscape);
  }, [menuOpen]);

  const goToSection = (sectionId: string) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <header className={`site-header${invert ? ' site-header--invert' : ''}`}>
      <div className="shell site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Ebola Awareness campaign home">
          <BrandMarks
            theme={invert ? 'white' : 'navy'}
            className="site-header__marks"
            logoClassName="site-header__logo"
            schoolLogoClassName="site-header__school-logo"
            divider
          />
          <span className="site-header__brand-divider" aria-hidden="true" />
          <span className="site-header__brand-copy">
            <span>EBOLA</span>
            <span>AWARENESS</span>
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          <button
            type="button"
            className="nav-link"
            onClick={() => goToSection('how-it-works')}
          >
            How it works
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => goToSection('campaign-notice')}
          >
            The campaign
          </button>
          <Link to="/generator" className="button button--primary button--small">
            Create poster
            <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </nav>

        <button
          type="button"
          className="site-header__menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="mobile-nav__link"
            onClick={() => goToSection('how-it-works')}
          >
            How it works
          </button>
          <button
            type="button"
            className="mobile-nav__link"
            onClick={() => goToSection('campaign-notice')}
          >
            The campaign
          </button>
          <Link to="/generator" className="button button--primary mobile-nav__cta">
            Create my poster
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
