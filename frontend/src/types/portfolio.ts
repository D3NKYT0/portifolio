export interface Profile {
  name: string
  title: string
  location: string
  phone: string
  email: string
  website: string
  github: string
  summary: string
}

export interface Skill {
  name: string
  level: number
  icon: string
  category: string
}

export interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

export interface Project {
  name: string
  description: string
  url: string
  color: string
}

export interface Education {
  title: string
  institution: string
}

export interface WorldMapNode {
  id: string
  label: string
  x: number
  icon: string
}

export interface PortfolioData {
  profile: Profile
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
  world_map: WorldMapNode[]
}

export interface ContactPayload {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export type WorldSection = 'start' | 'about' | 'skills' | 'experience' | 'projects' | 'contact'
