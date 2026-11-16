import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Plane, Ring, Environment, PerspectiveCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface EnergyRingProps {
  rotX: number
  color: string
  speed: number
}

const EnergyRing: React.FC<EnergyRingProps> = ({ rotX, color, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed
    }
  })

  return (
    <Ring
      ref={meshRef}
      args={[0.9, 0.92, 64]}
      rotation={[rotX, 0, 0]}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </Ring>
  )
}

const OrbitalParticles: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4
      groupRef.current.rotation.z += delta * 0.2
    }
  })

  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2
    return {
      x: Math.cos(angle) * 1.1,
      y: Math.sin(angle) * 1.1,
      z: 0,
      color: i % 2 === 0 ? '#FF5400' : '#8824FF',
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Sphere key={i} args={[0.02, 8, 8]} position={[p.x, p.y, p.z]}>
          <meshBasicMaterial color={p.color} />
        </Sphere>
      ))}
    </group>
  )
}

const FloatingLogoPlane: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture('/logo.png')

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6 // slow smooth rotation
    }
  })

  return (
    <Plane ref={meshRef} args={[0.9, 0.9]} position={[0, 0, 0.1]}>
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </Plane>
  )
}

const GlassOrb: React.FC = () => {
  return (
    <Sphere args={[0.8, 64, 64]} position={[0, 0, 0]}>
      <meshPhysicalMaterial
        transmission={0.9}
        roughness={0.05}
        metalness={0}
        ior={1.5}
        thickness={0.5}
        transparent
        opacity={0.85}
        color="#8824FF"
        envMapIntensity={1}
      />
    </Sphere>
  )
}

export const LogoOrb: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[1.5, 1.5, 1]} intensity={3} color="#FF5400" />
      <pointLight position={[-1.5, -1, 1]} intensity={2} color="#8824FF" />
      <pointLight position={[0, 2, -1]} intensity={1.5} />

      {/* Central Glass Sphere */}
      <GlassOrb />

      {/* Floating Rotating Logo */}
      <FloatingLogoPlane />

      {/* 3 Energy Rings */}
      <EnergyRing rotX={0} color="#FF5400" speed={0.5} />
      <EnergyRing rotX={1.2} color="#8824FF" speed={-0.35} />
      <EnergyRing rotX={0.6} color="#FFFFFF" speed={0.25} />

      {/* Circular Energy Particles */}
      <OrbitalParticles />

      {/* Reflections */}
      <Environment preset="city" />
    </>
  )
}

useTexture.preload('/logo.png')
