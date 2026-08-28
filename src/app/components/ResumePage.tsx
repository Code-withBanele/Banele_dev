import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { SkeletonHeading, SkeletonParagraph } from '../../components/SkeletonLoader';

interface ResumePageProps {
  isLoading?: boolean;
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function ResumePage({ isLoading = false }: ResumePageProps) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e1e2ef] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <SkeletonHeading level={1} />
          <SkeletonParagraph lines={3} />
          <SkeletonHeading level={2} />
          <SkeletonParagraph lines={4} />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-1/3 bg-gray-300 rounded animate-pulse" />
                <div className="h-3 w-full bg-gray-300 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e1e2ef] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="font-['Jersey_10'] text-black space-y-6">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-[36px] mb-8">About Me</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-2xl sm:text-3xl md:text-[36px] leading-normal mb-6">
              I'm a 2nd year software development student and freelancer in spare time I build projects for my portfolio.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-2xl sm:text-3xl md:text-[36px] leading-normal mb-6">
              Programming Languages: Html + CSS + JavaScript
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <ul className="list-disc ml-6 sm:ml-12 space-y-2 text-2xl sm:text-3xl md:text-[36px]">
              <li>Name: Banele Mjayezi</li>
              <li>Age: 23 Years</li>
              <li>Citizenship: South African</li>
              <li>Residence: East London</li>
              <li>E-mail: banelemajeyzi22@agmail.com</li>
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h2 className="text-3xl sm:text-4xl md:text-[36px] mt-12 mb-6">My Skills</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <ul className="list-disc ml-6 sm:ml-12 text-2xl sm:text-3xl md:text-[36px]">
              <li>Html,CSS, Typescript, React, , Figma</li>
            </ul>
          </AnimatedSection>

          {/* Skills Progress Bars */}
          <AnimatedSection delay={0.6}>
            <div className="mt-12 space-y-6">
              <SkillBar skill="HTML & CSS" level={85} delay={0.7} />
              <SkillBar skill="TypeScript" level={75} delay={0.8} />
              <SkillBar skill="React" level={70} delay={0.9} />
              <SkillBar skill="Figma" level={80} delay={1.0} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

function SkillBar({ skill, level, delay }: { skill: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-['Jersey_10'] text-xl sm:text-2xl text-black">{skill}</span>
        <span className="font-['Jersey_10'] text-lg sm:text-xl text-[#a71d31]">{level}%</span>
      </div>
      <div className="h-3 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#a71d31]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
