import { useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface NavigationProps {
  currentPage: 'home' | 'resume' | 'projects' | 'contact';
  onNavigate: (page: 'home' | 'resume' | 'projects' | 'contact') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLElement>(null);

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

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !bar.current) return;
    const ctx = gsap.context(() => {
      gsap.from(bar.current, { y: -16, autoAlpha: 0, duration: 0.6, ease: 'power2.out' });
    }, bar);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={bar}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled || isOpen
          ? 'bg-[#070708]/85 backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="page-container px-[var(--page-pad)]">
        <div className="flex justify-between items-center h-[4.5rem]">
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="font-display text-xl tracking-[0.28em] text-[var(--offwhite)] hover:text-white transition-colors"
            aria-label="Go to home"
          >
            BM
          </button>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavigate(link.id)}
                className={`relative font-display text-base tracking-[0.22em] uppercase transition-colors ${
                  currentPage === link.id
                    ? 'text-[var(--brand-hot)]'
                    : 'text-[#c8c8d0] hover:text-white'
                }`}
              >
                {link.label}
                {currentPage === link.id && <span className="nav-underline" />}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-[var(--offwhite)] hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-white/[0.06] pb-5">
            <div className="flex flex-col gap-1 pt-3">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className={`font-display text-left px-1 py-3 tracking-[0.18em] uppercase ${
                    currentPage === link.id ? 'text-[var(--brand-hot)]' : 'text-[#d0d0d6]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
