import prisma from '@/lib/prisma'
import Navbar from '@/components/public/Navbar'
import HeroSection from '@/components/public/HeroSection'
import CoursesSection from '@/components/public/CoursesSection'
import AboutSection from '@/components/public/AboutSection'
import ContactSection from '@/components/public/ContactSection'
import ReviewsSection from '@/components/public/ReviewsSection'
import FAQSection from '@/components/public/FAQSection'
import Footer from '@/components/public/Footer'

export const metadata = {
  title: 'Bravito After School - Cursuri pentru copii în Chișinău',
  description: 'Copilul tău învață Python, dezvoltare web și AI și creează proiecte reale. Grupe mici (max 6 elevi), profesori cu experiență, aplicație gamificată. Prima lecție GRATUITĂ!',
}

// Revalidează pagina la fiecare 60 secunde — modificările din admin (poze, prețuri,
// cursuri noi, recenzii) apar pe homepage fără rebuild.
export const revalidate = 60

export default async function Home() {
  const [dbCourses, dbReviews] = await Promise.all([
    prisma.course.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        descriptionShort: true,
        level: true,
        ageMin: true,
        ageMax: true,
        duration: true,
        lessonsCount: true,
        price: true,
        discountPrice: true,
        seatsTotal: true,
        mainImageUrl: true,
        imageUrl: true,
      },
    }),
    prisma.review.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        authorName: true,
        roleLabel: true,
        rating: true,
        message: true,
        avatarUrl: true,
      },
    }),
  ])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection initialCourses={dbCourses.slice(0, 4)} />
        <CoursesSection initialCourses={dbCourses} />
        <AboutSection />
        <ContactSection />
        <ReviewsSection initialReviews={dbReviews} />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}

