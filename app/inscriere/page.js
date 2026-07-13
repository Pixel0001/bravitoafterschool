import Navbar from '@/components/public/Navbar'
import EnrollPage from '@/components/public/EnrollPage'

export const metadata = {
  title: 'Programează lecția gratuită — Bravito After School',
  description: 'Rezervă o lecție de probă gratuită la cursurile Bravito After School pentru copii (5–16 ani). Te contactăm în maxim 24h.',
  alternates: { canonical: 'https://bravito.md/inscriere' },
  openGraph: {
    title: 'Programează lecția gratuită — Bravito After School',
    description: 'Lecție de probă 100% gratuită. Fără card, fără angajament.',
    url: 'https://bravito.md/inscriere',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <Navbar />
      <EnrollPage />
    </>
  )
}
