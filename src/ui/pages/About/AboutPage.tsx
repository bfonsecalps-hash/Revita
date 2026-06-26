export function AboutPage() {
  return (
    <main className="pt-[90px]">
      <section className="bg-background-dark min-h-[40vh] flex items-end px-8 pb-20">
        <div className="mx-auto max-w-[1440px] w-full">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-brown mb-4">Sobre</p>
          <h1 className="font-serif text-5xl text-text-inverse max-w-xl leading-tight">
            A Clínica
          </h1>
        </div>
      </section>
      <section className="bg-background-primary py-32 px-8">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-16">
          <p className="font-garamond text-lg text-text-secondary leading-relaxed">
            Conteúdo sobre a clínica — implement here.
          </p>
        </div>
      </section>
    </main>
  )
}