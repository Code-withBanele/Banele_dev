import { Github, Facebook, Instagram, ArrowRight } from 'lucide-react';
import CodeHero from './CodeHero';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import { projects } from '../../data/projects';
import { contactConfig } from '../../data/contact';

export default function HomePage({
  onStartProject,
  onViewProjects,
}: {
  onStartProject: () => void;
  onViewProjects: () => void;
}) {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Code-withBanele', icon: Github },
    { name: 'Facebook', url: 'https://www.facebook.com/DiPSAWCEZA', icon: Facebook },
    { name: 'Instagram', url: 'https://www.instagram.com/mjayezi.innooo_', icon: Instagram },
  ];

  const technologies = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Modern frontend tooling'],
    },
    {
      category: 'Backend & Data',
      items: ['Node.js', 'REST APIs', 'Databases', 'Authentication', 'CMS integrations'],
    },
    {
      category: 'Workflow',
      items: ['Git / GitHub', 'WordPress / CMS', 'AI-assisted development', 'Problem solving', 'Iteration'],
    },
  ];

  const projectTypes = [
    {
      title: 'Landing Pages',
      description: 'Conversion-focused pages designed to turn traffic into enquiries, leads, and customer conversations.',
    },
    {
      title: 'User-Centerd design',
      description: 'Responsive, polished experiences centred on usability, performance, and clear user journeys.',
    },
    {
      title: 'CMS-Driven Websites',
      description: 'Content-led websites with structured publishing, dynamic data, and API-connected workflows.',
    },
    {
      title: 'Full-Stack Applications',
      description: 'Projects with frontend interfaces, backend logic, APIs, authentication, databases, and integrations.',
    },
  ];

  const featuredProjects = projects.slice(0, 2);

  return (
    <main className="page-shell relative overflow-hidden">
      <div className="page-container">
        <CodeHero onStartProject={onStartProject} />

        <div className="flex justify-center gap-3 -mt-4 mb-16">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-10 w-10 border border-white/10 flex items-center justify-center text-[#c8c8d0] hover:text-white hover:border-white/30 transition-colors"
              aria-label={social.name}
            >
              <social.icon className="w-4 h-4" />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.16em] uppercase opacity-0 group-hover:opacity-100 transition-opacity text-[var(--mist)]">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        <section id="projects" className="mb-[var(--section-y)] scroll-mt-28">
          <Reveal className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2 className="section-title">Projects built in public</h2>
            </div>
            <p className="section-copy lg:text-right">
              A selection of recent work showcasing my approach to web development, design, and problem-solving.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                variant="featured"
              />
            ))}
          </div>

          <Reveal className="pt-2">
            <button type="button" onClick={onViewProjects} className="inline-flex items-center gap-2 text-sm tracking-[0.16em] uppercase text-[var(--mist)] hover:text-white transition-colors">
              View all projects
              <ArrowRight size={16} />
            </button>
          </Reveal>
        </section>

        <section className="mb-[var(--section-y)] border-t border-white/[0.08] pt-16">
          <Reveal>
            <p className="section-kicker">About</p>
            <h2 className="section-title mb-8">Think. Build. Repeat.</h2>
            <div className="max-w-3xl space-y-5">
              <p className="section-copy">
                We help bussinesses Prototype, build their ideas and sell their products online, through a proven and tested framework for web-development
              </p>
          
             
              <p className="section-copy">
                Our philosophy is simple: Think. Build. Repeat.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mb-[var(--section-y)] border-t border-white/[0.08] pt-16">
          <Reveal>
            <p className="section-kicker">Stack</p>
            <h2 className="section-title mb-12">Technologies I work with</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {technologies.map((group) => (
                <div key={group.category} className="surface-card p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-white/20">
                  <h3 className="font-display text-lg tracking-[0.14em] uppercase text-white mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--mist)] transition-colors duration-200 hover:border-[var(--brand)]/60 hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mb-[var(--section-y)] border-t border-white/[0.08] pt-16">
          <Reveal>
            <p className="section-kicker">What I build</p>
            <h2 className="section-title mb-12">From concept to working product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projectTypes.map((projectType) => (
                <article key={projectType.title} className="surface-card p-6 transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg tracking-[0.14em] uppercase text-white">
                      {projectType.title}
                    </h3>
                    <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--silver)]">
                    {projectType.description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-white/[0.08] pt-16">
          <Reveal className="max-w-2xl">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title mb-5">Available for web projects and collaborations</h2>
            <p className="section-copy mb-8">
              I build modern websites, landing pages, CMS-connected experiences, and full-stack applications for clients who need thoughtful digital work with practical execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={onStartProject} className="btn-primary">
                Start a conversation
              </button>
            </div>
            <div className="mt-10 space-y-1 text-sm text-[var(--silver)] tracking-wide">
              <p>
                Email:{' '}
                <a href={`mailto:${contactConfig.email}`} className="text-link">
                  {contactConfig.email}
                </a>
              </p>
              <p>Location: {contactConfig.location}</p>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
