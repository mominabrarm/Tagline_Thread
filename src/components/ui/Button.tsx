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
  const base = 'inline-flex items-center gap-2 font-grotesk text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer select-none'

  const variants = {
    primary:   'px-7 py-3.5 rounded-full bg-brand-orange text-[#16181B] shadow-orange-glow hover:shadow-orange-glow-lg hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'px-7 py-3.5 rounded-full bg-surface-card/60 backdrop-blur-md text-brand-ash border border-brand-ash/10 hover:bg-surface-high/80',
    ghost:     'px-5 py-2.5 rounded-full text-brand-ash hover:text-brand-orange',
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

