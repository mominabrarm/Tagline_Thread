import React, { useRef, useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Modern_Slim_Laptop_Base_0: THREE.Mesh
    Modern_Slim_Laptop_Touchpad_0: THREE.Mesh
    Modern_Slim_Laptop_Plastic_Black_Ports_0: THREE.Mesh
    Modern_Slim_Laptop_Lights_0: THREE.Mesh
    Screen_Frame_Screen_Frame_0: THREE.Mesh
    Screen_Frame_Screen_Shiny_Border_0: THREE.Mesh
    Screen_Frame_Base_0: THREE.Mesh
    Screen_Screen_0: THREE.Mesh
    Keyboard_Keyboard_0: THREE.Mesh
  }
  materials: Record<string, THREE.Material>
}

interface LaptopModelProps {
  position?: [number, number, number]
  scale?: number
  mouseX?: number
  mouseY?: number
  orangeIntensity?: number
  purpleIntensity?: number
}

export const LaptopModel: React.FC<LaptopModelProps> = ({
  position = [0, 0, 0],
  scale = 1,
  mouseX = 0,
  mouseY = 0,
  orangeIntensity = 3.5,
  purpleIntensity = 2.5,
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/modern_slim_laptop.glb') as unknown as GLTFResult

  // Clone the scene and apply dark luxury metallic materials
  const cloned = useMemo(() => {
    const c = scene.clone(true)

    const darkMetal = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141619'),
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.5,
    })
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#08090a'),
      metalness: 0.4,
      roughness: 0.7,
    })
    const screenMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#0a0c0e'),
    })
    const shinyBorder = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2d3135'),
      metalness: 0.98,
      roughness: 0.1,
    })

    c.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      // Disable raycasting to prevent any cursor hover stutter
      child.raycast = () => { }
      const name = child.name

      if (name.includes('Base') || name.includes('Touchpad') || name.includes('Ports') || name.includes('Lights')) {
        child.material = darkMetal
      } else if (name.includes('Keyboard')) {
        // Preserve original keyboard keycap texture if available
        if (child.material && 'map' in child.material && (child.material as any).map) {
          const kMat = (child.material as THREE.Material).clone() as THREE.MeshStandardMaterial
          kMat.roughness = 0.55
          child.material = kMat
        } else {
          child.material = keyboardMat
        }
      } else if (name.includes('Screen_Screen')) {
        child.material = screenMat
      } else if (name.includes('Shiny')) {
        child.material = shinyBorder
      } else if (name.includes('Screen_Frame') || name.includes('Frame_Base')) {
        child.material = darkMetal
      }
      child.castShadow = true
      child.receiveShadow = true
    })

    return c
  }, [scene])

  // Logo texture for the laptop screen (optimized crisp cropped logo)
  const logoTexture = useTexture('/logo_screen.png')
  logoTexture.colorSpace = THREE.SRGBColorSpace

  return (
    <group ref={groupRef} position={position} rotation={[-0.14, -0.12, 0]} scale={scale}>
      {/* Dynamic rim lighting for metallic body */}
      <pointLight position={[2, 2, 1.2]} intensity={orangeIntensity} color="#FF5400" distance={8} />
      <pointLight position={[-2, 1, 1.2]} intensity={purpleIntensity} color="#8824FF" distance={8} />

      {/* 3D Laptop model */}
      <primitive object={cloned} />

      {/* Screen Logo Display — aligned flush with Screen_Screen_0 mesh surface (z=0.001, center y=0.1275) */}
      <group position={[0, 0.1175, -0.124]}>
        {/* Glow backdrop on the screen */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.29, 0.205]} />
          <meshBasicMaterial color="#0A0C0E" />
        </mesh>
        {/* Tagline-Thread Logo artwork */}
        <mesh position={[0, 0.005, 0.001]}>
          <planeGeometry args={[0.18, 0.16]} />
          <meshBasicMaterial map={logoTexture} transparent={true} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/modern_slim_laptop.glb')
useTexture.preload('/logo_screen.png')
