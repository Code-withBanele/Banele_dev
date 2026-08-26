import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import JG from '../../assets/jg.png';
import DailyRead from '../../assets/Screenshot 2026-08-26 203851.png';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'GitHub Repository - Portfolio Projects',
    description: 'Collection of web development projects showcasing HTML, CSS, JavaScript, and React skills. Includes various experiments and learning projects built during my software development journey.',
    technologies: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript'],
    githubUrl: 'https://github.com/Code-withBanele',
    image: 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXRodWIlMjByZXBvc2l0b3J5JTIwY29kZSUyMHNjcmVlbnxlbnwxfHx8fDE3NzAzNzIwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Just G ATM Website',
    description: 'Just G ATM Website is a modern and responsive React digital portfolio website for South African rapper Just G, showcasing his music, music videos, Spotify releases, biography, and artistic journey through a clean, artist-focused experience.',
    technologies: ['React', 'Tailwind CSS', 'Motion', 'TypeScript'],
    liveUrl: 'https://justg-atm.netlify.app/',
    githubUrl: '#',
    image: JG
  },
  {
    id: 3,
    title: 'DailyRead Blog',
    description: 'A modern editorial website built with React, designed for simple and accessible access to quality articles across different categories. Featuring a clean, minimalistic interface with a modern edge, the platform keeps the focus on content and an effortless reading experience.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://dailyreadza.netlify.app/',
    githubUrl: '#',
    image: DailyRead
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Project Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-[#a71d31]/0 group-hover:bg-[#a71d31]/10 transition-colors duration-300" />
        </div>

        {/* Project Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-['Jersey_10'] text-2xl sm:text-3xl text-[#a71d31] mb-3">
            {project.title}
          </h3>
          
          {/* Description - check if it's a URL */}
          {project.description.startsWith('http') ? (
            <a
              href={project.description}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Jersey_10'] text-lg sm:text-xl text-[#a71d31] hover:text-[#8a1727] underline decoration-2 underline-offset-4 mb-4 flex-1 transition-colors break-all"
            >
              {project.description}
            </a>
          ) : (
            <p className="font-['Jersey_10'] text-base sm:text-lg text-gray-700 mb-4 flex-1">
              {project.description}
            </p>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="font-['Jersey_10'] text-sm px-3 py-1 bg-[#e1e2ef] text-black rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-['Jersey_10'] text-base text-[#a71d31] hover:text-[#8a1727] transition-colors"
                whileHover={{ x: 5 }}
              >
                <ExternalLink size={18} />
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-['Jersey_10'] text-base text-black hover:text-[#a71d31] transition-colors"
                whileHover={{ x: 5 }}
              >
                <Github size={18} />
                {project.liveUrl ? 'Code' : 'View Repository'}
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#e1e2ef] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-['Jersey_10'] text-4xl sm:text-5xl md:text-6xl text-black mb-4">
            My Projects
          </h1>
          <p className="font-['Jersey_10'] text-xl sm:text-2xl text-[#a71d31]">
            A collection of my recent work and experiments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}