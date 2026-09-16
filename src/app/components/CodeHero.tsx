import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface CodeHeroProps {
  onStartProject: () => void;
}

const LINES = [
  { html: '<span class="kw">const</span> <span class="id">experience</span> = {' },
  { html: '  <span class="key">name</span>: <span class="str">"Banele Mjayezi"</span>,' },
  { html: '  <span class="key">role</span>: <span class="str">"Software &amp; Web Developer"</span>,' },
  { html: '  <span class="key">design</span>: <span class="str">"minimal"</span>,' },
  { html: '  <span class="key">technology</span>: <span class="str">"modern"</span>,' },
  { html: '  <span class="key">interaction</span>: <span class="str">"immersive"</span>' },
  { html: '}' },
];

export default function CodeHero({ onStartProject }: CodeHeroProps) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const scan = useRef<HTMLDivElement>(null);
  const codeLayer = useRef<HTMLDivElement>(null);
  const liveLayer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('.hero-line');
      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set(lines, { opacity: 0 });
        gsap.set(codeLayer.current, { autoAlpha: 0 });
        gsap.set(liveLayer.current, { autoAlpha: 1, y: 0, filter: 'none' });
        gsap.set(frame.current, {
          width: '100%',
          maxWidth: '100%',
          borderColor: 'transparent',
          background: 'transparent',
          boxShadow: 'none',
        });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 10 });
      gsap.set(liveLayer.current, { autoAlpha: 0, y: 16, filter: 'blur(8px)' });
      gsap.set(scan.current, { y: 16, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      if (window.matchMedia('(max-width: 640px)').matches) tl.timeScale(1.35);

      tl.to(scan.current, { autoAlpha: 0.85, duration: 0.2 })
        .to(scan.current, { y: 228, duration: 1.1, ease: 'power1.inOut' }, 0)
        .to(lines, { opacity: 1, y: 0, duration: 0.42, stagger: 0.08 }, 0.1)
        .to(scan.current, { autoAlpha: 0, duration: 0.22 }, '-=0.12')
        .to(
          codeLayer.current,
          {
            autoAlpha: 0,
            filter: 'blur(10px)',
            duration: 0.65,
            ease: 'power3.inOut',
          },
          '+=0.32',
        )
        .to(
          frame.current,
          {
            maxWidth: '100%',
            paddingLeft: 0,
            paddingRight: 0,
            borderColor: 'rgba(225,226,239,0)',
            background: 'transparent',
            boxShadow: 'none',
            duration: 0.8,
            ease: 'power3.inOut',
          },
          '<',
        )
        .to(
          liveLayer.current,
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5',
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[calc(100svh-5.5rem)] flex items-center py-8 sm:py-14"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(225,226,239,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(225,226,239,0.04) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 78%)',
        }}
      />

      <div
        ref={frame}
        className="code-frame relative z-10 mx-auto w-full max-w-[46rem] px-5 py-8 sm:px-10 sm:py-11"
      >
        <div ref={scan} className="code-scan" aria-hidden="true" />

        <div
          ref={codeLayer}
          className="absolute inset-0 z-20 px-5 py-8 sm:px-10 sm:py-11 font-code text-[12px] sm:text-[13.5px] leading-7 text-[#c8c8d0] bg-[var(--metal)]"
          aria-hidden="true"
        >
          <div className="mb-5 flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#7c7c86]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            compile · interface
          </div>
          {LINES.map((line, i) => (
            <pre
              key={i}
              className="hero-line m-0 whitespace-pre"
              dangerouslySetInnerHTML={{ __html: line.html }}
            />
          ))}
        </div>

        <div ref={liveLayer} className="relative z-10">
          <p className="section-kicker mb-4">East London · South Africa</p>
          <h1 className="font-display text-[clamp(2.6rem,7.5vw,5.25rem)] leading-[0.9] tracking-[0.04em] text-[var(--offwhite)]">
            Banele.dev
          </h1>
          <p className="mt-4 font-display text-xl sm:text-2xl tracking-[0.08em] text-[var(--brand-hot)]">
            Digital infrastructure for Africa’s next generation of businesses.
          </p>
          <p className="section-copy mt-6 max-w-xl">
            Websites, platforms and digital systems built to help organisations grow and own their digital presence.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRight size={16} />
            </a>
            <button type="button" onClick={onStartProject} className="btn-ghost">
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-line .kw { color: #9a9aa6; }
        .hero-line .id { color: #f3f3f0; }
        .hero-line .key { color: #c44552; }
        .hero-line .str { color: #e1e2ef; }
      `}</style>
    </section>
  );
}
