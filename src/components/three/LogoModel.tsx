import React, { useRef, useMemo, Component, ErrorInfo, ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import * as THREE from 'three'
import { ThreadObject } from './ThreadObject'

// Note: Preloads removed to eliminate 102MB blocking network load on page startup

interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class LogoErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Tagline 3D Logo failed to load, falling back to procedural shape:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export interface LogoModelProps {
  modelPath?: string
  position?: [number, number, number]
  scale?: number | [number, number, number]
  rotation?: [number, number, number]
  speed?: number
  autoRotate?: boolean
}

const LogoModelInner: React.FC<LogoModelProps> = ({
  modelPath = '/Tagline-Thread-3d-Logo.glb',
  position = [0, 0, 0],
  scale = 1.8,
  rotation = [0, Math.PI / 2, 0],
  speed = 0.5,
  autoRotate = true,
}) => {
  const groupRef = useRef<THREE.Group>(null)

  // Load compressed GLB with MeshoptDecoder attached
  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder)
  })

  // Clone scene to avoid shared mutation and enhance materials
  const sceneClone = useMemo(() => {
    const clone = gltf.scene.clone(true)

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true

        if (mesh.material) {
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial
          if ('roughness' in mat) mat.roughness = 0.3
          if ('metalness' in mat) mat.metalness = 0.2
          if ('envMapIntensity' in mat) mat.envMapIntensity = 1.2
          mesh.material = mat
        }
      }
    })

    return clone
  }, [gltf.scene])

  const scaleArray: [number, number, number] = useMemo(() => {
    return Array.isArray(scale) ? scale : [scale, scale, scale]
  }, [scale])

  // Continuous subtle rotation & levitation
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    if (autoRotate) {
      groupRef.current.rotation.y = rotation[1] + t * 0.45 * speed
      groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.6 * speed) * 0.08
      groupRef.current.rotation.z = rotation[2] + Math.cos(t * 0.5 * speed) * 0.04
    }

    groupRef.current.position.y = position[1] + Math.sin(t * 1.4 * speed) * 0.1
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scaleArray}>
      <primitive object={sceneClone} />
    </group>
  )
}

export const LogoModel: React.FC<LogoModelProps> = (props) => {
  const pos = props.position || [0, 0, 0]
  const sc = typeof props.scale === 'number' ? props.scale : 1.1

  const fallback = (
    <ThreadObject
      position={pos}
      color="#FF5400"
      shape="ico"
      speed={props.speed || 0.6}
      scale={sc}
    />
  )

  return (
    <LogoErrorBoundary fallback={fallback}>
      <React.Suspense fallback={fallback}>
        <LogoModelInner {...props} />
      </React.Suspense>
    </LogoErrorBoundary>
  )
}
