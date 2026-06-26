import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/ui/lib/cn'

const NAV = [
  { to: '/tratamentos',      label: 'Tratamentos' },
  { to: '/sobre',            label: 'A Clínica' },
  { to: '/consulta-online',  label: 'Consulta Online' },
  { to: '/contato',          label: 'Contato' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-[90px] max-w-[1440px] items-center justify-between px-8">
        <NavLink to="/" className="font-sans text-sm tracking-[0.3em] uppercase text-text-inverse">
          Revitá
        </NavLink>

        <ul className="hidden md:flex items-center gap-10">
          {NAV.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn('font-sans text-xs tracking-[0.2em] uppercase transition-opacity text-text-inverse',
                    isActive ? 'opacity-100' : 'opacity-50 hover:opacity-90')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-text-inverse opacity-70 hover:opacity-100"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background-dark px-8 py-6 flex flex-col gap-4">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="font-sans text-xs tracking-[0.2em] uppercase text-text-inverse opacity-70 hover:opacity-100"
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}