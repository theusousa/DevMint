import { C } from '../theme.js';
import { data } from '../data.js';
import { Section, Heading, Rise } from './ui.jsx';

export function Services() {
  return (
    <Section id="servicos" reveal={false}>
      <Rise><Heading eyebrow="Serviços">O que eu faço</Heading></Rise>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
        {data.services.map((s, i) => (
          <Rise key={s.t} delay={i * 80} style={{ height: '100%' }}>
            <div className="glow-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 26, height: '100%' }}>
              <div style={{ fontSize: 30, color: C.mint }}>{s.icon}</div>
              <h3 style={{ margin: '14px 0 8px', fontSize: 18, color: C.text }}>{s.t}</h3>
              <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
            </div>
          </Rise>
        ))}
      </div>
    </Section>
  );
}
