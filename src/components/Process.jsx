import { C } from '../theme.js';
import { data } from '../data.js';
import { Section, Heading, Rise } from './ui.jsx';

export function Process() {
  return (
    <Section id="processo" reveal={false}>
      <Rise><Heading eyebrow="Processo" center>Como trabalhamos</Heading></Rise>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18 }}>
        {data.process.map((p, i) => (
          <Rise key={p.t} delay={i * 90} style={{ height: '100%' }}>
            <div className="glow-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 26, height: '100%' }}>
              <div style={{ fontFamily: C.mono, color: C.mint, fontSize: 22, fontWeight: 700 }}>0{i + 1}</div>
              <h3 style={{ margin: '12px 0 8px', fontSize: 18, color: C.text }}>{p.t}</h3>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{p.d}</p>
            </div>
          </Rise>
        ))}
      </div>
    </Section>
  );
}
