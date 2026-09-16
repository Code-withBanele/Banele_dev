import { useLayoutEffect, useRef } from 'react';
import { SkeletonHeading, SkeletonParagraph } from '../../components/SkeletonLoader';
import Reveal from './Reveal';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface ResumePageProps {
  isLoading?: boolean;
}

export default function ResumePage({ isLoading = false }: ResumePageProps) {
  if (isLoading) {
    return (
      <div className="page-shell">
        <div className="max-w-3xl mx-auto space-y-8">
          <SkeletonHeading level={1} />
          <SkeletonParagraph lines={3} />
          <SkeletonHeading level={2} />
          <SkeletonParagraph lines={4} />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-1/3 bg-white/10 animate-pulse" />
                <div className="h-px w-full bg-white/10 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="section-kicker">Profile</p>
          <h1 className="section-title mb-8">About me</h1>
        </Reveal>

        <Reveal className="mb-8">
          <p className="section-copy text-lg">
            I'm a 2nd year software development student and freelancer in spare time I build projects for my portfolio.
          </p>
        </Reveal>

        <Reveal className="mb-10">
          <p className="text-sm tracking-[0.16em] uppercase text-[var(--silver)] mb-3">
            Programming languages
          </p>
          <p className="text-[var(--offwhite)]">Html + CSS + JavaScript</p>
        </Reveal>

        <Reveal className="mb-12">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[0.95rem] text-[var(--silver)] border-y border-white/[0.08] py-8">
            <li><span className="text-white">Name</span> — Banele Mjayezi</li>
            <li><span className="text-white">Age</span> — 23 Years</li>
            <li><span className="text-white">Citizenship</span> — South African</li>
            <li><span className="text-white">Residence</span> — East London</li>
            <li className="sm:col-span-2"><span className="text-white">E-mail</span> — banelemajeyzi22@agmail.com</li>
          </ul>
        </Reveal>

        <Reveal className="mb-6">
          <h2 className="section-title text-[clamp(1.8rem,4vw,2.6rem)]">My skills</h2>
          <p className="section-copy mt-3">Html, CSS, Typescript, React, Figma</p>
        </Reveal>

        <div className="mt-10 space-y-7">
          <SkillBar skill="HTML & CSS" level={85} />
          <SkillBar skill="TypeScript" level={75} />
          <SkillBar skill="React" level={70} />
          <SkillBar skill="Figma" level={80} />
        </div>
      </div>
    </div>
  );
}

function SkillBar({ skill, level }: { skill: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !fill.current) return;

    if (prefersReducedMotion()) {
      gsap.set(fill.current, { width: `${level}%` });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [level]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="font-display tracking-[0.12em] uppercase text-sm text-[var(--offwhite)]">{skill}</span>
        <span className="text-xs tracking-[0.16em] text-[var(--brand-hot)]">{level}%</span>
      </div>
      <div className="h-px bg-white/10 overflow-visible relative">
        <div
          ref={fill}
          className="absolute left-0 top-[-1px] h-[2px] bg-[var(--brand)]"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}
