import React from 'react'
import { Html, Environment } from '@react-three/drei'
import { LaptopModel } from './LaptopModel'

// ─── Floating Info Box (Matched exactly to uploaded design) ──────────────────
interface FloatingHeroBoxProps {
  position: [number, number, number]
  dotColor: string
  title: string
  line1: string
  line2: string
  delay?: number
  distanceFactor?: number
}

const FloatingHeroBox: React.FC<FloatingHeroBoxProps> = ({
  position,
  dotColor,
  title,
  line1,
  line2,
  delay = 0,
  distanceFactor = 1.92,
}) => {
  return (
    <Html position={position} distanceFactor={distanceFactor} style={{ pointerEvents: 'none' }} center>
      <div
        className="select-none transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(20, 25, 32, 0.58) 50%, rgba(12, 15, 19, 0.72) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '14px',
          padding: '12px 15px',
          width: 'max-content',
          minWidth: '186px',
          boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(255, 255, 255, 0.20), inset 0 0 16px rgba(255, 255, 255, 0.02)',
          animation: `heroFloatBox 5s ease-in-out infinite ${delay}s`,
        }}
      >
        <div className="flex items-center justify-between gap-[2.625rem]">
          {/* Left: Dot + (Title & Subtitle column) */}
          <div className="flex items-start gap-2.5 min-w-0">
            <span
              className="w-[8px] h-[8px] rounded-full inline-block flex-shrink-0 mt-[2px]"
              style={{
                background: dotColor,
                boxShadow: `0 0 8px ${dotColor}88`,
              }}
            />
            <div className="min-w-0">
              <div className="font-manrope text-[11.5px] font-normal text-[#EAECEE] tracking-tight leading-none whitespace-nowrap">
                {title}
              </div>
              <div className="font-manrope text-[9.5px] text-[#8E959E] pt-2 leading-[1.35] whitespace-nowrap font-light">
                {line1}
                <br />
                {line2}
              </div>
            </div>
          </div>

          {/* Right: Thin Silver Arrow */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9DA1A6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l6 7-6 7" />
            </svg>
          </div>
        </div>
      </div>
    </Html>
  )
}

// ─── Hero 3D Scene: 3D Laptop with 1.png Floating Boxes ─────────────────────
export const HeroScene: React.FC = () => {
  return (
    <>
      {/* Cinematic Studio Lighting tuned for metallic laptop surfaces */}
      <ambientLight intensity={0.65} />
      {/* Key Orange Rim Light */}
      <directionalLight position={[3, 3, 2]} intensity={3.8} color="#FF5400" />
      {/* Accent Purple Rim Light */}
      <directionalLight position={[-3, 2, 2]} intensity={3.2} color="#8824FF" />
      {/* Top Front Studio Key Light (illuminates keyboard deck & palm rest) */}
      <directionalLight position={[0, 2.5, 3]} intensity={2.6} color="#FFFFFF" />
      {/* Metallic Chassis Edge & Palm Rest Fill Lights */}
      <pointLight position={[0.6, -0.15, 1.6]} intensity={1.8} color="#FF5400" distance={5} />
      <pointLight position={[-0.8, -0.25, 1.4]} intensity={1.4} color="#8824FF" distance={5} />

      {/* Prominent 3D Laptop with Tagline-Thread Logo on Screen (scaled down 20% to 5.24) */}
      <LaptopModel
        position={[0.04, -0.42, 0]}
        scale={5.24}
      />

      {/* ─── 3 Floating Glass Boxes Positioned Exactly As Per Reference Image (scaled down 20%) ─── */}
      {/* 1. Top Left Box: overlapping the top-left screen bezel and corner */}
      <FloatingHeroBox
        position={[-0.632, 0.558, 0.28]}
        dotColor="#FF5504"
        title="Brand Strategy"
        line1="Strategy that builds"
        line2="lasting brands."
        delay={0}
      />

      {/* 2. Middle Right Box: hovering along the middle-right screen bezel edge */}
      <FloatingHeroBox
        position={[0.744, 0.196, 0.24]}
        dotColor="#8824FF"
        title="Creative Design"
        line1="Designs that speak"
        line2="and inspire."
        delay={1.2}
      />

      {/* 3. Lower Right Box: overlapping the bottom-right screen corner & keyboard deck */}
      <FloatingHeroBox
        position={[0.664, -0.372, 0.304]}
        dotColor="#FF5504"
        title="Digital Growth"
        line1="More reach."
        line2="More opportunities."
        delay={2.4}
      />

      {/* Cinematic Studio Environment reflections for metallic laptop chassis and bevels */}
      <Environment preset="city" />
    </>
  )
}
