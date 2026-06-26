import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProviders } from '@/infrastructure/providers/AppProviders'
import { Header } from '@/ui/components/layout/Header'
import { Footer } from '@/ui/components/layout/Footer'
import { HomePage } from '@/ui/pages/Home'
import { TreatmentsPage } from '@/ui/pages/Treatments'
import { AboutPage } from '@/ui/pages/About'
import { ContactPage } from '@/ui/pages/Contact'
import { OnlineConsultationPage } from '@/ui/pages/OnlineConsultation'

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tratamentos" element={<TreatmentsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/consulta-online" element={<OnlineConsultationPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProviders>
  )
}