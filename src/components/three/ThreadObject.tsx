import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ThreadObjectProps {
  position: [number, number, number]
  color: string
  shape: 'torus' | 'ico' | 'octahedron' | 'sphere'
  speed?: number
  scale?: number
}

export const ThreadObject: React.FC<ThreadObjectProps> = ({
  position, color, shape, speed = 1, scale = 1
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.3 * speed
    meshRef.current.rotation.y += delta * 0.5 * speed
    meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001 * speed) * 0.15
  })

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    wireframe:   shape !== 'sphere',
    metalness:   0.6,
    roughness:   0.2,
    emissive:    color,
    emissiveIntensity: 0.1,
  }), [color, shape])

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':       return new THREE.TorusGeometry(0.4, 0.12, 12, 48)
      case 'ico':         return new THREE.IcosahedronGeometry(0.5, 1)
      case 'octahedron':  return new THREE.OctahedronGeometry(0.45, 0)
      case 'sphere':      return new THREE.SphereGeometry(0.3, 16, 12)
      default:            return new THREE.IcosahedronGeometry(0.5, 1)
    }
  }, [shape])

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry} material={material} />
  )
}

/** Animated connecting thread line between two points */
export const ThreadLine: React.FC<{
  start: [number, number, number]
  end:   [number, number, number]
  color: string
  opacity?: number
}> = ({ start, end, color, opacity = 0.6 }) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2,
      Math.max(start[1], end[1]) + 0.6,
      (start[2] + end[2]) / 2
    ),
    new THREE.Vector3(...end),
  ], [start, end])

  const curve   = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const curvePoints = useMemo(() => curve.getPoints(60), [curve])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(curvePoints)
    return g
  }, [curvePoints])

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  )
}
