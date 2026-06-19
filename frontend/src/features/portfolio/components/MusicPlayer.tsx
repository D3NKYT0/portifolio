import { useState } from 'react'
import type { BackgroundMusicController } from '../hooks/useBackgroundMusic'
import styles from './MusicPlayer.module.css'

interface MusicPlayerProps {
  player: BackgroundMusicController
  sfxMuted: boolean
  onToggleSfx: () => void
  onUiSound: () => void
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const rest = Math.floor(seconds % 60)
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

function volumeLabel(volume: number) {
  return `${Math.round(volume * 100)}%`
}

export function MusicPlayer({
  player,
  sfxMuted,
  onToggleSfx,
  onUiSound,
}: MusicPlayerProps) {
  const [open, setOpen] = useState(false)

  const handleUiAction = (action: () => void) => {
    onUiSound()
    action()
  }

  return (
    <aside className={styles.root}>
      {open && (
        <section className={styles.panel} aria-label="Player da trilha sonora">
          <header className={styles.header}>
            <div className={`${styles.equalizer} ${player.isPlaying ? styles.playing : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.nowPlaying}>
              <span>TOCANDO AGORA</span>
              <strong>{player.currentTrack?.title ?? 'Escolha uma faixa'}</strong>
              <small>{player.currentTrack?.subtitle}</small>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => handleUiAction(() => setOpen(false))}
              aria-label="Fechar player"
            >
              ×
            </button>
          </header>

          <div className={styles.timeline}>
            <input
              type="range"
              min={0}
              max={player.duration || 0}
              step={1}
              value={Math.min(player.currentTime, player.duration || 0)}
              onChange={(event) => player.seek(Number(event.target.value))}
              aria-label="Posição da música"
              disabled={!player.duration}
            />
            <div className={styles.timeLabels}>
              <span>{formatTime(player.currentTime)}</span>
              <span>{formatTime(player.duration)}</span>
            </div>
          </div>

          <div className={styles.transport} aria-label="Controles de reprodução">
            <button
              type="button"
              onClick={() => handleUiAction(player.previousTrack)}
              aria-label="Música anterior"
              title="Música anterior"
            >
              ◀◀
            </button>
            <button
              type="button"
              className={styles.playButton}
              data-music-play-toggle
              onClick={() => handleUiAction(player.togglePlayPause)}
              aria-label={player.isPlaying ? 'Pausar música' : 'Tocar música'}
              title={player.isPlaying ? 'Pausar' : 'Tocar'}
            >
              {player.isPlaying ? 'Ⅱ' : '▶'}
            </button>
            <button
              type="button"
              onClick={() => handleUiAction(player.nextTrack)}
              aria-label="Próxima música"
              title="Próxima música"
            >
              ▶▶
            </button>
          </div>

          <label className={styles.volumeRow}>
            <span aria-hidden="true">♫</span>
            <span className={styles.controlLabel}>MÚSICA</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={player.volume}
              onChange={(event) => player.setVolume(Number(event.target.value))}
              aria-label="Volume da música"
            />
            <output>{volumeLabel(player.volume)}</output>
          </label>

          <div className={styles.modeRow} role="group" aria-label="Modo de reprodução">
            <button
              type="button"
              className={player.playbackMode === 'loop' ? styles.active : ''}
              onClick={() => handleUiAction(() => player.setPlaybackMode('loop'))}
              aria-pressed={player.playbackMode === 'loop'}
            >
              ↻ LOOP
            </button>
            <button
              type="button"
              className={player.playbackMode === 'playlist' ? styles.active : ''}
              onClick={() => handleUiAction(() => player.setPlaybackMode('playlist'))}
              aria-pressed={player.playbackMode === 'playlist'}
            >
              ⇄ PLAYLIST
            </button>
            <button
              type="button"
              className={!sfxMuted ? styles.active : ''}
              onClick={() => handleUiAction(onToggleSfx)}
              aria-pressed={!sfxMuted}
            >
              {sfxMuted ? 'SFX OFF' : 'SFX ON'}
            </button>
          </div>

          <div className={styles.divider}>
            <span>SELECT TRACK</span>
          </div>

          <ol className={styles.trackList}>
            {player.tracks.map((track, index) => {
              const isCurrent = track.id === player.currentTrack?.id
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    className={isCurrent ? styles.currentTrack : ''}
                    onClick={() => handleUiAction(() => player.selectTrack(track.id))}
                    aria-current={isCurrent ? 'true' : undefined}
                  >
                    <span className={styles.trackNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.trackCopy}>
                      <strong>{track.title}</strong>
                      <small>{track.subtitle}</small>
                    </span>
                    <span className={styles.trackState}>{isCurrent && player.isPlaying ? '▶' : '·'}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          {player.status === 'blocked' && (
            <p className={styles.hint} role="status">Clique em tocar para liberar o áudio.</p>
          )}
          {player.lastError && <p className={styles.error} role="status">{player.lastError}</p>}
        </section>
      )}

      <button
        type="button"
        className={`${styles.launcher} ${open || player.isPlaying ? styles.launcherActive : ''}`}
        onClick={() => handleUiAction(() => setOpen((current) => !current))}
        aria-expanded={open}
        aria-label={open ? 'Fechar player de música' : 'Abrir player de música'}
      >
        <span className={styles.musicIcon} aria-hidden="true">♫</span>
        <span className={styles.launcherCopy}>
          <strong>TRILHA</strong>
          <small>{player.isPlaying ? player.currentTrack?.title : 'PAUSADA'}</small>
        </span>
        <span className={`${styles.statusDot} ${player.isPlaying ? styles.statusDotActive : ''}`} />
      </button>
    </aside>
  )
}

