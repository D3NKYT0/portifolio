import { SoundToggle } from './SoundToggle'
import styles from './StartScreen.module.css'

interface StartScreenProps {
  onStart: () => void
  muted: boolean
  onToggleSound: () => void
}

export function StartScreen({ onStart, muted, onToggleSound }: StartScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.soundToggle}>
        <SoundToggle muted={muted} onToggle={onToggleSound} compact />
      </div>
      <div className={styles.sky}>
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
        <div className={`${styles.cloud} ${styles.cloud3}`} />
      </div>

      <div className={styles.ground}>
        <div className={styles.hill} />
        <div className={`${styles.hill} ${styles.hillSmall}`} />
      </div>

      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoDenky}>DENKY</span>
          <span className={styles.logoWorld}>WORLD</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.character} />
          <div className={styles.mushroom} />
        </div>

        <p className={styles.subtitle}>DEV SÊNIOR · TECH LEAD · ARQUITETO</p>

        <button className={styles.startBtn} onClick={onStart} type="button">
          <span>PRESS START</span>
          <span className={styles.blink}>▶</span>
        </button>

        <p className={styles.hint}>← → para navegar · ESPAÇO para pular · M = som</p>
      </div>

      <div className={styles.copyright}>© 2026 DENKY.DEV.BR</div>
    </div>
  )
}
