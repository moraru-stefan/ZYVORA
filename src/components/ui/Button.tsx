import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent-2 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-text text-brand-bg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-accent/30',
  secondary:
    'border border-white/15 bg-white/5 text-brand-text backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10',
  ghost: 'text-brand-muted hover:text-brand-text',
}

const sizes: Record<ButtonSize, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

// Shared classes so links styled as buttons stay visually consistent.
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
) {
  return `${base} ${variants[variant]} ${sizes[size]}`
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonClasses(variant, size)} ${className}`}
      {...props}
    />
  )
}
