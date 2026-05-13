'use client'

import Link from 'next/link'
import { CalendarIcon, ClockIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function BlogListPage({ blogs }) {
  return (
    <main className="min-h-screen bg-[#0c1a1d]">
      {/* HERO */}
      <section className="relative py-32 bg-[#0e2024] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(48,145,159,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#30919f]/10 text-[#30919f] border border-[#30919f]/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Bravito Blog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Articole, sfaturi &amp; <span className="text-[#f8b316]">resurse</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tot ce trebuie să știi despre programare pentru copii, web development, AI și parcursul de învățare al copilului tău.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">În curând adăugăm articole. Revino mai târziu!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map(b => (
              <Link key={b.id} href={`/blog/${b.slug}`} className="group block">
                <article className="bg-[#15292e] rounded-2xl overflow-hidden border border-[#1e3d44] h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#30919f]/10 hover:border-[#30919f]/40">
                  {/* Cover */}
                  <div className="relative aspect-video bg-[#0e2024] overflow-hidden">
                    {b.coverImage ? (
                      <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#30919f]/20 to-[#136976]/10" />
                    )}
                    {b.category && (
                      <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider text-white bg-[#30919f] px-3 py-1 rounded-full">
                        {b.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 lg:p-6">
                    <h2 className="font-bold text-white text-base lg:text-lg leading-snug mb-3 group-hover:text-[#30919f] transition-colors line-clamp-2">
                      {b.title}
                    </h2>
                    {b.excerpt && (
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {b.excerpt}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-[#1e3d44]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {new Date(b.publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        {b.readMinutes && (
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-3.5 h-3.5" />
                            {b.readMinutes} min
                          </span>
                        )}
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-[#30919f] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
