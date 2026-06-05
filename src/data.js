import { WA_LINK } from './theme.js';

export const data = {
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
  stack: ['React', 'Node.js', 'Java', 'TypeScript', 'PostgreSQL', 'API REST', 'Cloud', 'CI/CD', 'HTML', 'CSS'],
  stats: [
    { n: '50+', l: 'projetos entregues' },
    { n: '4+', l: 'anos de experiência' },
    { n: '99,9%', l: 'uptime garantido' },
    { n: '24h', l: 'tempo de resposta' },
  ],
  serviceOptions: ['Site institucional', 'Landing page', 'Sistema / Aplicação', 'Loja virtual', 'Outro'],
  process: [
    { t: 'Briefing', d: 'Entendemos seu negócio, objetivos e referências em uma conversa.' },
    { t: 'Proposta & plano', d: 'Definimos escopo, prazo e investimento — tudo transparente.' },
    { t: 'Desenvolvimento', d: 'Construímos com entregas parciais e seu acompanhamento.' },
    { t: 'Entrega & suporte', d: 'Publicamos no ar e seguimos com suporte contínuo.' },
  ],
};
