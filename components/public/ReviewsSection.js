'use client'

import { useState, useEffect, useRef } from 'react'
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false)
  const text = review?.message || review?.content || ''
  const name = review?.name || review?.authorName || 'Părinte'
  const role = review?.role || review?.relation || review?.roleLabel || 'Părinte'
  const isLong = text.length > 240
  const displayed = expanded || !isLong ? text : text.slice(0, 240).trimEnd() + '…'
  const initials = name.trim().split(/\s+/).slice(0,2).map(s => s[0]?.toUpperCase()).join('')

  return (
    <div className="group relative bg-[var(--card-bg)] rounded-3xl p-6 lg:p-8 border border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#30919f]/15 hover:border-[#30919f]/40 overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#30919f] via-[#136976] to-[#f8b316] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#30919f]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <ChatBubbleBottomCenterTextIcon className="absolute top-4 right-4 w-12 h-12 text-[#30919f]/10 group-hover:text-[#30919f]/20 transition-colors" />

      <div className="relative flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${i < (review?.rating || 5) ? 'text-[#f8b316]' : 'text-[var(--border-color)]'}`}
          />
        ))}
      </div>

      <div className="relative flex-1">
        <p className="text-[var(--foreground)] leading-relaxed mb-2 italic">
          “{displayed}”
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-[#30919f] text-sm font-semibold hover:text-[#f8b316] transition-colors mb-4"
          >
            {expanded ? 'Mai puțin' : 'Citește mai mult'}
          </button>
        )}
      </div>

      <div className="relative flex items-center gap-3 pt-4 mt-4 border-t border-[var(--border-color)]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#30919f] to-[#136976] flex items-center justify-center text-white keep-white font-bold shadow-lg">
          {initials || <UserCircleIcon className="w-7 h-7" />}
        </div>
        <div className="min-w-0">
          <p className="text-[var(--foreground)] font-semibold truncate">{name}</p>
          <p className="text-[var(--text-muted)] text-sm truncate">
            {role}
            {review?.course ? ` • ${review.course}` : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

const SkeletonCard = () => (
  <div className="bg-[var(--card-bg)] rounded-3xl p-6 lg:p-8 border border-[var(--border-color)] animate-pulse h-72">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => <div key={i} className="w-5 h-5 rounded bg-[var(--border-color)]" />)}
    </div>
    <div className="space-y-2 mb-6">
      <div className="h-4 bg-[var(--border-color)] rounded w-full" />
      <div className="h-4 bg-[var(--border-color)] rounded w-5/6" />
      <div className="h-4 bg-[var(--border-color)] rounded w-4/6" />
    </div>
    <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
      <div className="w-12 h-12 rounded-full bg-[var(--border-color)]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[var(--border-color)] rounded w-1/2" />
        <div className="h-3 bg-[var(--border-color)] rounded w-1/3" />
      </div>
    </div>
  </div>
)

export default function ReviewsSection({ initialReviews = null }) {
  const [reviews, setReviews] = useState(initialReviews || [])
  const [loading, setLoading] = useState(!initialReviews)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const scrollerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (initialReviews) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/public/reviews', { cache: 'no-store' })
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        const list = Array.isArray(data) ? data : (data?.reviews || [])
        if (!cancelled) setReviews(list)
      } catch {
        if (!cancelled) setReviews([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [initialReviews])

  const scroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.85
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0'

  return (
    <section
      ref={sectionRef}
      id="recenzii"
      className="relative py-32 lg:py-40 overflow-hidden bg-[#0e2024]"
    >
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#30919f]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#f8b316]/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-4 relative z-10">

        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-[#f8b316]/10 border border-[#f8b316]/20 px-6 py-3 rounded-full text-base font-medium mb-8 backdrop-blur-sm">
            <StarIcon className="w-5 h-5 text-[#f8b316]" />
            <span className="text-[#f8b316]">Testimoniale</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--foreground)] mb-8">
            Ce spun <span className="text-[#30919f]">părinții</span> și <span className="text-[#f8b316]">elevii</span>
          </h2>

          <p className="text-xl lg:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed mb-8">
            Peste <span className="text-[#f8b316] font-medium">500 de familii</span> ne-au ales pentru educația digitală a copiilor lor.
          </p>

          <div className="inline-flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl px-6 py-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-[#f8b316]" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--foreground)]">{avg}<span className="text-[var(--text-muted)] text-base">/5.0</span></div>
              <div className="text-sm text-[var(--text-muted)]">{reviews.length || '—'} {reviews.length === 1 ? 'recenzie' : 'recenzii'}</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <ChatBubbleBottomCenterTextIcon className="w-20 h-20 text-[#30919f]/30 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">Fii primul care lasă o recenzie</h3>
            <p className="text-[var(--text-muted)]">Recenziile tale ne ajută să creștem și să îmbunătățim experiența copiilor.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((r, i) => (
                <div key={r.id || i} className="transition-all duration-700" style={{ animationDelay: `${i * 80}ms` }}>
                  <ReviewCard review={r} />
                </div>
              ))}
            </div>

            <div className="md:hidden relative">
              <div
                ref={scrollerRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {reviews.map((r, i) => (
                  <div key={r.id || i} className="snap-center shrink-0 w-[85vw] max-w-[400px]">
                    <ReviewCard review={r} />
                  </div>
                ))}
              </div>

              {reviews.length > 1 && (
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={() => scroll('left')}
                    className="cursor-pointer w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[#30919f] flex items-center justify-center transition-colors"
                    aria-label="Anterior"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-[var(--foreground)]" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="cursor-pointer w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[#30919f] flex items-center justify-center transition-colors"
                    aria-label="Următor"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-[var(--foreground)]" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
