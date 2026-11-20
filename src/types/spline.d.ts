declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string
          loading?: 'eager' | 'lazy' | 'auto' | string
          'loading-anim-type'?: string
          'events-target'?: 'global' | 'canvas' | 'none' | string
          renderer?: 'webgl' | 'webgpu' | string
          hint?: boolean
        },
        HTMLElement
      >
    }
  }
}

export {}
