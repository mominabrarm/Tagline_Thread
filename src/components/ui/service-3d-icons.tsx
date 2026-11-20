import React from 'react'

interface ServiceIconProps {
  className?: string
  size?: number
  style?: React.CSSProperties
}

/**
 * 01: Brand & Digital Presence
 * 3D Isometric 3-Layer Floating Glass/Acrylic Plates
 * (Top: Neon Purple Glass, Middle: Magenta Glass, Bottom: Neon Orange Glass)
 */
export const BrandPlatesIcon: React.FC<ServiceIconProps> = ({
  className = '',
  size = 80,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_8px_20px_rgba(251,86,7,0.35)] ${className}`}
      style={style}
    >
      <defs>
        {/* Gradients for Top Plate (Purple Neon Glass) */}
        <linearGradient id="topPlateFill" x1="20" y1="20" x2="80" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#9333EA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6B21A8" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="topPlateBevel" x1="50" y1="22" x2="50" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>
        <linearGradient id="topPlateRim" x1="20" y1="20" x2="80" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#E9D5FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
        </linearGradient>

        {/* Gradients for Middle Plate (Magenta/Violet Glass) */}
        <linearGradient id="midPlateFill" x1="20" y1="38" x2="80" y2="63" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E879F9" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C026D3" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="midPlateBevel" x1="50" y1="40" x2="50" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#701A75" />
          <stop offset="100%" stopColor="#4A044E" />
        </linearGradient>

        {/* Gradients for Bottom Plate (Neon Orange Glass) */}
        <linearGradient id="botPlateFill" x1="20" y1="56" x2="80" y2="81" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7A29" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FB5607" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C2410C" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="botPlateBevel" x1="50" y1="58" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9A3412" />
          <stop offset="100%" stopColor="#431407" />
        </linearGradient>
        <linearGradient id="botPlateRim" x1="20" y1="56" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FB5607" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.75" />
        </linearGradient>

        {/* Ambient Floor Glow */}
        <filter id="orangePlateGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
        </filter>
      </defs>

      {/* Ambient Orange Underglow */}
      <ellipse cx="50" cy="80" rx="34" ry="12" fill="#FB5607" opacity="0.45" filter="url(#orangePlateGlow)" />

      {/* ── 1. BOTTOM PLATE (Warm Neon Orange) ── */}
      <g>
        {/* Thickness / Side Bevel */}
        <path
          d="M 18 64 C 18 67 22 71 27 74 L 50 86 C 53 87 57 87 60 86 L 79 75 C 84 72 87 68 87 65 L 87 60 C 87 64 83 68 79 70 L 60 81 C 57 82 53 82 50 81 L 27 69 C 22 66 18 63 18 59 Z"
          fill="url(#botPlateBevel)"
        />
        {/* Top Face */}
        <path
          d="M 23 58 C 18 60 18 63 23 66 L 46 78 C 49 80 54 80 57 78 L 81 66 C 86 63 86 60 81 58 L 57 46 C 54 44 49 44 46 46 Z"
          fill="url(#botPlateFill)"
          stroke="url(#botPlateRim)"
          strokeWidth="1.2"
        />
      </g>

      {/* ── 2. MIDDLE PLATE (Magenta / Electric Violet) ── */}
      <g>
        {/* Thickness / Side Bevel */}
        <path
          d="M 18 46 C 18 49 22 53 27 56 L 50 68 C 53 69 57 69 60 68 L 79 57 C 84 54 87 50 87 47 L 87 42 C 87 46 83 50 79 52 L 60 63 C 57 64 53 64 50 63 L 27 51 C 22 48 18 45 18 41 Z"
          fill="url(#midPlateBevel)"
        />
        {/* Top Face */}
        <path
          d="M 23 40 C 18 42 18 45 23 48 L 46 60 C 49 62 54 62 57 60 L 81 48 C 86 45 86 42 81 40 L 57 28 C 54 26 49 26 46 28 Z"
          fill="url(#midPlateFill)"
          stroke="#F0ABFC"
          strokeOpacity="0.65"
          strokeWidth="1"
        />
      </g>

      {/* ── 3. TOP PLATE (Vibrant Neon Purple Glass) ── */}
      <g>
        {/* Thickness / Side Bevel */}
        <path
          d="M 18 28 C 18 31 22 35 27 38 L 50 50 C 53 51 57 51 60 50 L 79 39 C 84 36 87 32 87 29 L 87 24 C 87 28 83 32 79 34 L 60 45 C 57 46 53 46 50 45 L 27 33 C 22 30 18 27 18 23 Z"
          fill="url(#topPlateBevel)"
        />
        {/* Top Face */}
        <path
          d="M 23 22 C 18 24 18 27 23 30 L 46 42 C 49 44 54 44 57 42 L 81 30 C 86 27 86 24 81 22 L 57 10 C 54 8 49 8 46 10 Z"
          fill="url(#topPlateFill)"
          stroke="url(#topPlateRim)"
          strokeWidth="1.3"
        />
        {/* Glass Specular Glint */}
        <path
          d="M 47 12 C 49 11 53 11 55 12 L 77 23 C 80 25 80 26 77 27 L 68 31 C 66 32 63 31 60 30 L 39 20 C 37 19 37 17 40 16 Z"
          fill="#FFFFFF"
          fillOpacity="0.28"
        />
      </g>
    </svg>
  )
}

/**
 * 02: Social Media Management
 * 3D Translucent Frosted Purple Speech Bubble with Glowing Neon Heart
 */
export const SocialChatHeartIcon: React.FC<ServiceIconProps> = ({
  className = '',
  size = 80,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_10px_25px_rgba(131,56,236,0.4)] ${className}`}
      style={style}
    >
      <defs>
        {/* Bubble Glass Fill */}
        <linearGradient id="bubbleFill" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#8338EC" stopOpacity="0.75" />
          <stop offset="85%" stopColor="#4C1D95" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#311042" stopOpacity="0.95" />
        </linearGradient>

        {/* Bubble Specular Rim */}
        <linearGradient id="bubbleRim" x1="25" y1="15" x2="75" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#E9D5FF" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#8338EC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
        </linearGradient>

        {/* Heart Neon Fill */}
        <linearGradient id="heartGrad" x1="38" y1="36" x2="62" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="40%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#8338EC" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="ambientBubbleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Ambient Backlight */}
      <circle cx="50" cy="50" r="32" fill="#8338EC" opacity="0.35" filter="url(#ambientBubbleGlow)" />

      {/* 3D Speech Bubble Body with Tail */}
      <g>
        {/* Soft Depth Shadow Under Tail */}
        <path
          d="M 28 72 L 40 72 L 35 84 Z"
          fill="#1E0A3C"
          opacity="0.8"
        />

        {/* Main Bubble Glass Shape */}
        <path
          d="M 30 18 C 22 18 16 24 16 33 L 16 57 C 16 66 22 72 30 72 L 38 72 L 34 85 C 33 87 36 88 38 86 L 50 72 L 72 72 C 80 72 86 66 86 57 L 86 33 C 86 24 80 18 72 18 Z"
          fill="url(#bubbleFill)"
          stroke="url(#bubbleRim)"
          strokeWidth="1.8"
        />

        {/* Internal Specular Glass Arc (Top-Left Sheen) */}
        <path
          d="M 24 24 C 20 24 19 28 19 32 L 19 46 C 22 36 28 27 42 24 Z"
          fill="#FFFFFF"
          fillOpacity="0.22"
        />
        <ellipse cx="70" cy="25" rx="8" ry="3" fill="#FFFFFF" fillOpacity="0.25" />
      </g>

      {/* 3D Glowing Neon Heart inside the Bubble */}
      <g filter="url(#heartGlow)">
        <path
          d="M 50 42 C 48 37 42 35 37 38 C 32 41 32 48 35 53 C 39 59 47 65 50 67 C 53 65 61 59 65 53 C 68 48 68 41 63 38 C 58 35 52 37 50 42 Z"
          fill="url(#heartGrad)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
        {/* Heart Top-Left Glint */}
        <circle cx="43" cy="42" r="2.2" fill="#FFFFFF" fillOpacity="0.75" />
      </g>
    </svg>
  )
}

/**
 * 03: Social Media Marketing
 * 3D Angled Glowing Megaphone with Neon Orange Cone and Background Halo Ring
 */
export const Megaphone3DIcon: React.FC<ServiceIconProps> = ({
  className = '',
  size = 80,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_10px_25px_rgba(251,86,7,0.45)] ${className}`}
      style={style}
    >
      <defs>
        {/* Halo Glow */}
        <filter id="haloGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Megaphone Cone Body Gradient (Electric Purple Metallic) */}
        <linearGradient id="hornBody" x1="26" y1="48" x2="68" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4C1D95" />
          <stop offset="35%" stopColor="#8338EC" />
          <stop offset="65%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Megaphone Handle Gradient */}
        <linearGradient id="hornHandle" x1="38" y1="62" x2="48" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7E22CE" />
          <stop offset="50%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>

        {/* Inner Cone Flare (Warm Glowing Orange Aperture) */}
        <radialGradient id="hornAperture" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="25%" stopColor="#FFEDD5" />
          <stop offset="55%" stopColor="#FB5607" />
          <stop offset="85%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#7C2D12" />
        </radialGradient>

        {/* Bell Outer Rim Metallic Gradient */}
        <linearGradient id="bellRim" x1="62" y1="20" x2="88" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="40%" stopColor="#FB5607" />
          <stop offset="80%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* ── 1. BACKGROUND NEON HALO RING ── */}
      <circle
        cx="58"
        cy="44"
        r="32"
        stroke="#FB5607"
        strokeWidth="1.6"
        opacity="0.8"
        strokeDasharray="4 2"
      />
      <circle
        cx="58"
        cy="44"
        r="32"
        stroke="#FB5607"
        strokeWidth="2.5"
        opacity="0.4"
        filter="url(#haloGlow)"
      />

      {/* ── 2. MEGAPHONE HANDLE & BASE ── */}
      <g>
        {/* Handle grip */}
        <path
          d="M 39 58 L 47 52 L 40 78 C 39 81 37 82 34 81 L 33 80 C 31 79 31 76 33 74 Z"
          fill="url(#hornHandle)"
          stroke="#9333EA"
          strokeWidth="0.8"
        />
        {/* Bottom handle cap */}
        <rect
          x="30"
          y="76"
          width="8"
          height="5"
          rx="2"
          transform="rotate(32 30 76)"
          fill="#3B0764"
          stroke="#C084FC"
          strokeWidth="0.7"
        />
      </g>

      {/* ── 3. MEGAPHONE REAR CYLINDER & CASING ── */}
      <g>
        {/* Rear cap */}
        <ellipse cx="26" cy="62" rx="6" ry="11" transform="rotate(-34 26 62)" fill="#3B0764" stroke="#8338EC" strokeWidth="1" />
        {/* Rear cylinder band */}
        <path
          d="M 23 54 L 35 46 L 39 52 L 27 60 Z"
          fill="#6B21A8"
        />
      </g>

      {/* ── 4. MEGAPHONE EXPANDING CONE BODY ── */}
      <g>
        <path
          d="M 33 49 L 68 28 L 78 54 L 41 64 Z"
          fill="url(#hornBody)"
          stroke="#A855F7"
          strokeWidth="1"
        />
        {/* Upper Specular Light Streak along the horn */}
        <path
          d="M 34 49 L 68 28 L 69 32 L 35 52 Z"
          fill="#FFFFFF"
          fillOpacity="0.32"
        />
      </g>

      {/* ── 5. FRONT BELL MOUTH (Glowing Neon Orange Flare) ── */}
      <g>
        {/* Angled ellipse mouth */}
        <ellipse
          cx="73"
          cy="41"
          rx="11"
          ry="21"
          transform="rotate(34 73 41)"
          fill="url(#hornAperture)"
          stroke="url(#bellRim)"
          strokeWidth="2.4"
        />
        {/* Inner emitter center glow */}
        <ellipse
          cx="71"
          cy="42"
          rx="5"
          ry="10"
          transform="rotate(34 71 42)"
          fill="#FFF7ED"
        />
      </g>

      {/* Sonic Emission Pulse Rays */}
      <path
        d="M 85 24 C 91 32 94 44 91 54"
        stroke="#FB5607"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M 91 16 C 99 28 102 46 97 60"
        stroke="#FB5607"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
        opacity="0.5"
      />
    </svg>
  )
}

/**
 * 04: Website Design & Development
 * 3D Glowing Glass Browser Window with 3D Holographic Code Brackets </>
 */
export const WebCodeWindowIcon: React.FC<ServiceIconProps> = ({
  className = '',
  size = 80,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_10px_25px_rgba(131,56,236,0.45)] ${className}`}
      style={style}
    >
      <defs>
        {/* Glass Screen Fill */}
        <linearGradient id="terminalFill" x1="20" y1="18" x2="80" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E1065" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#1E1B4B" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
        </linearGradient>

        {/* Illuminated Neon Border */}
        <linearGradient id="terminalBorder" x1="15" y1="18" x2="85" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#8338EC" />
          <stop offset="100%" stopColor="#FB5607" />
        </linearGradient>

        {/* Code Brackets Glow */}
        <linearGradient id="codeGrad" x1="28" y1="38" x2="72" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FB5607" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>

        <filter id="bracketGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Backlight */}
      <rect x="22" y="22" width="56" height="56" rx="14" fill="#8338EC" opacity="0.3" filter="url(#bracketGlow)" />

      {/* 3D Angled Glass Browser Window */}
      <g>
        {/* Base Window Frame */}
        <rect
          x="16"
          y="18"
          width="68"
          height="62"
          rx="12"
          fill="url(#terminalFill)"
          stroke="url(#terminalBorder)"
          strokeWidth="1.6"
        />

        {/* Top Control Bar Divider */}
        <line x1="16" y1="32" x2="84" y2="32" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Window Control Buttons */}
        <circle cx="26" cy="25" r="2.8" fill="#FB5607" />
        <circle cx="34" cy="25" r="2.8" fill="#8338EC" />
        <circle cx="42" cy="25" r="2.8" fill="#38BDF8" opacity="0.8" />

        {/* Specular Top Sheen */}
        <path
          d="M 18 20 C 18 20 40 20 62 20 L 78 32 L 18 32 Z"
          fill="#FFFFFF"
          fillOpacity="0.12"
        />
      </g>

      {/* 3D Glowing Code Symbol </> */}
      <g filter="url(#bracketGlow)">
        {/* Left angle bracket < */}
        <path
          d="M 38 43 L 28 52 L 38 61"
          stroke="url(#codeGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Slash / */}
        <path
          d="M 54 41 L 46 63"
          stroke="#FB5607"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Right angle bracket > */}
        <path
          d="M 62 43 L 72 52 L 62 61"
          stroke="url(#codeGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

/**
 * 05: Hosting & Website Management
 * 3D Isometric Edge Cloud Server Unit with Status Beacons and Pulse Rings
 */
export const ServerCloudIcon: React.FC<ServiceIconProps> = ({
  className = '',
  size = 80,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible drop-shadow-[0_10px_25px_rgba(251,86,7,0.4)] ${className}`}
      style={style}
    >
      <defs>
        {/* Server Blade Chassis */}
        <linearGradient id="serverBlade" x1="20" y1="30" x2="80" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        <linearGradient id="serverBevel" x1="20" y1="35" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB5607" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8338EC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FB5607" stopOpacity="0.6" />
        </linearGradient>

        <filter id="serverBeaconGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Holographic Uplink Halo Rays */}
      <ellipse cx="50" cy="24" rx="22" ry="7" stroke="#FB5607" strokeWidth="1.2" opacity="0.6" strokeDasharray="3 2" />
      <ellipse cx="50" cy="18" rx="14" ry="4.5" stroke="#8338EC" strokeWidth="1.4" opacity="0.8" />
      <circle cx="50" cy="18" r="2.5" fill="#FB5607" filter="url(#serverBeaconGlow)" />

      {/* ── TOP SERVER BLADE (Unit 1) ── */}
      <g>
        {/* Chassis Face */}
        <rect
          x="20"
          y="32"
          width="60"
          height="14"
          rx="5"
          fill="url(#serverBlade)"
          stroke="url(#serverBevel)"
          strokeWidth="1.3"
        />
        {/* Front LED indicators */}
        <circle cx="30" cy="39" r="2" fill="#22C55E" />
        <circle cx="37" cy="39" r="2" fill="#FB5607" />
        <line x1="46" y1="39" x2="70" y2="39" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── MIDDLE SERVER BLADE (Unit 2) ── */}
      <g>
        {/* Chassis Face */}
        <rect
          x="20"
          y="50"
          width="60"
          height="14"
          rx="5"
          fill="url(#serverBlade)"
          stroke="url(#serverBevel)"
          strokeWidth="1.3"
        />
        {/* Front LED indicators */}
        <circle cx="30" cy="57" r="2" fill="#8338EC" />
        <circle cx="37" cy="57" r="2" fill="#22C55E" />
        <line x1="46" y1="57" x2="70" y2="57" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── BOTTOM SERVER BLADE (Unit 3) ── */}
      <g>
        {/* Chassis Face */}
        <rect
          x="20"
          y="68"
          width="60"
          height="14"
          rx="5"
          fill="url(#serverBlade)"
          stroke="url(#serverBevel)"
          strokeWidth="1.3"
        />
        {/* Front LED indicators */}
        <circle cx="30" cy="75" r="2" fill="#FB5607" />
        <circle cx="37" cy="75" r="2" fill="#FB5607" />
        <line x1="46" y1="75" x2="70" y2="75" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
