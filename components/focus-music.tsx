"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

/** Build a short looping focus track as WAV (audible, reliable on click). */
async function buildFocusTrack(): Promise<Blob> {
  const sampleRate = 44100
  const duration = 8
  const offline = new OfflineAudioContext(2, sampleRate * duration, sampleRate)

  const master = offline.createGain()
  master.gain.value = 0.55
  master.connect(offline.destination)

  const tones = [
    { f: 98, g: 0.22, type: "sine" as OscillatorType, pan: -0.35 },
    { f: 146.83, g: 0.16, type: "sine" as OscillatorType, pan: 0.25 },
    { f: 196, g: 0.1, type: "triangle" as OscillatorType, pan: 0.4 },
    { f: 293.66, g: 0.07, type: "sine" as OscillatorType, pan: -0.15 },
  ]

  tones.forEach(({ f, g, type, pan }) => {
    const osc = offline.createOscillator()
    const gain = offline.createGain()
    const filter = offline.createBiquadFilter()
    const panner = offline.createStereoPanner()
    osc.type = type
    osc.frequency.value = f
    filter.type = "lowpass"
    filter.frequency.value = 1200
    gain.gain.value = g
    panner.pan.value = pan
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(panner)
    panner.connect(master)
    osc.start(0)
    osc.stop(duration)
  })

  // Noise bed
  const noiseLen = sampleRate * duration
  const noiseBuf = offline.createBuffer(1, noiseLen, sampleRate)
  const ch = noiseBuf.getChannelData(0)
  for (let i = 0; i < noiseLen; i++) ch[i] = (Math.random() * 2 - 1) * 0.04
  const noise = offline.createBufferSource()
  noise.buffer = noiseBuf
  const nFilter = offline.createBiquadFilter()
  nFilter.type = "bandpass"
  nFilter.frequency.value = 480
  nFilter.Q.value = 0.7
  const nGain = offline.createGain()
  nGain.gain.value = 0.45
  noise.connect(nFilter)
  nFilter.connect(nGain)
  nGain.connect(master)
  noise.start(0)

  // Soft pulse rhythm (not a beat drop — concentration)
  for (let i = 0; i < 16; i++) {
    const t = i * 0.5
    const click = offline.createOscillator()
    const cg = offline.createGain()
    click.type = "sine"
    click.frequency.value = 180
    cg.gain.setValueAtTime(0.0001, t)
    cg.gain.exponentialRampToValueAtTime(0.08, t + 0.02)
    cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
    click.connect(cg)
    cg.connect(master)
    click.start(t)
    click.stop(t + 0.3)
  }

  const rendered = await offline.startRendering()
  return audioBufferToWavBlob(rendered)
}

function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels
  const sampleRate = buffer.sampleRate
  const format = 1
  const bitDepth = 16
  const samples = buffer.length
  const blockAlign = (numChannels * bitDepth) / 8
  const byteRate = sampleRate * blockAlign
  const dataSize = samples * blockAlign
  const arrayBuffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(arrayBuffer)

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeStr(0, "RIFF")
  view.setUint32(4, 36 + dataSize, true)
  writeStr(8, "WAVE")
  writeStr(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, format, true)
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitDepth, true)
  writeStr(36, "data")
  view.setUint32(40, dataSize, true)

  let offset = 44
  const channels: Float32Array[] = []
  for (let c = 0; c < numChannels; c++) channels.push(buffer.getChannelData(c))

  for (let i = 0; i < samples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
      offset += 2
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" })
}

export default function FocusMusic() {
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const urlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  const ensureAudio = useCallback(async () => {
    if (audioRef.current) return audioRef.current
    setLoading(true)
    try {
      const blob = await buildFocusTrack()
      const url = URL.createObjectURL(blob)
      urlRef.current = url
      const audio = new Audio(url)
      audio.loop = true
      audio.volume = 0.55
      audioRef.current = audio
      return audio
    } finally {
      setLoading(false)
    }
  }, [])

  const toggle = async () => {
    setError(null)
    try {
      const audio = await ensureAudio()
      if (playing) {
        audio.pause()
        setPlaying(false)
        return
      }
      await audio.play()
      setPlaying(true)
    } catch (e) {
      console.error(e)
      setError("Audio bloqué")
      setPlaying(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {error ? <span className="text-[10px] text-red-400 bg-background/80 px-2 py-1 rounded">{error}</span> : null}
      <button
        type="button"
        onClick={toggle}
        disabled={loading}
        className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-background/90 px-4 py-2.5 text-xs font-semibold text-champagne backdrop-blur-md shadow-[0_0_24px_hsl(168_55%_40%/0.25)] transition-all hover:border-primary/60 hover:bg-background focus-ring disabled:opacity-60"
        aria-pressed={playing}
        aria-label={playing ? "Pause musique coding focus" : "Lire musique coding focus"}
      >
        {playing ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
        <span>{loading ? "Préparation…" : playing ? "Coding focus · ON" : "▶ Lire coding focus"}</span>
      </button>
    </div>
  )
}
