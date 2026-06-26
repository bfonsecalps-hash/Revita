import { useContact } from '@/ui/hooks/useContact'
import { Button } from '@/ui/components/ui/Button'

export function ContactPage() {
  const { send, loading, error, sent } = useContact()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    send({
      name:    fd.get('name') as string,
      email:   fd.get('email') as string,
      phone:   fd.get('phone') as string,
      message: fd.get('message') as string,
    })
  }

  return (
    <main className="pt-[90px]">
      <section className="bg-background-dark min-h-[40vh] flex items-end px-8 pb-20">
        <div className="mx-auto max-w-[1440px] w-full">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-brown mb-4">Contato</p>
          <h1 className="font-serif text-5xl text-text-inverse max-w-xl leading-tight">
            Fale conosco
          </h1>
        </div>
      </section>
      <section className="bg-background-primary py-32 px-8">
        <div className="mx-auto max-w-xl">
          {sent ? (
            <p className="font-garamond text-lg text-text-secondary">Mensagem enviada. Entraremos em contato em breve.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {[
                { name: 'name',    label: 'Nome',      type: 'text',  required: true },
                { name: 'email',   label: 'E-mail',    type: 'email', required: true },
                { name: 'phone',   label: 'Telefone',  type: 'tel',   required: false },
              ].map(f => (
                <label key={f.name} className="flex flex-col gap-1">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-text-secondary">{f.label}</span>
                  <input
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    className="border-b border-text-primary/20 bg-transparent py-2 font-garamond text-base text-text-primary outline-none focus:border-brown transition-colors"
                  />
                </label>
              ))}
              <label className="flex flex-col gap-1">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-text-secondary">Mensagem</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="border-b border-text-primary/20 bg-transparent py-2 font-garamond text-base text-text-primary outline-none focus:border-brown transition-colors resize-none"
                />
              </label>
              {error && <p className="font-sans text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar mensagem'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}