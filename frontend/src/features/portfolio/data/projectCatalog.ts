import type { Project } from '@/types/portfolio'

export const ADDITIONAL_PROJECTS: Project[] = [
  {
    name: '?',
    description: 'Um projeto secreto aguarda depois da missão CO-OP.',
    color: '#c084fc',
    category: 'SECRET / BOSS',
    actionLabel: 'FASE SECRETA',
  },
  {
    name: 'Temas PDL',
    description: 'Coleção de temas customizados para painéis de servidores Lineage 2.',
    color: '#f97316',
    category: 'FRONTEND / DESIGN',
  },
  {
    name: 'Launchers PDL / L2 Iron',
    description: 'Launchers e builder WPF/.NET para patches e atualização do Lineage 2.',
    color: '#8b5cf6',
    category: 'C# / .NET',
  },
  {
    name: 'PDL Coin Hub',
    description: 'Hub de moeda e transações integradas entre servidores Lineage.',
    color: '#3b82f6',
    category: 'DJANGO / API',
  },
  {
    name: 'Bot Discord PDL',
    description: 'Bot multi-servidor conectado às APIs e dados do PDL.',
    color: '#5865f2',
    category: 'PYTHON / DISCORD',
  },
  {
    name: 'Toki Marketplace',
    description: 'Marketplace multi-lojista com checkout, logística e gamificação.',
    color: '#ec4899',
    category: 'DJANGO / REACT',
  },
  {
    name: 'Capturador Lineage',
    description: 'Aplicativo desktop para localizar e organizar arquivos de patches Lineage.',
    color: '#06b6d4',
    category: 'PYTHON / DESKTOP',
  },
  {
    name: 'L2J Dream License Server',
    description: 'Painel privado de licenças e validação assinada para emuladores L2J.',
    color: '#eab308',
    category: 'DJANGO / SECURITY',
  },
  {
    name: 'Ashley Bot',
    description: 'Bot Discord com economia, RPG, minigames e comandos slash.',
    color: '#a855f7',
    category: 'PYTHON / DISCORD',
  },
  {
    name: 'Ashley Site',
    description: 'Portal, documentação e wiki do ecossistema Ashley.',
    color: '#f472b6',
    category: 'WEB',
  },
  {
    name: 'Ashley Bot Legacy',
    description: 'Base original de comandos, IA e sistemas da Ashley.',
    color: '#64748b',
    category: 'PYTHON / LEGACY',
  },
  {
    name: 'django-encrypted-fields',
    description: 'Biblioteca para campos criptografados em aplicações Django.',
    url: 'https://github.com/D3NKYT0/django-encrypted-fields',
    color: '#22c55e',
    category: 'OPEN SOURCE / DJANGO',
    actionLabel: 'GITHUB →',
  },
]

export function mergePortfolioProjects(projects: Project[]) {
  const knownNames = new Set(projects.map((project) => project.name.toLocaleLowerCase()))
  return [
    ...projects,
    ...ADDITIONAL_PROJECTS.filter(
      (project) => !knownNames.has(project.name.toLocaleLowerCase()),
    ),
  ]
}
