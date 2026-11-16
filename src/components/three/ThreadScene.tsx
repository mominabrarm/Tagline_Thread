import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ThreadSceneProps {
  stage: number // 0–4
}

// Branding Identity: abstract geometric mark
const BrandingStage: React.FC<{ active: boolean }> = ({ active }) => {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * (active ? 0.5 : 0.1)
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
  })
  return (
    <group ref={groupRef} visible={active}>
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#FF5400" wireframe emissive="#FF5400" emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.03, 8, 64]} />
        <meshStandardMaterial color="#8824FF" transparent opacity={0.7} emissive="#8824FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[1.2, 0.03, 8, 64]} />
        <meshStandardMaterial color="#FF5400" transparent opacity={0.5} emissive="#FF5400" emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

// Websites: floating screen
const WebsiteStage: React.FC<{ active: boolean }> = ({ active }) => {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.1
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.15
  })
  return (
    <group ref={groupRef} visible={active}>
      {/* Screen body */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.06]} />
        <meshStandardMaterial color="#181B1F" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen face */}
      <mesh position={[0, 0.1, 0.035]}>
        <planeGeometry args={[2.0, 1.2]} />
        <meshStandardMaterial color="#0C0E10" emissive="#FF5400" emissiveIntensity={0.08} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.9, 12]} />
        <meshStandardMaterial color="#23272D" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Orange thread accent */}
      <mesh position={[0, 0.1, 0.04]}>
        <torusGeometry args={[1.1, 0.02, 6, 60]} />
        <meshStandardMaterial color="#FF5400" emissive="#FF5400" emissiveIntensity={0.6} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// Social Media Management: smartphone + content
const SocialMgmtStage: React.FC<{ active: boolean }> = ({ active }) => {
  const phoneRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!phoneRef.current) return
    phoneRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.3
    phoneRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.08
  })
  return (
    <group ref={phoneRef} visible={active}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[0.7, 1.4, 0.08]} />
        <meshStandardMaterial color="#181B1F" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial color="#0C0E10" emissive="#8824FF" emissiveIntensity={0.1} />
      </mesh>
      {/* Floating content cards */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x * 1.4, 0.3 - i * 0.4, 0.3]}>
          <boxGeometry args={[0.6, 0.25, 0.04]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#8824FF' : '#FF5400'}
            transparent opacity={0.7}
            emissive={i % 2 === 0 ? '#8824FF' : '#FF5400'}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// Social Media Marketing: expanding network
const MarketingStage: React.FC<{ active: boolean }> = ({ active }) => {
  const groupRef = useRef<THREE.Group>(null)
  const count = 8

  const nodePositions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const r = 1.2 + (i % 2) * 0.3
      return new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r * 0.5, 0)
    })
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = clock.getElapsedTime() * 0.15
  })

  return (
    <group ref={groupRef} visible={active}>
      {/* Center */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 12]} />
        <meshStandardMaterial color="#FF5400" emissive="#FF5400" emissiveIntensity={0.5} />
      </mesh>
      {/* Outer nodes + lines to center */}
      {nodePositions.map((pos, i) => (
        <group key={i}>
          <mesh position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.1, 10, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#8824FF' : '#FF5400'}
              emissive={i % 2 === 0 ? '#8824FF' : '#FF5400'}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Unified: all four connected
const UnifiedStage: React.FC<{ active: boolean }> = ({ active }) => {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
  })
  return (
    <group ref={groupRef} visible={active}>
      <mesh position={[-1.0, 0.6, 0]}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#FF5400" wireframe emissive="#FF5400" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.0, 0.6, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#8824FF" emissive="#8824FF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-1.0, -0.6, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.05]} />
        <meshStandardMaterial color="#8824FF" emissive="#8824FF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[1.0, -0.6, 0]}>
        <sphereGeometry args={[0.3, 12, 8]} />
        <meshStandardMaterial color="#FF5400" emissive="#FF5400" emissiveIntensity={0.3} />
      </mesh>
      {/* Central connector */}
      <mesh>
        <sphereGeometry args={[0.15, 10, 8]} />
        <meshStandardMaterial color="#E9ECEF" emissive="#E9ECEF" emissiveIntensity={0.5} />
      </mesh>
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.02, 6, 80]} />
        <meshStandardMaterial color="#FF5400" transparent opacity={0.5} emissive="#FF5400" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

export const ThreadScene: React.FC<ThreadSceneProps> = ({ stage }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 2, 3]} intensity={1.0} color="#FF5400" />
      <pointLight position={[-3, -1, 2]} intensity={0.7} color="#8824FF" />

      <BrandingStage  active={stage === 0} />
      <WebsiteStage   active={stage === 1} />
      <SocialMgmtStage active={stage === 2} />
      <MarketingStage active={stage === 3} />
      <UnifiedStage   active={stage === 4} />
    </>
  )
}

