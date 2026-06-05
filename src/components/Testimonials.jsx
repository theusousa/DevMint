import { C } from '../theme.js';
import { data } from '../data.js';
import { Section, Heading, Rise } from './ui.jsx';

export function Testimonials() {
  return (
    <Section id="depoimentos" reveal={false}>
      <Rise><Heading eyebrow="Depoimentos" center>O que dizem os clientes</Heading></Rise>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
        {data.testimonials.map((t, i) => (
          <Rise key={t.name} delay={i * 90} style={{ height: '100%' }}>
            <div className="glow-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, height: '100%' }}>
              <div style={{ color: C.mint, fontSize: 16, letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
              <p style={{ color: C.text, fontSize: 16, lineHeight: 1.7, margin: '0 0 24px' }}>{t.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(13,255,122,.12)', color: C.mint,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: C.mono }}>{t.initials}</span>
                <div>
                  <div style={{ fontWeight: 700, color: C.text }}>{t.name}</div>
                  <div style={{ color: C.muted, fontSize: 13 }}>{t.role}</div>
                </div>
              </div>
            </div>
          </Rise>
        ))}
      </div>
    </Section>
  );
}
