'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/public/Navbar'
import { ShieldCheckIcon, LockClosedIcon, UserIcon, DocumentTextIcon, CameraIcon, ClockIcon, ScaleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function GDPRPage() {
  const sections = [
    {
      id: 1,
      title: 'Introducere',
      icon: ShieldCheckIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          PyWeb Academy respecta dreptul la confiden?ialitate ?i se angajeaza sa protejeze datele cu caracter personal ale copiilor ?i ale parin?ilor/reprezentan?ilor legali, in conformitate cu legisla?ia in vigoare privind protec?ia datelor cu caracter personal (GDPR). Prezenta politica explica modul in care PyWeb Academy colecteaza, utilizeaza, stocheaza ?i protejeaza datele personale.
        </p>
      )
    },
    {
      id: 2,
      title: 'Ce date colectam',
      icon: UserIcon,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Date despre copil:</h4>
            <ul className="space-y-2 text-[#a0b8bc]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Nume ?i prenume
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Data na?terii
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Clasa ?i institu?ia de inva?amant
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Informa?ii medicale relevante (alergii, intoleran?e, nevoi speciale � doar cu acordul parin?ilor)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Date despre parinte/reprezentant legal:</h4>
            <ul className="space-y-2 text-[#a0b8bc]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Nume ?i prenume
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Numar de telefon
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Adresa de e-mail
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Adresa de domiciliu
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Alte date:</h4>
            <ul className="space-y-2 text-[#a0b8bc]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Fotografii ?i materiale video realizate in timpul activita?ilor (cu acord scris)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
                Date necesare pentru eviden?a financiara ?i administrativa
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Scopul colectarii datelor',
      icon: DocumentTextIcon,
      content: (
        <div>
          <p className="text-[#a0b8bc] mb-4">Datele personale sunt colectate ?i utilizate exclusiv pentru:</p>
          <ul className="space-y-2 text-[#a0b8bc]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Inscrierea copilului la programele PyWeb Academy
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Organizarea ?i desfa?urarea activita?ilor educa?ionale
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Comunicarea eficienta cu parin?ii
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Asigurarea siguran?ei ?i bunastarii copiilor
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Respectarea obliga?iilor legale
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Promovarea activita?ilor PyWeb Academy (doar cu consim?amant)
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      title: 'Temeiul legal al prelucrarii',
      icon: ScaleIcon,
      content: (
        <div>
          <p className="text-[#a0b8bc] mb-4">Prelucrarea datelor se face in baza:</p>
          <ul className="space-y-2 text-[#a0b8bc]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Consim?amantului parintelui/reprezentantului legal
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Executarii contractului de prestari servicii educa?ionale
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Obliga?iilor legale
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Interesului legitim al centrului privind siguran?a copiilor
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 5,
      title: 'Confiden?ialitatea ?i securitatea datelor',
      icon: LockClosedIcon,
      content: (
        <div>
          <p className="text-[#a0b8bc] mb-4">PyWeb Academy:</p>
          <ul className="space-y-2 text-[#a0b8bc]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Nu divulga datele personale catre ter?i fara acordul legal
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Ofera acces la date doar personalului autorizat
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Aplica masuri de securitate pentru protejarea datelor impotriva accesului neautorizat
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 6,
      title: 'Perioada de stocare',
      icon: ClockIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          Datele sunt pastrate doar pe perioada necesara desfa?urarii rela?iei contractuale sau conform cerin?elor legale in vigoare.
        </p>
      )
    },
    {
      id: 7,
      title: 'Drepturile parin?ilor/reprezentan?ilor legali',
      icon: UserIcon,
      content: (
        <div>
          <p className="text-[#a0b8bc] mb-4">Conform legisla?iei, ave?i urmatoarele drepturi:</p>
          <ul className="space-y-2 text-[#a0b8bc]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Dreptul de acces la date
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Dreptul de rectificare a datelor
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Dreptul de ?tergere a datelor
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Dreptul de restric?ionare a prelucrarii
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Dreptul de opozi?ie
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Dreptul de retragere a consim?amantului in orice moment
            </li>
          </ul>
          <p className="text-[#a0b8bc] mt-4">
            Solicitarile pot fi transmise in scris la datele de contact ale centrului.
          </p>
        </div>
      )
    },
    {
      id: 8,
      title: 'Fotografii ?i materiale video',
      icon: CameraIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          Fotografiile ?i materialele video realizate in cadrul activita?ilor PyWeb Academy pot fi utilizate exclusiv in scop educativ sau de promovare, doar cu acordul scris al parin?ilor/reprezentan?ilor legali.
        </p>
      )
    },
    {
      id: 9,
      title: 'Modificarea politicii',
      icon: DocumentTextIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          PyWeb Academy i?i rezerva dreptul de a actualiza prezenta politica. Orice modificare va fi comunicata parin?ilor.
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-[#0c1a1d]">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0c1a1d] to-[#136976] text-white pt-32 pb-12 sm:pb-16 border-b border-[#30919f]/20">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#30919f] hover:text-[#f8b316] mb-6 transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Înapoila pagina principală
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#30919f] to-[#136976] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">Politica de Confidențialitate</h1>
              <p className="text-[#30919f]/80 mt-0.5 sm:mt-1 text-xs sm:text-base">GDPR - Protecția datelor cu caracter personal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-4 sm:space-y-8">
          {sections.map((section) => {
            const IconComponent = section.icon
            return (
              <div 
                key={section.id}
                className="bg-[#0f2127] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#30919f]/20 hover:border-[#30919f]/50 transition-all"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#30919f]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#30919f]" />
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-white">
                    {section.id}. {section.title}
                  </h2>
                </div>
                <div className="pl-11 sm:pl-14 text-sm sm:text-base text-[#a0b8bc]">
                  {section.content}
                </div>
              </div>
            )
          })}

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-[#30919f]/10 to-[#136976]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#30919f]/30">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#30919f] to-[#136976] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white">
                10. Date de contact
              </h2>
            </div>
            <div className="pl-11 sm:pl-14">
              <p className="text-[#a0b8bc] mb-4 sm:mb-6 text-sm sm:text-base">
                Pentru orice intrebari sau solicitari legate de protec?ia datelor:
              </p>
              <div className="bg-[#0f2127] rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 border border-[#30919f]/20">
                <h3 className="font-bold text-white text-base sm:text-lg">Bravito After School</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-[#a0b8bc] text-sm sm:text-base">
                    <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#30919f] flex-shrink-0" />
                    <span>Str. M.V. Banulescu Bodoni 57/1, of. 316A, Chi?inau</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-[#a0b8bc] text-sm sm:text-base">
                    <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#30919f] flex-shrink-0" />
                    <a href="tel:+37369352282" className="hover:text-[#f8b316] transition-colors">
                      +373 69 352 282
                    </a>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-[#a0b8bc] text-sm sm:text-base">
                    <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#30919f] flex-shrink-0" />
                    <a href="mailto:bravito.after.school@gmail.com" className="hover:text-[#f8b316] transition-colors break-all">
                      bravito.after.school@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#30919f]/20 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
          <Link 
            href="/termeni"
            className="text-[#30919f] hover:text-[#f8b316] font-medium transition-colors text-sm sm:text-base"
          >
            Termeni ?i Condi?ii
          </Link>
          <span className="text-[#30919f]/30 hidden sm:inline">|</span>
          <Link 
            href="/"
            className="text-[#30919f] hover:text-[#f8b316] font-medium transition-colors text-sm sm:text-base"
          >
            Pagina principala
          </Link>
        </div>
      </div>
    </div>
  )
}
