export type AudioPlaybackState = "playing" | "paused" | "buffering" | "ended"

/** "unavailable": the media cannot be played (removed, private, embedding disabled, missing file). */
export type AudioErrorKind = "unavailable" | "network"

export type AudioSourceListeners = {
  onStateChange: (state: AudioPlaybackState) => void
  onError: (kind: AudioErrorKind) => void
}

/** Minimal playback contract shared by every focus-music backend, so the UI never depends on one provider. */
export interface AudioSource {
  /** Loads the backend. Resolves once `play()` can be called. */
  load(): Promise<void>
  play(): void
  pause(): void
  isPlaying(): boolean
  /** 0–100 */
  setVolume(volume: number): void
  setMuted(muted: boolean): void
  destroy(): void
}

export type AudioSourceFactory = (container: HTMLElement, listeners: AudioSourceListeners) => AudioSource
