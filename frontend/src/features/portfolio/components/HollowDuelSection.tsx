import styles from './HollowDuelSection.module.css'

interface HollowDuelSectionProps {
  onEnter: () => void
}

const FEATURES = [
  { value: '337', label: 'CARTAS' },
  { value: '23', label: 'ARQUÉTIPOS' },
  { value: 'PVP', label: 'TEMPO REAL' },
]

export function HollowDuelSection({ onEnter }: HollowDuelSectionProps) {
  return (
    <section className={styles.section} id="hollow-duel" aria-labelledby="hollow-duel-title">
      <div className={styles.portal}>
        <div className={styles.noise} aria-hidden="true" />

        <div className={styles.content}>
          <div className={styles.copy}>
            <span className={styles.secretBadge}>✦ SECRET LEVEL // NOVO PROJETO ✦</span>
            <img
              className={styles.logo}
              src="/assets/hollow-duel/logo.png"
              alt="Hollow Duel"
              id="hollow-duel-title"
            />
            <p className={styles.tagline}>DUEL BEYOND LIMITS. CONQUER EVERY HOLLOW.</p>
            <p className={styles.description}>
              Um TCG digital de duelos rápidos, grid tático 3×3, chain stack e
              invocações BOSS movidas por Momentum. Engine própria, PvP em tempo real
              e um universo inteiro construído carta por carta.
            </p>

            <div className={styles.stats} aria-label="Destaques do Hollow Duel">
              {FEATURES.map((feature) => (
                <div key={feature.label} className={styles.stat}>
                  <strong>{feature.value}</strong>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>

            <a
              className={styles.enterButton}
              href="https://hollowduel.com/"
              target="_blank"
              rel="noreferrer"
              onClick={onEnter}
            >
              <span>ENTRAR NO HOLLOW</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.showcase} aria-hidden="true">
            <div className={styles.rift} />
            <img
              className={styles.banner}
              src="/assets/hollow-duel/banner.png"
              alt=""
            />
            <img
              className={styles.hand}
              src="/assets/hollow-duel/hand.png"
              alt=""
            />
            <span className={`${styles.spark} ${styles.sparkOne}`}>✦</span>
            <span className={`${styles.spark} ${styles.sparkTwo}`}>◆</span>
            <span className={`${styles.spark} ${styles.sparkThree}`}>✦</span>
          </div>
        </div>
      </div>
    </section>
  )
}
