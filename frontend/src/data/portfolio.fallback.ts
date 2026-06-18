import type { PortfolioData } from '@/types/portfolio'

/** Fallback offline — mesmo conteúdo servido por /api/v1/public/portfolio/ */
export const PORTFOLIO_FALLBACK: PortfolioData = {
  profile: {
    name: 'Daniel José do Amaral Filho',
    title: 'Desenvolvedor Sênior | Tech Lead | Arquiteto de Sistemas',
    location: 'Jaboatão dos Guararapes – PE (Remoto ou Recife/PE)',
    phone: '(81) 9 8447-1087',
    email: 'contato@denky.dev.br',
    website: 'https://denky.dev.br',
    github: 'https://github.com/D3NKYT0',
    summary:
      'Desenvolvedor Sênior com forte atuação em arquitetura de sistemas, liderança técnica e ' +
      'desenvolvimento de aplicações escaláveis. Especialista em Python, JavaScript, bancos SQL e ' +
      'NoSQL, padrões de projeto e arquitetura de software. Experiência sólida em infraestrutura, ' +
      'redes e virtualização (Linux, MikroTik, Proxmox), atuando com visão completa de produto: ' +
      'da arquitetura ao deploy em produção.',
  },
  skills: [
    { name: 'Python', level: 95, icon: 'python', category: 'backend' },
    { name: 'Django', level: 90, icon: 'django', category: 'backend' },
    { name: 'Flask', level: 85, icon: 'flask', category: 'backend' },
    { name: 'FastAPI', level: 88, icon: 'fastapi', category: 'backend' },
    { name: 'JavaScript', level: 90, icon: 'js', category: 'frontend' },
    { name: 'React', level: 88, icon: 'react', category: 'frontend' },
    { name: 'HTML5 / CSS3', level: 92, icon: 'html', category: 'frontend' },
    { name: 'REST / Microsserviços', level: 90, icon: 'api', category: 'architecture' },
    { name: 'Clean Architecture', level: 92, icon: 'clean', category: 'architecture' },
    { name: 'SOLID / Design Patterns', level: 90, icon: 'solid', category: 'architecture' },
    { name: 'PostgreSQL', level: 90, icon: 'postgres', category: 'database' },
    { name: 'MySQL', level: 85, icon: 'mysql', category: 'database' },
    { name: 'MongoDB', level: 82, icon: 'mongo', category: 'database' },
    { name: 'Linux / Nginx / Gunicorn', level: 88, icon: 'linux', category: 'infra' },
    { name: 'Proxmox', level: 80, icon: 'proxmox', category: 'infra' },
    { name: 'MikroTik / Redes / VPN', level: 78, icon: 'network', category: 'infra' },
    { name: 'Docker', level: 85, icon: 'docker', category: 'infra' },
  ],
  experience: [
    {
      company: 'AGE – Agência de Empreendedorismo de Pernambuco',
      role: 'Assessor de TI | Tech Lead | Desenvolvedor Sênior',
      period: '3 anos',
      highlights: [
        'Liderança técnica dos projetos do órgão',
        'Arquitetura e manutenção dos sistemas institucionais',
        'Gestão e supervisão técnica de demandas críticas',
        'Melhorias estruturais e escalabilidade',
        'Atuação estratégica em decisões tecnológicas',
      ],
    },
    {
      company: 'Projetos Pessoais e Contratuais',
      role: 'Desenvolvedor Backend e Arquiteto',
      period: '3+ anos',
      highlights: [
        'Desenvolvimento de projetos pessoais e contratuais',
        'Estruturação de sistemas completos (backend + frontend)',
        'Deploy e gerenciamento de ambientes produtivos',
      ],
    },
  ],
  projects: [
    {
      name: 'PDL',
      description: 'Painel completo para jogos online',
      url: 'https://pdl.denky.dev.br/',
      color: '#e52521',
    },
    {
      name: 'Plataforma ABA',
      description: 'Sistema para gerenciamento de clínicas de terapia',
      url: 'https://plataformaaba.com/',
      color: '#049cd8',
    },
    {
      name: 'PROAGE',
      description: 'Sistema institucional AGE/PE',
      url: 'https://proage.age.pe.gov.br/login',
      color: '#43b047',
    },
    {
      name: 'PROGEF',
      description: 'Sistema institucional AGE/PE',
      url: 'https://progef.age.pe.gov.br/',
      color: '#fbd000',
    },
    {
      name: 'SUOPE',
      description: 'Sistema institucional AGE/PE',
      url: 'https://suope.age.pe.gov.br/',
      color: '#9b59b6',
    },
  ],
  education: [
    {
      title: 'Técnico em Web Design, Redes e Programação',
      institution: 'Formação técnica',
    },
  ],
  world_map: [
    { id: 'start', label: 'START', x: 0, icon: 'flag' },
    { id: 'about', label: 'SOBRE', x: 1, icon: 'castle' },
    { id: 'skills', label: 'SKILLS', x: 2, icon: 'block' },
    { id: 'experience', label: 'XP', x: 3, icon: 'pipe' },
    { id: 'projects', label: 'PROJETOS', x: 4, icon: 'star' },
    { id: 'contact', label: 'CONTATO', x: 5, icon: 'coin' },
  ],
}
