export const STAGE_MUSIC_EVENT = 'denky:portfolio-stage-music'

export interface StageMusicEventDetail {
  trackId: string | null
}

export function requestStageMusic(trackId: string | null) {
  window.dispatchEvent(
    new CustomEvent<StageMusicEventDetail>(STAGE_MUSIC_EVENT, {
      detail: { trackId },
    }),
  )
}
