import { motion } from 'motion/react';
import svgPaths from '../imports/svg-5id306sw6k';
import imgDreamina from 'figma:asset/57d80849e9cad6e92de1480e462b2417b092a847.png';
import { Github, Facebook, Instagram } from 'lucide-react';
import MoltenMetal from './MoltenMetal';
import ASCIIText from '../../components/ASCIIText';
import DecryptedText from '../../components/DecryptedText';

const workflowSteps = [
  ['01', 'Tell us what you are building', 'Share the idea, audience, goals, and practical requirements.'],
  ['02', 'Receive a tailored proposal', 'Your requirements are reviewed before scope, timeline, and approach are agreed.'],
  ['03', 'Choose a starting direction', 'Begin with a custom design or a curated template direction shaped for your business.'],
  ['04', 'Review and refine the design', 'Design feedback and revisions lead to a direction ready for development.'],
  ['05', 'Build and test the project', 'The approved design becomes a responsive website or web application.'],
  ['06', 'Approve and launch', 'After client verification and final approval, the finished project goes live.'],
];

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

  return (
    <main className="min-h-screen bg-[#e1e2ef] pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true">
        <MoltenMetal
          color1="#a71d31"
          color2="#e8a0a0"
          color3="#fff4f0"
          speed={0.28}
          scale={3.5}
          glow={1.4}
          brightness={0.85}
          colorMode="ember"
          mouseStrength={0.2}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
          {/* 3D Avatar as Background Layer */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.15,
              scale: 1,
              rotateY: [0, 360]
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 1 },
              rotateY: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img 
              src={imgDreamina} 
              alt="3D Avatar Background" 
              className="w-[500px] h-[700px] md:w-[600px] md:h-[800px] lg:w-[700px] lg:h-[900px] object-contain"
            />
          </motion.div>

          {/* Hero Text - Now in Foreground */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl">
            <motion.header
              className="contents"
            >
              <motion.h1
              className="w-full font-['Jersey_10'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-[#a71d31] mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="sr-only">Hi, I'm Banele Innocent Mjayezi</span>
              <span aria-hidden="true" className="block w-full h-[4.5rem] sm:h-[6rem] md:h-[7rem] lg:h-[8rem] xl:h-[9rem]">
                <ASCIIText
                  text="HI, I'M BANELE INNOCENT MJAYEZI"
                  enableWaves={true}
                  asciiFontSize={8}
                  textFontSize={200}
                  textColor="#a71d31"
                  planeBaseHeight={8}
                />
              </span>
              </motion.h1>
            </motion.header>

            <motion.p
              className="font-['Jersey_10'] text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-[#a71d31] mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <DecryptedText
                text="Software development 2nd year student"
                animateOn="view"
                sequential={true}
                speed={70}
                className="text-[#a71d31]"
              />
            </motion.p>

            <motion.div
              className="font-['Jersey_10'] text-base sm:text-xl md:text-2xl lg:text-[32px] text-[#a71d31] max-w-4xl tracking-[0.64px] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p>
                <DecryptedText
                  text="Currently, I'm focused on practical learning and building real-world projects while exploring modern web development tools. I thrive on learning by doing, improving both my front-end and back-end development skills."
                  animateOn="view"
                  sequential={true}
                  revealDirection="start"
                  speed={60}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
                  className="text-black"
                />
              </p>
            </motion.div>
          </div>

          <section className="relative z-10 w-full border-t border-[#a71d31]/20 pt-16 mt-16" aria-labelledby="how-we-work-heading">
            <div className="mb-10 max-w-3xl">
              <h2 id="how-we-work-heading" className="font-['Jersey_10'] text-4xl sm:text-5xl text-black mb-3">
                How We Work
              </h2>
              <p className="font-['Jersey_10'] text-xl sm:text-2xl text-[#a71d31]">
                A clear path from your first project inquiry to a tested, launch-ready digital experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {workflowSteps.map(([number, title, description]) => (
                <article key={number} className="border-l-2 border-[#a71d31] pl-5">
                  <p className="font-['Jersey_10'] text-2xl text-[#a71d31] mb-2">{number}</p>
                  <h3 className="font-['Jersey_10'] text-2xl text-black mb-2">{title}</h3>
                  <p className="font-['Jersey_10'] text-lg text-gray-700">{description}</p>
                </article>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Design starting directions">
              <article className="border-2 border-[#a71d31] p-6">
                <p className="font-['Jersey_10'] text-lg text-[#a71d31] mb-2">OPTION A</p>
                <h3 className="font-['Jersey_10'] text-3xl text-black mb-2">Custom Design</h3>
                <p className="font-['Jersey_10'] text-lg text-gray-700">A bespoke visual direction designed around your brand, audience, and goals.</p>
              </article>
              <article className="border-2 border-black p-6">
                <p className="font-['Jersey_10'] text-lg text-[#a71d31] mb-2">OPTION B</p>
                <h3 className="font-['Jersey_10'] text-3xl text-black mb-2">Curated Template</h3>
                <p className="font-['Jersey_10'] text-lg text-gray-700">Start from a professionally designed direction and customise it for your business.</p>
              </article>
            </div>

            <button
              type="button"
              onClick={onStartProject}
              className="mt-10 px-6 py-3 bg-[#a71d31] text-white font-['Jersey_10'] text-xl rounded-lg"
            >
              Start a Project
            </button>
          </section>

          {/* Social Media Links Section */}
          <motion.div
            className="relative z-20 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex items-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-all group-hover:shadow-xl">
                    <social.icon 
                      className="w-6 h-6 sm:w-7 sm:h-7 transition-colors" 
                      style={{ color: social.color }}
                    />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm font-['Jersey_10'] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.name}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}