import { useEffect, useRef } from 'react';

export function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let w, h, parts, raf;
    const N = 60;
    const init = () => {
      w = cv.width = window.innerWidth;
      h = cv.height = window.innerHeight;
      parts = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4, vy: Math.random() * 0.25 + 0.04,
        a: Math.random() * 0.4 + 0.08,
      }));
    };
    init();
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.vy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,255,122,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', init);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(13,255,122,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(13,255,122,.035) 1px, transparent 1px)',
        backgroundSize: '46px 46px',
        maskImage: 'radial-gradient(circle at 50% 25%, #000 0%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 25%, #000 0%, transparent 78%)' }} />
      <div style={{ position: 'absolute', top: '-12%', left: '-6%', width: 540, height: 540, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,255,122,.16), transparent 70%)', filter: 'blur(24px)', animation: 'floatGlow 16s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-16%', right: '-8%', width: 660, height: 660, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,255,122,.11), transparent 70%)', filter: 'blur(24px)', animation: 'floatGlow 22s ease-in-out infinite reverse' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
    </div>
  );
}
