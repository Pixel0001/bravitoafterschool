'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import EnrollmentModal from './EnrollmentModal'
import {
  BookOpenIcon,
  UserIcon,
  ClockIcon,
  PlayIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const LEVEL_CONFIG = {
  'începător': { color: '#10b981', label: 'Începător' },
  'incepator': { color: '#10b981', label: 'Începător' },
  'intermediar': { color: '#f59e0b', label: 'Intermediar' },
  'avansat': { color: '#ef4444', label: 'Avansat' }
}

const SKELETON_COUNT = 3

const CourseCardSkeleton = ({ index }) => (
  <div
    className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#1a2e32] to-[#0f1d20]"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div
      className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(48,145,159,0.08), transparent)' }}
    />
    <div className="absolute top-0 left-0 right-0 h-1 bg-[#30919f]/20" />
    <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
      <div className="w-20 h-7 rounded-full bg-white/5 animate-pulse" />
      <div className="w-16 h-7 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '100ms' }} />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="w-24 h-10 rounded-2xl bg-[#f8b316]/10 animate-pulse" />
        <div className="w-16 h-5 rounded-lg bg-white/5 animate-pulse" style={{ animationDelay: '150ms' }} />
      </div>
      <div className="mb-3 space-y-2">
        <div className="w-full h-6 rounded-lg bg-white/10 animate-pulse" style={{ animationDelay: '200ms' }} />
        <div className="w-3/4 h-6 rounded-lg bg-white/10 animate-pulse" style={{ animationDelay: '250ms' }} />
      </div>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-4 rounded bg-white/5 animate-pulse" style={{ animationDelay: '300ms' }} />
        <div className="w-14 h-4 rounded bg-white/5 animate-pulse" style={{ animationDelay: '350ms' }} />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-12 rounded-2xl bg-white/5 animate-pulse" style={{ animationDelay: '400ms' }} />
        <div className="flex-1 h-12 rounded-2xl bg-[#30919f]/20 animate-pulse" style={{ animationDelay: '450ms' }} />
      </div>
    </div>
  </div>
)

const EmptyState = () => (
  <div className="text-center py-20">
    <div className="relative inline-block mb-8">
      <div className="absolute inset-0 bg-[#30919f]/30 blur-3xl rounded-full animate-pulse" />
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#30919f] to-[#136976] flex items-center justify-center">
        <BookOpenIcon className="w-16 h-16 text-white" />
      </div>
    </div>
    <h3 className="text-3xl font-bold mb-4 text-[var(--foreground)]">Cursuri în pregătire</h3>
    <p className="text-[var(--text-muted)] max-w-md mx-auto text-lg">
      Echipa noastră lucrează la programe educaționale captivante.
    </p>
  </div>
)

const CourseCard = ({ course, onEnroll, index }) => {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const levelKey = course.level?.toLowerCase()
  const levelColor = LEVEL_CONFIG[levelKey]?.color || '#30919f'

  const hasAgeRange = course.ageMin || course.ageMax
  const ageText = hasAgeRange
    ? `${course.ageMin || '?'}${course.ageMax ? `-${course.ageMax}` : '+'} ani`
    : null

  const imageUrl = course.mainImageUrl || course.imageUrl

  return (
    <Link
      href={`/curs/${course.slug}`}
      ref={cardRef}
      className="group relative aspect-[4/5] cursor-pointer block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateY(${(mousePosition.x - 50) / 10}deg) rotateX(${-(mousePosition.y - 50) / 10}deg) scale(1.02)`
            : 'perspective(1000px) rotateY(0) rotateX(0) scale(1)'
        }}
      >
        <div className="absolute inset-0 overflow-hidden" data-keep-white="true" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="absolute inset-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={course.title}
                fill
                priority={index < 6}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWE0YTU0Ii8+PC9zdmc+"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a54] via-[#15292e] to-[#0d1f23]">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#30919f]/10 blur-2xl" />
                <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#f8b316]/10 blur-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpenIcon className="w-24 h-24 text-[#30919f]/20" />
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(48,145,159,0.25) 0%, transparent 50%)`
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1214] via-[#0a1214]/60 to-transparent" />

          <div
            className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
            style={{ backgroundColor: levelColor }}
          />

          <div className="absolute top-3 xs:top-5 left-3 xs:left-5 right-3 xs:right-5 flex items-center justify-between">
            {course.level && (
              <span
                className="px-2 xs:px-3 py-1 xs:py-1.5 rounded-full text-[10px] xs:text-xs font-bold uppercase tracking-wide backdrop-blur-md"
                data-level-badge="true"
                style={{
                  backgroundColor: `${levelColor}20`,
                  color: levelColor,
                  border: `1px solid ${levelColor}40`,
                  '--level-color': levelColor
                }}
              >
                {course.level}
              </span>
            )}
            {course.category && (
              <span className="px-2 xs:px-3 py-1 xs:py-1.5 rounded-full text-[10px] xs:text-xs font-medium backdrop-blur-md border border-white/10 text-white/80 bg-white/10 keep-white">
                {course.category}
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-6">
            <div className="mb-2 xs:mb-3 sm:mb-4 flex items-center gap-2 xs:gap-3 flex-wrap">
              {course.discountPrice ? (
                <>
                  <div className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-[#f8b316] rounded-xl xs:rounded-2xl inline-flex items-baseline gap-0.5 xs:gap-1 shadow-lg shadow-[#f8b316]/30" data-price="true">
                    <span className="text-lg xs:text-xl sm:text-2xl font-black text-[#112428]">{course.discountPrice}</span>
                    <span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-[#112428]/70">MDL</span>
                  </div>
                  <div className="px-2 xs:px-3 py-1 xs:py-1.5 bg-white/10 rounded-lg xs:rounded-xl inline-flex items-baseline gap-0.5 xs:gap-1 backdrop-blur-sm">
                    <span className="text-sm xs:text-base sm:text-lg font-medium text-white/50 line-through keep-white">{course.price}</span>
                    <span className="text-[10px] xs:text-xs font-medium text-white/40 keep-white">MDL</span>
                  </div>
                </>
              ) : (
                <div className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-[#f8b316] rounded-xl xs:rounded-2xl inline-flex items-baseline gap-0.5 xs:gap-1 shadow-lg shadow-[#f8b316]/30" data-price="true">
                  <span className="text-lg xs:text-xl sm:text-2xl font-black text-[#112428]">{course.price}</span>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-[#112428]/70">MDL</span>
                </div>
              )}
              {course.lessonsCount && (
                <span className="text-[10px] xs:text-xs sm:text-sm text-white/60 keep-white">• {course.lessonsCount} lecții</span>
              )}
            </div>

            <h3 className="text-base xs:text-lg sm:text-2xl font-bold mb-1 xs:mb-2 leading-tight text-white keep-white">
              {course.title}
            </h3>

            {course.descriptionShort && (
              <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100">
                <p className="text-sm mb-4 line-clamp-2 leading-relaxed text-white/70 keep-white">
                  {course.descriptionShort}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3 sm:mb-5 text-[10px] xs:text-xs sm:text-sm text-white/50 keep-white">
              {ageText && (
                <span className="flex items-center gap-1">
                  <UserIcon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  {ageText}
                </span>
              )}
              {course.duration && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  {course.duration}
                </span>
              )}
            </div>

            <div className="flex gap-1.5 xs:gap-2">
              <span className="flex-1 py-2 xs:py-2.5 sm:py-3 rounded-xl xs:rounded-2xl font-medium xs:font-semibold text-xs xs:text-sm sm:text-base relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 active:scale-[0.98] text-white keep-white text-center cursor-pointer">
                <span className="relative z-10 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 keep-white">
                  <EyeIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 keep-white" />
                  Detalii
                </span>
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onEnroll(course)
                }}
                className="flex-1 py-2 xs:py-2.5 sm:py-3 rounded-xl xs:rounded-2xl font-medium xs:font-semibold text-xs xs:text-sm sm:text-base relative overflow-hidden bg-gradient-to-r from-[#30919f] to-[#136976] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#30919f]/40 active:scale-[0.98] text-white keep-white cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 keep-white">
                  <PlayIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 keep-white" />
                  <span className="hidden xs:inline">Înscrie-te</span>
                  <span className="xs:hidden">Înscrie</span>
                </span>
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }}
                />
              </button>
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              boxShadow: `inset 0 0 60px ${levelColor}15`
            }}
          />
        </div>
      </div>
    </Link>
  )
}

const SectionHeader = () => (
  <div className="text-center mb-20">
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#30919f]" />
      <span className="text-[#30919f] text-sm font-semibold uppercase tracking-[0.3em]">
        Descoperă
      </span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#30919f]" />
    </div>

    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-[var(--foreground)]">
      Cursurile
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f8b316] via-[#ffd700] to-[#f8b316] animate-gradient bg-[length:200%_auto]">
        Noastre
      </span>
    </h2>

    <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
      Programe educaționale create cu pasiune pentru
      <span className="font-medium text-[var(--foreground)]"> dezvoltarea completă </span>
      a copilului tău
    </p>
  </div>
)

export default function CoursesSection({ initialCourses = [] }) {
  const [courses, setCourses] = useState(initialCourses)
  const [loading, setLoading] = useState(initialCourses.length === 0)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (initialCourses.length > 0) return

    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/public/courses')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setCourses(data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleEnroll = useCallback((course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }, [])

  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CourseCardSkeleton key={i} index={i} />
          ))}
        </div>
      )
    }

    if (courses.length === 0) {
      return <EmptyState />
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={handleEnroll}
            index={index}
          />
        ))}
      </div>
    )
  }, [loading, courses, handleEnroll])

  return (
    <>
      <section
        id="cursuri"
        className="relative py-28 md:py-36 bg-[var(--background)] overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#30919f 1px, transparent 1px), linear-gradient(90deg, #30919f 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-4">
          <SectionHeader />
          {renderContent}
        </div>
      </section>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
      />
    </>
  )
}
