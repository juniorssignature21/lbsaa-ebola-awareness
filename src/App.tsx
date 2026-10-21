import { useEffect } from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const target = (state as { scrollTo?: string } | null)?.scrollTo;
    if (target) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, state]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
