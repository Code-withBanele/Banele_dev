import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';
import { SkeletonProjectGrid } from '../../components/SkeletonLoader';

interface ProjectsPageProps {
  isLoading?: boolean;
}

export default function ProjectsPage({ isLoading = false }: ProjectsPageProps) {
  return (
    <div className="min-h-screen bg-[#e1e2ef] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-['Jersey_10'] text-4xl sm:text-5xl md:text-6xl text-black mb-4">
            My Projects
          </h1>
          <p className="font-['Jersey_10'] text-xl sm:text-2xl text-[#a71d31]">
            A collection of my recent work and experiments
          </p>
        </motion.div>

        {isLoading ? (
          <SkeletonProjectGrid count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} variant="card" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}