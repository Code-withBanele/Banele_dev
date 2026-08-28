import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'card' | 'featured';
}

export default function ProjectCard({ project, index, variant = 'card' }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (variant === 'featured') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group"
      >
        <motion.article
          className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col hover:shadow-lg transition-shadow duration-300"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {/* Project Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-200">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>

          {/* Project Info */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col">
            <h3 className="font-['Jersey_10'] text-2xl sm:text-3xl text-black mb-3 line-clamp-2">
              {project.title}
            </h3>
            
            <p className="text-base sm:text-lg text-gray-600 mb-5 flex-1 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="font-['Jersey_10'] text-xs sm:text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
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
                  className="flex items-center gap-2 text-sm font-medium text-[#a71d31] hover:text-[#8a1727] transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <ExternalLink size={16} />
                  Live Demo
                </motion.a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#a71d31] transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <Github size={16} />
                  Code
                </motion.a>
              )}
            </div>
          </div>
        </motion.article>
      </motion.div>
    );
  }

  // Default card variant
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
          
          <p className="font-['Jersey_10'] text-base sm:text-lg text-gray-700 mb-4 flex-1">
            {project.description}
          </p>

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
