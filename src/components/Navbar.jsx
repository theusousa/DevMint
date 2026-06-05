import { useState, useEffect } from 'react';
import { C } from '../theme.js';
import { Button, Logo } from './ui.jsx';

const LINKS = [['topo', 'Início'], ['servicos', 'Serviços'], ['projetos', 'Projetos'], ['depoimentos', 'Depoimentos'], ['contato', 'Contato']];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,10,.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`, transition: 'all .25s' }}>
      <nav style={{ maxWidth: 1120, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <a href="#topo" aria-label="DevMint — início"><Logo /></a>
        <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
          {LINKS.map(([id, l]) => (
            <a key={id} href={`#${id}`} style={{ color: C.muted, fontSize: 15, fontWeight: 500 }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.text}
              onMouseLeave={(e) => e.currentTarget.style.color = C.muted}>{l}</a>
          ))}
          <Button href="#contato" style={{ padding: '10px 18px', fontSize: 14 }}>Solicitar orçamento →</Button>
        </div>
      </nav>
    </header>
  );
}
