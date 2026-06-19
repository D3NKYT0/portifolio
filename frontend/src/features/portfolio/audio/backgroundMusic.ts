export interface BackgroundTrack {
  id: string
  title: string
  subtitle: string
  src: string
}

export type PlaybackMode = 'loop' | 'playlist'

export const BACKGROUND_TRACKS: BackgroundTrack[] = [
  {
    id: 'happy',
    title: 'Happy Adventure',
    subtitle: 'Mundo ensolarado',
    src: '/assets/tracks/happy.mp3',
  },
  {
    id: 'level',
    title: 'Next Level',
    subtitle: 'Explorando fases',
    src: '/assets/tracks/level.mp3',
  },
  {
    id: 'boss',
    title: 'Boss Battle',
    subtitle: 'Desafio final',
    src: '/assets/tracks/boss.mp3',
  },
  {
    id: 'terror',
    title: 'Terror Night',
    subtitle: 'Mundo secreto',
    src: '/assets/tracks/terror.mp3',
  },
]

export const MUSIC_STORAGE_KEYS = {
  enabled: 'denky_music_enabled',
  volume: 'denky_music_volume',
  mode: 'denky_music_mode',
  currentTrack: 'denky_music_current_track',
  currentTime: 'denky_music_current_time',
} as const

export const DEFAULT_MUSIC_VOLUME = 0.28

