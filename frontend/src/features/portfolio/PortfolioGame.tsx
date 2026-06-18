import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StartScreen } from './components/StartScreen'
import { GameHUD } from './components/GameHUD'
import { PixelHero } from './components/PixelHero'
import { WorldNav } from './components/WorldNav'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { usePortfolio } from './hooks/usePortfolio'
import { useGameControls } from './hooks/useGameControls'
import { useSound } from './hooks/useSound'
import type { WorldSection } from '@/types/portfolio'
import styles from './PortfolioGame.module.css'

export function PortfolioGame() {
  const [started, setStarted] = useState(false)
  const [activeSection, setActiveSection] = useState<WorldSection>('about')
  const [coins, setCoins] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, error, refetch, isFetching } = usePortfolio({ enabled: started })
  const { muted, boot, sfx, toggle } = useSound()

  const handleSectionChange = useCallback((section: WorldSection) => {
    const target = section === 'start' ? 'about' : section

    setActiveSection((prev) => {
      if (prev !== target) {
        sfx('warp')
        window.setTimeout(() => sfx('coin'), 140)
        if (target === 'skills') window.setTimeout(() => sfx('block'), 260)
      }
      return target
    })

    setCoins((c) => c + 100)
    const el = document.getElementById(target)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }, [sfx])

  const { isJumping, facingRight } = useGameControls(
    activeSection,
    handleSectionChange,
    started,
    sfx,
  )

  const handleStart = async () => {
    await boot()
    sfx('start')
    setStarted(true)
    setActiveSection('about')
  }

  useEffect(() => {
    if (!started) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started, toggle])

  if (!started) {
    return (
      <StartScreen
        onStart={handleStart}
        muted={muted}
        onToggleSound={toggle}
      />
    )
  }

  if (isLoading || (isFetching && !data)) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingBlock}>?</div>
        <p>CARREGANDO MUNDO...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className={styles.loading}>
        <p>GAME OVER</p>
        <p className={styles.errorMsg}>
          {error instanceof Error ? error.message : 'Erro ao carregar portfólio'}
        </p>
        <button type="button" className="pixel-btn" onClick={() => refetch()}>
          TENTAR NOVAMENTE
        </button>
      </div>
    )
  }

  return (
    <div className={styles.game}>
      <GameHUD
        data={data}
        activeSection={activeSection}
        coins={coins}
        muted={muted}
        onToggleSound={toggle}
      />

      <div className={styles.sky}>
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
        <div className={`${styles.cloud} ${styles.cloud3}`} />
      </div>

      <div className={styles.scenery}>
        <div className={styles.hill} />
        <div className={`${styles.hill} ${styles.hillSmall}`} />
        <div className={styles.brickRow}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.brick} />
          ))}
        </div>
      </div>

      <PixelHero isJumping={isJumping} facingRight={facingRight} />

      <WorldNav
        nodes={data.world_map}
        activeSection={activeSection}
        onSelect={handleSectionChange}
      />

      <div className={styles.ground} />

      <div className={styles.worldScroll} ref={scrollRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className={styles.sectionsTrack}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'about' && <AboutSection profile={data.profile} />}
            {activeSection === 'skills' && <SkillsSection skills={data.skills} />}
            {activeSection === 'experience' && (
              <ExperienceSection experience={data.experience} />
            )}
            {activeSection === 'projects' && (
              <ProjectsSection projects={data.projects} onLinkClick={() => sfx('coin')} />
            )}
            {activeSection === 'contact' && (
              <ContactSection
                profile={data.profile}
                onSuccess={() => sfx('powerup')}
                onError={() => sfx('error')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controlsHint}>
        ← → navegar · ESPAÇO pular · 1-5 atalhos · M som
      </div>
    </div>
  )
}
