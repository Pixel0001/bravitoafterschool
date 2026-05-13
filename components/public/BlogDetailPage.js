'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ChevronDownIcon,
  CheckIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

const LEVEL_COLORS = {
  'începător': '#22c55e',
  'incepator': '#22c55e',
  'intermediar': '#f97316',
  'avansat': '#a78bfa',
}

function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null)
  if (!items?.length) return null
  return (
    <div className="space-y-2 my-6">
      {items.map((q, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="bg-[#15292e] border border-[#1e3d44] rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="cursor-pointer w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-[#1e3d44]/50 transition-colors"
            >
              <span className="font-semibold text-white text-sm">{q.question}</span>
              <ChevronDownIcon className={`w-5 h-5 text-[#30919f] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">{q.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Block({ block }) {
  if (!block) return null
  switch (block.type) {
    case 'heading':
      return <h2 className="text-xl lg:text-2xl font-bold text-white mt-8 mb-4">{block.text}</h2>
    case 'text':
      return (block.text || '').split(/\n\n+/).map((para, i) => (
        <p key={i} className="text-gray-300 leading-relaxed mb-4">{para}</p>
      ))
    case 'image':
      return (
        <figure className="my-6">
          {block.url && (
            <img src={block.url} alt={block.alt || ''} className="w-full rounded-2xl border border-[#1e3d44]" loading="lazy" />
          )}
          {block.caption && (
            <figcaption className="text-xs text-gray-500 text-center mt-2 italic">{block.caption}</figcaption>
          )}
        </figure>
      )
    case 'youtube':
      if (!block.videoId) return null
      return (
        <figure className="my-6">
          <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden border border-[#1e3d44]">
            <iframe
              src={`https://www.youtube.com/embed/${block.videoId}`}
              title={block.caption || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          {block.caption && (
            <figcaption className="text-xs text-gray-500 text-center mt-2 italic">{block.caption}</figcaption>
          )}
        </figure>
      )
    case 'faq':
      return <FaqAccordion items={block.items} />
    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#30919f] bg-[#15292e] rounded-r-2xl px-6 py-4 my-6">
          <p className="text-gray-300 italic leading-relaxed">{block.text}</p>
          {block.author && <footer className="mt-2 text-sm text-gray-500">— {block.author}</footer>}
        </blockquote>
      )
    default:
      return null
  }
}

export default function BlogDetailPage({ blog, recommendedCourses = [], recommendedBlogs = [] }) {
  if (!blog) return null
  const blocks = Array.isArray(blog.content) ? blog.content : []

  return (
    <main className="min-h-screen bg-[#0c1a1d]">
      {/* HEADER */}
      <article>
        <header className="pt-24 pb-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#30919f] text-sm font-medium mb-6 transition-colors group">
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Toate articolele
            </Link>

            {blog.category && (
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-[#30919f] px-3 py-1 rounded-full mb-4">
                {blog.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-lg text-gray-400 leading-relaxed mb-6">{blog.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-[#1e3d44]">
              {blog.authorName && (
                <span className="flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4" />
                  {blog.authorName}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
                {new Date(blog.publishedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              {blog.readMinutes && (
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4" />
                  {blog.readMinutes} min citire
                </span>
              )}
            </div>
          </div>

          {blog.coverImage && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <div className="aspect-video rounded-2xl overflow-hidden border border-[#1e3d44]">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </header>

        {/* BODY */}
        <div className="blog-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {blocks.length === 0 ? (
            <p className="text-gray-500 italic">Acest articol nu are conținut încă.</p>
          ) : (
            blocks.map((b, i) => <Block key={i} block={b} />)
          )}
        </div>

        {/* TAGS */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-wrap gap-2">
            {blog.tags.map(t => (
              <span key={t} className="flex items-center gap-1 text-xs font-medium text-[#30919f] bg-[#30919f]/10 border border-[#30919f]/20 px-3 py-1 rounded-full">
                <TagIcon className="w-3 h-3" />
                {t}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#30919f] to-[#136976] p-8 lg:p-12">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f8b316]/20 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#f8b316] mb-2">100% gratuit · fără obligații</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">Programează o lecție gratuită</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Vezi cum lucrăm, ce instrumente folosim și cum se potrivesc cursurile noastre cu interesele copilului tău.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {['Profesor dedicat', 'Conținut adaptat vârstei', 'Materiale incluse', 'Online sau la sediu'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/inscriere"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-4 bg-[#f8b316] text-[#231f20] rounded-2xl font-bold hover:shadow-xl hover:shadow-[#f8b316]/30 transition-all hover:-translate-y-0.5"
            >
              Înscrie-te acum
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* RECOMMENDED BLOGS */}
      {recommendedBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6">Articole recomandate</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedBlogs.map(b => (
              <Link key={b.id} href={`/blog/${b.slug}`} className="group block">
                <article className="bg-[#15292e] rounded-2xl overflow-hidden border border-[#1e3d44] h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#30919f]/40">
                  <div className="aspect-video bg-[#0e2024] overflow-hidden">
                    {b.coverImage ? (
                      <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#30919f]/20 to-[#136976]/10" />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-[#30919f] transition-colors line-clamp-2">{b.title}</h3>
                    {b.excerpt && <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{b.excerpt}</p>}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* RECOMMENDED COURSES */}
      {recommendedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6">Cursuri recomandate</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map(c => {
              const levelColor = LEVEL_COLORS[c.level?.toLowerCase()] || '#30919f'
              const thumb = c.mainImageUrl || c.imageUrl || c.images?.[0]
              const hasDiscount = c.discountPrice != null && c.discountPrice < c.price
              const isFree = c.price === 0 && !hasDiscount
              return (
                <Link key={c.id} href={`/curs/${c.slug}`} className="group block">
                  <article className="bg-[#15292e] rounded-2xl overflow-hidden border border-[#1e3d44] h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#30919f]/40">
                    <div className="relative aspect-video bg-[#0e2024] overflow-hidden">
                      {thumb ? (
                        <img src={thumb} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#30919f]/20 to-[#136976]/10" />
                      )}
                      {c.level && (
                        <span className="absolute top-2 left-2 text-xs font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: levelColor }}>
                          {c.level}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-white text-sm leading-snug mb-1 group-hover:text-[#30919f] transition-colors line-clamp-2">{c.title}</h3>
                      {c.descriptionShort && (
                        <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">{c.descriptionShort}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-bold text-sm" style={{ color: isFree ? '#22c55e' : '#f8b316' }}>
                          {isFree ? 'Gratuit' : hasDiscount ? `${c.discountPrice} lei/lună` : `${c.price} lei/lună`}
                        </span>
                        <span className="text-xs text-[#30919f] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Detalii <ArrowRightIcon className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
