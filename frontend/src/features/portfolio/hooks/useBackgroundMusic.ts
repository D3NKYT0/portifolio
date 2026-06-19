import { useCallback, useEffect, useRef, useState } from 'react'
import {
  BACKGROUND_TRACKS,
  DEFAULT_MUSIC_VOLUME,
  MUSIC_STORAGE_KEYS,
  type PlaybackMode,
} from '@/features/portfolio/audio/backgroundMusic'

type AudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error'

function readStoredVolume() {
  try {
    const value = Number.parseFloat(localStorage.getItem(MUSIC_STORAGE_KEYS.volume) ?? '')
    return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : DEFAULT_MUSIC_VOLUME
  } catch {
    return DEFAULT_MUSIC_VOLUME
  }
}

function readStoredMode(): PlaybackMode {
  try {
    return localStorage.getItem(MUSIC_STORAGE_KEYS.mode) === 'playlist' ? 'playlist' : 'loop'
  } catch {
    return 'loop'
  }
}

function readStoredTrackIndex() {
  try {
    const id = localStorage.getItem(MUSIC_STORAGE_KEYS.currentTrack)
    const index = BACKGROUND_TRACKS.findIndex((track) => track.id === id)
    return index >= 0 ? index : 0
  } catch {
    return 0
  }
}

function readStoredTime() {
  try {
    const value = Number.parseFloat(localStorage.getItem(MUSIC_STORAGE_KEYS.currentTime) ?? '')
    return Number.isFinite(value) && value >= 0 ? value : 0
  } catch {
    return 0
  }
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // O player continua funcionando mesmo com storage indisponível.
  }
}

export function useBackgroundMusic() {
  const initialTrackIndex = useRef(readStoredTrackIndex())
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackIndexRef = useRef(initialTrackIndex.current)
  const playbackModeRef = useRef<PlaybackMode>(readStoredMode())
  const nextRef = useRef<() => void>(() => {})
  const lastSavedSecondRef = useRef(-1)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex.current)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(readStoredVolume)
  const [playbackMode, setPlaybackModeState] = useState<PlaybackMode>(readStoredMode)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [status, setStatus] = useState<AudioStatus>('idle')
  const [lastError, setLastError] = useState<string | null>(null)

  const currentTrack = BACKGROUND_TRACKS[currentTrackIndex] ?? BACKGROUND_TRACKS[0]

  const playAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    setStatus('loading')
    persist(MUSIC_STORAGE_KEYS.enabled, '1')

    try {
      await audio.play()
      setLastError(null)
      setStatus('playing')
    } catch (error) {
      const blocked = error instanceof DOMException && error.name === 'NotAllowedError'
      setStatus(blocked ? 'blocked' : 'error')
      setLastError(blocked ? null : 'Não foi possível carregar esta faixa.')
    }
  }, [])

  const changeTrack = useCallback((nextIndex: number, autoplay = true) => {
    const safeIndex = (nextIndex + BACKGROUND_TRACKS.length) % BACKGROUND_TRACKS.length
    const track = BACKGROUND_TRACKS[safeIndex]
    const audio = audioRef.current

    if (!track || !audio) return

    trackIndexRef.current = safeIndex
    setCurrentTrackIndex(safeIndex)
    setCurrentTime(0)
    setDuration(0)
    setLastError(null)
    persist(MUSIC_STORAGE_KEYS.currentTrack, track.id)
    persist(MUSIC_STORAGE_KEYS.currentTime, '0')

    audio.pause()
    audio.src = track.src
    audio.currentTime = 0
    audio.loop = playbackModeRef.current === 'loop'
    audio.load()

    if (autoplay) void playAudio()
  }, [playAudio])

  const nextTrack = useCallback(() => {
    changeTrack(trackIndexRef.current + 1)
  }, [changeTrack])

  const previousTrack = useCallback(() => {
    changeTrack(trackIndexRef.current - 1)
  }, [changeTrack])

  useEffect(() => {
    nextRef.current = nextTrack
  }, [nextTrack])

  const selectTrack = useCallback((trackId: string) => {
    const index = BACKGROUND_TRACKS.findIndex((track) => track.id === trackId)
    if (index >= 0) changeTrack(index)
  }, [changeTrack])

  const startPlayback = useCallback(() => {
    void playAudio()
  }, [playAudio])

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      void playAudio()
    } else {
      audio.pause()
      persist(MUSIC_STORAGE_KEYS.enabled, '0')
      setStatus('paused')
    }
  }, [playAudio])

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.min(1, Math.max(0, nextVolume))
    setVolumeState(clamped)
    persist(MUSIC_STORAGE_KEYS.volume, String(clamped))
    if (audioRef.current) audioRef.current.volume = clamped
  }, [])

  const setPlaybackMode = useCallback((mode: PlaybackMode) => {
    playbackModeRef.current = mode
    setPlaybackModeState(mode)
    persist(MUSIC_STORAGE_KEYS.mode, mode)
    if (audioRef.current) audioRef.current.loop = mode === 'loop'
  }, [])

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(seconds)) return
    audio.currentTime = Math.min(Math.max(0, seconds), audio.duration || 0)
    setCurrentTime(audio.currentTime)
  }, [])

  useEffect(() => {
    const audio = new Audio()
    const track = BACKGROUND_TRACKS[initialTrackIndex.current] ?? BACKGROUND_TRACKS[0]
    if (!track) return undefined

    audioRef.current = audio
    audio.preload = 'metadata'
    audio.volume = readStoredVolume()
    audio.loop = playbackModeRef.current === 'loop'
    audio.src = track.src

    const restoreTime = () => {
      const savedTime = readStoredTime()
      if (savedTime > 0 && Number.isFinite(audio.duration) && savedTime < audio.duration - 1) {
        audio.currentTime = savedTime
        setCurrentTime(savedTime)
      }
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    }
    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      const second = Math.floor(audio.currentTime)
      if (Math.abs(second - lastSavedSecondRef.current) >= 5) {
        lastSavedSecondRef.current = second
        persist(MUSIC_STORAGE_KEYS.currentTime, String(audio.currentTime))
      }
    }
    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const onPlay = () => {
      setIsPlaying(true)
      setStatus('playing')
    }
    const onPause = () => {
      setIsPlaying(false)
      setStatus((current) => current === 'error' || current === 'blocked' ? current : 'paused')
    }
    const onEnded = () => {
      if (playbackModeRef.current === 'playlist') nextRef.current()
    }
    const onError = () => {
      setStatus('error')
      setLastError('Faixa indisponível. Tente a próxima música.')
    }

    audio.addEventListener('loadedmetadata', restoreTime)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      persist(MUSIC_STORAGE_KEYS.currentTime, String(audio.currentTime))
      audio.removeEventListener('loadedmetadata', restoreTime)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!('mediaSession' in navigator) || !currentTrack) return

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: 'Denky World',
      album: 'Portfolio Adventure OST',
    })
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
  }, [currentTrack, isPlaying])

  return {
    tracks: BACKGROUND_TRACKS,
    currentTrack,
    isPlaying,
    volume,
    playbackMode,
    currentTime,
    duration,
    status,
    lastError,
    startPlayback,
    togglePlayPause,
    nextTrack,
    previousTrack,
    selectTrack,
    setVolume,
    setPlaybackMode,
    seek,
  }
}

export type BackgroundMusicController = ReturnType<typeof useBackgroundMusic>

