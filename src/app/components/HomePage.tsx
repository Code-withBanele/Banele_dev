import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { Github, Facebook, Instagram, ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';

export default function HomePage({ onStartProject }: { onStartProject: () => void }) {
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/Code-withBanele', 
      icon: Github,
      color: '#1F2328'
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/DiPSAWCEZA', 
      icon: Facebook,
      color: '#1877F2'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/mjayezi.innooo_', 
      icon: Instagram,
      color: '#E4405F'
    },
  ];

  const technologies = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Languages', items: ['JavaScript', 'HTML', 'CSS', 'TypeScript'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'Figma', 'Vite'] },
  ];

  const featuredProjects = projects.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#e1e2ef] pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Banele Mjayezi
            </motion.h1>

            <motion.div
              className="text-2xl sm:text-3xl text-[#a71d31] font-semibold mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Software & Web Developer
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              I build modern websites and digital experiences with a focus on thoughtful design, clean code, and practical technology. Currently a 2nd-year software development student focused on learning through real-world projects.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.a
                href="#projects"
                className="px-8 py-3 sm:py-4 bg-[#a71d31] text-white font-medium rounded-lg flex items-center gap-2 hover:bg-[#8a1727] transition-colors"
                whileHover={{ x: 5 }}
              >
                View Projects
                <ArrowRight size={20} />
              </motion.a>
              <motion.button
                onClick={onStartProject}
                className="px-8 py-3 sm:py-4 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                Get in Touch
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="mt-12 flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all">
                    <social.icon 
                      className="w-5 h-5 sm:w-6 sm:h-6" 
                      style={{ color: social.color }}
                    />
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.name}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Selected Work</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              A selection of recent projects showcasing my approach to web development, design, and problem-solving.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                variant="featured"
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-[#a71d31] font-medium hover:text-[#8a1727] transition-colors"
            >
              View all projects
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="mb-20 border-t border-gray-300 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8">About</h2>
            <div className="max-w-3xl space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a software development student and aspiring web developer based in East London, South Africa. I'm passionate about creating digital experiences that are both functional and beautiful.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My approach combines practical programming skills with thoughtful design principles. I enjoy the challenge of turning ideas into real working applications, from frontend interfaces to backend logic. I'm currently focused on mastering modern web technologies like React, TypeScript, and full-stack development.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, I'm exploring new technologies, contributing to projects, and continuously learning by building. I'm interested in opportunities to collaborate with other developers and work on meaningful projects.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Technologies Section */}
        <section className="mb-20 border-t border-gray-300 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-12">Technologies & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {technologies.map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3 className="text-xl font-semibold text-black mb-4">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact CTA Section */}
        <section className="border-t border-gray-300 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">Let's Build Something</h2>
            <p className="text-lg text-gray-700 mb-10">
              I'm always interested in hearing about new projects and opportunities. Whether you have a specific project in mind or just want to chat about web development, feel free to reach out.
            </p>
            <motion.button
              onClick={onStartProject}
              className="px-10 py-4 bg-[#a71d31] text-white font-medium rounded-lg hover:bg-[#8a1727] transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>

            {/* Contact Info */}
            <motion.div
              className="mt-12 space-y-2 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p>Email: <a href="mailto:admin@banele.dev" className="text-[#a71d31] hover:text-[#8a1727] transition-colors">admin@banele.dev</a></p>
              <p>Location: East London, South Africa</p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}