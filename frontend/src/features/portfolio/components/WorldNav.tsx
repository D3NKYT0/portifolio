import type { WorldMapNode, WorldSection } from '@/types/portfolio'
import styles from './WorldNav.module.css'

interface WorldNavProps {
  nodes: WorldMapNode[]
  activeSection: WorldSection
  onSelect: (section: WorldSection) => void
}

export function WorldNav({ nodes, activeSection, onSelect }: WorldNavProps) {
  return (
    <nav className={styles.nav} aria-label="Navegação do mundo">
      {nodes.map((node) => (
        <button
          key={node.id}
          type="button"
          className={[
            styles.node,
            activeSection === node.id ? styles.active : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onSelect(node.id as WorldSection)}
          title={node.label}
        >
          <span className={styles.icon} data-icon={node.icon} />
          <span className={styles.label}>{node.label}</span>
        </button>
      ))}
    </nav>
  )
}
