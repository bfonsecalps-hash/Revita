import { useAppointment } from '@/ui/hooks/useAppointment'
import { Button } from '@/ui/components/ui/Button'

export function OnlineConsultationPage() {
  const { schedule, loading, error, data } = useAppointment()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    schedule({
      patientName:   fd.get('name') as string,
      patientEmail:  fd.get('email') as string,
      patientPhone:  fd.get('phone') as string,
      treatmentId:   fd.get('treatmentId') as string,
      preferredDate: new Date(fd.get('date') as string),
      notes:         fd.get('notes') as string,
    })
  }

  return (
    <main className="pt-[90px]">
      <section className="bg-background-dark min-h-[40vh] flex items-end px-8 pb-20">
        <div className="mx-auto max-w-[1440px] w-full">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-brown mb-4">Consulta</p>
          <h1 className="font-serif text-5xl text-text-inverse max-w-xl leading-tight">
            Agende sua consulta online
          </h1>
        </div>
      </section>
      <section className="bg-background-primary py-32 px-8">
        <div className="mx-auto max-w-xl">
          {data ? (
            <p className="font-garamond text-lg text-text-secondary">
              Agendamento confirmado! Entraremos em contato para confirmar o horário.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {[
                { name: 'name',  label: 'Nome completo', type: 'text',  required: true },
                { name: 'email', label: 'E-mail',        type: 'email', required: true },
                { name: 'phone', label: 'Telefone',      type: 'tel',   required: true },
                { name: 'date',  label: 'Data preferida', type: 'date', required: true },
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
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-text-secondary">Observações</span>
                <textarea
                  name="notes"
                  rows={3}
                  className="border-b border-text-primary/20 bg-transparent py-2 font-garamond text-base text-text-primary outline-none focus:border-brown transition-colors resize-none"
                />
              </label>
              {error && <p className="font-sans text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? 'Agendando...' : 'Confirmar agendamento'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}