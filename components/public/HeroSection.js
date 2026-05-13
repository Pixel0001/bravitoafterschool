'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CodeBracketIcon,
  CpuChipIcon,
  GlobeAltIcon,
  SparklesIcon,
  CheckBadgeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ArrowRightIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

const FALLBACK_COURSES = [
  { id: 'python', title: 'Python', icon: CodeBracketIcon, color: 'primary' },
  { id: 'web', title: 'Web Dev', icon: GlobeAltIcon, color: 'accent' },
  { id: 'ai', title: 'AI & ML', icon: CpuChipIcon, color: 'primary' },
  { id: 'games', title: 'Jocuri', icon: SparklesIcon, color: 'accent' }
]

const STATS = [
  { value: '500+', label: 'Elevi fericiți' },
  { value: '15+', label: 'Cursuri active' },
  { value: '98%', label: 'Satisfacție' }
]

const BENEFITS = [
  {
    icon: CheckBadgeIcon,
    title: 'Profesori cu experiență',
    description: 'Echipă de programatori și pedagogi pasionați, cu peste 5 ani de experiență în IT.',
    colorClass: 'primary'
  },
  {
    icon: BookOpenIcon,
    title: 'Curriculum modern',
    description: 'Python, Web și AI prin proiecte reale: jocuri, site-uri și aplicații pe care copiii le pot arăta.',
    colorClass: 'accent'
  },
  {
    icon: UserGroupIcon,
    title: 'Grupe mici',
    description: 'Maxim 6 elevi pe grupă, atenție individuală și progres garantat pentru fiecare copil.',
    colorClass: 'primary'
  }
]

const STEPS = [
  { step: '1', title: 'Alege cursul', desc: 'Python, Web Development sau AI — explorează programele potrivite vârstei copilului' },
  { step: '2', title: 'Lecție de probă GRATUITĂ', desc: 'Vino la prima lecție fără niciun cost și vezi cum funcționează' },
  { step: '3', title: 'Înscrie-te', desc: 'Te contactăm pentru detalii despre grupă, program și plată' },
  { step: '4', title: 'Începe aventura', desc: 'Copilul tău participă la cursuri și creează propriile sale proiecte' }
]

const Badge = ({ children, pulse = false }) => (
  <div className="inline-flex items-center px-4 py-2 bg-[#30919f]/10 border border-[#30919f]/20 rounded-full backdrop-blur-sm">
    {pulse && <span className="w-2 h-2 bg-[#f8b316] rounded-full mr-2 animate-pulse" />}
    <span className="text-sm font-medium text-[#30919f]">{children}</span>
  </div>
)

const StatItem = ({ value, label }) => (
  <div className="text-center sm:text-left">
    <div className="text-3xl font-bold stat-value">{value}</div>
    <div className="text-sm text-[#30919f] font-medium">{label}</div>
  </div>
)

const CourseCard = ({ course, index }) => {
  const IconComponent = course.icon
  const isAccent = index % 2 === 0

  return (
    <Link
      href={course.slug ? `/curs/${course.slug}` : '#cursuri'}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {course.imageUrl || course.mainImageUrl ? (
        <Image
          src={course.mainImageUrl || course.imageUrl}
          alt={course.title}
          fill
          priority={index < 4}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWE0YTU0Ii8+PC9zdmc+"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a54] via-[#15292e] to-[#0d1f23]">
          <div className="absolute inset-0 flex items-center justify-center">
            {IconComponent ? (
              <IconComponent className={`w-12 h-12 ${isAccent ? 'text-[#f8b316]/30' : 'text-[#30919f]/30'}`} />
            ) : (
              <BookOpenIcon className={`w-12 h-12 ${isAccent ? 'text-[#f8b316]/30' : 'text-[#30919f]/30'}`} />
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-[#30919f]/0 group-hover:bg-[#30919f]/20 transition-colors duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="font-bold text-white text-sm md:text-base leading-tight truncate">
          {course.title}
        </h4>
        {course.price && (
          <p className="text-[#f8b316] text-xs font-semibold mt-1">
            {course.discountPrice || course.price} MDL
          </p>
        )}
      </div>

      <div className={`absolute top-0 left-0 right-0 h-1 ${isAccent ? 'bg-[#f8b316]' : 'bg-[#30919f]'} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
    </Link>
  )
}

const BenefitCard = ({ benefit }) => {
  const IconComponent = benefit.icon
  const isAccent = benefit.colorClass === 'accent'

  return (
    <div className="hero-card rounded-2xl p-6 border hero-border card-hover group">
      <div className={`w-14 h-14 ${isAccent ? 'bg-[#f8b316]/20' : 'bg-[#30919f]/20'} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className={`w-7 h-7 ${isAccent ? 'text-[#f8b316]' : 'text-[#30919f]'}`} />
      </div>
      <h3 className="text-lg font-semibold hero-text mb-2">{benefit.title}</h3>
      <p className="hero-text-muted leading-relaxed">{benefit.description}</p>
    </div>
  )
}

const StepItem = ({ item, isLast }) => (
  <div className="text-center group relative">
    <div className="w-12 h-12 bg-gradient-to-br from-[#30919f] to-[#136976] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#30919f]/30 transition-all duration-300 relative z-10">
      {item.step}
    </div>
    {!isLast && (
      <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#30919f]/50 to-transparent" />
    )}
    <h3 className="font-semibold hero-text mb-2">{item.title}</h3>
    <p className="text-sm hero-text-muted">{item.desc}</p>
  </div>
)

export default function HeroSection({ initialCourses = [] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [courses, setCourses] = useState(initialCourses)

  useEffect(() => {
    setIsVisible(true)
    if (initialCourses.length > 0) return

    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/public/courses')
        if (res.ok) {
          const data = await res.json()
          setCourses(data.slice(0, 4))
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }
    fetchCourses()
  }, [])

  const displayCourses = courses.length > 0 ? courses : FALLBACK_COURSES

  const scrollToSection = (sectionId) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="hero-section pt-20 min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 hero-bg" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-4 py-20 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold hero-text leading-tight">
              Vino la{' '}
              <span className="text-[#30919f]">Bravito</span>
              <br />
              și devii{' '}
              <span className="text-[#f8b316]">mai bun!</span>
            </h1>

            <p className="text-lg hero-text-muted max-w-lg leading-relaxed">
              La Bravito After School, fiecare copil descoperă bucuria de a învăța prin activități
              creative, cursuri interactive și o comunitate prietenoasă.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('#cursuri')}
                className="cursor-pointer group px-8 py-4 bg-gradient-to-r from-[#30919f] to-[#136976] rounded-xl font-semibold hover:from-[#136976] hover:to-[#0f5460] transition-all duration-300 shadow-lg shadow-[#30919f]/25 hover:shadow-xl hover:shadow-[#30919f]/30 flex items-center justify-center gap-2"
              >
                <span className="keep-white" style={{ color: '#ffffff' }}>Vezi cursurile</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#ffffff' }} />
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="cursor-pointer group px-8 py-4 bg-transparent text-[#f8b316] rounded-xl font-semibold border-2 border-[#f8b316]/30 hover:border-[#f8b316] hover:bg-[#f8b316]/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RocketLaunchIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Înscrie-te acum</span>
              </button>
            </div>

            <div className="flex gap-8 pt-8 border-t border-[#30919f]/20">
              {STATS.map((stat, idx) => (
                <StatItem key={idx} {...stat} />
              ))}
            </div>
          </div>

          {/* Right Content - Course Grid */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#30919f]/20 to-[#136976]/10 rounded-[2rem] blur-xl" />

            <div className="relative bg-[#0c1a1d]/95 backdrop-blur-xl rounded-3xl p-6 border border-[#30919f]/20 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-white keep-white">Cursuri populare</h3>
                <span className="px-3 py-1 bg-[#f8b316]/20 text-[#f8b316] text-xs font-semibold rounded-full">
                  {displayCourses.length} cursuri
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {displayCourses.map((course, idx) => (
                  <CourseCard key={course.id} course={course} index={idx} />
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <Link
                  href="/learn/guest"
                  className="cursor-pointer w-full py-3 bg-gradient-to-r from-[#f8b316] to-[#e5a310] text-[#231f20] rounded-xl font-bold text-sm hover:from-[#e5a310] hover:to-[#d4940d] transition-all shadow-lg hover:shadow-[#f8b316]/30 flex items-center justify-center gap-2"
                >
                  <RocketLaunchIcon className="w-5 h-5" />
                  Deschide aplicația gratuit
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`mt-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold hero-text mb-4">
              De ce să alegi <span className="text-[#f8b316]">Bravito After School</span>?
            </h2>
            <p className="hero-text-muted max-w-2xl mx-auto">
              Singura academie din Chișinău dedicată exclusiv programării pentru copii
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <BenefitCard key={idx} benefit={benefit} />
            ))}
          </div>
        </div>

        {/* How it works */}
        <div id="cum-functioneaza" className={`mt-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold hero-text mb-4">
              Cum funcționează?
            </h2>
            <p className="hero-text-muted max-w-2xl mx-auto">
              În doar 4 pași simpli, copilul tău devine un mic programator
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((item, idx) => (
              <StepItem key={idx} item={item} isLast={idx === STEPS.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
