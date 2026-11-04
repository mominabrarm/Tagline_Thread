import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ThreadObject } from './ThreadObject'
import * as THREE from 'three'

// Animated particle field
const ParticleField: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null)
  const count   = 120

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.03
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#E9ECEF" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

// Camera drift on mouse
const CameraDrift: React.FC = () => {
  const { camera } = useThree()

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()
    camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.03
    camera.position.z  = 5 + Math.sin(t * 0.2) * 0.15
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Animated thread line using a primitive Line object
const AnimatedLine: React.FC<{
  points: THREE.Vector3[]
  color: string
  opacity?: number
}> = ({ points, color, opacity = 0.5 }) => {
  const lineRef = useRef<THREE.Line | null>(null)

  const { geometry, material } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points)
    const pts   = curve.getPoints(50)
    const geo   = new THREE.BufferGeometry().setFromPoints(pts)
    const mat   = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    return { geometry: geo, material: mat }
  }, [points, color, opacity])

  const lineObj = useMemo(() => new THREE.Line(geometry, material), [geometry, material])

  useFrame(({ clock }) => {
    if (material) {
      material.opacity = opacity * (0.4 + 0.6 * Math.abs(Math.sin(clock.getElapsedTime() * 1.2)))
    }
  })

  return <primitive object={lineObj} ref={lineRef} />
}

export const HeroScene: React.FC = () => {
  const lineConfigs = useMemo(() => [
    {
      points: [new THREE.Vector3(0,0,0), new THREE.Vector3(0.9,0.3,-0.25), new THREE.Vector3(1.8,0.6,-0.5)],
      color: '#FB5607', opacity: 0.5,
    },
    {
      points: [new THREE.Vector3(0,0,0), new THREE.Vector3(-0.8,-0.2,0.15), new THREE.Vector3(-1.6,-0.4,0.3)],
      color: '#8338EC', opacity: 0.4,
    },
    {
      points: [new THREE.Vector3(0,0,0), new THREE.Vector3(-0.4,0.75,-0.1), new THREE.Vector3(-0.8,1.5,-0.2)],
      color: '#FB5607', opacity: 0.3,
    },
    {
      points: [new THREE.Vector3(0,0,0), new THREE.Vector3(0.3,-0.7,0.2), new THREE.Vector3(0.6,-1.4,0.4)],
      color: '#8338EC', opacity: 0.35,
    },
  ], [])

  return (
    <>
      <CameraDrift />
      <ParticleField />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[3,  3,  3]} intensity={1.2} color="#FB5607" />
      <pointLight position={[-3,-2,  2]} intensity={0.8} color="#8338EC" />
      <pointLight position={[0,  4, -2]} intensity={0.4} color="#E9ECEF" />

      {/* Geometric objects */}
      <ThreadObject position={[0,     0,    0]}   color="#FB5607" shape="ico"        speed={0.6} scale={1.1} />
      <ThreadObject position={[1.8,   0.6, -0.5]} color="#8338EC" shape="torus"      speed={0.9} scale={0.85} />
      <ThreadObject position={[-1.6, -0.4,  0.3]} color="#FB5607" shape="octahedron" speed={0.7} scale={0.75} />
      <ThreadObject position={[0.6,  -1.4,  0.4]} color="#8338EC" shape="sphere"     speed={1.1} scale={0.6} />
      <ThreadObject position={[-0.8,  1.5, -0.2]} color="#E9ECEF" shape="octahedron" speed={0.5} scale={0.5} />

      {/* Animated thread lines */}
      {lineConfigs.map((cfg, i) => (
        <AnimatedLine key={i} points={cfg.points} color={cfg.color} opacity={cfg.opacity} />
      ))}
    </>
  )
}
