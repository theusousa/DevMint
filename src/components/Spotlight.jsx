import { useEffect, useRef } from 'react';

export function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => { el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`; };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return (
    <div ref={ref} aria-hidden="true" style={{
      position: 'fixed', top: 0, left: 0, width: 600, height: 600, borderRadius: '50%',
      pointerEvents: 'none', zIndex: 40, mixBlendMode: 'screen', transition: 'transform .12s ease-out',
      background: 'radial-gradient(circle, rgba(13,255,122,.08), transparent 60%)' }} />
  );
}
