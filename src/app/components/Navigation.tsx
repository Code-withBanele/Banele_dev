import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'resume' | 'projects' | 'contact';
  onNavigate: (page: 'home' | 'resume' | 'projects' | 'contact') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  const handleNavigate = (page: typeof links[number]['id']) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e1e2ef]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-black font-bold text-lg"
          >
            BM
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`font-['Jersey_10'] text-base sm:text-lg tracking-[0.32px] relative transition-colors ${
                  currentPage === link.id ? 'text-[#a71d31]' : 'text-black hover:text-[#a71d31]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {currentPage === link.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#a71d31]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Waffle Menu Button */}
          <motion.button
            className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-black/10 overflow-hidden"
            >
              <div className="flex flex-col gap-2 py-4">
                {links.map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className={`font-['Jersey_10'] text-base px-4 py-2 rounded-lg transition-colors text-left ${
                      currentPage === link.id
                        ? 'bg-[#a71d31] text-white'
                        : 'text-black hover:bg-black/5'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
