import { C } from '../theme.js';
import { data } from '../data.js';
import { Logo } from './ui.jsx';

const NAV = [['topo', 'Início'], ['servicos', 'Serviços'], ['projetos', 'Projetos'], ['depoimentos', 'Depoimentos'], ['contato', 'Contato']];

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 40 }}>
        <div>
          <Logo />
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.6, marginTop: 16, maxWidth: 300 }}>
            Desenvolvedor Web — sites profissionais, landing pages e sistemas sob medida para o seu negócio.
          </p>
        </div>
        <div>
          <h4 style={{ color: C.muted, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 16px', fontFamily: C.mono }}>Navegação</h4>
          <div style={{ display: 'grid', gap: 10 }}>
            {NAV.map(([id, l]) => (
              <a key={id} href={`#${id}`} style={{ color: C.text, fontSize: 15 }}
                onMouseEnter={(e) => e.currentTarget.style.color = C.mint}
                onMouseLeave={(e) => e.currentTarget.style.color = C.text}>{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ color: C.muted, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 16px', fontFamily: C.mono }}>Redes</h4>
          <div style={{ display: 'grid', gap: 10 }}>
            {data.channels.map((c) => (
              <a key={c.key} href={c.href} style={{ color: C.text, fontSize: 15 }}
                onMouseEnter={(e) => e.currentTarget.style.color = C.mint}
                onMouseLeave={(e) => e.currentTarget.style.color = C.text}>{c.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1120, margin: '40px auto 0', padding: '32px 24px', borderTop: `1px solid ${C.border}`,
        display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', color: C.muted, fontSize: 13, fontFamily: C.mono }}>
        <span>© {new Date().getFullYear()} <span style={{ color: C.mint }}>{data.brand}</span> · Todos os direitos reservados</span>
        <span>{data.person} · {data.location}</span>
      </div>
    </footer>
  );
}
