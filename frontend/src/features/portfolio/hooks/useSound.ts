import { useCallback, useEffect, useState } from 'react'
import {
  ensureAudio,
  isMuted,
  playSound,
  setMuted,
  toggleMuted,
  type SoundId,
} from '@/features/portfolio/audio/chiptune'

export function useSound() {
  const [muted, setMutedState] = useState(isMuted)

  useEffect(() => {
    const sync = () => setMutedState(isMuted())
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const boot = useCallback(async () => {
    await ensureAudio()
  }, [])

  const sfx = useCallback((id: SoundId) => {
    playSound(id)
  }, [])

  const toggle = useCallback(async () => {
    await ensureAudio()
    const next = toggleMuted()
    setMutedState(next)
    if (!next) playSound('select')
  }, [])

  const mute = useCallback((value: boolean) => {
    setMuted(value)
    setMutedState(value)
  }, [])

  return { muted, boot, sfx, toggle, mute }
}
