import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StartScreen } from './components/StartScreen'
import { GameHUD } from './components/GameHUD'
import { WorldNav } from './components/WorldNav'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { HollowDuelSection } from './components/HollowDuelSection'
import { usePortfolio } from './hooks/usePortfolio'
import { useGameControls } from './hooks/useGameControls'
import { useSound } from './hooks/useSound'
import { requestStageMusic } from './audio/stageMusic'
import { mergePortfolioProjects } from './data/projectCatalog'
import type { WorldSection } from '@/types/portfolio'
import styles from './PortfolioGame.module.css'

const PLAYABLE_STAGES: WorldSection[] = ['about', 'skills', 'experience', 'projects', 'contact', 'hollow-duel']

const SECRET_STAGE_NODE = { id: 'hollow-duel', label: 'HOLLOW', x: 6, icon: 'portal' }

const STAGE_META: Record<WorldSection, { number: string; title: string; mission: string }> = {
  start: { number: '0-0', title: 'INÍCIO', mission: 'Pressione start para entrar no mundo.' },
  about: { number: '1-1', title: 'ORIGEM DO PLAYER', mission: 'Conheça o dev por trás do código.' },
  skills: { number: '1-2', title: 'INVENTÁRIO DE PODERES', mission: 'Explore as tecnologias dominadas.' },
  experience: { number: '2-1', title: 'JORNADA PROFISSIONAL', mission: 'Revise as missões já concluídas.' },
  projects: { number: '2-2', title: 'FASES PUBLICADAS', mission: 'Entre nos projetos em produção.' },
  contact: { number: '3-1', title: 'MISSÃO CO-OP', mission: 'Desbloqueie uma nova parceria.' },
  'hollow-duel': { number: 'S-1', title: 'HOLLOW DUEL', mission: 'Atravesse o rasgo e encare o projeto secreto.' },
}

export function PortfolioGame() {
  const [started, setStarted] = useState(false)
  const [activeSection, setActiveSection] = useState<WorldSection>('about')
  const [score, setScore] = useState(0)
  const [visitedSections, setVisitedSections] = useState<WorldSection[]>(['about'])
  const [isMoving, setIsMoving] = useState(false)
  const [showStageCard, setShowStageCard] = useState(false)
  const moveTimer = useRef<number | undefined>(undefined)
  const cardTimer = useRef<number | undefined>(undefined)
  // Carrega o currículo imediatamente. A tela de início continua sendo apenas a
  // experiência visual; os dados públicos não dependem mais de interação humana.
  const { data, isLoading, error, refetch, isFetching } = usePortfolio()
  const { muted, boot, sfx, toggle } = useSound()
  const worldNodes = useMemo(() => {
    const nodes = data?.world_map ?? []
    return nodes.some((node) => node.id === SECRET_STAGE_NODE.id)
      ? nodes
      : [...nodes, SECRET_STAGE_NODE]
  }, [data?.world_map])

  const portfolioProjects = useMemo(
    () => mergePortfolioProjects(data?.projects ?? []),
    [data?.projects],
  )

  const handleSectionChange = useCallback((section: WorldSection) => {
    const target = section === 'start' ? 'about' : section

    if (target === activeSection) {
      sfx('jump')
      return
    }

    const isNewStage = !visitedSections.includes(target)
    setActiveSection(target)
    setVisitedSections((current) => current.includes(target) ? current : [...current, target])
    setScore((current) => current + (isNewStage ? 100 : 10))
    setIsMoving(true)
    setShowStageCard(true)
    sfx('warp')

    window.clearTimeout(moveTimer.current)
    window.clearTimeout(cardTimer.current)
    moveTimer.current = window.setTimeout(() => {
      setIsMoving(false)
      sfx(isNewStage ? 'coin' : 'block')
    }, 520)
    cardTimer.current = window.setTimeout(() => setShowStageCard(false), 900)
  }, [activeSection, sfx, visitedSections])

  const { isJumping, facingRight, moveLeft, moveRight, jump } = useGameControls(
    activeSection,
    handleSectionChange,
    started,
    sfx,
  )
  useEffect(() => {
    if (!started) return
    requestStageMusic(activeSection === 'hollow-duel' ? 'boss' : null)
  }, [activeSection, started])

  const handleStart = async () => {
    await boot()
    sfx('start')
    setStarted(true)
    setActiveSection('about')
    setShowStageCard(true)
    cardTimer.current = window.setTimeout(() => setShowStageCard(false), 1100)
  }

  useEffect(() => {
    if (!started) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'm' || e.key === 'M') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started, toggle])

  useEffect(() => () => {
    window.clearTimeout(moveTimer.current)
    window.clearTimeout(cardTimer.current)
  }, [])

  if (!started) {
    return <StartScreen onStart={handleStart} muted={muted} onToggleSound={toggle} />
  }

  if (isLoading || (isFetching && !data)) {
    return (
      <div className={styles.loading} role="status">
        <div className={styles.loadingBlock}>?</div>
        <p>GERANDO MUNDO...</p>
        <div className={styles.loadingBar}><span /></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className={styles.loading}>
        <p className={styles.gameOver}>GAME OVER</p>
        <p className={styles.errorMsg}>
          {error instanceof Error ? error.message : 'Erro ao carregar portfólio'}
        </p>
        <button type="button" className="pixel-btn" onClick={() => refetch()}>
          TENTAR NOVAMENTE
        </button>
      </div>
    )
  }

  const stage = STAGE_META[activeSection]

  return (
    <div className={styles.game} data-world={activeSection}>
      <GameHUD
        data={{ ...data, projects: portfolioProjects }}
        activeSection={activeSection}
        score={score}
        completed={visitedSections.length}
        total={PLAYABLE_STAGES.length}
        muted={muted}
        onToggleSound={toggle}
      />

      <div className={styles.sky} aria-hidden="true">
        <div className={styles.sun} />
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
        <div className={`${styles.cloud} ${styles.cloud3}`} />
        <div className={styles.pixelStars} />
      </div>

      <div className={styles.scenery} aria-hidden="true">
        <div className={`${styles.mountain} ${styles.mountainBack}`} />
        <div className={styles.mountain} />
        <div className={styles.bush} />
        <div className={`${styles.bush} ${styles.bushRight}`} />
        <div className={styles.floatingBlocks}>
          <span />
          <span className={styles.question}>?</span>
          <span />
        </div>
      </div>

      <div className={styles.missionBar}>
        <div className={styles.missionId}>MISSÃO {stage.number}</div>
        <div className={styles.missionCopy}>
          <strong>{stage.title}</strong>
          <span>{stage.mission}</span>
        </div>
        <div className={styles.completion} aria-label={`${visitedSections.length} de ${PLAYABLE_STAGES.length} fases visitadas`}>
          {PLAYABLE_STAGES.map((item) => (
            <span key={item} className={visitedSections.includes(item) ? styles.complete : ''} />
          ))}
        </div>
      </div>

      <main className={styles.worldScroll}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className={`${styles.sectionsTrack} ${
              activeSection === 'hollow-duel' ? styles.secretTrack : ''
            }`}
            initial={activeSection === 'hollow-duel'
              ? { opacity: 0, scale: 0.3, rotate: -6, filter: 'blur(16px) brightness(1.8)' }
              : { opacity: 0, x: facingRight ? 60 : -60, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0, filter: 'blur(0px) brightness(1)' }}
            exit={activeSection === 'hollow-duel'
              ? { opacity: 0, scale: 1.35, rotate: 4, filter: 'blur(18px) brightness(1.7)' }
              : { opacity: 0, x: facingRight ? -60 : 60, scale: 0.98 }
            }
            transition={activeSection === 'hollow-duel'
              ? { duration: 0.68, ease: 'easeOut' }
              : { duration: 0.28, ease: 'easeOut' }
            }
          >
            {activeSection === 'about' && <AboutSection profile={data.profile} />}
            {activeSection === 'skills' && <SkillsSection skills={data.skills} />}
            {activeSection === 'experience' && <ExperienceSection experience={data.experience} />}
            {activeSection === 'projects' && (
              <ProjectsSection projects={portfolioProjects} onLinkClick={() => sfx('coin')} />
            )}
            {activeSection === 'contact' && (
              <ContactSection
                profile={data.profile}
                onSuccess={() => sfx('powerup')}
                onError={() => sfx('error')}
              />
            )}
            {activeSection === 'hollow-duel' && (
              <HollowDuelSection onEnter={() => sfx('powerup')} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <WorldNav
        nodes={worldNodes}
        activeSection={activeSection}
        visitedSections={visitedSections}
        isJumping={isJumping}
        isWalking={isMoving}
        facingRight={facingRight}
        onSelect={handleSectionChange}
      />

      <div className={styles.ground} aria-hidden="true" />

      <div className={styles.controlsHint}>
        <kbd>A</kbd><kbd>D</kbd> MOVER <span>•</span> <kbd>ESPAÇO</kbd> PULAR <span>•</span> <kbd>1—6</kbd> FASES <span>•</span> <kbd>M</kbd> SOM
      </div>

      <div className={styles.mobileControls} aria-label="Controles do jogo">
        <button type="button" onClick={moveLeft} aria-label="Fase anterior">◀</button>
        <button type="button" onClick={jump} aria-label="Pular">↑</button>
        <button type="button" onClick={moveRight} aria-label="Próxima fase">▶</button>
      </div>

      <AnimatePresence>
        {showStageCard && (
          <motion.div
            className={styles.stageOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            aria-live="polite"
          >
            <div className={`${styles.stageCard} ${
              activeSection === 'hollow-duel' ? styles.secretStageCard : ''
            }`}>
              <span>{activeSection === 'hollow-duel' ? 'SECRET LEVEL' : 'WORLD'} {stage.number}</span>
              <strong>{stage.title}</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
