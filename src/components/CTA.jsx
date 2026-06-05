import { C } from '../theme.js';
import { data } from '../data.js';
import { Button, Rise } from './ui.jsx';

export function CTA() {
  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px 90px' }}>
      <Rise>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, border: `1px solid ${C.border}`,
          background: 'linear-gradient(135deg, rgba(13,255,122,.10), rgba(13,255,122,.02))', padding: '56px 32px', textAlign: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: '-45%', left: '50%', width: 520, height: 520, marginLeft: -260, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13,255,122,.20), transparent 70%)', pointerEvents: 'none' }} />
          <h2 style={{ position: 'relative', fontSize: 34, fontWeight: 800, color: C.text, margin: '0 0 12px' }}>
            Vamos tirar sua ideia do papel?
          </h2>
          <p style={{ position: 'relative', color: C.muted, fontSize: 17, margin: '0 0 28px' }}>
            Conte seu projeto e receba uma proposta sem compromisso.
          </p>
          <div style={{ position: 'relative', display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="#contato">Solicitar orçamento →</Button>
            <Button href={data.whatsapp} variant="ghost">Chamar no WhatsApp</Button>
          </div>
        </div>
      </Rise>
    </div>
  );
}
