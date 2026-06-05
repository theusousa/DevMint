import { C } from '../theme.js';
import { Section, Button } from './ui.jsx';

export function Hero() {
  return (
    <Section id="topo" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: 40, left: '8%', width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,255,122,.14), transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 50, alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: C.mono, color: C.mint, fontSize: 14, letterSpacing: 1 }}>— Desenvolvedor Web</span>
          <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.08, margin: '16px 0 18px', color: C.text }}>
            Sites e sistemas sob medida para o{' '}
            <span style={{ background: 'linear-gradient(120deg, #0dff7a, #8affc6)', WebkitBackgroundClip: 'text',
              backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: C.mint }}>seu negócio</span>
            <span style={{ color: C.mint, animation: 'blink 1s step-end infinite' }}>_</span>
          </h1>
          <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.6, maxWidth: 480 }}>
            Sites profissionais, landing pages e sistemas que carregam rápido e geram resultado. Do planejamento ao deploy.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
            <Button href="#contato">Solicitar orçamento →</Button>
            <Button href="#projetos" variant="ghost">Ver projetos</Button>
          </div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,.45), 0 0 0 1px rgba(13,255,122,.12), 0 0 50px rgba(13,255,122,.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ fontFamily: C.mono, fontSize: 12, color: C.muted, marginLeft: 10 }}>devmint.js</span>
          </div>
          <pre style={{ fontFamily: C.mono, fontSize: 14, color: C.text, margin: 0, padding: 22, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
{`const projeto = {
  cliente: "sua empresa",
  entrega: "site sob medida",
  prazo: "combinado",
  resultado: `}<span style={{ color: C.mint }}>"mais clientes"</span>{`
};`}
          </pre>
        </div>
      </div>
    </Section>
  );
}
