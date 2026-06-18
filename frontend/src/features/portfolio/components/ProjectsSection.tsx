import type { Project } from '@/types/portfolio'
import styles from './sections.module.css'

interface ProjectsSectionProps {
  projects: Project[]
  onLinkClick?: () => void
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
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
              style={{ ['--project-color' as string]: project.color }}
              onClick={() => onLinkClick?.()}
            >
              <div className={styles.projectFlag} />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className={styles.projectLink}>JOGAR →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
