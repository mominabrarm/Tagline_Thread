import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// ─── Camera with subtle scroll-linked tilt ────────────────────────────────────
const ScrollCamera: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const { camera } = useThree()

  useFrame(() => {
    const baseY = 1.4
    const baseZ = 2.8
    const tilt = scrollProgress * 0.35
    camera.position.set(0.1, baseY - tilt * 0.25, baseZ - tilt * 0.4)
    camera.lookAt(0, 0.1, 0)
  })

  return null
}

// ─── Studio Desk Surface with dark wood/stone shader ──────────────────────────
const StudioDesk: React.FC = () => {
  return (
    <group position={[0, -0.32, 0]}>
      {/* Main desk surface */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial
          color="#0f1114"
          roughness={0.75}
          metalness={0.25}
          envMapIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

// ─── Laptop on Desk with Screen Texture (Ref: Image 2) ────────────────────────
const WorkspaceLaptop: React.FC = () => {
  const { scene } = useGLTF('/modern_slim_laptop.glb')

  const cloned = useMemo(() => {
    const c = scene.clone(true)
    const darkMetal = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#101519'),
      metalness: 0.92,
      roughness: 0.2,
    })
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0c0e'),
      metalness: 0.3,
      roughness: 0.7,
    })
    const screenMat = new THREE.MeshBasicMaterial({ color: '#090a0d' })

    c.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (child.name.includes('Keyboard')) {
        child.material = keyboardMat
      } else if (child.name.includes('Screen_Screen')) {
        child.material = screenMat
      } else {
        child.material = darkMetal
      }
      child.castShadow = true
      child.receiveShadow = true
    })
    return c
  }, [scene])

  // Canvas texture displaying "TT \n Ideas → Strategy → Impact" with thread wave (Ref: Image 2)
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 320
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Dark screen background
      ctx.fillStyle = '#090B0E'
      ctx.fillRect(0, 0, 512, 320)

      // TT monogram
      ctx.font = 'bold 36px Syne, serif'
      ctx.fillStyle = '#E9ECEF'
      ctx.textAlign = 'center'
      ctx.fillText('TT', 256, 110)

      // Subtitle: Ideas → Strategy → Impact
      ctx.font = '16px Geist, sans-serif'
      ctx.fillStyle = 'rgba(233, 236, 239, 0.75)'
      ctx.fillText('Ideas  →  Strategy  →  Impact', 256, 160)

      // Luminous neon thread wave
      ctx.beginPath()
      ctx.moveTo(80, 220)
      ctx.bezierCurveTo(180, 260, 320, 180, 432, 220)
      ctx.strokeStyle = '#FF5400'
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(80, 230)
      ctx.bezierCurveTo(200, 190, 300, 250, 432, 215)
      ctx.strokeStyle = '#8824FF'
      ctx.lineWidth = 2
      ctx.stroke()
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  return (
    <group position={[-0.35, -0.3, -0.1]} rotation={[0, 0.28, 0]} scale={2.4}>
      <primitive object={cloned} />

      {/* Screen texture plane positioned flush on the screen */}
      <group position={[0, 0.133, -0.146]} rotation={[-0.212, 0, 0]}>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[0.26, 0.165]} />
          <meshBasicMaterial map={screenTexture} />
        </mesh>
      </group>
    </group>
  )
}

// ─── Smartphone on Desk (Ref: Image 2) ─────────────────────────────────────────
const WorkspacePhone: React.FC = () => {
  const { scene } = useGLTF('/minimal_smart_phone.glb')

  const cloned = useMemo(() => {
    const c = scene.clone(true)
    const phoneMetal = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121316'),
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 1.5,
    })
    const phoneScreen = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#08090b'),
      roughness: 0.1,
      metalness: 0.9,
    })

    c.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      if (child.name.includes('Screen')) {
        child.material = phoneScreen
      } else {
        child.material = phoneMetal
      }
      child.castShadow = true
      child.receiveShadow = true
    })
    return c
  }, [scene])

  return (
    <primitive
      object={cloned}
      position={[0.7, -0.28, 0.25]}
      rotation={[-Math.PI / 2, 0, -0.35]}
      scale={0.8}
    />
  )
}

// ─── Black Ceramic TT Coffee Mug (Ref: Image 2) ───────────────────────────────
const CeramicCoffeeMug: React.FC = () => {
  return (
    <group position={[0.42, -0.2, -0.15]} rotation={[0, -0.4, 0]}>
      {/* Mug Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.11, 0.09, 0.22, 28]} />
        <meshStandardMaterial color="#101519" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Mug Handle */}
      <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.06, 0.018, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#101519" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Golden TT Brand Mark on Mug Face */}
      <mesh position={[0, 0, 0.112]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.08, 0.05]} />
        <meshBasicMaterial color="#E9ECEF" transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

// ─── Stack of Books & Pen Holder (Ref: Image 2) ────────────────────────────────
const DeskAccessories: React.FC = () => {
  return (
    <group position={[-1.25, -0.2, -0.25]} rotation={[0, 0.15, 0]}>
      {/* Book 1: DIGITAL */}
      <mesh position={[0, -0.07, 0]} castShadow>
        <boxGeometry args={[0.45, 0.045, 0.6]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.7} />
      </mesh>
      {/* Book 2: DESIGN */}
      <mesh position={[0.01, -0.025, 0]} castShadow>
        <boxGeometry args={[0.43, 0.045, 0.58]} />
        <meshStandardMaterial color="#25292f" roughness={0.65} />
      </mesh>
      {/* Book 3: BRAND */}
      <mesh position={[-0.01, 0.02, 0]} castShadow>
        <boxGeometry args={[0.42, 0.045, 0.56]} />
        <meshStandardMaterial color="#15171a" roughness={0.7} />
      </mesh>

      {/* Pen Cup with Pens */}
      <group position={[-0.05, 0.12, -0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.065, 0.06, 0.14, 20]} />
          <meshStandardMaterial color="#181a1d" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Pens sticking out */}
        <mesh position={[0.01, 0.08, 0.01]} rotation={[0.2, 0, -0.15]}>
          <cylinderGeometry args={[0.007, 0.007, 0.18, 8]} />
          <meshStandardMaterial color="#FF5400" />
        </mesh>
        <mesh position={[-0.015, 0.08, -0.01]} rotation={[-0.15, 0, 0.2]}>
          <cylinderGeometry args={[0.007, 0.007, 0.17, 8]} />
          <meshStandardMaterial color="#8824FF" />
        </mesh>
      </group>
    </group>
  )
}

// ─── Luminous Neon Ring in Background (Ref: Image 2) ──────────────────────────
const BackgroundNeonRing: React.FC = () => {
  return (
    <group position={[0.1, 0.5, -0.8]} rotation={[0.2, 0.3, 0]}>
      {/* Glowing neon halo */}
      <mesh>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshBasicMaterial color="#FF5400" />
      </mesh>
      {/* Purple secondary halo */}
      <mesh position={[0.1, -0.1, -0.1]} rotation={[0.1, -0.2, 0.2]}>
        <torusGeometry args={[1.4, 0.015, 16, 64]} />
        <meshBasicMaterial color="#8824FF" />
      </mesh>
    </group>
  )
}

// ─── Main WorkspaceScene ───────────────────────────────────────────────────────
export const WorkspaceScene: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  return (
    <>
      <ScrollCamera scrollProgress={scrollProgress} />

      {/* Volumetric Studio Lighting */}
      <ambientLight intensity={0.25} />
      <pointLight position={[2, 2.2, 1.2]} intensity={3.5} color="#FF5400" distance={7} />
      <pointLight position={[-2, 1.5, 0.8]} intensity={2.5} color="#8824FF" distance={7} />
      <directionalLight position={[0, 3, 1]} intensity={1.2} color="#E9ECEF" />
      <pointLight position={[0.4, 0.3, 0.5]} intensity={1.2} color="#FF5400" distance={4} />

      {/* Desk Ground */}
      <StudioDesk />

      {/* Real 3D Laptop */}
      <WorkspaceLaptop />

      {/* Real 3D Smartphone */}
      <WorkspacePhone />

      {/* Ceramic Mug with TT Logo */}
      <CeramicCoffeeMug />

      {/* Books and Pen Cup */}
      <DeskAccessories />

      {/* Luminous Neon Ring */}
      <BackgroundNeonRing />
    </>
  )
}

useGLTF.preload('/modern_slim_laptop.glb')
useGLTF.preload('/minimal_smart_phone.glb')
