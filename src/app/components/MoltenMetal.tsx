import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import './MoltenMetal.css';

type ColorMode = 'molten' | 'ember' | 'frost';

interface MoltenMetalProps {
  color1?: string; color2?: string; color3?: string; speed?: number; scale?: number; detail?: number;
  glow?: number; coreSize?: number; swirl?: number; fold?: number; blackPoint?: number; brightness?: number;
  colorMode?: ColorMode; grain?: boolean; grainIntensity?: number; mouseInteraction?: boolean;
  mouseStrength?: number; opacity?: number; className?: string;
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255] : [1, 1, 1];
};

const colorModeToFloat = (mode: ColorMode) => mode === 'ember' ? 1 : mode === 'frost' ? 2 : 0;

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution; uniform float iTime; uniform float uSpeed; uniform float uScale; uniform float uDetail;
uniform float uGlow; uniform float uCoreSize; uniform float uSwirl; uniform float uFold; uniform float uBlackPoint;
uniform float uBrightness; uniform float uColorMode; uniform float uGrain; uniform float uGrainIntensity; uniform float uOpacity;
uniform vec2 uMouse; uniform float uMouseStrength; uniform bool uEnableMouse; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
out vec4 fragColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;
  if (uEnableMouse) p += (uMouse - 0.5) * uMouseStrength * 2.0;
  vec2 initial = p; float radius = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5); float distance = length(p);
  float rotation = distance + time + p.x * uSwirl; float cosine = cos(rotation);
  mat2 warp = mat2(cos(rotation - sin(time / 5.0)), sin(rotation), -sin(cosine - time), cosine) * uFold;
  float glowCore = uGlow * max(uCoreSize, 0.001); float accumulation = 0.0;
  for (float n = 0.0; n < 8.0; n++) { if (n >= uDetail) break; p *= warp; float t = radius - time / (n + 3.0); initial -= p + vec2(cos(t - initial.x - radius) + sin(t + initial.y), sin(t - initial.y) + cos(t + initial.x) + radius); accumulation += glowCore / length(vec2(sin(initial.x + t), cos(initial.y + t))); }
  float intensity = max(accumulation / 6.0 - uBlackPoint, 0.0) * uBrightness; float glow = clamp(intensity, 0.0, 1.0); float midpoint = uColorMode > 1.5 ? 0.65 : uColorMode > 0.5 ? 0.35 : 0.5;
  vec3 color = mix(uColor1, uColor2, smoothstep(0.0, midpoint, glow)); color = mix(color, uColor3, smoothstep(midpoint, 1.0, glow));
  float alpha = glow; if (uGrain > 0.5) alpha += (hash(gl_FragCoord.xy + iTime) - 0.5) * uGrainIntensity;
  alpha = clamp(alpha, 0.0, 1.0) * uOpacity; fragColor = vec4(color * alpha, alpha);
}`;

const contexts = new WeakMap<HTMLElement, { program: Program }>();

export default function MoltenMetal({
  color1 = '#5227FF', color2 = '#FF9FFC', color3 = '#FFFFFF', speed = 0.35, scale = 4, detail = 3,
  glow = 1.6, coreSize = 0.1, swirl = 1, fold = -0.2, blackPoint = 0.05, brightness = 1.3,
  colorMode = 'molten', grain = true, grainIntensity = 0.05, mouseInteraction = true, mouseStrength = 0.3,
  opacity = 1, className = '',
}: MoltenMetalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl; gl.clearColor(0, 0, 0, 0); const canvas = gl.canvas; canvas.style.cssText = 'display:block;width:100%;height:100%;'; container.appendChild(canvas);
    const program = new Program(gl, { vertex, fragment, uniforms: {
      iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) }, uSpeed: { value: speed }, uScale: { value: scale }, uDetail: { value: detail }, uGlow: { value: glow }, uCoreSize: { value: coreSize }, uSwirl: { value: swirl }, uFold: { value: fold }, uBlackPoint: { value: blackPoint }, uBrightness: { value: brightness }, uColorMode: { value: colorModeToFloat(colorMode) }, uGrain: { value: grain ? 1 : 0 }, uGrainIntensity: { value: grainIntensity }, uOpacity: { value: opacity }, uMouse: { value: new Float32Array([0.5, 0.5]) }, uMouseStrength: { value: mouseStrength }, uEnableMouse: { value: mouseInteraction }, uColor1: { value: new Float32Array(hexToRgb(color1)) }, uColor2: { value: new Float32Array(hexToRgb(color2)) }, uColor3: { value: new Float32Array(hexToRgb(color3)) },
    } });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program }); contexts.set(container, { program });
    const resize = () => { const rect = container.getBoundingClientRect(); renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height)); const resolution = program.uniforms.iResolution.value as Float32Array; resolution[0] = gl.drawingBufferWidth; resolution[1] = gl.drawingBufferHeight; };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    const target = [0.5, 0.5]; const current = [0.5, 0.5];
    const move = (event: MouseEvent) => { const rect = canvas.getBoundingClientRect(); target[0] = (event.clientX - rect.left) / rect.width; target[1] = 1 - (event.clientY - rect.top) / rect.height; };
    const leave = () => { target[0] = 0.5; target[1] = 0.5; }; canvas.addEventListener('mousemove', move); canvas.addEventListener('mouseleave', leave);
    let frame = 0; const start = performance.now(); const render = (time: number) => { program.uniforms.iTime.value = (time - start) * 0.001; current[0] += 0.05 * (target[0] - current[0]); current[1] += 0.05 * (target[1] - current[1]); const mouse = program.uniforms.uMouse.value as Float32Array; mouse[0] = current[0]; mouse[1] = current[1]; renderer.render({ scene: mesh }); frame = requestAnimationFrame(render); }; frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('mousemove', move); canvas.removeEventListener('mouseleave', leave); contexts.delete(container); container.removeChild(canvas); gl.getExtension('WEBGL_lose_context')?.loseContext(); };
  }, []);
  useEffect(() => {
    const context = containerRef.current && contexts.get(containerRef.current); if (!context) return; const uniforms = context.program.uniforms;
    uniforms.uSpeed.value = speed; uniforms.uScale.value = scale; uniforms.uDetail.value = detail; uniforms.uGlow.value = glow; uniforms.uCoreSize.value = coreSize; uniforms.uSwirl.value = swirl; uniforms.uFold.value = fold; uniforms.uBlackPoint.value = blackPoint; uniforms.uBrightness.value = brightness; uniforms.uColorMode.value = colorModeToFloat(colorMode); uniforms.uGrain.value = grain ? 1 : 0; uniforms.uGrainIntensity.value = grainIntensity; uniforms.uOpacity.value = opacity; uniforms.uMouseStrength.value = mouseStrength; uniforms.uEnableMouse.value = mouseInteraction;
    [ [uniforms.uColor1.value, color1], [uniforms.uColor2.value, color2], [uniforms.uColor3.value, color3] ].forEach(([uniform, color]) => (uniform as Float32Array).set(hexToRgb(color as string)));
  }, [color1, color2, color3, speed, scale, detail, glow, coreSize, swirl, fold, blackPoint, brightness, colorMode, grain, grainIntensity, mouseInteraction, mouseStrength, opacity]);
  return <div ref={containerRef} className={`molten-metal-container ${className}`.trim()} aria-hidden="true" />;
}