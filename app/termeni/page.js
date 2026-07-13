'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/public/Navbar'
import { 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  HeartIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ShieldExclamationIcon,
  CameraIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function TermsPage() {
  const sections = [
    {
      id: 1,
      title: 'Dispozi?ii generale',
      icon: DocumentTextIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          Prezentul document stabile?te termenii ?i condi?iile de participare la programele oferite de Bravito After School. Prin inscrierea copilului, parintele/reprezentantul legal confirma ca a citit, a in?eles ?i accepta ace?ti termeni.
        </p>
      )
    },
    {
      id: 2,
      title: 'Inscrierea',
      icon: ClipboardDocumentCheckIcon,
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-[#a0b8bc] mb-3 font-medium">2.1. Inscrierea se face in baza:</p>
            <ul className="space-y-2 text-[#a0b8bc] ml-4">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 flex-shrink-0"></span>
                Completarii formularului de inscriere
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 flex-shrink-0"></span>
                Semnarii contractului de prestari servicii educa?ionale
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 flex-shrink-0"></span>
                Achitarii taxei aferente programului ales
              </li>
            </ul>
          </div>
          <p className="text-[#a0b8bc]">
            <span className="font-medium">2.2.</span> Locurile sunt limitate ?i se ocupa in ordinea confirmarii inscrierii.
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: 'Programul After School',
      icon: AcademicCapIcon,
      content: (
        <div className="space-y-3 text-[#a0b8bc]">
          <p>
            <span className="font-medium">3.1.</span> Programele includ activita?i educa?ionale, recreative ?i de sprijin ?colar, conform programului stabilit de centru.
          </p>
          <p>
            <span className="font-medium">3.2.</span> Centrul nu inlocuie?te institu?ia de inva?amant ?i nu garanteaza rezultate ?colare specifice, insa ofera sprijin educa?ional adaptat nevoilor copilului.
          </p>
          <p>
            <span className="font-medium">3.3.</span> Copiii trebuie adu?i ?i prelua?i la orele stabilite.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: 'Obliga?iile centrului',
      icon: BuildingOfficeIcon,
      content: (
        <div>
          <p className="text-[#a0b8bc] mb-3">Centrul se obliga sa:</p>
          <ul className="space-y-2 text-[#a0b8bc]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Asigure un mediu sigur ?i adecvat copiilor
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Desfa?oare activita?i educa?ionale conform programului
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Informeze parin?ii despre evolu?ia copilului
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></span>
              Respecte confiden?ialitatea datelor personale
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 5,
      title: 'Obliga?iile parin?ilor/reprezentan?ilor legali',
      icon: UserGroupIcon,
      content: (
        <div>
          <p className="text-[#a0b8bc] mb-3">Parin?ii au obliga?ia sa:</p>
          <ul className="space-y-2 text-[#a0b8bc]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 flex-shrink-0"></span>
              Furnizeze informa?ii corecte ?i complete
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 flex-shrink-0"></span>
              Respecte programul ?i regulile centrului
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 flex-shrink-0"></span>
              Achite taxele la termenele stabilite
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-2 flex-shrink-0"></span>
              Anun?e orice problema medicala sau situa?ie speciala a copilului
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 6,
      title: 'Regulile de conduita',
      icon: HeartIcon,
      content: (
        <div className="space-y-3 text-[#a0b8bc]">
          <p>
            <span className="font-medium">6.1.</span> Copiii trebuie sa manifeste un comportament respectuos fa?a de personal ?i ceilal?i copii.
          </p>
          <p>
            <span className="font-medium">6.2.</span> Comportamentele agresive, limbajul nepotrivit sau distrugerea bunurilor pot duce la suspendarea temporara sau definitiva a participarii.
          </p>
        </div>
      )
    },
    {
      id: 7,
      title: 'Taxe ?i pla?i',
      icon: CurrencyDollarIcon,
      content: (
        <div className="space-y-3 text-[#a0b8bc]">
          <p>
            <span className="font-medium">7.1.</span> Taxele sunt stabilite conform pachetului ales ?i se achita lunar / conform contractului.
          </p>
          <p>
            <span className="font-medium">7.2.</span> Taxele achitate nu sunt rambursabile in cazul absen?elor copilului, cu excep?ia situa?iilor justificate medical.
          </p>
        </div>
      )
    },
    {
      id: 8,
      title: 'Absen?e ?i concedii',
      icon: CalendarDaysIcon,
      content: (
        <div className="space-y-3 text-[#a0b8bc]">
          <p>
            <span className="font-medium">8.1.</span> Absen?ele trebuie anun?ate in prealabil.
          </p>
          <p>
            <span className="font-medium">8.2.</span> Centrul poate stabili condi?ii speciale pentru recuperarea activita?ilor, daca este posibil.
          </p>
        </div>
      )
    },
    {
      id: 9,
      title: 'Sanatatea ?i siguran?a copiilor',
      icon: ShieldExclamationIcon,
      content: (
        <div className="space-y-3 text-[#a0b8bc]">
          <p>
            <span className="font-medium">9.1.</span> Copiii bolnavi nu pot participa la activita?i.
          </p>
          <p>
            <span className="font-medium">9.2.</span> In caz de urgen?a, centrul va anun?a imediat parintele ?i, daca este necesar, serviciile medicale.
          </p>
        </div>
      )
    },
    {
      id: 10,
      title: 'Fotografii ?i materiale video',
      icon: CameraIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          Realizarea ?i utilizarea materialelor foto-video se face doar cu acordul scris al parintelui/reprezentantului legal.
        </p>
      )
    },
    {
      id: 11,
      title: 'Incetarea participarii',
      icon: XCircleIcon,
      content: (
        <div className="space-y-3 text-[#a0b8bc]">
          <p>
            <span className="font-medium">11.1.</span> Parintele poate retrage copilul din program cu anun?area prealabila cu minim 5 zile inainte de a se incheia luna.
          </p>
          <p>
            <span className="font-medium">11.2.</span> Centrul i?i rezerva dreptul de a inceta colaborarea in caz de nerespectare a prezentelor condi?ii.
          </p>
        </div>
      )
    },
    {
      id: 12,
      title: 'For?a majora',
      icon: ExclamationTriangleIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          Centrul nu este responsabil pentru neindeplinirea obliga?iilor in caz de for?a majora (evenimente neprevazute).
        </p>
      )
    },
    {
      id: 13,
      title: 'Modificarea termenilor',
      icon: PencilSquareIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          Centrul i?i rezerva dreptul de a modifica termenii ?i condi?iile, informand parin?ii in prealabil.
        </p>
      )
    },
    {
      id: 14,
      title: 'Dispozi?ii finale',
      icon: CheckBadgeIcon,
      content: (
        <p className="text-[#a0b8bc] leading-relaxed">
          Prezentul document face parte integranta din contractul de prestari servicii educa?ionale.
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
              <DocumentTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">Termeni și Condiții</h1>
              <p className="text-[#30919f]/80 mt-0.5 sm:mt-1 text-xs sm:text-base">Condițiile de participare la programele Bravito After School</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-4 sm:space-y-6">
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
                Date de contact
              </h2>
            </div>
            <div className="pl-11 sm:pl-14">
              <p className="text-[#a0b8bc] mb-4 sm:mb-6 text-sm sm:text-base">
                Pentru orice intrebari sau clarificari:
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
            href="/gdpr"
            className="text-[#30919f] hover:text-[#f8b316] font-medium transition-colors text-sm sm:text-base"
          >
            Politica de Confiden?ialitate (GDPR)
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
