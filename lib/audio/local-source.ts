import type { AudioSource, AudioSourceListeners } from "./types"

export class LocalAudioSource implements AudioSource {
  private audio: HTMLAudioElement | null = null

  constructor(
    private readonly src: string,
    private readonly listeners: AudioSourceListeners,
  ) {}

  load(): Promise<void> {
    const audio = new Audio()
    audio.loop = true
    audio.preload = "auto"
    this.audio = audio

    audio.addEventListener("playing", () => this.listeners.onStateChange("playing"))
    audio.addEventListener("pause", () => this.listeners.onStateChange("paused"))
    audio.addEventListener("waiting", () => this.listeners.onStateChange("buffering"))

    return new Promise((resolve, reject) => {
      const onReady = () => {
        audio.removeEventListener("error", onFail)
        audio.addEventListener("error", () => this.listeners.onError("network"))
        resolve()
      }
      const onFail = () => {
        audio.removeEventListener("canplay", onReady)
        this.listeners.onError("unavailable")
        reject(new Error(`Cannot load ${this.src}`))
      }
      audio.addEventListener("canplay", onReady, { once: true })
      audio.addEventListener("error", onFail, { once: true })
      audio.src = this.src
      audio.load()
    })
  }

  play() {
    this.audio?.play().catch(() => this.listeners.onStateChange("paused"))
  }

  pause() {
    this.audio?.pause()
  }

  isPlaying() {
    return !!this.audio && !this.audio.paused
  }

  setVolume(volume: number) {
    if (this.audio) this.audio.volume = Math.min(1, Math.max(0, volume / 100))
  }

  setMuted(muted: boolean) {
    if (this.audio) this.audio.muted = muted
  }

  destroy() {
    if (!this.audio) return
    this.audio.pause()
    this.audio.removeAttribute("src")
    this.audio.load()
    this.audio = null
  }
}
