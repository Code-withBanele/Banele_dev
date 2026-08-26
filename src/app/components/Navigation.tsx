import { motion } from 'motion/react';

interface NavigationProps {
  currentPage: 'home' | 'resume' | 'projects' | 'contact';
  onNavigate: (page: 'home' | 'resume' | 'projects' | 'contact') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e1e2ef]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-20 gap-6 sm:gap-8">
          {links.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`font-['Jersey_10'] text-base sm:text-lg tracking-[0.32px] relative transition-colors ${
                currentPage === link.id ? 'text-[#a71d31]' : 'text-black'
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
      </div>
    </nav>
  );
}
