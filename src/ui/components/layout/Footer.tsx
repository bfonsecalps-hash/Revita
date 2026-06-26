import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/tratamentos',     label: 'Tratamentos' },
  { to: '/sobre',           label: 'A Clínica' },
  { to: '/consulta-online', label: 'Consulta Online' },
  { to: '/contato',         label: 'Contato' },
]

export function Footer() {
  return (
    <footer className="bg-background-dark text-text-inverse">
      <div className="mx-auto max-w-[1440px] px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-sans text-sm tracking-[0.3em] uppercase mb-2">Revitá</p>
          <p className="font-garamond text-base text-text-secondary">Odontologia Integrada</p>
        </div>
        <nav className="flex flex-col gap-3">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="font-sans text-xs tracking-[0.2em] uppercase opacity-50 hover:opacity-90 transition-opacity"
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="text-xs font-sans text-text-secondary opacity-50">
          <p>© {new Date().getFullYear()} Revitá.</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}