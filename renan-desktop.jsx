const { useState, useEffect, useRef } = React;

const C = {
  bg: '#0a0a0a',
  surface: '#101010',
  surface2: '#161616',
  border: '#222222',
  text: '#f2f2f2',
  muted: '#8a8a8a',
  mint: '#0dff7a',
  mono: "'IBM Plex Mono', monospace",
};

const WA_LINK = 'https://wa.me/5562993828137';

const data = {
  brand: 'DevMint',
  person: 'Matheus Renan',
  location: 'Goiânia, Brasil',
  role: 'Desenvolvedor Web',
  whatsappLabel: '(62) 99382-8137',
  whatsapp: WA_LINK,
  channels: [
    { key: 'whatsapp', label: 'WhatsApp', value: '(62) 99382-8137', href: WA_LINK, color: '#25D366' },
    { key: 'mail', label: 'E-mail', value: 'em breve', href: '#contato', color: '#3a3a3a' },
    { key: 'instagram', label: 'Instagram', value: 'em breve', href: '#contato', color: '#E1306C' },
    { key: 'linkedin', label: 'LinkedIn', value: 'em breve', href: '#contato', color: '#0A66C2' },
  ],
  services: [
    { icon: '◰', t: 'Sites institucionais', d: 'Presença online profissional, rápida e otimizada para o Google.' },
    { icon: '◳', t: 'Landing pages', d: 'Páginas de conversão feitas para gerar leads e vendas.' },
    { icon: '◱', t: 'Sistemas web', d: 'Aplicações e painéis sob medida para o seu processo.' },
    { icon: '◲', t: 'Lojas virtuais', d: 'E-commerce com carrinho, pagamento e gestão integrada.' },
  ],
  projects: [
    { t: 'Royal Barbearia', d: 'Site com agendamento online que dobrou as marcações.', tags: ['Site', 'Agenda'], link: '#' },
    { t: 'Pontual Tecnologia', d: 'Sistema interno de gestão entregue antes do prazo.', tags: ['Sistema', 'API'], link: '#' },
    { t: 'Clínica Bem', d: 'Landing page que triplicou a captação de leads.', tags: ['Landing', 'SEO'], link: '#' },
    { t: 'NextShop', d: 'Loja virtual com checkout e painel administrativo.', tags: ['E-commerce', 'React'], link: '#' },
  ],
  testimonials: [
    { name: 'Mariana Souza', role: 'Proprietária · Royal Barbearia', initials: 'MS', text: 'O Matheus entendeu exatamente o que eu queria. O site ficou lindo e em menos de um mês os agendamentos online dobraram.' },
    { name: 'Carlos Mendes', role: 'Diretor · Pontual Tecnologia', initials: 'CM', text: 'Profissional excelente. Entregou o sistema antes do prazo, com tudo funcionando perfeitamente e suporte rápido.' },
    { name: 'Juliana Ferreira', role: 'Gerente · Clínica Bem', initials: 'JF', text: 'A landing page da DevMint transformou nosso marketing. Captamos 3x mais leads no primeiro mês.' },
  ],
  serviceOptions: ['Site institucional', 'Landing page', 'Sistema / Aplicação', 'Loja virtual', 'Outro'],
};

function Icon({ name, size = 20, color = '#fff' }) {
  const p = {
    whatsapp: 'M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.042zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
    mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    instagram: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.39.2-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.28.81-.32 1.71C3.21 8.48 3.2 8.85 3.2 12s.01 3.52.07 4.76c.04.9.2 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.2 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.2-1.39-.32-1.71a2.85 2.85 0 00-.69-1.06 2.85 2.85 0 00-1.06-.69c-.32-.12-.81-.28-1.71-.32C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1012 17a4.94 4.94 0 000-9.88zm0 8.14A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4zm6.3-8.34a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z',
    linkedin: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  }[name];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true"><path d={p} /></svg>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Section({ id, children, style }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className="reveal"
      style={{ maxWidth: 1120, margin: '0 auto', padding: '90px 24px', ...style }}>
      {children}
    </section>
  );
}

function Heading({ eyebrow, children, center }) {
  return (
    <div style={{ marginBottom: 44, textAlign: center ? 'center' : 'left' }}>
      <span style={{ fontFamily: C.mono, color: C.mint, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' }}>— {eyebrow}</span>
      <h2 style={{ margin: '14px auto 0', fontSize: 42, fontWeight: 800, color: C.text, lineHeight: 1.1, maxWidth: center ? 720 : 'none' }}>{children}</h2>
    </div>
  );
}

function Button({ children, variant = 'primary', href = '#', style, ...rest }) {
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

function Tag({ children }) {
  return (
    <span style={{ fontFamily: C.mono, fontSize: 12, color: C.mint, border: `1px solid ${C.border}`,
      padding: '4px 10px', borderRadius: 6, background: 'rgba(13,255,122,.05)' }}>{children}</span>
  );
}

function Logo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 34, height: 34, borderRadius: 9, background: C.mint, color: '#000',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: C.mono, fontWeight: 700, fontSize: 14 }}>&lt;/&gt;</span>
      <span style={{ fontWeight: 800, fontSize: 20 }}>Dev<span style={{ color: C.mint }}>Mint</span></span>
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['topo', 'Início'], ['servicos', 'Serviços'], ['portfolio', 'Portfólio'], ['depoimentos', 'Depoimentos'], ['contato', 'Contato']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,10,.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`, transition: 'all .25s' }}>
      <nav style={{ maxWidth: 1120, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <a href="#topo" aria-label="DevMint — início"><Logo /></a>
        <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
          {links.map(([id, l]) => (
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

function Hero() {
  return (
    <Section id="topo" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 50, alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: C.mono, color: C.mint, fontSize: 14, letterSpacing: 1 }}>— {data.role}</span>
          <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.08, margin: '16px 0 18px', color: C.text }}>
            Sites e sistemas sob medida para o <span style={{ color: C.mint }}>seu negócio</span>
            <span style={{ color: C.mint, animation: 'blink 1s step-end infinite' }}>_</span>
          </h1>
          <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.6, maxWidth: 480 }}>
            Sites profissionais, landing pages e sistemas que carregam rápido e geram resultado. Do planejamento ao deploy.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
            <Button href="#contato">Solicitar orçamento →</Button>
            <Button href="#portfolio" variant="ghost">Ver portfólio</Button>
          </div>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
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

function Services() {
  return (
    <Section id="servicos">
      <Heading eyebrow="Serviços">O que eu faço</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
        {data.services.map((s) => (
          <div key={s.t} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 26, transition: 'border-color .2s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = C.mint}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}>
            <div style={{ fontSize: 30, color: C.mint }}>{s.icon}</div>
            <h3 style={{ margin: '14px 0 8px', fontSize: 18, color: C.text }}>{s.t}</h3>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Portfolio() {
  return (
    <Section id="portfolio">
      <Heading eyebrow="Portfólio">Projetos recentes</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
        {data.projects.map((p) => (
          <div key={p.t} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', transition: 'transform .2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ height: 150, background: 'linear-gradient(135deg, #141414, #0a0a0a)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: C.mono, color: C.mint, fontSize: 30, opacity: .5 }}>&lt;/&gt;</span>
            </div>
            <div style={{ padding: 22 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 19, color: C.text }}>{p.t}</h3>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, margin: '0 0 14px' }}>{p.d}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
              <a href={p.link} style={{ color: C.mint, fontSize: 14, fontFamily: C.mono }}>saiba mais →</a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section id="depoimentos">
      <Heading eyebrow="Depoimentos" center>O que dizem os clientes</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
        {data.testimonials.map((t) => (
          <div key={t.name} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, position: 'relative' }}>
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
        ))}
      </div>
    </Section>
  );
}

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

function Contact() {
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

function Footer() {
  const nav = [['topo', 'Início'], ['servicos', 'Serviços'], ['portfolio', 'Portfólio'], ['depoimentos', 'Depoimentos'], ['contato', 'Contato']];
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
            {nav.map(([id, l]) => (
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
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px', marginTop: 40, borderTop: `1px solid ${C.border}`,
        display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', color: C.muted, fontSize: 13, fontFamily: C.mono }}>
        <span>© {new Date().getFullYear()} <span style={{ color: C.mint }}>{data.brand}</span> · Todos os direitos reservados</span>
        <span>{data.person} · {data.location}</span>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
      style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60, width: 58, height: 58, borderRadius: '50%',
        background: '#25D366', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37,211,102,.4)', transition: 'transform .15s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
      <Icon name="whatsapp" size={30} color="#fff" />
    </a>
  );
}

const GATE_CSS = `
@keyframes gateFlicker {0%,18%,22%,25%,53%,57%,100%{opacity:1;text-shadow:0 0 10px ${C.mint},0 0 26px rgba(13,255,122,.55)}20%,24%,55%{opacity:.4;text-shadow:none}}
@keyframes gateGlitch {0%{transform:translate(0)}20%{transform:translate(-4px,2px)}40%{transform:translate(4px,-2px)}60%{transform:translate(-2px,-1px)}80%{transform:translate(2px,1px)}100%{transform:translate(0)}}
@keyframes gateExit {to{opacity:0;transform:scale(1.12);filter:blur(8px)}}
@keyframes gateFadeZoom {from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(1.1)}}
@keyframes gateFade {to{opacity:0}}
@keyframes gateScan {from{background-position:0 0}to{background-position:0 100%}}
@keyframes curtainTop {to{transform:translateY(-100%)}}
@keyframes curtainBottom {to{transform:translateY(100%)}}
@keyframes gateSlide {to{transform:translateX(-100%)}}
@keyframes gateIris {from{clip-path:circle(150% at 50% 50%)}to{clip-path:circle(0% at 50% 50%)}}
@keyframes splitL {to{transform:translateX(-110%)}}
@keyframes splitR {to{transform:translateX(110%)}}
@keyframes gateCRT {0%{transform:scaleY(1) scaleX(1);opacity:1}50%{transform:scaleY(.012) scaleX(1);opacity:1}72%{transform:scaleY(.012) scaleX(.4);opacity:1}100%{transform:scaleY(.012) scaleX(0);opacity:0}}
@keyframes gatePortal {0%{transform:scale(0);opacity:.95}70%{opacity:.85}100%{transform:scale(10);opacity:0}}
@keyframes pixOut {to{opacity:0;transform:scale(.1)}}
@keyframes lock3d {0%{transform:rotateY(0) scale(1)}60%{transform:rotateY(360deg) scale(1.25)}100%{transform:rotateY(540deg) scale(1.4)}}
@keyframes scanSweep {0%{top:-5%}100%{top:105%}}
@keyframes gateBlink {50%{opacity:0}}
.gate-flicker {animation: gateFlicker 2.6s infinite}
@media (prefers-reduced-motion: reduce){.gate-flicker{animation:none!important}}
`;

const FX = {
  glitch:   { dur: 1150, dark: true,  cont: 'gateExit .55s ease .45s forwards', content: 'glitch' },
  fade:     { dur: 800,  dark: true,  cont: 'gateFadeZoom .7s ease forwards' },
  curtain:  { dur: 1000, dark: false, panels: 'curtain' },
  slide:    { dur: 900,  dark: true,  cont: 'gateSlide .9s cubic-bezier(.76,0,.24,1) forwards' },
  iris:     { dur: 950,  dark: true,  cont: 'gateIris .95s cubic-bezier(.7,0,.3,1) forwards' },
  split:    { dur: 1000, dark: false, panels: 'split' },
  scan:     { dur: 1550, dark: true,  cont: 'gateFade .45s ease 1.05s forwards', extra: 'scan' },
  crt:      { dur: 1000, dark: true,  cont: 'gateCRT .95s cubic-bezier(.6,0,.4,1) forwards' },
  portal:   { dur: 950,  dark: true,  cont: 'gateFade .5s ease .4s forwards', extra: 'portal' },
  pixel:    { dur: 1200, dark: false, panels: 'pixel' },
  matrix:   { dur: 1550, dark: true,  cont: 'gateFade .7s ease .8s forwards', extra: 'matrix' },
  boot:     { dur: 2400, dark: true,  cont: 'gateFade .55s ease 1.85s forwards', seq: 'boot' },
  decrypt:  { dur: 1700, dark: true,  cont: 'gateFadeZoom .55s ease 1.15s forwards', seq: 'decrypt' },
  progress: { dur: 1800, dark: true,  cont: 'gateFade .55s ease 1.25s forwards', seq: 'progress' },
  lock3d:   { dur: 1500, dark: true,  cont: 'gateFade .55s ease 1s forwards', icon: 'lock3d 1s ease forwards' },
};

function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    const fontSize = 14;
    let w, h, drops;
    const chars = 'アイウエ01<>{}[]#$%&*+=ABCDEF'.split('');
    const resize = () => { w = cv.width = window.innerWidth; h = cv.height = window.innerHeight; drops = new Array(Math.floor(w / fontSize)).fill(0).map(() => Math.random() * -40); };
    resize();
    const id = setInterval(() => {
      ctx.fillStyle = 'rgba(5,5,5,0.10)'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = C.mint; ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 55);
    window.addEventListener('resize', resize);
    return () => { clearInterval(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: .55 }} />;
}

function BootLog() {
  const lines = ['> init devmint.core', '> verificando credenciais...', '> conexão segura estabelecida', '> carregando interface...', '> ACESSO CONCEDIDO ✓'];
  const [n, setN] = useState(0);
  useEffect(() => { let i = 0; const id = setInterval(() => { i++; setN(i); if (i >= lines.length) clearInterval(id); }, 320); return () => clearInterval(id); }, []);
  return (
    <div style={{ fontFamily: C.mono, fontSize: 14, color: C.mint, textAlign: 'left', minHeight: 134, width: 290, maxWidth: '82vw', margin: '0 auto' }}>
      {lines.slice(0, n).map((l, i) => (
        <div key={i} style={{ marginBottom: 7, opacity: i === n - 1 ? 1 : .6 }}>
          {l}{i === n - 1 && <span style={{ animation: 'gateBlink 1s step-end infinite' }}>_</span>}
        </div>
      ))}
    </div>
  );
}

function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => { let v = 0; const id = setInterval(() => { v = Math.min(100, v + Math.random() * 16 + 4); setP(Math.round(v)); if (v >= 100) clearInterval(id); }, 110); return () => clearInterval(id); }, []);
  return (
    <div style={{ width: 290, maxWidth: '82vw', margin: '0 auto' }}>
      <div style={{ fontFamily: C.mono, fontSize: 13, color: C.mint, marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
        <span>carregando módulos</span><span>{p}%</span>
      </div>
      <div style={{ height: 10, background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: p + '%', background: C.mint, transition: 'width .12s linear', boxShadow: `0 0 14px ${C.mint}` }} />
      </div>
    </div>
  );
}

function DecryptText({ text }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    const pool = 'ABCDEF0123456789<>#$%&@!?/';
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealed = frame / 2;
      setOut(text.split('').map((ch, i) => ch === ' ' ? ' ' : i < revealed ? ch : pool[Math.floor(Math.random() * pool.length)]).join(''));
      if (revealed >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text]);
  return <React.Fragment>{out}</React.Fragment>;
}

function PixelGrid({ active }) {
  const cols = 18, rows = 11;
  const delays = useRef(Array.from({ length: cols * rows }, () => (Math.random() * 0.6).toFixed(2)));
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gridTemplateRows: `repeat(${rows},1fr)` }}>
      {delays.current.map((d, i) => (
        <div key={i} style={{ background: '#050505', animation: active ? `pixOut .45s ease ${d}s forwards` : 'none' }} />
      ))}
    </div>
  );
}

function CurtainPanels({ unlocking }) {
  return (
    <React.Fragment>
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: '#050505', borderBottom: `1px solid ${C.mint}`, boxShadow: '0 6px 30px rgba(13,255,122,.3)', animation: unlocking ? 'curtainTop .95s cubic-bezier(.76,0,.24,1) forwards' : 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: '#050505', borderTop: `1px solid ${C.mint}`, boxShadow: '0 -6px 30px rgba(13,255,122,.3)', animation: unlocking ? 'curtainBottom .95s cubic-bezier(.76,0,.24,1) forwards' : 'none' }} />
    </React.Fragment>
  );
}

function SplitPanels({ unlocking }) {
  return (
    <React.Fragment>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: '#050505', clipPath: 'polygon(0 0,56% 0,44% 100%,0 100%)', animation: unlocking ? 'splitL .95s cubic-bezier(.76,0,.24,1) forwards' : 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: '#050505', clipPath: 'polygon(56% 0,100% 0,100% 100%,44% 100%)', animation: unlocking ? 'splitR .95s cubic-bezier(.76,0,.24,1) forwards' : 'none' }} />
    </React.Fragment>
  );
}

function Gate() {
  const [status, setStatus] = useState('locked'); // locked | unlocking | done
  const [effect, setEffect] = useState('glitch');
  const cfg = FX[effect];
  const unlock = () => { if (status !== 'locked') return; setStatus('unlocking'); setTimeout(() => setStatus('done'), cfg.dur); };
  if (status === 'done') return null;
  const unlocking = status === 'unlocking';

  const containerStyle = { position: 'fixed', inset: 0, zIndex: 100, overflow: 'hidden', transformOrigin: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    background: cfg.dark ? '#050505' : 'transparent' };
  if (unlocking && cfg.cont) containerStyle.animation = cfg.cont;

  let contentAnim = 'none';
  if (unlocking) { if (cfg.content === 'glitch') contentAnim = 'gateGlitch .22s steps(2,end) 3'; else if (cfg.panels) contentAnim = 'gateFade .3s ease forwards'; }
  const seq = unlocking ? cfg.seq : null;

  const effects = [
    ['glitch', 'Glitch neon'], ['fade', 'Fade + zoom'], ['curtain', 'Cortina'], ['slide', 'Slide'],
    ['iris', 'Íris'], ['split', 'Split diagonal'], ['scan', 'Scanner'], ['crt', 'CRT power-off'],
    ['portal', 'Portal flash'], ['pixel', 'Pixel dissolve'], ['matrix', 'Matrix rain'], ['boot', 'Boot terminal'],
    ['decrypt', 'Decrypt'], ['progress', 'Progress bar'], ['lock3d', 'Cadeado 3D'],
  ];

  return (
    <div style={containerStyle}>
      <style>{GATE_CSS}</style>

      {effect === 'matrix' && <MatrixRain />}
      {cfg.panels === 'curtain' && <CurtainPanels unlocking={unlocking} />}
      {cfg.panels === 'split' && <SplitPanels unlocking={unlocking} />}
      {cfg.panels === 'pixel' && <PixelGrid active={unlocking} />}

      {cfg.dark && effect !== 'matrix' && (
        <React.Fragment>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .4,
            background: 'repeating-linear-gradient(0deg, rgba(13,255,122,.05) 0 1px, transparent 1px 3px)',
            backgroundSize: '100% 200%', animation: 'gateScan 8s linear infinite' }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 45%, rgba(13,255,122,.10), transparent 60%)' }} />
        </React.Fragment>
      )}

      {unlocking && cfg.extra === 'scan' && (
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, height: 3, background: C.mint,
          boxShadow: `0 0 20px ${C.mint},0 0 40px ${C.mint}`, animation: 'scanSweep 1s ease-in-out forwards' }} />
      )}
      {unlocking && cfg.extra === 'portal' && (
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 160, height: 160,
          marginLeft: -80, marginTop: -80, borderRadius: '50%',
          background: 'radial-gradient(circle, #fff, #0dff7a 40%, rgba(13,255,122,.1) 70%)', animation: 'gatePortal .85s ease forwards' }} />
      )}

      <div style={{ textAlign: 'center', position: 'relative', padding: 24, zIndex: 2, animation: contentAnim }}>
        <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 18, filter: `drop-shadow(0 0 16px ${C.mint})`,
          animation: unlocking && cfg.icon ? cfg.icon : 'none' }}>
          {unlocking ? '🔓' : '🔒'}
        </div>
        <div style={{ fontFamily: C.mono, color: C.mint, fontSize: 13, letterSpacing: 2, marginBottom: 14 }}>// devmint.access</div>
        <h1 className="gate-flicker" style={{ fontFamily: C.mono, color: C.mint, fontSize: 34, fontWeight: 600, margin: '0 0 16px', letterSpacing: 3 }}>
          {effect === 'decrypt' && unlocking ? <DecryptText text="ACESSO LIBERADO" /> : (unlocking ? 'ACESSO LIBERADO' : 'ACESSO RESTRITO')}
        </h1>

        {seq === 'boot' ? <BootLog />
          : seq === 'progress' ? <ProgressBar />
          : seq === 'decrypt' ? <p style={{ color: C.muted, fontSize: 15, margin: 0, fontFamily: C.mono }}>descriptografando dados...</p>
          : (
            <React.Fragment>
              <p style={{ color: C.muted, fontSize: 15, margin: '0 0 32px' }}>
                {unlocking ? 'Inicializando experiência...' : 'Clique para liberar a experiência DevMint.'}
              </p>
              <button type="button" onClick={unlock} disabled={unlocking} style={{
                fontFamily: C.mono, fontWeight: 700, fontSize: 16, letterSpacing: 1, padding: '15px 34px',
                background: unlocking ? 'transparent' : C.mint, color: unlocking ? C.mint : '#000',
                border: `1px solid ${C.mint}`, borderRadius: 12, cursor: unlocking ? 'default' : 'pointer',
                boxShadow: unlocking ? 'none' : '0 0 30px rgba(13,255,122,.35)', transition: 'transform .15s' }}
                onMouseEnter={(e) => { if (!unlocking) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                {unlocking ? '» liberando...' : '» LIBERAR ACESSO'}
              </button>
            </React.Fragment>
          )}
      </div>

      {status === 'locked' && (
        <div style={{ position: 'absolute', bottom: 22, zIndex: 3, display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', maxWidth: 720, padding: '0 16px' }}>
          <span style={{ fontFamily: C.mono, fontSize: 12, color: C.muted, width: '100%', textAlign: 'center', marginBottom: 6 }}>efeito — clique e teste:</span>
          {effects.map(([k, l]) => (
            <button type="button" key={k} onClick={() => setEffect(k)} style={{
              fontFamily: C.mono, fontSize: 12, padding: '6px 11px', borderRadius: 8, cursor: 'pointer',
              background: effect === k ? C.mint : 'transparent', color: effect === k ? '#000' : C.muted,
              border: `1px solid ${effect === k ? C.mint : C.border}` }}>{l}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <Gate />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

window.RenanDesktop = App;
