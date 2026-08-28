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

  // Simulate page data loading (in real app, this would be async data fetching)
  const loadPageData = useCallback((page: PageType) => {
    // Check cache first (optimistic rendering)
    const cached = getCache(`page_${page}`);
    if (cached) {
      return Promise.resolve(cached);
    }

    // Simulate network request
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const data = { page, loadedAt: Date.now() };
        setCache(`page_${page}`, data);
        resolve(data);
      }, 300); // 300ms simulated load time

      return () => clearTimeout(timer);
    });
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageState.page]);

  const handleNavigate = useCallback((page: PageType) => {
    // Optimistic rendering: update UI immediately
    setPageState({
      page,
      isLoading: true
    });

    // Load data in background
    loadPageData(page).then(() => {
      setPageState((prev) => ({
        ...prev,
        isLoading: false
      }));
    });
  }, [loadPageData]);

  return (
    <div className="min-h-screen bg-[#e1e2ef] overflow-x-hidden">
      <Navigation currentPage={pageState.page} onNavigate={handleNavigate} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pageState.page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {pageState.page === 'home' && <HomePage onStartProject={() => handleNavigate('contact')} />}
          {pageState.page === 'resume' && <ResumePage isLoading={pageState.isLoading} />}
          {pageState.page === 'projects' && <ProjectsPage isLoading={pageState.isLoading} />}
          {pageState.page === 'contact' && <ContactPage isLoading={pageState.isLoading} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
