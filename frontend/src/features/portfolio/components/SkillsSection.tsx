import type { Skill } from '@/types/portfolio'
import styles from './sections.module.css'

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))]

  return (
    <section className={styles.section} id="skills">
      <div className={`${styles.panel} pixel-border`}>
        <h2 className={styles.title}>
          <span className={styles.block} /> SKILLS
        </h2>
        {categories.map((cat) => (
          <div key={cat} className={styles.skillGroup}>
            <h3 className={styles.categoryTitle}>{cat.toUpperCase()}</h3>
            <div className={styles.skillGrid}>
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div key={skill.name} className={styles.skillBlock}>
                    <div className={styles.questionBlock}>?</div>
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillFill}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
