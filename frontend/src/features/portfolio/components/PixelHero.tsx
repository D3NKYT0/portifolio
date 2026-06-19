import styles from './PixelHero.module.css'

interface PixelHeroProps {
  isJumping: boolean
  facingRight: boolean
  isWalking?: boolean
  inWorldMap?: boolean
}

export function PixelHero({
  isJumping,
  facingRight,
  isWalking = false,
  inWorldMap = false,
}: PixelHeroProps) {
  return (
    <div
      className={[
        styles.hero,
        isJumping ? styles.jumping : '',
        isWalking ? styles.walking : '',
        inWorldMap ? styles.inWorldMap : '',
        facingRight ? styles.right : styles.left,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <div className={styles.body}>
        <div className={styles.hat} />
        <div className={styles.face} />
        <div className={styles.shirt} />
        <div className={styles.overalls} />
        <div className={styles.legLeft} />
        <div className={styles.legRight} />
      </div>
    </div>
  )
}
