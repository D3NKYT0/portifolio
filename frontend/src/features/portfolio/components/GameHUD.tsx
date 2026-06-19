import { SoundToggle } from './SoundToggle'
import type { PortfolioData, WorldSection } from '@/types/portfolio'
import styles from './GameHUD.module.css'

interface GameHUDProps {
  data: PortfolioData
  activeSection: WorldSection
  score: number
  completed: number
  total: number
  muted: boolean
  onToggleSound: () => void
}

const WORLD_NAMES: Record<WorldSection, string> = {
  start: '0-0',
  about: '1-1',
  skills: '1-2',
  experience: '2-1',
  projects: '2-2',
  contact: '3-1',
}

export function GameHUD({
  data,
  activeSection,
  score,
  completed,
  total,
  muted,
  onToggleSound,
}: GameHUDProps) {
  return (
    <header className={styles.hud}>
      <div className={styles.brand} aria-label="Denky World">
        <span className={styles.brandMark}>D</span>
        <span>DENKY WORLD</span>
      </div>

      <div className={styles.stats}>
        <div className={styles.hudItem}>
          <span className={styles.label}>SCORE</span>
          <span className={styles.value}>{String(score).padStart(6, '0')}</span>
        </div>

        <div className={styles.hudItem}>
          <span className={styles.label}>FASE</span>
          <span className={styles.value}>{WORLD_NAMES[activeSection]}</span>
        </div>

        <div className={styles.hudItem}>
          <span className={styles.label}>MAPA</span>
          <span className={styles.value}>{completed}/{total}</span>
        </div>

        <div className={`${styles.hudItem} ${styles.projectCount}`} title="Projetos disponíveis">
          <span className={styles.coinIcon} />
          <span className={styles.value}>×{data.projects.length}</span>
        </div>
      </div>

      <SoundToggle muted={muted} onToggle={onToggleSound} compact />
    </header>
  )
}
