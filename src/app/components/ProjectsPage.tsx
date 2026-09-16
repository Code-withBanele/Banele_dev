import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';
import { SkeletonProjectGrid } from '../../components/SkeletonLoader';

interface ProjectsPageProps {
  isLoading?: boolean;
}

export default function ProjectsPage({ isLoading = false }: ProjectsPageProps) {
  return (
    <div className="page-shell">
      <div className="page-container">
        <Reveal className="mb-14 max-w-2xl">
          <p className="section-kicker">Archive</p>
          <h1 className="section-title mb-4">My projects</h1>
          <p className="section-copy">
            A collection of recent work and experiments.
          </p>
        </Reveal>

        {isLoading ? (
          <SkeletonProjectGrid count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} variant="card" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
