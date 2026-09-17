"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment } from "@react-three/drei"
import { Suspense, useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useReducedMotion } from "framer-motion"

const PYTHON_LINES = [
  "from fastapi import FastAPI, Depends",
  "from qdrant_client import QdrantClient",
  "",
  "app = FastAPI(title='Sovereign AI Engine')",
  "store = QdrantClient(url=env.QDRANT)",
  "",
  "async def retrieve(query: str, tenant: str):",
  "    vec = await embed(query)",
  "    hits = store.search(",
  "        collection_name='legal_corpus',",
  "        query_vector=vec,",
  "        query_filter=tenant_owns(tenant),",
  "        limit=8,",
  "    )",
  "    return rerank(hits, query)",
  "",
  "@app.post('/api/chat/stream')",
  "async def chat(body: ChatIn, user=Depends(auth)):",
  "    docs = await retrieve(body.message, user.tenant)",
  "    prompt = render_rag(docs, body.message)",
  "    async for token in vllm.stream(prompt):",
  "        yield sse(token)",
]

function createCodeTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext("2d")!
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  let offset = 0
  let last = 0

  const draw = (time: number) => {
    if (time - last < 45) return
    last = time
    offset = (offset + 0.4) % (PYTHON_LINES.length * 28)

    ctx.fillStyle = "#071018"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // IDE chrome
    ctx.fillStyle = "#0e1822"
    ctx.fillRect(0, 0, canvas.width, 36)
    ctx.fillStyle = "#ff5f56"
    ctx.beginPath()
    ctx.arc(22, 18, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#ffbd2e"
    ctx.beginPath()
    ctx.arc(42, 18, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#27c93f"
    ctx.beginPath()
    ctx.arc(62, 18, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#7f93a3"
    ctx.font = "14px ui-monospace, monospace"
    ctx.fillText("engine/rag_api.py — vLLM · RAG · FastAPI", 90, 22)

    ctx.font = "21px ui-monospace, SFMono-Regular, Menlo, monospace"
    let y = 68 - (offset % 28)

    for (let i = 0; i < PYTHON_LINES.length + 10; i++) {
      const line = PYTHON_LINES[i % PYTHON_LINES.length]
      const lineNo = ((i % PYTHON_LINES.length) + 1).toString().padStart(2, "0")
      ctx.fillStyle = "#334552"
      ctx.fillText(lineNo, 24, y)

      if (
        line.startsWith("from ") ||
        line.startsWith("async ") ||
        line.startsWith("@app") ||
        line.includes("async def") ||
        line.startsWith("def ")
      ) {
        ctx.fillStyle = "#6fd6c0"
      } else if (line.includes("return") || line.includes("yield") || line.includes("await")) {
        ctx.fillStyle = "#8ecbff"
      } else if (line.includes("'") || line.includes('"')) {
        ctx.fillStyle = "#e6bf78"
      } else {
        ctx.fillStyle = "#d2dde6"
      }
      ctx.fillText(line, 72, y)
      y += 28
    }

    if (Math.floor(time / 480) % 2 === 0) {
      ctx.fillStyle = "#2db496"
      ctx.fillRect(72, 548, 9, 20)
    }

    texture.needsUpdate = true
  }

  return { texture, draw }
}

function CodeScreen({ reduceMotion }: { reduceMotion: boolean }) {
  const { texture, draw } = useMemo(() => createCodeTexture(), [])

  useFrame((state) => {
    if (!reduceMotion) draw(state.clock.elapsedTime * 1000)
  })

  useEffect(() => {
    draw(0)
    return () => texture.dispose()
  }, [draw, texture])

  return (
    <mesh position={[0, 1.42, -0.86]} rotation={[-0.06, 0, 0]}>
      <planeGeometry args={[2.5, 1.5]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

function TypingEngineer({
  photoUrl,
  reduceMotion,
}: {
  photoUrl: string
  reduceMotion: boolean
}) {
  const leftArm = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)
  const torso = useRef<THREE.Group>(null)

  const photoTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(photoUrl)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [photoUrl])

  useFrame((state) => {
    if (reduceMotion) return
    const t = state.clock.elapsedTime
    // Typing motion — hands on keyboard
    if (leftArm.current) {
      leftArm.current.rotation.x = -0.55 + Math.sin(t * 9.5) * 0.07
      leftArm.current.position.y = 0.42 + Math.sin(t * 9.5) * 0.012
    }
    if (rightArm.current) {
      rightArm.current.rotation.x = -0.55 + Math.sin(t * 11.2 + 1.1) * 0.08
      rightArm.current.position.y = 0.42 + Math.sin(t * 11.2 + 1.1) * 0.012
    }
    if (torso.current) {
      torso.current.rotation.x = 0.12 + Math.sin(t * 1.1) * 0.015
      torso.current.position.z = 0.55 + Math.sin(t * 1.1) * 0.008
    }
  })

  return (
    <group position={[0.05, 0.12, 0.72]}>
      {/* Chair */}
      <mesh position={[0, -0.15, 0.55]} castShadow>
        <boxGeometry args={[0.85, 0.12, 0.7]} />
        <meshStandardMaterial color="#1a222c" roughness={0.7} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.45, 0.82]} castShadow>
        <boxGeometry args={[0.85, 1.05, 0.1]} />
        <meshStandardMaterial color="#171e27" roughness={0.75} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.55, 0.55]}>
        <cylinderGeometry args={[0.08, 0.1, 0.7, 12]} />
        <meshStandardMaterial color="#2a3340" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Seated body — leaning toward screen / keyboard */}
      <group ref={torso} position={[0, 0.35, 0.55]} rotation={[0.14, 0, 0]}>
        {/* Torso (suit) */}
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[0.72, 0.85, 0.38]} />
          <meshStandardMaterial color="#2c333c" roughness={0.65} metalness={0.2} />
        </mesh>
        {/* Shirt / tie hint */}
        <mesh position={[0, 0.18, 0.2]}>
          <boxGeometry args={[0.18, 0.55, 0.05]} />
          <meshStandardMaterial color="#e8ecef" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.12, 0.23]}>
          <boxGeometry args={[0.07, 0.45, 0.03]} />
          <meshStandardMaterial color="#0d0f12" roughness={0.6} />
        </mesh>

        {/* Head with real photo — facing monitor */}
        <group position={[0, 0.78, 0.05]} rotation={[-0.08, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.5, 0.36]} />
            <meshStandardMaterial color="#1c2229" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.02, 0.185]}>
            <planeGeometry args={[0.4, 0.48]} />
            <meshStandardMaterial map={photoTexture} roughness={0.45} metalness={0.02} />
          </mesh>
        </group>

        {/* Shoulders / upper arms */}
        <mesh position={[-0.48, 0.28, 0]} rotation={[0, 0, 0.35]} castShadow>
          <capsuleGeometry args={[0.1, 0.28, 4, 8]} />
          <meshStandardMaterial color="#2c333c" roughness={0.65} />
        </mesh>
        <mesh position={[0.48, 0.28, 0]} rotation={[0, 0, -0.35]} castShadow>
          <capsuleGeometry args={[0.1, 0.28, 4, 8]} />
          <meshStandardMaterial color="#2c333c" roughness={0.65} />
        </mesh>
      </group>

      {/* Left forearm + hand on keyboard */}
      <group ref={leftArm} position={[-0.28, 0.42, 0.35]} rotation={[-0.55, 0.15, 0.1]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.07, 0.38, 4, 8]} />
          <meshStandardMaterial color="#2c333c" roughness={0.65} />
        </mesh>
        <mesh position={[0, -0.32, 0.02]} castShadow>
          <boxGeometry args={[0.16, 0.06, 0.2]} />
          <meshStandardMaterial color="#3a2a22" roughness={0.8} />
        </mesh>
      </group>

      {/* Right forearm + hand on keyboard */}
      <group ref={rightArm} position={[0.28, 0.42, 0.35]} rotation={[-0.55, -0.15, -0.1]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.07, 0.38, 4, 8]} />
          <meshStandardMaterial color="#2c333c" roughness={0.65} />
        </mesh>
        <mesh position={[0, -0.32, 0.02]} castShadow>
          <boxGeometry args={[0.16, 0.06, 0.2]} />
          <meshStandardMaterial color="#3a2a22" roughness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

function DeskScene({ photoUrl, reduceMotion }: { photoUrl: string; reduceMotion: boolean }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current || reduceMotion) return
    const t = state.clock.elapsedTime
    // Very subtle camera-orbit of the whole workstation
    group.current.rotation.y = -0.35 + Math.sin(t * 0.15) * 0.04
  })

  return (
    <group ref={group} position={[0.7, -0.55, 0]}>
      {/* Desk */}
      <mesh position={[0, 0.08, 0.1]} receiveShadow castShadow>
        <boxGeometry args={[3.8, 0.1, 1.9]} />
        <meshStandardMaterial color="#151c24" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.38, 0.05]}>
        <boxGeometry args={[3.4, 0.75, 1.55]} />
        <meshStandardMaterial color="#0e141b" roughness={0.85} />
      </mesh>

      {/* Monitor */}
      <mesh position={[0, 0.28, -0.72]}>
        <boxGeometry args={[0.55, 0.05, 0.35]} />
        <meshStandardMaterial color="#252e38" metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.55, -0.82]}>
        <cylinderGeometry args={[0.06, 0.09, 0.4, 14]} />
        <meshStandardMaterial color="#252e38" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.42, -0.92]} castShadow>
        <boxGeometry args={[2.78, 1.78, 0.1]} />
        <meshStandardMaterial color="#090d12" metalness={0.75} roughness={0.25} />
      </mesh>

      <CodeScreen reduceMotion={!!reduceMotion} />
      <pointLight position={[0, 1.4, -0.35]} intensity={2.2} color="#2db496" distance={5} />

      {/* Keyboard under hands */}
      <mesh position={[0.05, 0.16, 0.42]} castShadow>
        <boxGeometry args={[1.35, 0.04, 0.48]} />
        <meshStandardMaterial color="#1c2430" metalness={0.35} roughness={0.45} />
      </mesh>
      {/* keycaps hint */}
      {[-0.4, -0.15, 0.1, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.19, 0.4]}>
          <boxGeometry args={[0.18, 0.015, 0.28]} />
          <meshStandardMaterial color="#2a3442" roughness={0.5} />
        </mesh>
      ))}

      {/* Mug */}
      <mesh position={[-1.35, 0.24, 0.35]} castShadow>
        <cylinderGeometry args={[0.09, 0.08, 0.22, 16]} />
        <meshStandardMaterial color="#2f3a46" roughness={0.6} />
      </mesh>

      <TypingEngineer photoUrl={photoUrl} reduceMotion={!!reduceMotion} />

      <ContactShadows position={[0, -0.02, 0]} opacity={0.55} scale={10} blur={2.8} far={5} />
    </group>
  )
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3.5, 5.5, 2.5]} intensity={1.35} color="#f4f8fb" castShadow />
      <directionalLight position={[-3, 2.5, 2]} intensity={0.45} color="#5ed0b4" />
      <spotLight position={[2, 4, 3]} angle={0.48} penumbra={0.6} intensity={1.1} color="#ffffff" />
    </>
  )
}

export default function HeroScene3D({ photoUrl = "/images/profile.png" }: { photoUrl?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [2.1, 1.65, 3.35], fov: 38, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <DeskScene photoUrl={photoUrl} reduceMotion={!!reduceMotion} />
          <Environment preset="night" environmentIntensity={0.3} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent lg:via-background/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/45" />
    </div>
  )
}
