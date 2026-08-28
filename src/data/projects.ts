import JG from '../assets/jg.png';
import DailyRead from '../assets/Screenshot 2026-08-26 203851.png';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

export const projects: Project[] = [
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
