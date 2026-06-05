import { useState } from 'react';
import { C } from '../theme.js';
import { data } from '../data.js';
import { Section } from './ui.jsx';
import { Icon } from './Icon.jsx';

function ChannelCard({ c }) {
  return (
    <a href={c.href} style={{ display: 'flex', alignItems: 'center', gap: 16, background: C.surface,
      border: `1px solid ${C.border}`, borderRadius: 14, padding: '16px 18px', transition: 'border-color .2s' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = C.mint}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}>
      <span style={{ width: 44, height: 44, borderRadius: 12, background: c.color, flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={c.key} size={22} color="#fff" />
      </span>
      <span>
        <span style={{ display: 'block', color: C.mint, fontSize: 13, fontFamily: C.mono }}>{c.label}</span>
        <span style={{ display: 'block', color: C.text, fontWeight: 700, fontSize: 16 }}>{c.value}</span>
      </span>
    </a>
  );
}

export function Contact() {
  const [status, setStatus] = useState('idle');
  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.website.value) return; // honeypot anti-spam
    setStatus('loading');
    // TODO: integrar Formspree/Web3Forms — trocar por fetch ao endpoint real.
    setTimeout(() => setStatus('success'), 800);
  };
  const field = { width: '100%', padding: '13px 15px', background: C.bg, border: `1px solid ${C.border}`,
    borderRadius: 10, color: C.text, fontSize: 15, fontFamily: 'inherit', outline: 'none' };
  const label = { display: 'block', fontSize: 13, color: C.muted, marginBottom: 7, fontWeight: 600 };
  return (
    <Section id="contato">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48, alignItems: 'start' }}>
        <div>
          <span style={{ fontFamily: C.mono, color: C.mint, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' }}>— Vamos conversar</span>
          <h2 style={{ margin: '14px 0 16px', fontSize: 44, fontWeight: 800, color: C.text, lineHeight: 1.1 }}>
            Pronto para começar <span style={{ color: C.mint }}>seu projeto?</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.7, maxWidth: 440, marginBottom: 28 }}>
            Me conta sua ideia pelo formulário ao lado, ou fale comigo direto pelos canais abaixo. Respondo todas as mensagens em até 24h.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {data.channels.map((c) => <ChannelCard key={c.key} c={c} />)}
          </div>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 30 }}>
          <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: C.text }}>Solicite um orçamento</h3>
          <p style={{ margin: '0 0 22px', color: C.muted, fontSize: 14 }}>Resposta em até 24h. Sem compromisso.</p>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16 }}>
            <input name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
              <div>
                <label style={label}>Nome</label>
                <input name="nome" required placeholder="Como posso te chamar?" style={field} />
              </div>
              <div>
                <label style={label}>E-mail</label>
                <input name="email" type="email" required placeholder="seu@email.com" style={field} />
              </div>
              <div>
                <label style={label}>WhatsApp</label>
                <input name="telefone" placeholder="(62) 99382-8137" style={field} />
              </div>
              <div>
                <label style={label}>Tipo de serviço</label>
                <select name="servico" aria-label="Tipo de serviço" defaultValue="" style={field}>
                  <option value="" disabled>Selecione...</option>
                  {data.serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={label}>Mensagem</label>
              <textarea name="mensagem" required rows={4} placeholder="Me conta um pouco sobre o seu projeto: objetivo, prazo, referências..." style={{ ...field, resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={status === 'loading'} style={{
              padding: '15px', background: C.mint, color: '#000', border: 'none', borderRadius: 12,
              fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: status === 'loading' ? .6 : 1 }}>
              {status === 'loading' ? 'Enviando...' : 'Enviar mensagem  →'}
            </button>
            <div aria-live="polite" style={{ textAlign: 'center', fontSize: 13, color: status === 'success' ? C.mint : C.muted, fontFamily: C.mono }}>
              {status === 'success' ? '✓ Mensagem enviada! Em breve retorno.' : '🔒 Suas informações ficam só comigo.'}
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
