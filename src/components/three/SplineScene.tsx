import React, { useEffect, useRef, useState } from 'react'

interface SplineSceneProps {
  url?: string
  className?: string
  style?: React.CSSProperties
  backgroundColor?: string
}

interface SplineViewerElement extends HTMLElement {
  background: string
}

const SPLINE_URL =
  'https://prod.spline.design/CeBRuHnKdXAK2VVu/scene.splinecode'

const VIEWER_SCRIPT =
  'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js'

let viewerScriptPromise: Promise<void> | null = null

function loadSplineViewer(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  if (customElements.get('spline-viewer')) {
    return Promise.resolve()
  }

  if (!viewerScriptPromise) {
    viewerScriptPromise = new Promise<void>((resolve, reject) => {
      let script = document.querySelector<HTMLScriptElement>(
        'script[data-spline-viewer]'
      )

      const handleReady = async () => {
        try {
          await customElements.whenDefined('spline-viewer')
          resolve()
        } catch (error) {
          reject(error)
        }
      }

      if (script) {
        if (customElements.get('spline-viewer')) {
          resolve()
          return
        }

        script.addEventListener('load', handleReady, { once: true })
        script.addEventListener(
          'error',
          () => reject(new Error('Spline Viewer script failed to load')),
          { once: true }
        )
        return
      }

      script = document.createElement('script')
      script.type = 'module'
      script.src = VIEWER_SCRIPT
      script.dataset.splineViewer = 'true'

      script.onload = handleReady
      script.onerror = () => {
        reject(new Error('Unable to load Spline Viewer script'))
      }

      document.head.appendChild(script)
    }).catch((error) => {
      viewerScriptPromise = null
      throw error
    })
  }

  return viewerScriptPromise
}

export const SplineScene: React.FC<SplineSceneProps> = ({
  url = SPLINE_URL,
  className = '',
  style,
  backgroundColor = '#0a0c0d',
}) => {
  const viewerRef = useRef<SplineViewerElement>(null)
  const backgroundColorRef = useRef(backgroundColor)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ensure viewer script is loaded and registered
  useEffect(() => {
    let cancelled = false

    loadSplineViewer()
      .then(() => {
        if (!cancelled && viewerRef.current) {
          viewerRef.current.background = backgroundColorRef.current
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('[Spline] Error loading viewer script:', err)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    backgroundColorRef.current = backgroundColor
    if (customElements.get('spline-viewer') && viewerRef.current) {
      viewerRef.current.background = backgroundColor
    }
  }, [backgroundColor])

  // Listen to load events from spline-viewer custom element
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    let loadTimer: ReturnType<typeof setTimeout> | undefined

    const handleLoadStart = () => {
      console.info('[Spline] Scene loading started.')
    }

    const handleLoadComplete = () => {
      console.info('[Spline] Scene loaded successfully.')
      viewer.background = backgroundColorRef.current
      setLoaded(true)
      setError(null)
      if (loadTimer) clearTimeout(loadTimer)
    }

    const handleError = (e: Event) => {
      console.error('[Spline] Viewer error:', e)
      setError(
        'Spline scene failed to load. Check the scene URL and export settings.'
      )
      if (loadTimer) clearTimeout(loadTimer)
    }

    viewer.addEventListener('load-start', handleLoadStart)
    viewer.addEventListener('load-complete', handleLoadComplete)
    viewer.addEventListener('error', handleError)

    loadTimer = setTimeout(() => {
      // If it takes more than 15 seconds, assume scene is ready or taking long
      setLoaded(true)
    }, 15000)

    return () => {
      if (loadTimer) clearTimeout(loadTimer)
      viewer.removeEventListener('load-start', handleLoadStart)
      viewer.removeEventListener('load-complete', handleLoadComplete)
      viewer.removeEventListener('error', handleError)
    }
  }, [url])

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        minWidth: 0,
        minHeight: 0,
        ...style,
      }}
    >
      {/* Native Custom Element: Managed by React JSX, eliminating DOM reconciliation collisions */}
      <spline-viewer
        ref={viewerRef}
        url={url}
        events-target="global"
        loading="eager"
        renderer="webgl"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'transparent',
          pointerEvents: 'auto',
        }}
      />

      {/* Loading Spinner Overlay */}
      {!loaded && !error && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center transition-opacity duration-300">
          <div className="text-center">
            <div className="w-9 h-9 mx-auto rounded-full border-2 border-[#FB5607]/25 border-t-[#FB5607] animate-spin" />
            <p className="mt-3 text-xs tracking-widest text-[#E9ECEF]/60 uppercase font-grotesk">
              Loading 3D Experience
            </p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#101116]/80">
          <p className="text-sm text-[#E9ECEF]/70 text-center px-6 font-manrope">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}

export default SplineScene
