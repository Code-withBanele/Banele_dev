import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uEnableWaves;
void main() {
  vUv = uv;
  vec3 transformed = position;
  float wave = uEnableWaves;
  transformed.x += sin(uTime * 5.0 + position.y) * 0.5 * wave;
  transformed.y += cos(uTime * 5.0 + position.z) * 0.15 * wave;
  transformed.z += sin(uTime * 5.0 + position.x) * wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;
void main() {
  vec2 pos = vUv;
  float time = uTime;
  float r = texture2D(uTexture, pos + cos(time * 2.0 + pos.x) * 0.01).r;
  float g = texture2D(uTexture, pos + sin(time * 1.5 + pos.y) * 0.01).g;
  float b = texture2D(uTexture, pos - cos(time * 2.0 + pos.y) * 0.01).b;
  float a = texture2D(uTexture, pos).a;
  gl_FragColor = vec4(r, g, b, a);
}`;

const charset = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function renderAscii(pre, sourceCanvas, context, width, height, fontSize) {
  const columns = Math.max(1, Math.floor(width / (fontSize * 0.6)));
  const rows = Math.max(1, Math.floor(height / fontSize));
  sourceCanvas.width = columns;
  sourceCanvas.height = rows;
  context.clearRect(0, 0, columns, rows);
  context.drawImage(sourceCanvas.rendererCanvas, 0, 0, columns, rows);
  const pixels = context.getImageData(0, 0, columns, rows).data;
  let output = '';
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const index = (x + y * columns) * 4;
      const alpha = pixels[index + 3];
      if (alpha === 0) {
        output += ' ';
        continue;
      }
      const gray = (0.3 * pixels[index] + 0.6 * pixels[index + 1] + 0.1 * pixels[index + 2]) / 255;
      output += charset[Math.min(charset.length - 1, Math.floor((1 - gray) * charset.length))];
    }
    output += '\n';
  }
  pre.textContent = output;
}

export default function ASCIIText({
  text = 'David!',
  enableWaves = true,
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 30;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const textCanvas = document.createElement('canvas');
    const textContext = textCanvas.getContext('2d');
    textContext.font = `600 ${textFontSize}px 'IBM Plex Mono', monospace`;
    const metrics = textContext.measureText(text);
    textCanvas.width = Math.ceil(metrics.width) + 20;
    textCanvas.height = Math.ceil(textFontSize * 1.2);
    textContext.font = `600 ${textFontSize}px 'IBM Plex Mono', monospace`;
    textContext.fillStyle = textColor;
    textContext.fillText(text, 10, textFontSize);
    const texture = new THREE.CanvasTexture(textCanvas);
    texture.minFilter = THREE.NearestFilter;
    const geometry = new THREE.PlaneGeometry(planeBaseHeight * (textCanvas.width / textCanvas.height), planeBaseHeight, 36, 36);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: { uTime: { value: 0 }, uTexture: { value: texture }, uEnableWaves: { value: enableWaves ? 1 : 0 } },
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const asciiCanvas = document.createElement('canvas');
    asciiCanvas.rendererCanvas = renderer.domElement;
    const asciiContext = asciiCanvas.getContext('2d');
    const pre = document.createElement('pre');
    pre.className = 'ascii-text-overlay';
    container.appendChild(pre);
    const resize = () => { const nextWidth = Math.max(1, container.clientWidth); const nextHeight = Math.max(1, container.clientHeight); camera.aspect = nextWidth / nextHeight; camera.updateProjectionMatrix(); renderer.setSize(nextWidth, nextHeight); };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    let frame = 0;
    const animate = (time) => { material.uniforms.uTime.value = time * 0.001; renderer.render(scene, camera); renderAscii(pre, asciiCanvas, asciiContext, container.clientWidth, container.clientHeight, asciiFontSize); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(frame); resizeObserver.disconnect(); geometry.dispose(); material.dispose(); texture.dispose(); renderer.dispose(); container.removeChild(renderer.domElement); container.removeChild(pre); };
  }, [text, enableWaves, asciiFontSize, textFontSize, textColor, planeBaseHeight]);

  return (
    <div ref={containerRef} className="ascii-text-container" aria-hidden="true">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap'); .ascii-text-container { position: relative; width: 100%; height: 100%; overflow: hidden; } .ascii-text-container canvas { position: absolute; inset: 0; width: 100%; height: 100%; image-rendering: pixelated; } .ascii-text-overlay { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; margin: 0; overflow: hidden; color: #a71d31; opacity: 1; font: 600 ${asciiFontSize}px/1em 'IBM Plex Mono', monospace; white-space: pre; user-select: none; }`}</style>
    </div>
  );
}