import { useCallback, useEffect, useState } from 'react'
import type { SoundId } from '@/features/portfolio/audio/chiptune'
import type { WorldSection } from '@/types/portfolio'

const SECTIONS: WorldSection[] = [
  'about',
  'skills',
  'experience',
  'projects',
  'contact',
]

export function useGameControls(
  activeSection: WorldSection,
  onSectionChange: (section: WorldSection) => void,
  enabled: boolean,
  sfx: (id: SoundId) => void = () => {},
) {
  const [isJumping, setIsJumping] = useState(false)
  const [facingRight, setFacingRight] = useState(true)

  const moveLeft = useCallback(() => {
    const idx = SECTIONS.indexOf(activeSection)
    if (idx > 0) {
      setFacingRight(false)
      onSectionChange(SECTIONS[idx - 1])
    } else {
      sfx('bump')
    }
  }, [activeSection, onSectionChange, sfx])

  const moveRight = useCallback(() => {
    const idx = SECTIONS.indexOf(activeSection)
    if (idx < SECTIONS.length - 1) {
      setFacingRight(true)
      onSectionChange(SECTIONS[idx + 1])
    } else {
      sfx('bump')
    }
  }, [activeSection, onSectionChange, sfx])

  const jump = useCallback(() => {
    sfx('jump')
    setIsJumping(true)
    setTimeout(() => setIsJumping(false), 600)
  }, [sfx])

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isTyping = target?.matches('input, textarea, select, [contenteditable="true"]')

      if (isTyping) return

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          moveLeft()
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          moveRight()
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
        case ' ':
          e.preventDefault()
          jump()
          break
        case '1':
          onSectionChange('about')
          break
        case '2':
          onSectionChange('skills')
          break
        case '3':
          onSectionChange('experience')
          break
        case '4':
          onSectionChange('projects')
          break
        case '5':
          onSectionChange('contact')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, moveLeft, moveRight, jump, onSectionChange, sfx])

  return { isJumping, facingRight, moveLeft, moveRight, jump, sections: SECTIONS }
}
