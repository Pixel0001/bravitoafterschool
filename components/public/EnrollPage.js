'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronLeftIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid'

const BENEFITS = [
  '60 de minute 1-la-1 cu un profesor',
  'Stabilim împreună cursul potrivit copilului',
  'Online sau la sediul nostru din Chișinău',
  'Fără card bancar, fără angajament',
  'Te contactăm în maxim 24 de ore',
]

export default function EnrollPage() {
  const [form, setForm] = useState({ name: '', phone: '' })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: 'noreply@bravito.md',
          phone: form.phone.trim(),
          message: `Cerere lecție gratuită de pe /inscriere. Telefon: ${form.phone.trim()}`,
        }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data.error || 'A apărut o eroare. Încarcă din nou.')
        setStatus('idle')
      }
    } catch {
      setErrorMsg('Eroare de rețea. Verifică conexiunea și încearcă din nou.')
      setStatus('idle')
    }
  }

  return (
    <main className="min-h-screen bg-[#0c1a1d] relative overflow-hidden flex items-center justify-center px-4 pt-28 pb-16 sm:pb-20">
      {/* Decorative glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#30919f]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#f8b316]/8 blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#a0b8bc] hover:text-white text-sm font-medium transition mb-8"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Înapoi la pagina principală
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — Marketing */}
          <div className="text-white">
            <Image
              src="/bravito.png"
              alt="Bravito After School"
              width={160}
              height={52}
              priority
              className="object-contain mb-6"
            />

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8b316]/15 text-[#f8b316] rounded-full text-xs font-extrabold uppercase tracking-wider mb-4">
              <SparklesIcon className="w-3.5 h-3.5" />
              Lecție 100% gratuită
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Programează lecția{' '}
              <span className="text-[#f8b316]">gratuită</span>
            </h1>

            <p className="text-[#a0b8bc] text-base sm:text-lg leading-relaxed mb-8">
              Lasă-ne numele și telefonul tău. Te contactăm în maxim 24h pentru a stabili
              împreună data și ora primei lecții, fără niciun cost.
            </p>

            <ul className="flex flex-col gap-3.5 mb-8">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-white text-sm sm:text-base">
                  <span className="w-6 h-6 rounded-full bg-[#30919f]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckSolid className="w-3.5 h-3.5 text-[#30919f]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Contact strip */}
            <div className="flex flex-wrap gap-4 items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <a
                href="tel:+37369352282"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-[#f8b316] transition"
              >
                <PhoneIcon className="w-4 h-4 text-[#30919f]" />
                +373 69 352 282
              </a>
              <a
                href="mailto:bravito.after.school@gmail.com"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-[#f8b316] transition break-all"
              >
                <EnvelopeIcon className="w-4 h-4 text-[#30919f]" />
                bravito.after.school@gmail.com
              </a>
            </div>
          </div>

          {/* RIGHT — Form card */}
          <div>
            {status === 'success' ? (
              <div className="bg-[#0f2127] border border-[#30919f]/30 rounded-2xl p-8 sm:p-10 text-center shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-[#30919f]/15 flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="w-10 h-10 text-[#30919f]" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3">
                  Mulțumim! Cererea a ajuns la noi.
                </h3>
                <p className="text-[#a0b8bc] text-sm leading-relaxed mb-6">
                  Te contactăm în mai puțin de 24 de ore la numărul lăsat pentru a stabili
                  data lecției gratuite.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#f8b316] hover:bg-[#e5a310] text-[#0c1a1d] rounded-xl font-bold text-sm transition"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  Înapoi acasă
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-[#0f2127] border border-[#30919f]/20 rounded-2xl p-6 sm:p-8 shadow-2xl"
              >
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                  Programează acum
                </h2>
                <p className="text-[#a0b8bc] text-sm mb-6">
                  Doar 2 câmpuri. Te sunăm noi.
                </p>

                <div className="mb-4">
                  <label htmlFor="enroll-name" className="block text-sm font-semibold text-white mb-1.5">
                    Numele copilului <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="enroll-name"
                    type="text"
                    placeholder="ex: Alexandru Ionescu"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#0c1a1d] border border-[#30919f]/30 rounded-xl text-white placeholder-[#a0b8bc]/50 text-sm focus:outline-none focus:border-[#30919f] focus:ring-2 focus:ring-[#30919f]/20 transition"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="enroll-phone" className="block text-sm font-semibold text-white mb-1.5">
                    Numărul tău de telefon <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="enroll-phone"
                    type="tel"
                    placeholder="ex: +373 69 352 282"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#0c1a1d] border border-[#30919f]/30 rounded-xl text-white placeholder-[#a0b8bc]/50 text-sm focus:outline-none focus:border-[#30919f] focus:ring-2 focus:ring-[#30919f]/20 transition"
                  />
                </div>

                {errorMsg && (
                  <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f8b316] hover:bg-[#e5a310] disabled:bg-[#30919f]/40 text-[#0c1a1d] disabled:text-white font-extrabold text-base rounded-xl transition shadow-lg shadow-[#f8b316]/20 active:scale-[0.99]"
                >
                  {status === 'loading' ? (
                    <>
                      <ClockIcon className="w-5 h-5 animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      <RocketLaunchIcon className="w-5 h-5" />
                      Programează lecția gratuită
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[#a0b8bc] mt-4">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-[#30919f]" />
                  Datele tale sunt în siguranță. Nu trimitem spam.
                </p>

                <p className="text-center text-xs text-[#a0b8bc]/60 mt-3">
                  Prin trimiterea formularului accepți{' '}
                  <Link href="/termeni" className="text-[#30919f] hover:underline">
                    Termenii
                  </Link>{' '}
                  și{' '}
                  <Link href="/gdpr" className="text-[#30919f] hover:underline">
                    Politica GDPR
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
