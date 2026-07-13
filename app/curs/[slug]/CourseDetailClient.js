'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpenIcon,
  UserIcon,
  ClockIcon,
  ArrowLeftIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import EnrollmentModal from '@/components/public/EnrollmentModal'

const LEVEL_CONFIG = {
  'începător': { color: '#10b981' },
  'intermediar': { color: '#f59e0b' },
  'avansat': { color: '#ef4444' },
}

export default function CourseDetailClient({ course, allCourses = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [])

  const images = course?.images?.length > 0
    ? course.images
    : (course?.mainImageUrl || course?.imageUrl ? [course.mainImageUrl || course.imageUrl] : [])

  const nextImage = useCallback(() => setCurrentImageIndex(p => (p + 1) % images.length), [images.length])
  const prevImage = useCallback(() => setCurrentImageIndex(p => (p - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || isLightboxOpen) return
    const t = setInterval(nextImage, 4000)
    return () => clearInterval(t)
  }, [isAutoPlaying, images.length, isLightboxOpen, nextImage])

  useEffect(() => {
    const h = (e) => {
      if (!isLightboxOpen) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isLightboxOpen, nextImage, prevImage])

  const levelColor = LEVEL_CONFIG[course?.level?.toLowerCase()]?.color || '#30919f'
  const ageText = (course?.ageMin || course?.ageMax)
    ? `${course.ageMin || '?'}${course.ageMax ? `-${course.ageMax}` : '+'} ani`
    : null

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] pt-16 xs:pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-3 xs:py-5 sm:py-8 md:py-12 overflow-hidden">

          {/* Back button */}
          <Link
            href="/#cursuri"
            className="inline-flex items-center gap-1 xs:gap-2 text-xs xs:text-sm sm:text-base text-[var(--text-muted)] hover:text-[#30919f] mb-3 xs:mb-5 sm:mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            Înapoi la cursuri
          </Link>

          <div className="grid lg:grid-cols-2 gap-3 xs:gap-5 sm:gap-8 lg:gap-12">

            {/* ── LEFT: Images ── */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4 min-w-0">
              <div
                className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[3/2] rounded-lg xs:rounded-xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a4a54] to-[#0d1f23] cursor-pointer group shadow-md xs:shadow-lg sm:shadow-2xl"
                onClick={() => images.length > 0 && setIsLightboxOpen(true)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {images.length > 0 ? (
                  <>
                    {images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={course.title}
                        fill
                        className={`object-cover transition-all duration-700 ease-in-out ${
                          currentImageIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                        priority={idx === 0}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                        <span className="text-white font-medium text-sm sm:text-base">Click pentru a mări</span>
                      </div>
                    </div>
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(false); prevImage() }}
                          className="cursor-pointer absolute left-1 xs:left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 xs:p-2 sm:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all hover:scale-110"
                        >
                          <ChevronLeftIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(false); nextImage() }}
                          className="cursor-pointer absolute right-1 xs:right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 xs:p-2 sm:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all hover:scale-110"
                        >
                          <ChevronRightIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7" />
                        </button>
                      </>
                    )}
                    {images.length > 1 && (
                      <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 xs:gap-1.5 sm:gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx) }}
                            className={`cursor-pointer transition-all duration-300 rounded-full ${
                              currentImageIndex === idx
                                ? 'w-5 xs:w-6 sm:w-8 h-1 xs:h-1.5 sm:h-2 bg-white'
                                : 'w-1 xs:w-1.5 sm:w-2 h-1 xs:h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    {images.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying) }}
                        className="cursor-pointer absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 p-1 xs:p-1.5 sm:p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-colors"
                        title={isAutoPlaying ? 'Oprește auto-play' : 'Pornește auto-play'}
                      >
                        {isAutoPlaying ? (
                          <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpenIcon className="w-24 h-24 text-[#30919f]/30" />
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="w-full max-w-full overflow-x-auto scrollbar-hide">
                  <div className="flex gap-1.5 xs:gap-2 sm:gap-3 px-1 pt-1 pb-3 min-w-0">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setCurrentImageIndex(idx); setIsAutoPlaying(false) }}
                        className={`cursor-pointer relative flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded xs:rounded-md sm:rounded-lg overflow-hidden transition-all duration-300 ${
                          currentImageIndex === idx
                            ? 'ring-2 ring-[#30919f] ring-offset-1 ring-offset-[var(--background)] scale-105 shadow-lg'
                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <Image src={img} alt={`${course.title} - ${idx + 1}`} fill className="object-cover" />
                        {currentImageIndex === idx && <div className="absolute inset-0 bg-[#30919f]/20" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT: Details ── */}
            <div className="space-y-3 xs:space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3">
                {course.level && (
                  <span
                    className="px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 sm:py-1.5 rounded-full text-[10px] xs:text-xs sm:text-sm font-bold uppercase tracking-wide"
                    style={{ backgroundColor: `${levelColor}20`, color: levelColor, border: `1px solid ${levelColor}40` }}
                  >
                    {course.level}
                  </span>
                )}
                {course.category && (
                  <span className="px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 sm:py-1.5 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-color)]">
                    {course.category}
                  </span>
                )}
              </div>

              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] leading-tight">
                {course.title}
              </h1>

              <p className="text-xs xs:text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {course.descriptionShort}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-wrap">
                {course.discountPrice ? (
                  <>
                    <div className="px-2.5 xs:px-3 sm:px-5 py-1 xs:py-1.5 sm:py-2.5 bg-[#f8b316] rounded-md xs:rounded-lg sm:rounded-2xl inline-flex items-baseline gap-0.5 xs:gap-1 shadow-md xs:shadow-lg shadow-[#f8b316]/30">
                      <span className="text-lg xs:text-xl sm:text-3xl font-black text-[#112428]">{course.discountPrice}</span>
                      <span className="text-[10px] xs:text-xs sm:text-base font-semibold text-[#112428]/70">MDL</span>
                    </div>
                    <div className="px-2 xs:px-3 sm:px-4 py-0.5 xs:py-1 sm:py-2 bg-[var(--card-bg)] rounded xs:rounded-md sm:rounded-xl inline-flex items-baseline gap-0.5">
                      <span className="text-sm xs:text-base sm:text-xl font-medium text-[var(--text-muted)] line-through">{course.price}</span>
                      <span className="text-[8px] xs:text-[10px] sm:text-sm font-medium text-[var(--text-muted)]">MDL</span>
                    </div>
                  </>
                ) : (
                  <div className="px-2.5 xs:px-3 sm:px-5 py-1 xs:py-1.5 sm:py-2.5 bg-[#f8b316] rounded-md xs:rounded-lg sm:rounded-2xl inline-flex items-baseline gap-0.5 xs:gap-1 shadow-md xs:shadow-lg shadow-[#f8b316]/30">
                    <span className="text-lg xs:text-xl sm:text-3xl font-black text-[#112428]">{course.price}</span>
                    <span className="text-[10px] xs:text-xs sm:text-base font-semibold text-[#112428]/70">MDL</span>
                  </div>
                )}
              </div>

              {/* Meta info */}
              <div className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-3">
                {ageText && (
                  <div className="flex flex-col items-center gap-0.5 xs:gap-1 p-1.5 xs:p-2 sm:p-3 bg-[var(--card-bg)] rounded xs:rounded-md sm:rounded-lg border border-[var(--border-color)]">
                    <div className="p-1 xs:p-1.5 bg-[#30919f]/10 rounded xs:rounded-md">
                      <UserIcon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#30919f]" />
                    </div>
                    <div className="text-center">
                      <p className="text-[7px] xs:text-[8px] sm:text-[10px] text-[var(--text-muted)] leading-tight">Vârstă</p>
                      <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-[var(--foreground)] leading-tight">{ageText}</p>
                    </div>
                  </div>
                )}
                {course.duration && (
                  <div className="flex flex-col items-center gap-0.5 xs:gap-1 p-1.5 xs:p-2 sm:p-3 bg-[var(--card-bg)] rounded xs:rounded-md sm:rounded-lg border border-[var(--border-color)]">
                    <div className="p-1 xs:p-1.5 bg-[#30919f]/10 rounded xs:rounded-md">
                      <ClockIcon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#30919f]" />
                    </div>
                    <div className="text-center">
                      <p className="text-[7px] xs:text-[8px] sm:text-[10px] text-[var(--text-muted)] leading-tight">Durată</p>
                      <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-[var(--foreground)] leading-tight">{course.duration}</p>
                    </div>
                  </div>
                )}
                {course.lessonsCount > 0 && (
                  <div className="flex flex-col items-center gap-0.5 xs:gap-1 p-1.5 xs:p-2 sm:p-3 bg-[var(--card-bg)] rounded xs:rounded-md sm:rounded-lg border border-[var(--border-color)]">
                    <div className="p-1 xs:p-1.5 bg-[#30919f]/10 rounded xs:rounded-md">
                      <BookOpenIcon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#30919f]" />
                    </div>
                    <div className="text-center">
                      <p className="text-[7px] xs:text-[8px] sm:text-[10px] text-[var(--text-muted)] leading-tight">Lecții</p>
                      <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-[var(--foreground)] leading-tight">{course.lessonsCount}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer w-full py-2 xs:py-2.5 sm:py-3.5 rounded-md xs:rounded-lg sm:rounded-xl font-bold text-xs xs:text-sm sm:text-base relative overflow-hidden bg-gradient-to-r from-[#30919f] to-[#136976] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#30919f]/40 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2">
                  <PlayIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                  Înscrie-te acum
                </span>
              </button>
            </div>
          </div>

          {/* Long description */}
          {course.descriptionLong && (
            <div className="mt-5 xs:mt-6 sm:mt-10 md:mt-14">
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2 xs:mb-3 sm:mb-5">
                Despre acest curs
              </h2>
              <p className="whitespace-pre-wrap leading-relaxed text-[11px] xs:text-xs sm:text-sm text-[var(--text-muted)]">{course.descriptionLong}</p>
            </div>
          )}

          {/* Reviews */}
          {Array.isArray(course.textReviews) && course.textReviews.length > 0 && (
            <div className="mt-8 xs:mt-10 sm:mt-14">
              <p className="text-[10px] xs:text-xs font-bold uppercase tracking-widest text-[#30919f] mb-1">Ce spun părinții</p>
              <h2 className="text-base xs:text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4 xs:mb-5 sm:mb-6">Recenzii</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
                {course.textReviews.map((rev, i) => (
                  <div key={i} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl xs:rounded-2xl p-4 xs:p-5 flex flex-col">
                    <div className="flex gap-0.5 mb-2 text-[#f8b316]">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg key={idx} className="w-4 h-4" viewBox="0 0 24 24" fill={idx < (rev.rating || 5) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs xs:text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-3">"{rev.text}"</p>
                    <div className="border-t border-[var(--border-color)] pt-3">
                      <p className="font-bold text-xs xs:text-sm text-[var(--foreground)]">{rev.author || 'Anonim'}</p>
                      {rev.role && <p className="text-[10px] xs:text-xs text-[var(--text-muted)]">{rev.role}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {Array.isArray(course.faq) && course.faq.length > 0 && (
            <FaqSection faq={course.faq} />
          )}

          {/* Other courses */}
          {allCourses.length > 0 && (
            <div className="mt-8 xs:mt-10 sm:mt-14 pb-10 xs:pb-14">
              <div className="flex items-end justify-between mb-4 xs:mb-5 sm:mb-6 flex-wrap gap-2">
                <div>
                  <h2 className="text-base xs:text-xl sm:text-2xl font-bold text-[var(--foreground)]">Alte cursuri recomandate</h2>
                  <p className="text-xs xs:text-sm text-[var(--text-muted)] mt-0.5">Descoperă mai multe cursuri pentru copii</p>
                </div>
                <Link href="/#cursuri" className="text-xs xs:text-sm font-semibold text-[#30919f] hover:underline flex items-center gap-1">
                  Vezi toate
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
                {allCourses.slice(0, 4).map(c => {
                  const cLevelColor = LEVEL_CONFIG[c.level?.toLowerCase()]?.color || '#30919f'
                  const cHasDiscount = c.discountPrice != null && c.discountPrice < c.price
                  const cIsFree = c.price === 0 && !cHasDiscount
                  const thumb = c.mainImageUrl || c.imageUrl || c.images?.[0]
                  return (
                    <Link key={c.id} href={`/curs/${c.slug}`} className="block group">
                      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl xs:rounded-2xl overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/20">
                        <div className="relative aspect-video bg-gradient-to-br from-[#1a4a54] to-[#0d1f23] overflow-hidden">
                          {thumb ? (
                            <Image src={thumb} alt={c.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <BookOpenIcon className="w-10 h-10 text-[#30919f]/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          {c.level && (
                            <span className="absolute top-2 left-2 text-[9px] xs:text-[10px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full" style={{ backgroundColor: cLevelColor }}>
                              {c.level}
                            </span>
                          )}
                        </div>
                        <div className="p-3 xs:p-4">
                          <h3 className="font-bold text-xs xs:text-sm text-[var(--foreground)] mb-1 leading-tight line-clamp-2">{c.title}</h3>
                          {c.descriptionShort && (
                            <p className="text-[10px] xs:text-xs text-[var(--text-muted)] leading-relaxed mb-2 line-clamp-2">{c.descriptionShort}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="font-black text-xs xs:text-sm" style={{ color: cIsFree ? '#10b981' : '#f8b316' }}>
                              {cIsFree ? 'Gratuit' : cHasDiscount ? `${c.discountPrice} MDL` : `${c.price} MDL`}
                            </span>
                            <span className="text-[10px] xs:text-xs font-semibold text-[#30919f] flex items-center gap-0.5">
                              Detalii
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {isLightboxOpen && images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setIsLightboxOpen(false)}>
          <button onClick={() => setIsLightboxOpen(false)} className="cursor-pointer absolute top-2 xs:top-4 right-2 xs:right-4 p-1.5 xs:p-2 text-white/80 hover:text-white transition-colors z-10">
            <XMarkIcon className="w-6 h-6 xs:w-8 xs:h-8" />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-2 xs:m-4" onClick={(e) => e.stopPropagation()}>
            <Image src={images[currentImageIndex]} alt={course.title} fill className="object-contain" />
          </div>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage() }} className="cursor-pointer absolute left-1 xs:left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 xs:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                <ChevronLeftIcon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage() }} className="cursor-pointer absolute right-1 xs:right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 xs:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                <ChevronRightIcon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8" />
              </button>
              <div className="absolute bottom-2 xs:bottom-4 left-1/2 -translate-x-1/2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white/10 rounded-full text-white text-sm xs:text-base">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}

      <EnrollmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={course} />
    </>
  )
}

function FaqSection({ faq }) {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div className="mt-8 xs:mt-10 sm:mt-14 max-w-3xl">
      <p className="text-[10px] xs:text-xs font-bold uppercase tracking-widest text-[#30919f] mb-1">Întrebări frecvente</p>
      <h2 className="text-base xs:text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4 xs:mb-5 sm:mb-6">Ai întrebări?</h2>
      <div className="flex flex-col gap-2 xs:gap-3">
        {faq.map((q, i) => {
          const open = openIdx === i
          return (
            <div key={i} className={`bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-shadow ${open ? 'shadow-lg shadow-black/10' : ''}`}>
              <button onClick={() => setOpenIdx(open ? null : i)} className="w-full px-4 xs:px-5 py-3 xs:py-4 flex items-center justify-between gap-3 text-left">
                <span className="font-bold text-xs xs:text-sm text-[var(--foreground)]">{q.question}</span>
                <span className={`flex-shrink-0 w-6 h-6 xs:w-7 xs:h-7 rounded-full flex items-center justify-center transition-all ${open ? 'bg-[#30919f] text-white' : 'bg-[#30919f]/10 text-[#30919f]'}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
                    <path d={open ? 'M5 12h14' : 'M12 5v14M5 12h14'} />
                  </svg>
                </span>
              </button>
              {open && (
                <div className="px-4 xs:px-5 pb-4 text-[11px] xs:text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap">
                  {q.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
