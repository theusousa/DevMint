import { C } from '../theme.js';
import { data } from '../data.js';
import { Section, Heading, Tag, Rise } from './ui.jsx';

function Mockup({ title }) {
  const initials = title.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <div style={{ height: 170, borderBottom: `1px solid ${C.border}`, background: 'linear-gradient(135deg, #141414, #0a0a0a)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(13,255,122,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,255,122,.05) 1px, transparent 1px)',
        backgroundSize: '22px 22px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,.35)', position: 'relative' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 8, flex: 1, height: 16, borderRadius: 5, background: 'rgba(255,255,255,.05)',
          fontFamily: C.mono, fontSize: 10, color: C.muted, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          devmint.dev/{title.toLowerCase().replace(/\s+/g, '-')}
        </span>
      </div>
      <div style={{ position: 'relative', height: 'calc(100% - 34px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: C.mono, fontWeight: 700, fontSize: 44, color: C.mint, textShadow: '0 0 24px rgba(13,255,122,.4)', letterSpacing: 2 }}>{initials}</span>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <Section id="projetos" reveal={false}>
      <Rise><Heading eyebrow="Projetos">Projetos recentes</Heading></Rise>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
        {data.projects.map((p, i) => (
          <Rise key={p.t} delay={i * 80} style={{ height: '100%' }}>
            <div className="glow-card" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', height: '100%' }}>
              <Mockup title={p.t} />
              <div style={{ padding: 22 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 19, color: C.text }}>{p.t}</h3>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, margin: '0 0 14px' }}>{p.d}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
                <a href={p.link} style={{ color: C.mint, fontSize: 14, fontFamily: C.mono }}>saiba mais →</a>
              </div>
            </div>
          </Rise>
        ))}
      </div>
    </Section>
  );
}
