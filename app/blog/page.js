import prisma from '@/lib/prisma'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import BlogListPage from '@/components/public/BlogListPage'

export const revalidate = 60

export const metadata = {
  title: 'Blog - Bravito After School',
  description: 'Articole, sfaturi și resurse pentru părinții copiilor din clasele primare.',
  openGraph: {
    title: 'Blog - Bravito After School',
    description: 'Articole, sfaturi și resurse pentru părinții copiilor din clasele primare.',
  },
}

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true, slug: true, title: true, excerpt: true, coverImage: true,
      category: true, publishedAt: true, readMinutes: true, authorName: true
    }
  })

  return (
    <>
      <Navbar forceOpaque />
      <BlogListPage blogs={blogs} />
      <Footer />
    </>
  )
}
