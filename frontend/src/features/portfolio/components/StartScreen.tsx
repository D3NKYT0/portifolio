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
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.soundToggle}>
        <SoundToggle muted={muted} onToggle={onToggleSound} compact />
      </div>

      <div className={styles.sky} aria-hidden="true">
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
        <div className={`${styles.cloud} ${styles.cloud3}`} />
        <div className={styles.sun} />
      </div>

      <div className={styles.ground} aria-hidden="true">
        <div className={styles.hill} />
        <div className={`${styles.hill} ${styles.hillSmall}`} />
      </div>

      <main className={styles.content}>
        <div className={styles.eyebrow}>A PORTFOLIO ADVENTURE</div>

        <div className={styles.logo} aria-label="Denky World">
          <span className={styles.logoDenky}>DENKY</span>
          <span className={styles.logoWorld}>WORLD</span>
        </div>

        <div className={styles.hero} aria-hidden="true">
          <div className={styles.character} />
          <div className={styles.questionBlock}>?</div>
          <div className={styles.mushroom} />
        </div>

        <section className={styles.saveSlot} aria-label="Perfil do jogador">
          <div className={styles.slotHeader}>
            <span>ARQUIVO 01</span>
            <span className={styles.online}>● ONLINE</span>
          </div>
          <strong>DANIEL AMARAL</strong>
          <p>DEV SÊNIOR · TECH LEAD · ARQUITETO</p>
          <div className={styles.slotStats}>
            <span>5 FASES</span>
            <span>17 SKILLS</span>
            <span>5 PROJETOS</span>
          </div>
        </section>

        <button className={styles.startBtn} onClick={onStart} type="button" autoFocus>
          <span className={styles.cursor}>▶</span>
          <span>NOVO JOGO</span>
        </button>

        <p className={styles.hint}>SETAS / WASD PARA MOVER · ESPAÇO PARA PULAR</p>
        <a className={styles.textResume} href="/curriculo/">
          CURRÍCULO EM VERSÃO TEXTUAL
        </a>
      </main>

      <div className={styles.copyright}>© 2026 DENKY.DEV.BR · BUILD 1.1</div>
    </div>
  )
}
