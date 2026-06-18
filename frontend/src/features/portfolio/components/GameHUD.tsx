import { SoundToggle } from './SoundToggle'
import type { PortfolioData, WorldSection } from '@/types/portfolio'
import styles from './GameHUD.module.css'

interface GameHUDProps {
  data: PortfolioData
  activeSection: WorldSection
  coins: number
  muted: boolean
  onToggleSound: () => void
}

const WORLD_NAMES: Record<WorldSection, string> = {
  start: '1-1',
  about: '1-2',
  skills: '2-1',
  experience: '3-1',
  projects: '4-1',
  contact: '5-1',
}

export function GameHUD({ data, activeSection, coins, muted, onToggleSound }: GameHUDProps) {
  return (
    <header className={styles.hud}>
      <SoundToggle muted={muted} onToggle={onToggleSound} compact />
      <div className={styles.hudItem}>
        <span className={styles.label}>DENKY</span>
        <span className={styles.value}>{String(coins).padStart(6, '0')}</span>
      </div>

      <div className={styles.hudItem}>
        <span className={styles.label}>WORLD</span>
        <span className={styles.value}>{WORLD_NAMES[activeSection]}</span>
      </div>

      <div className={styles.hudItem}>
        <span className={styles.label}>TIME</span>
        <span className={styles.value}>∞</span>
      </div>

      <div className={styles.hudItem}>
        <span className={styles.coinIcon} />
        <span className={styles.value}>×{data.projects.length}</span>
      </div>
    </header>
  )
}
