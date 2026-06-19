import type { WorldMapNode, WorldSection } from '@/types/portfolio'
import { PixelHero } from './PixelHero'
import styles from './WorldNav.module.css'

interface WorldNavProps {
  nodes: WorldMapNode[]
  activeSection: WorldSection
  visitedSections: WorldSection[]
  isJumping: boolean
  isWalking: boolean
  facingRight: boolean
  onSelect: (section: WorldSection) => void
}

export function WorldNav({
  nodes,
  activeSection,
  visitedSections,
  isJumping,
  isWalking,
  facingRight,
  onSelect,
}: WorldNavProps) {
  const stages = nodes.filter((node) => node.id !== 'start')
  const activeIndex = Math.max(0, stages.findIndex((node) => node.id === activeSection))
  const heroPosition = ((activeIndex + 0.5) / stages.length) * 100
  const routeProgress = stages.length > 1 ? (activeIndex / (stages.length - 1)) * 100 : 0

  return (
    <nav className={styles.nav} aria-label="Mapa de fases">
      <div className={styles.route} aria-hidden="true">
        <span className={styles.routeProgress} style={{ width: `${routeProgress}%` }} />
      </div>

      <div className={styles.heroRunner} style={{ left: `${heroPosition}%` }} aria-hidden="true">
        <PixelHero
          isJumping={isJumping}
          isWalking={isWalking}
          facingRight={facingRight}
          inWorldMap
        />
      </div>

      {stages.map((node, index) => (
        <button
          key={node.id}
          type="button"
          className={[
            styles.node,
            activeSection === node.id ? styles.active : '',
            visitedSections.includes(node.id as WorldSection) ? styles.visited : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onSelect(node.id as WorldSection)}
          title={node.label}
          aria-label={`Fase ${index + 1}: ${node.label}`}
          aria-current={activeSection === node.id ? 'step' : undefined}
        >
          <span className={styles.stageNumber}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.icon} data-icon={node.icon}>
            <span className={styles.check}>✓</span>
          </span>
          <span className={styles.label}>{node.label}</span>
        </button>
      ))}
    </nav>
  )
}
