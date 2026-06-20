import { useEffect, useRef } from 'react'
import {
  STAGE_MUSIC_EVENT,
  type StageMusicEventDetail,
} from '../audio/stageMusic'
import { useBackgroundMusic } from '../hooks/useBackgroundMusic'
import { useSound } from '../hooks/useSound'
import { MusicPlayer } from './MusicPlayer'

export function MusicPlayerHost() {
  const music = useBackgroundMusic()
  const { muted, sfx, toggle } = useSound()
  const { currentTrack, selectTrack, startPlayback } = music
  const currentTrackIdRef = useRef(currentTrack?.id ?? null)
  const previousTrackIdRef = useRef<string | null>(null)

  useEffect(() => {
    currentTrackIdRef.current = currentTrack?.id ?? null
  }, [currentTrack])

  useEffect(() => {
    const startWithGame = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const button = target.closest('button')
      if (button?.textContent?.includes('NOVO JOGO')) startPlayback()
    }

    document.addEventListener('click', startWithGame, { capture: true })
    return () => document.removeEventListener('click', startWithGame, { capture: true })
  }, [startPlayback])

  useEffect(() => {
    const handleStageMusic = (event: Event) => {
      const { trackId } = (event as CustomEvent<StageMusicEventDetail>).detail

      if (trackId) {
        if (currentTrackIdRef.current === trackId) {
          startPlayback()
          return
        }

        if (!previousTrackIdRef.current) {
          previousTrackIdRef.current = currentTrackIdRef.current
        }
        selectTrack(trackId)
        return
      }

      const previousTrackId = previousTrackIdRef.current
      previousTrackIdRef.current = null
      if (previousTrackId) selectTrack(previousTrackId)
    }

    window.addEventListener(STAGE_MUSIC_EVENT, handleStageMusic)
    return () => window.removeEventListener(STAGE_MUSIC_EVENT, handleStageMusic)
  }, [selectTrack, startPlayback])

  return (
    <MusicPlayer
      player={music}
      sfxMuted={muted}
      onToggleSfx={toggle}
      onUiSound={() => sfx('select')}
    />
  )
}
