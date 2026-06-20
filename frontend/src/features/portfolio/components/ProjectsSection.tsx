import type { CSSProperties, ReactNode } from 'react'
import type { Project } from '@/types/portfolio'
import styles from './sections.module.css'

interface ProjectsSectionProps {
  projects: Project[]
  onLinkClick?: () => void
}

interface ProjectCardContentProps {
  project: Project
}

function ProjectCardContent({ project }: ProjectCardContentProps) {
  return (
    <>
      <div className={styles.projectHeader}>
        <div className={styles.projectFlag} />
        {project.category && <span className={styles.projectMeta}>{project.category}</span>}
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <span className={`${styles.projectLink} ${!project.url ? styles.projectLinkMuted : ''}`}>
        {project.url ? project.actionLabel ?? 'ABRIR →' : project.actionLabel ?? 'SEM LINK PÚBLICO'}
      </span>
    </>
  )
}

interface ProjectCardProps {
  project: Project
  children: ReactNode
  onLinkClick?: () => void
}

function ProjectCard({ project, children, onLinkClick }: ProjectCardProps) {
  const style = { '--project-color': project.color } as CSSProperties

  if (!project.url) {
    return (
      <article
        className={`${styles.projectCard} ${styles.projectCardStatic}`}
        style={style}
        aria-label={`${project.name}, projeto sem link público`}
      >
        {children}
      </article>
    )
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.projectCard}
      style={style}
      onClick={() => onLinkClick?.()}
    >
      {children}
    </a>
  )
}

export function ProjectsSection({ projects, onLinkClick }: ProjectsSectionProps) {
  return (
    <section className={styles.section} id="projects">
      <div className={`${styles.panel} pixel-border`}>
        <h2 className={styles.title}>
          <span className={styles.starIcon}>★</span> PROJETOS
        </h2>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} onLinkClick={onLinkClick}>
              <ProjectCardContent project={project} />
            </ProjectCard>
          ))}
        </div>
      </div>
    </section>
  )
}
