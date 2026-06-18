import styles from './SoundToggle.module.css'

interface SoundToggleProps {
  muted: boolean
  onToggle: () => void
  compact?: boolean
}

export function SoundToggle({ muted, onToggle, compact = false }: SoundToggleProps) {
  return (
    <button
      type="button"
      className={[styles.toggle, compact ? styles.compact : ''].filter(Boolean).join(' ')}
      onClick={onToggle}
      aria-label={muted ? 'Ativar sons' : 'Desativar sons'}
      title={muted ? 'Ativar sons 8-bit' : 'Desativar sons 8-bit'}
    >
      <span className={styles.icon} aria-hidden="true">
        {muted ? '🔇' : '🔊'}
      </span>
      {!compact && <span className={styles.label}>{muted ? 'MUDO' : 'SOM'}</span>}
    </button>
  )
}
