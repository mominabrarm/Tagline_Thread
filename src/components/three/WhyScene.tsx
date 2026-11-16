import React, { useRef, useMemo, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

export interface LogoReactionState {
  active: boolean
  tiltX: number
  tiltY: number
  proximity: number
}

interface LogoObjectProps {
  reaction: LogoReactionState
}

const TaglineThread3DModel: React.FC<LogoObjectProps> = ({ reaction }) => {
  const groupRef = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, '/tagline-thread.glb')
  // Compact scale for side-by-side layout
  const baseScale = 1.75

  // Clone scene and disable raycasting to completely eliminate CPU stutter
  const sceneClone = useMemo(() => {
    const clone = gltf.scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.raycast = () => {}
        if (mesh.material) {
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial
          if ('envMapIntensity' in mat) mat.envMapIntensity = 2.0
          if ('roughness' in mat) mat.roughness = Math.min(mat.roughness, 0.35)
          if ('metalness' in mat) mat.metalness = Math.max(mat.metalness, 0.45)
          mesh.material = mat
        }
      }
    })
    return clone
  }, [gltf.scene])

  // Continuous frame loop: 100% lightweight GPU tilt and rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (reaction.active) {
      // 1. A floating box is dragged physically over the 3D logo
      const targetRotX = reaction.tiltX * 0.95
      const targetRotZ = reaction.tiltY * 0.95
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.15)
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.15)

      // Energetic spin acceleration
      groupRef.current.rotation.y += delta * 3.5

      // Scale excitation (pulses up to 2.15x)
      const targetScale = baseScale * 1.2
      const currentScale = groupRef.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.15)
      groupRef.current.scale.set(newScale, newScale, newScale)
    } else {
      // 2. Direct cursor reaction: ultra-smooth GPU tilt tracking (ZERO raycasting, zero lag)
      const cursorTiltX = -state.pointer.y * 0.45
      const cursorTiltZ = -state.pointer.x * 0.3
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, cursorTiltX, 0.08)
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, cursorTiltZ, 0.08)

      // Natural rotation influenced by cursor distance from center
      const speed = 0.75 + Math.abs(state.pointer.x) * 0.45
      groupRef.current.rotation.y += delta * speed

      // Smoothly maintain base scale
      const currentScale = groupRef.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, baseScale, 0.08)
      groupRef.current.scale.set(newScale, newScale, newScale)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive
        object={sceneClone}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  )
}

// Procedural Fallback if GLB is loading or in non-WebGL environments
const FallbackLogo: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.6
    }
  })
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.9, 2]} />
      <meshStandardMaterial
        color="#FF5400"
        emissive="#FF5400"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Ambient Floating Spark Particles around Logo (clean subtle particles, no rings)
const AmbientFloatingSparks: React.FC<{ active: boolean }> = ({ active }) => {
  const count = 18
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const radius = 1.05 + (i % 3) * 0.2
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.75,
        z: (Math.random() - 0.5) * 0.6,
        color: i % 2 === 0 ? '#FF5400' : '#8824FF',
      }
    })
  }, [])

  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const speed = active ? 0.45 : 0.15
      groupRef.current.rotation.y = clock.getElapsedTime() * speed
      groupRef.current.rotation.z = clock.getElapsedTime() * (speed * 0.5)
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  )
}

interface WhySceneProps {
  reaction?: LogoReactionState
}

export const WhyScene: React.FC<WhySceneProps> = ({
  reaction = { active: false, tiltX: 0, tiltY: 0, proximity: 0 },
}) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={42} />

      {/* Volumetric Studio Lighting (flares when card is over logo) */}
      <ambientLight intensity={reaction.active ? 1.2 : 0.7} />
      {/* Neon Orange Directional Light */}
      <directionalLight
        position={[3.5, 3, 2.5]}
        intensity={reaction.active ? 6.2 : 3.2}
        color="#FF5400"
      />
      {/* Electric Purple Rim Light */}
      <directionalLight
        position={[-3.5, -2, 2]}
        intensity={reaction.active ? 5.8 : 2.9}
        color="#8824FF"
      />
      {/* Central Highlight Spot */}
      <pointLight
        position={[0, 0, 1.8]}
        intensity={reaction.active ? 5.0 : 1.5}
        color={reaction.active ? '#FF5400' : '#FFFFFF'}
      />

      {/* 3D Tagline-Thread Logo Model */}
      <Suspense fallback={<FallbackLogo />}>
        <TaglineThread3DModel reaction={reaction} />
      </Suspense>

      {/* Subtle Floating Sparks (no rings) */}
      <AmbientFloatingSparks active={reaction.active} />

      {/* Local Fill Lighting (replaces remote HDR to eliminate lag) */}
      <hemisphereLight args={['#2A3038', '#101519', 0.8]} />
    </>
  )
}
