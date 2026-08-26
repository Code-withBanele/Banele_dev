import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';

const srOnly = {
  position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px',
  overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0,
};

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [revealed, setRevealed] = useState(new Set());
  const [animating, setAnimating] = useState(false);
  const [decrypted, setDecrypted] = useState(animateOn !== 'click');
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const availableChars = useMemo(() => useOriginalCharsOnly
    ? [...new Set(text.split(''))].filter((char) => char !== ' ')
    : characters.split(''), [characters, text, useOriginalCharsOnly]);

  const scramble = useCallback((currentRevealed) => text.split('').map((char, index) => {
    if (char === ' ' || currentRevealed.has(index)) return char;
    return availableChars[Math.floor(Math.random() * availableChars.length)];
  }).join(''), [availableChars, text]);

  const order = useCallback(() => {
    const indices = [...Array(text.length).keys()];
    if (revealDirection === 'end') return indices.reverse();
    if (revealDirection !== 'center') return indices;
    const centered = [];
    let offset = 0;
    const middle = Math.floor(text.length / 2);
    while (centered.length < text.length) {
      const index = offset % 2 === 0 ? middle + offset / 2 : middle - Math.ceil(offset / 2);
      if (index >= 0 && index < text.length) centered.push(index);
      offset += 1;
    }
    return centered;
  }, [revealDirection, text.length]);

  const decrypt = useCallback(() => {
    clearInterval(intervalRef.current);
    setAnimating(true);
    setDecrypted(false);
    setRevealed(new Set());
    let iteration = 0;
    const revealOrder = order();
    intervalRef.current = setInterval(() => {
      setRevealed((previous) => {
        if (sequential) {
          const next = new Set(previous);
          if (next.size >= text.length) return previous;
          next.add(revealOrder[next.size]);
          setDisplayText(scramble(next));
          if (next.size >= text.length) {
            clearInterval(intervalRef.current);
            setAnimating(false);
            setDecrypted(true);
            setDisplayText(text);
          }
          return next;
        }
        iteration += 1;
        setDisplayText(iteration >= maxIterations ? text : scramble(previous));
        if (iteration >= maxIterations) {
          clearInterval(intervalRef.current);
          setAnimating(false);
          setDecrypted(true);
        }
        return previous;
      });
    }, speed);
  }, [maxIterations, order, scramble, sequential, speed, text]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        decrypt();
        setHasAnimated(true);
      }
    }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOn, decrypt, hasAnimated]);

  const events = animateOn === 'hover' || animateOn === 'inViewHover'
    ? { onMouseEnter: decrypt, onMouseLeave: () => { clearInterval(intervalRef.current); setAnimating(false); setDecrypted(true); setDisplayText(text); } }
    : animateOn === 'click' ? { onClick: () => { if (clickMode === 'once' && decrypted) return; decrypt(); } } : {};

  return (
    <motion.span ref={containerRef} className={parentClassName} style={{ display: 'inline', whiteSpace: 'pre-wrap' }} {...events} {...props}>
      <span style={srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => (
          <span key={`${char}-${index}`} className={revealed.has(index) || (!animating && decrypted) ? className : encryptedClassName}>{char}</span>
        ))}
      </span>
    </motion.span>
  );
}