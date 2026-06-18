import type { Experience } from '@/types/portfolio'
import styles from './sections.module.css'

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section className={styles.section} id="experience">
      <div className={`${styles.panel} pixel-border`}>
        <h2 className={styles.title}>
          <span className={styles.pipe} /> EXPERIÊNCIA
        </h2>
        <div className={styles.timeline}>
          {experience.map((exp) => (
            <article key={exp.company} className={styles.expCard}>
              <div className={styles.expHeader}>
                <h3>{exp.company}</h3>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <p className={styles.expRole}>{exp.role}</p>
              <ul className={styles.highlights}>
                {exp.highlights.map((h) => (
                  <li key={h}>
                    <span className={styles.star}>★</span> {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
