import { useLayoutEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../data/projects';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'card' | 'featured';
}

export default function ProjectCard({ project, index, variant = 'card' }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const featured = variant === 'featured';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  return (
    <article ref={ref} className="h-full">
      <div
        className="group surface-card overflow-hidden h-full flex flex-col transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--brand-hot)]/45 hover:shadow-[0_18px_48px_rgba(0,0,0,0.32)] focus-within:-translate-y-1.5 focus-within:border-[var(--brand-hot)]/45 motion-reduce:transition-none"
      onMouseMove={(e) => {
        if (prefersReducedMotion() || !imageRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
          imageRef.current.style.transform = `scale(1.02) translate(${x * 8}px, ${y * 8}px)`;
      }}
      onMouseLeave={() => {
        if (imageRef.current) imageRef.current.style.transform = 'scale(1) translate(0,0)';
      }}
      >
        <div className={`relative overflow-hidden bg-[#111114] ${featured ? 'h-64 sm:h-80' : 'h-48 sm:h-56'}`}>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none">
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-55 motion-reduce:transition-none" />
        </div>

        <div className={`flex-1 flex flex-col ${featured ? 'p-6 sm:p-8' : 'p-6'}`}>
          <h3 className="font-display text-2xl sm:text-[1.85rem] tracking-[0.04em] text-[var(--offwhite)] mb-3 transition-colors duration-300 group-hover:text-white">
            {project.title}
          </h3>

          <p className="text-[0.95rem] text-[var(--silver)] mb-5 flex-1 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {(featured ? project.technologies.slice(0, 4) : project.technologies).map((tech) => (
              <span
                key={tech}
                className="font-display text-xs tracking-[0.12em] px-2.5 py-1 border border-white/10 text-[#c8c8d0] transition-colors duration-300 group-hover:border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[var(--brand-hot)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-hot)] transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#c8c8d0] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-hot)] transition-colors"
              >
                <Github size={14} />
                {project.liveUrl ? 'Code' : 'View Repository'}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
