import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
  twinkleSpeed: number;
}

interface GalaxyStar extends Star {
  orbit: number;
  arm: number;
  angle: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frameId = 0;
    let stars: Star[] = [];
    let galaxyStars: GalaxyStar[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      let seed = 90210;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      const area = width * height;
      const starCount = Math.min(700, Math.max(220, Math.floor(area / 2200)));
      const galaxyCount = Math.min(560, Math.max(180, Math.floor(area / 3000)));

      stars = Array.from({ length: starCount }, () => ({
        x: random() * width,
        y: random() * height,
        radius: 0.35 + random() * 1.05,
        opacity: 0.12 + random() * 0.42,
        phase: random() * Math.PI * 2,
        twinkleSpeed: 0.25 + random() * 0.7,
      }));

      galaxyStars = Array.from({ length: galaxyCount }, () => ({
        x: 0,
        y: 0,
        radius: 0.35 + random() * 0.9,
        opacity: 0.06 + random() * 0.23,
        phase: random() * Math.PI * 2,
        twinkleSpeed: 0.15 + random() * 0.45,
        orbit: Math.sqrt(random()),
        arm: Math.floor(random() * 3),
        angle: (random() - 0.5) * 0.62,
      }));
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.47;
      const galaxyRadius = Math.min(width * 0.78, height * 0.9);
      const rotation = reducedMotion ? 0 : time * 0.00002;

      const drawStar = (star: Star, x: number, y: number) => {
        let drawX = x;
        let drawY = y;
        const deltaX = x - pointer.x;
        const deltaY = y - pointer.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 0 && distance < 170) {
          const push = (1 - distance / 170) * 30;
          drawX += (deltaX / distance) * push;
          drawY += (deltaY / distance) * push;
        }

        const twinkle = reducedMotion
          ? 1
          : 0.58 + Math.sin(time * 0.001 * star.twinkleSpeed + star.phase) * 0.42;
        context.globalAlpha = star.opacity * twinkle;
        context.beginPath();
        context.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        context.fill();
      };

      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, galaxyRadius);
      glow.addColorStop(0, 'rgba(202, 213, 226, 0.055)');
      glow.addColorStop(0.42, 'rgba(145, 161, 180, 0.018)');
      glow.addColorStop(1, 'rgba(145, 161, 180, 0)');
      context.globalAlpha = 1;
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.fillStyle = '#dce6f2';
      for (const star of stars) drawStar(star, star.x, star.y);

      for (const star of galaxyStars) {
        const angle = star.arm * ((Math.PI * 2) / 3) + star.orbit * 10 + star.angle + rotation;
        const radius = star.orbit * galaxyRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius * 0.48;
        context.fillStyle = star.orbit < 0.22 ? '#f4f5f7' : '#cbd8e8';
        drawStar(star, x, y);
      }

      context.globalAlpha = 1;
      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (reducedMotion) draw(0);
    };
    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    const handleResize = () => {
      resize();
      if (reducedMotion) draw(0);
    };

    resize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    if (reducedMotion) draw(0);
    else frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas className="block w-full h-full" ref={canvasRef} />
    </div>
  );
}