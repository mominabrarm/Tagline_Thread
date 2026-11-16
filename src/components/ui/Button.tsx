import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  as = 'button',
  href,
  target,
  rel,
  children,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center gap-2 font-grotesk text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none'

  const variants = {
    primary:   'px-6 py-2.5 rounded-full bg-brand-orange text-[#0C0E10] shadow-orange-glow hover:shadow-orange-glow-lg hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'px-6 py-2.5 rounded-full bg-surface-card/60 backdrop-blur-xl text-brand-ash border border-brand-ash/10 shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-surface-high/80 hover:border-brand-ash/20',
    ghost:     'px-4 py-2 rounded-full text-brand-ash hover:text-brand-orange',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (as === 'a' && href) {
    return (
      <a href={href} target={target} rel={rel} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}

