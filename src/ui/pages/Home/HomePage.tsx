import { Link } from 'react-router-dom'
import { Button } from '@/ui/components/ui/Button'

export function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen bg-background-dark flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        <h1 className="max-w-3xl font-sans font-normal text-5xl md:text-6xl leading-tight text-text-inverse">
          Cada consulta começa com uma conversa
        </h1>
        <p className="mt-6 font-garamond text-xl text-text-inverse/90">
          Excelência clínica em um ambiente que realmente te ouve.
        </p>
        <div className="mt-10">
          <Button variant="outlineLight" href="/tratamentos">
            Saiba mais
          </Button>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="bg-background-secondary py-32 px-8">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-brown mb-6">A Clínica</p>
            <h2 className="font-serif text-4xl leading-snug text-text-primary">
              Cuidado individual, atenção aos detalhes
            </h2>
          </div>
          <div>
            <p className="font-garamond text-lg text-text-secondary leading-relaxed">
              A Revitá foi criada com a crença de que odontologia vai além dos dentes —
              é sobre como você se sente antes, durante e depois de cada consulta.
            </p>
            <Link
              to="/sobre"
              className="mt-8 inline-block font-sans text-xs tracking-[0.2em] uppercase text-brown border-b border-brown pb-0.5 hover:opacity-70 transition-opacity"
            >
              Conheça a clínica
            </Link>
          </div>
        </div>
      </section>

      {/* TREATMENTS TEASER */}
      <section className="bg-background-primary py-32 px-8">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-brown mb-6">Tratamentos</p>
          <h2 className="font-serif text-4xl leading-snug text-text-primary max-w-xl mb-16">
            Do preventivo ao transformador
          </h2>
          {/* TreatmentGrid será implementado aqui */}
          <div className="flex justify-start">
            <Button variant="outline" href="/tratamentos">Ver todos os tratamentos</Button>
          </div>
        </div>
      </section>
    </main>
  )
}