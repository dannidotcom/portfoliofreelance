import type { AudioSource, AudioSourceListeners } from "./types"

export type FocusAudioBackend = "youtube" | "local"

/**
 * Switch the focus-music backend with NEXT_PUBLIC_FOCUS_AUDIO_SOURCE=youtube|local (default: youtube).
 * "local" plays `localSrc` from /public and never contacts YouTube.
 */
export const focusAudio = {
  backend: (process.env.NEXT_PUBLIC_FOCUS_AUDIO_SOURCE === "local" ? "local" : "youtube") as FocusAudioBackend,
  youtubeVideoId: "0w80F8FffQ4",
  localSrc: "/audio/coding-focus.mp3",
  defaultVolume: 30,
} as const

/** Backends are code-split: nothing is downloaded before the first click. */
export async function createFocusAudioSource(
  container: HTMLElement,
  listeners: AudioSourceListeners,
): Promise<AudioSource> {
  if (focusAudio.backend === "local") {
    const { LocalAudioSource } = await import("./local-source")
    return new LocalAudioSource(focusAudio.localSrc, listeners)
  }
  const { YouTubeAudioSource } = await import("./youtube-source")
  return new YouTubeAudioSource(focusAudio.youtubeVideoId, container, listeners)
}
