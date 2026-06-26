import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/ui/lib/cn'

type Variant = 'primary' | 'outline' | 'outlineLight' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  as?: 'button' | 'a'
  href?: string
}

const variants: Record<Variant, string> = {
  primary:      'bg-brown text-text-inverse hover:opacity-90',
  outline:      'border border-text-primary text-text-primary hover:bg-text-primary hover:text-text-inverse',
  outlineLight: 'border border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-background-dark',
  ghost:        'text-text-primary hover:opacity-60',
}

export function Button({ variant = 'primary', className, children, href, as: Tag = 'button', ...props }: ButtonProps) {
  const cls = cn(
    'inline-flex items-center justify-center px-8 py-3 font-sans text-sm tracking-widest uppercase transition-all',
    variants[variant],
    className,
  )

  if (href) {
    return <a href={href} className={cls}>{children}</a>
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}