import type { Profile } from '@/types/portfolio'
import styles from './sections.module.css'

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section className={styles.section} id="about">
      <div className={`${styles.panel} pixel-border`}>
        <h2 className={styles.title}>
          <span className={styles.coin} /> SOBRE
        </h2>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            <span>DJ</span>
          </div>
          <div className={styles.profileInfo}>
            <h3>{profile.name}</h3>
            <p className={styles.role}>{profile.title}</p>
            <p className={styles.location}>📍 {profile.location}</p>
          </div>
        </div>
        <p className={styles.summary}>{profile.summary}</p>
        <div className={styles.links}>
          <a href={`mailto:${profile.email}`} className="pixel-btn">
            ✉ EMAIL
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="pixel-btn pixel-btn--green">
            ⚙ GITHUB
          </a>
          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="pixel-btn">
            🌐 SITE
          </a>
        </div>
      </div>
    </section>
  )
}
