import type { AudioErrorKind, AudioSource, AudioSourceListeners } from "./types"

type YTPlayer = {
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  getPlayerState(): number
  setVolume(volume: number): void
  mute(): void
  unMute(): void
  getIframe(): HTMLIFrameElement
  destroy(): void
}

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      host?: string
      videoId: string
      width?: number
      height?: number
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: () => void
        onStateChange?: (event: { data: number }) => void
        onError?: (event: { data: number }) => void
      }
    },
  ) => YTPlayer
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3 } as const
const LOAD_TIMEOUT_MS = 15_000

let apiPromise: Promise<YTNamespace> | null = null

function loadIframeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previous?.()
        if (window.YT) resolve(window.YT)
      }
      const script = document.createElement("script")
      script.src = "https://www.youtube.com/iframe_api"
      script.async = true
      script.onerror = () => {
        apiPromise = null
        script.remove()
        reject(new Error("YouTube IFrame API failed to load"))
      }
      document.head.appendChild(script)
    })
  }
  return apiPromise
}

/** 2: invalid id, 100: removed/private, 101/150: embedding disabled, 5: HTML5 player error. */
function errorKind(code: number): AudioErrorKind {
  return code === 5 ? "network" : "unavailable"
}

/** Audio-only playback: the player lives in a 1×1 invisible container provided by the UI. */
export class YouTubeAudioSource implements AudioSource {
  private player: YTPlayer | null = null
  private ready = false

  constructor(
    private readonly videoId: string,
    private readonly container: HTMLElement,
    private readonly listeners: AudioSourceListeners,
  ) {}

  async load(): Promise<void> {
    let YT: YTNamespace
    try {
      YT = await loadIframeApi()
    } catch (error) {
      this.listeners.onError("network")
      throw error
    }

    const target = document.createElement("div")
    this.container.replaceChildren(target)

    await new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        this.listeners.onError("network")
        reject(new Error("YouTube player timed out"))
      }, LOAD_TIMEOUT_MS)

      this.player = new YT.Player(target, {
        host: "https://www.youtube-nocookie.com",
        videoId: this.videoId,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: this.videoId,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            window.clearTimeout(timeout)
            this.ready = true
            const iframe = this.player?.getIframe()
            iframe?.setAttribute("tabindex", "-1")
            iframe?.setAttribute("aria-hidden", "true")
            iframe?.setAttribute("title", "Coding focus audio")
            resolve()
          },
          onStateChange: ({ data }) => {
            if (data === STATE.PLAYING) this.listeners.onStateChange("playing")
            else if (data === STATE.PAUSED) this.listeners.onStateChange("paused")
            else if (data === STATE.BUFFERING) this.listeners.onStateChange("buffering")
            else if (data === STATE.ENDED) {
              this.player?.seekTo(0, true)
              this.player?.playVideo()
            }
          },
          onError: ({ data }) => {
            window.clearTimeout(timeout)
            this.listeners.onError(errorKind(data))
            if (!this.ready) reject(new Error(`YouTube player error ${data}`))
          },
        },
      })
    })
  }

  play() {
    this.player?.playVideo()
  }

  pause() {
    this.player?.pauseVideo()
  }

  isPlaying() {
    return this.ready && this.player?.getPlayerState() === STATE.PLAYING
  }

  setVolume(volume: number) {
    if (this.ready) this.player?.setVolume(Math.round(Math.min(100, Math.max(0, volume))))
  }

  setMuted(muted: boolean) {
    if (!this.ready) return
    if (muted) this.player?.mute()
    else this.player?.unMute()
  }

  destroy() {
    this.player?.destroy()
    this.player = null
    this.ready = false
    this.container.replaceChildren()
  }
}
