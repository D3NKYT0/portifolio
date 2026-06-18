export type SoundId =
  | 'start'
  | 'coin'
  | 'jump'
  | 'warp'
  | 'select'
  | 'bump'
  | 'powerup'
  | 'error'
  | 'block'

const STORAGE_KEY = 'denky_sound_muted'

let audioCtx: AudioContext | null = null
let muted = false

function readMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

muted = readMuted()

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

export async function ensureAudio(): Promise<void> {
  const ctx = getCtx()
  if (ctx.state === 'suspended') {
    await ctx.resume()
  }
}

export function isMuted(): boolean {
  return muted
}

export function setMuted(value: boolean): void {
  muted = value
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  } catch {
    /* ignore */
  }
}

export function toggleMuted(): boolean {
  setMuted(!muted)
  return muted
}

function midiToFreq(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12)
}

function playSquare(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  volume = 0.12,
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'square'
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

function playTriangle(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  volume = 0.1,
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

function playSequence(
  ctx: AudioContext,
  notes: Array<{ midi: number; at: number; dur: number; vol?: number }>,
  wave: 'square' | 'triangle' = 'square',
) {
  const now = ctx.currentTime
  for (const note of notes) {
    const fn = wave === 'square' ? playSquare : playTriangle
    fn(ctx, midiToFreq(note.midi), now + note.at, note.dur, note.vol ?? 0.12)
  }
}

function playJump(ctx: AudioContext) {
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'square'
  osc.frequency.setValueAtTime(midiToFreq(60), now)
  osc.frequency.exponentialRampToValueAtTime(midiToFreq(84), now + 0.12)
  gain.gain.setValueAtTime(0.1, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.2)
}

function playWarp(ctx: AudioContext) {
  const now = ctx.currentTime
  playSequence(ctx, [
    { midi: 48, at: 0, dur: 0.08, vol: 0.1 },
    { midi: 44, at: 0.06, dur: 0.08, vol: 0.1 },
    { midi: 40, at: 0.12, dur: 0.1, vol: 0.1 },
    { midi: 52, at: 0.22, dur: 0.06, vol: 0.12 },
    { midi: 64, at: 0.28, dur: 0.12, vol: 0.12 },
  ])
  const noise = ctx.createBufferSource()
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
  }
  noise.buffer = buffer
  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.04, now + 0.1)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
  noise.connect(noiseGain)
  noiseGain.connect(ctx.destination)
  noise.start(now + 0.1)
  noise.stop(now + 0.26)
}

const SOUND_PLAYERS: Record<SoundId, (ctx: AudioContext) => void> = {
  start: (ctx) => {
    playSequence(ctx, [
      { midi: 60, at: 0, dur: 0.1 },
      { midi: 64, at: 0.1, dur: 0.1 },
      { midi: 67, at: 0.2, dur: 0.1 },
      { midi: 72, at: 0.3, dur: 0.25, vol: 0.14 },
    ])
  },
  coin: (ctx) => {
    playSequence(ctx, [
      { midi: 84, at: 0, dur: 0.06, vol: 0.1 },
      { midi: 88, at: 0.07, dur: 0.12, vol: 0.12 },
    ])
  },
  jump: playJump,
  warp: playWarp,
  select: (ctx) => {
    playSquare(ctx, midiToFreq(76), ctx.currentTime, 0.06, 0.08)
  },
  bump: (ctx) => {
    playSquare(ctx, midiToFreq(40), ctx.currentTime, 0.08, 0.1)
  },
  powerup: (ctx) => {
    playSequence(ctx, [
      { midi: 60, at: 0, dur: 0.08 },
      { midi: 64, at: 0.08, dur: 0.08 },
      { midi: 67, at: 0.16, dur: 0.08 },
      { midi: 72, at: 0.24, dur: 0.08 },
      { midi: 76, at: 0.32, dur: 0.2, vol: 0.14 },
    ])
  },
  error: (ctx) => {
    playSequence(ctx, [
      { midi: 56, at: 0, dur: 0.15, vol: 0.12 },
      { midi: 48, at: 0.16, dur: 0.25, vol: 0.12 },
    ])
  },
  block: (ctx) => {
    playSequence(ctx, [
      { midi: 72, at: 0, dur: 0.05, vol: 0.1 },
      { midi: 76, at: 0.05, dur: 0.05, vol: 0.1 },
      { midi: 79, at: 0.1, dur: 0.08, vol: 0.12 },
    ])
  },
}

export function playSound(id: SoundId): void {
  if (muted) return
  try {
    const ctx = getCtx()
    if (ctx.state === 'suspended') {
      void ctx.resume()
    }
    SOUND_PLAYERS[id](ctx)
  } catch {
    /* Web Audio indisponível */
  }
}
