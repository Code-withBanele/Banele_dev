import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './components/HomePage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import Navigation from './components/Navigation';
import { setCache, getCache } from '../utils/cache';

type PageType = 'home' | 'resume' | 'projects' | 'contact';

interface PageState {
  page: PageType;
  isLoading: boolean;
}

export default function App() {
  const [pageState, setPageState] = useState<PageState>({
    page: 'home',
    isLoading: false
  });

  const loadPageData = useCallback((page: PageType) => {
    const cached = getCache(`page_${page}`);
    if (cached) {
      return Promise.resolve(cached);
    }

    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const data = { page, loadedAt: Date.now() };
        setCache(`page_${page}`, data);
        resolve(data);
      }, 300);

      return () => clearTimeout(timer);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageState.page]);

  const handleNavigate = useCallback((page: PageType) => {
    setPageState({
      page,
      isLoading: true
    });

    loadPageData(page).then(() => {
      setPageState((prev) => ({
        ...prev,
        isLoading: false
      }));
    });
  }, [loadPageData]);

  return (
    <div className="min-h-screen bg-[var(--void)] overflow-x-hidden text-[var(--offwhite)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-[var(--brand)] focus:text-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="site-grain" aria-hidden="true" />
      <Navigation currentPage={pageState.page} onNavigate={handleNavigate} />

      <div id="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageState.page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.28 }}
          >
            {pageState.page === 'home' && (
              <HomePage
                onStartProject={() => handleNavigate('contact')}
                onViewProjects={() => handleNavigate('projects')}
              />
            )}
            {pageState.page === 'resume' && <ResumePage isLoading={pageState.isLoading} />}
            {pageState.page === 'projects' && <ProjectsPage isLoading={pageState.isLoading} />}
            {pageState.page === 'contact' && <ContactPage isLoading={pageState.isLoading} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
