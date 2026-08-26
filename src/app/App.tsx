import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './components/HomePage';
import ResumePage from './components/ResumePage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import Navigation from './components/Navigation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'resume' | 'projects' | 'contact'>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#02020a] overflow-x-hidden">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'home' && <HomePage onStartProject={() => setCurrentPage('contact')} />}
          {currentPage === 'resume' && <ResumePage />}
          {currentPage === 'projects' && <ProjectsPage />}
          {currentPage === 'contact' && <ContactPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
