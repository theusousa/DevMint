import { useEffect, useRef, useState } from 'react';
import { C } from '../theme.js';

export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

export function Section({ id, children, style, reveal = true }) {
  const ref = useReveal();
  return (
    <section id={id} ref={reveal ? ref : undefined} className={reveal ? 'reveal' : undefined}
      style={{ maxWidth: 1120, margin: '0 auto', padding: '90px 24px', position: 'relative', ...style }}>
      {children}
    </section>
  );
}

export function Rise({ children, delay = 0, style }) {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={{ animationDelay: `${delay}ms`, ...style }}>{children}</div>;
}

export function Heading({ eyebrow, children, center }) {
  return (
    <div style={{ marginBottom: 44, textAlign: center ? 'center' : 'left' }}>
      <span style={{ fontFamily: C.mono, color: C.mint, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' }}>— {eyebrow}</span>
      <h2 style={{ margin: '14px auto 0', fontSize: 42, fontWeight: 800, color: C.text, lineHeight: 1.1, maxWidth: center ? 720 : 'none' }}>{children}</h2>
    </div>
  );
}

export function Counter({ value }) {
  const ref = useRef(null);
  const [disp, setDisp] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = String(value).match(/^([\d.,]+)(.*)$/);
    if (!m) { setDisp(value); return; }
    const numStr = m[1], suffix = m[2];
    const sep = numStr.includes(',') ? ',' : '.';
    const decimals = (numStr.split(/[.,]/)[1] || '').length;
    const target = parseFloat(numStr.replace(',', '.'));
    setDisp((0).toFixed(decimals).replace('.', sep) + suffix);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const t0 = performance.now(), dur = 1300;
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisp((target * eased).toFixed(decimals).replace('.', sep) + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{disp}</span>;
}

export function Button({ children, variant = 'primary', href = '#', style, ...rest }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 12,
    fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'transform .15s, box-shadow .15s', border: '1px solid',
  };
  const styles = variant === 'primary'
    ? { ...base, background: C.mint, color: '#000', borderColor: C.mint }
    : { ...base, background: 'transparent', color: C.text, borderColor: C.border };
  return (
    <a href={href} style={{ ...styles, ...style }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; if (variant === 'primary') e.currentTarget.style.boxShadow = '0 10px 28px rgba(13,255,122,.30)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
      {...rest}>{children}</a>
  );
}

export function Tag({ children }) {
  return (
    <span style={{ fontFamily: C.mono, fontSize: 12, color: C.mint, border: `1px solid ${C.border}`,
      padding: '4px 10px', borderRadius: 6, background: 'rgba(13,255,122,.05)' }}>{children}</span>
  );
}

export function Logo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 34, height: 34, borderRadius: 9, background: C.mint, color: '#000',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: C.mono, fontWeight: 700, fontSize: 14 }}>&lt;/&gt;</span>
      <span style={{ fontWeight: 800, fontSize: 20 }}>Dev<span style={{ color: C.mint }}>Mint</span></span>
    </span>
  );
}
