'use client'

import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  ArrowTopRightOnSquareIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

const CONTACT_METHODS = [
  {
    id: 'phone',
    icon: PhoneIcon,
    title: 'Sună-ne',
    primary: '+373 69 352 282',
    secondary: 'Luni - Vineri: 09:00 - 20:00',
    action: 'Apelează acum',
    href: 'tel:+37369352282',
    gradient: 'from-[#30919f] to-[#136976]'
  },
  {
    id: 'email',
    icon: EnvelopeIcon,
    title: 'Scrie-ne',
    primary: 'bravito.after.school@gmail.com',
    secondary: 'Răspundem în 24h',
    action: 'Trimite email',
    href: 'mailto:bravito.after.school@gmail.com',
    gradient: 'from-[#f8b316] to-[#e5a310]'
  },
  {
    id: 'app',
    icon: RocketLaunchIcon,
    title: 'Aplicația',
    primary: 'Învață acum gratuit',
    secondary: 'Acces direct la lecții',
    action: 'Deschide aplicația',
    href: '/learn/guest',
    gradient: 'from-[#136976] to-[#30919f]'
  }
]

const SCHEDULE = [
  { day: 'Luni - Vineri', hours: '09:00 - 20:00', isOpen: true },
  { day: 'Sâmbătă', hours: '10:00 - 16:00', isOpen: true },
  { day: 'Duminică', hours: 'Închis', isOpen: false }
]

const FORM_FIELDS = [
  { name: 'name', label: 'Nume complet', type: 'text', placeholder: 'Numele tău complet', required: true, half: false },
  { name: 'email', label: 'Adresa de email', type: 'email', placeholder: 'email@exemplu.com', required: true, half: true },
  { name: 'phone', label: 'Număr de telefon', type: 'tel', placeholder: '+373 XX XXX XXX', required: false, half: true }
]

const MAP_LOCATIONS = [
  { label: 'Centru', src: 'https://maps.google.com/maps?cid=3567577671636451126&hl=ro&gl=MD&output=embed' },
  { label: 'Râșcani', src: 'https://maps.google.com/maps?cid=16612457797362849315&hl=ro&gl=MD&output=embed' },
  { label: 'Buiucani', src: 'https://maps.google.com/maps?cid=11127250680527060167&hl=ro&gl=MD&output=embed' },
]

const MapEmbed = () => {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="flex gap-2 mb-3">
        {MAP_LOCATIONS.map((loc, i) => (
          <button
            key={loc.label}
            onClick={() => setActive(i)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              active === i
                ? 'bg-[#30919f] text-white'
                : 'bg-[var(--border-color)] text-[var(--text-muted)] hover:bg-[#30919f]/20'
            }`}
          >
            {loc.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden border border-[var(--border-color)]">
        <iframe
          key={active}
          src={MAP_LOCATIONS[active].src}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Bravito ${MAP_LOCATIONS[active].label}`}
        />
      </div>
      <a
        href={MAP_LOCATIONS[active].src.replace('output=embed', '')}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#30919f] hover:underline"
      >
        <MapPinIcon className="w-3.5 h-3.5" />
        Deschide în Google Maps
      </a>
    </div>
  )
}

const ContactMethodCard = ({ method, index }) => {
  const IconComponent = method.icon
  const isExternal = method.href.startsWith('http') || method.href.startsWith('mailto:') || method.href.startsWith('tel:')

  return (
    <a
      href={method.href}
      target={method.href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group relative block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-full bg-[var(--card-bg)] rounded-2xl xs:rounded-3xl p-4 xs:p-6 sm:p-8 border border-[var(--border-color)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#30919f]/20 hover:border-[#30919f]/50 flex flex-col">
        <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${method.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-700`} />

        <div className={`relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 mb-4 xs:mb-5 sm:mb-6 rounded-xl xs:rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <IconComponent className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white keep-white" />
        </div>

        <div className="relative min-w-0 flex flex-col flex-1">
          <div>
            <h3 className="text-base xs:text-lg font-bold text-[var(--foreground)] mb-2 xs:mb-3 group-hover:text-[#30919f] transition-colors">
              {method.title}
            </h3>
            <p className="text-[var(--foreground)] font-medium mb-1 text-sm xs:text-base break-words">{method.primary}</p>
            <p className="text-[var(--text-muted)] text-xs xs:text-sm break-words">{method.secondary}</p>
          </div>

          <div className="flex items-center gap-2 text-[#30919f] font-medium text-xs xs:text-sm group-hover:gap-3 transition-all mt-auto pt-4">
            <span>{method.action}</span>
            <ArrowTopRightOnSquareIcon className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
          </div>
        </div>
      </div>
    </a>
  )
}

const ScheduleItem = ({ item, index }) => (
  <div
    className="flex items-center justify-between py-4 border-b border-[var(--border-color)] last:border-0"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${item.isOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
      <span className="text-[var(--foreground)] font-medium">{item.day}</span>
    </div>
    <span className={`font-semibold ${item.isOpen ? 'text-[#30919f]' : 'text-[var(--text-muted)]'}`}>
      {item.hours}
    </span>
  </div>
)

const FormInput = ({ field, value, onChange, disabled }) => {
  const baseClasses = "w-full px-5 py-4 bg-[var(--background)] border-2 border-[var(--border-color)] rounded-2xl text-[var(--foreground)] placeholder-[var(--text-muted)] transition-all duration-300 focus:ring-0 focus:border-[#30919f] focus:shadow-lg focus:shadow-[#30919f]/10 disabled:opacity-50 disabled:cursor-not-allowed"

  return (
    <div className={field.half ? 'md:col-span-1' : 'md:col-span-2'}>
      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
        {field.label} {field.required && <span className="text-[#f8b316]">*</span>}
      </label>
      <input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        required={field.required}
        disabled={disabled}
        className={baseClasses}
        placeholder={field.placeholder}
      />
    </div>
  )
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Eroare la trimitere')
      }

      toast.success('Mesajul a fost trimis cu succes!')
      setSubmitted(true)

      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' })
        setSubmitted(false)
      }, 3000)
    } catch (error) {
      toast.error(error.message || 'A apărut o eroare')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-40 overflow-hidden bg-[var(--background)]"
    >
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#30919f]/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#f8b316]/8 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#136976]/5 rounded-full blur-3xl" />

      <div className="absolute top-40 left-20 w-4 h-4 bg-[#30919f] rounded-full animate-bounce opacity-40" style={{ animationDuration: '3s' }} />
      <div className="absolute top-60 right-40 w-6 h-6 bg-[#f8b316] rounded-lg rotate-45 animate-bounce opacity-30" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-[#136976] rounded-full animate-bounce opacity-30" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-4 relative z-10">

        <div className={`text-center mb-20 lg:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-[#30919f]/10 border border-[#30919f]/20 px-6 py-3 rounded-full text-base font-medium mb-8 backdrop-blur-sm">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#30919f]" />
            <span className="text-[#30919f]">Contactează-ne</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--foreground)] mb-8">
            Hai să <span className="text-[#30919f]">vorbim</span>
          </h2>

          <p className="text-xl lg:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
            Ai întrebări despre cursurile noastre? Suntem aici să te ajutăm să găsești
            <span className="text-[#f8b316] font-medium"> programul perfect</span> pentru copilul tău.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-20 lg:mb-24 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {CONTACT_METHODS.map((method, idx) => (
            <ContactMethodCard key={method.id} method={method} index={idx} />
          ))}
        </div>

        <div className={`grid lg:grid-cols-5 gap-10 lg:gap-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <div className="lg:col-span-2 space-y-8">
            <div className="relative">
              <div className="relative bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#30919f] via-[#136976] to-[#f8b316] z-10" />

                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#30919f] to-[#136976] rounded-xl flex items-center justify-center shadow-lg">
                      <MapPinIcon className="w-6 h-6 text-white keep-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">Găsește-ne pe hartă</h3>
                      <p className="text-xs text-[var(--text-muted)]">Str. M.V. Bănulescu Bodoni 57/1, of. 316A</p>
                    </div>
                  </div>

                  <MapEmbed />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#30919f]/20 to-[#f8b316]/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[var(--card-bg)] rounded-3xl p-8 lg:p-10 border border-[var(--border-color)] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#30919f] via-[#136976] to-[#f8b316]" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f8b316] to-[#e5a310] rounded-2xl flex items-center justify-center shadow-xl">
                    <ClockIcon className="w-7 h-7 text-white keep-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)]">Program</h3>
                    <p className="text-sm text-[var(--text-muted)]">Când ne poți contacta</p>
                  </div>
                </div>

                <div className="space-y-1">
                  {SCHEDULE.map((item, idx) => (
                    <ScheduleItem key={idx} item={item} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#30919f]/30 to-[#f8b316]/30 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />

              <div className="relative bg-[var(--card-bg)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl">
                <div className="bg-gradient-to-r from-[#30919f] to-[#136976] p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <PaperAirplaneIcon className="w-7 h-7 text-white keep-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white keep-white">Trimite-ne un mesaj</h3>
                      <p className="text-white/70 keep-white">Răspundem în maxim 24 de ore</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  {submitted ? (
                    <div className="text-center py-12 animate-fade-in">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircleIcon className="w-12 h-12 text-green-500" />
                      </div>
                      <h4 className="text-2xl font-bold text-[var(--foreground)] mb-3">Mesaj trimis cu succes!</h4>
                      <p className="text-[var(--text-muted)]">Te vom contacta în cel mai scurt timp posibil.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {FORM_FIELDS.map(field => (
                          <FormInput
                            key={field.name}
                            field={field}
                            value={formData[field.name]}
                            onChange={handleChange}
                            disabled={loading}
                          />
                        ))}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                          Mesajul tău <span className="text-[#f8b316]">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          rows={5}
                          className="w-full px-5 py-4 bg-[var(--background)] border-2 border-[var(--border-color)] rounded-2xl text-[var(--foreground)] placeholder-[var(--text-muted)] transition-all duration-300 focus:ring-0 focus:border-[#30919f] focus:shadow-lg focus:shadow-[#30919f]/10 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                          placeholder="Descrie pe scurt întrebarea sau solicitarea ta..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer group relative w-full px-8 py-5 bg-gradient-to-r from-[#f8b316] to-[#e5a310] text-[#231f20] rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#f8b316]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <span className="relative flex items-center justify-center gap-3">
                          {loading ? (
                            <>
                              <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Se trimite mesajul...
                            </>
                          ) : (
                            <>
                              <PaperAirplaneIcon className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              Trimite mesajul
                            </>
                          )}
                        </span>
                      </button>

                      <p className="text-center text-sm text-[var(--text-muted)]">
                        Prin trimiterea formularului, ești de acord cu{' '}
                        <a href="/gdpr" className="text-[#30919f] hover:underline">politica de confidențialitate</a>.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
