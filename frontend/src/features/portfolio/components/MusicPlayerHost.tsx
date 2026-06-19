import { useEffect } from 'react'
import { useBackgroundMusic } from '../hooks/useBackgroundMusic'
import { useSound } from '../hooks/useSound'
import { MusicPlayer } from './MusicPlayer'

export function MusicPlayerHost() {
  const music = useBackgroundMusic()
  const { muted, sfx, toggle } = useSound()
  const { startPlayback } = music

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

  return (
    <MusicPlayer
      player={music}
      sfxMuted={muted}
      onToggleSfx={toggle}
      onUiSound={() => sfx('select')}
    />
  )
}

