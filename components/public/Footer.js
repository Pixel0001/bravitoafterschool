'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowUpIcon,
  HeartIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61566901452196', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.324V1.325C24 .593 23.408 0 22.675 0z"/></svg>
  )},
  { name: 'Instagram', href: 'https://www.instagram.com/bravitoaftherschool/', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
  { name: 'TikTok', href: 'https://www.tiktok.com/@bravito.afther.school', icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z"/></svg>
  )},
]

const NAV_LINKS = [
  { label: 'Acasă', href: '#home' },
  { label: 'Cursuri', href: '#cursuri' },
  { label: 'Despre noi', href: '#despre' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '/blog' },
]

const LEGAL_LINKS = [
  { label: 'Termeni și condiții', href: '/termeni' },
  { label: 'GDPR & Confidențialitate', href: '/gdpr' },
]

export default function Footer() {
  const [courses, setCourses] = useState([])
  const [showTop, setShowTop] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/public/courses', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        const list = Array.isArray(data) ? data : (data?.courses || [])
        if (!cancelled) setCourses(list.slice(0, 4))
      } catch {}
    })()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="relative bg-[#0a1518] border-t border-[#1e3d44] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#30919f] to-transparent" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-[#30919f]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-[#f8b316]/5 rounded-full blur-3xl" />

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-4 pt-20 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">

          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#30919f]/40 group-hover:ring-[#f8b316] transition-all">
                <Image
                  src="/bravito.png"
                  alt="Bravito After School"
                  fill
                  sizes="48px"
                  className="object-cover drop-shadow-lg"
                />
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-base tracking-wide keep-white">BRAVITO</div>
                <div className="text-[#f8b316] font-semibold text-xs uppercase tracking-[0.2em]">After School</div>
              </div>
            </Link>

            <p className="text-[#9bb3ba] text-sm leading-relaxed mb-6">
              Programare pentru copii și adolescenți. Python, Web Development, AI și jocuri — învățare gamificată în grupe mici.
            </p>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-xl bg-[#15292e] border border-[#1e3d44] flex items-center justify-center text-[#9bb3ba] hover:bg-gradient-to-br hover:from-[#30919f] hover:to-[#136976] hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 keep-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-base keep-white">Navigare</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#9bb3ba] hover:text-[#f8b316] text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#30919f] group-hover:w-3 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-base keep-white">Cursuri populare</h3>
            <ul className="space-y-3">
              {courses.length === 0 ? (
                <>
                  <li className="text-[#9bb3ba] text-sm">Python pentru copii</li>
                  <li className="text-[#9bb3ba] text-sm">Web Development</li>
                  <li className="text-[#9bb3ba] text-sm">Inteligență Artificială</li>
                  <li className="text-[#9bb3ba] text-sm">Dezvoltare jocuri</li>
                </>
              ) : (
                courses.map(c => (
                  <li key={c.id}>
                    <a
                      href="#cursuri"
                      className="text-[#9bb3ba] hover:text-[#f8b316] text-sm transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#30919f] group-hover:w-3 transition-all" />
                      <span className="line-clamp-1">{c.name || c.title}</span>
                    </a>
                  </li>
                ))
              )}
            </ul>

            <Link
              href="/learn/guest"
              className="inline-flex items-center gap-2 mt-6 text-[#f8b316] hover:text-[#30919f] text-sm font-semibold transition-colors group"
            >
              <RocketLaunchIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Aplicația gratuită
            </Link>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-base keep-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-[#30919f] flex-shrink-0 mt-0.5" />
                <span className="text-[#9bb3ba] text-sm leading-relaxed">Chișinău, Moldova</span>
              </li>
              <li>
                <a href="tel:+37368113314" className="flex items-start gap-3 text-[#9bb3ba] hover:text-[#f8b316] transition-colors">
                  <PhoneIcon className="w-5 h-5 text-[#30919f] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">+373 68 113 314</span>
                </a>
              </li>
              <li>
                <a href="mailto:pyweb.it.academy@gmail.com" className="flex items-start gap-3 text-[#9bb3ba] hover:text-[#f8b316] transition-colors break-all">
                  <EnvelopeIcon className="w-5 h-5 text-[#30919f] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">pyweb.it.academy@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e3d44] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[#9bb3ba] text-sm flex items-center gap-2 text-center md:text-left">
            © {year} Bravito After School. Made with
            <HeartIcon className="w-4 h-4 text-[#f8b316] inline animate-pulse" />
            în Moldova.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#9bb3ba] hover:text-[#f8b316] text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Sus"
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#30919f] to-[#136976] text-white keep-white shadow-2xl shadow-[#30919f]/40 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${
          showTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
    </footer>
  )
}
