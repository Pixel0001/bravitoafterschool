import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import BlogDetailPage from '@/components/public/BlogDetailPage'

export const revalidate = 60

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return blogs.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: { title: true, seoTitle: true, excerpt: true, seoDescription: true, coverImage: true }
  })
  if (!blog) return { title: 'Articol negăsit - Bravito After School' }
  const title = (blog.seoTitle || blog.title) + ' | Bravito After School'
  const description = blog.seoDescription || blog.excerpt || 'Articol Bravito After School'
  const url = `https://bravitoafterschool.md/blog/${slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 1200 }] : [],
      type: 'article',
      siteName: 'Bravito After School',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params

  const blog = await prisma.blog.findUnique({ where: { slug } })
  if (!blog || !blog.published) notFound()

  // Fetch recommended in parallel
  const [recommendedCourses, recommendedBlogs] = await Promise.all([
    blog.recommendedCourseIds?.length > 0
      ? prisma.course.findMany({
          where: { id: { in: blog.recommendedCourseIds }, active: true },
          select: { id: true, slug: true, title: true, descriptionShort: true, level: true, price: true, discountPrice: true, mainImageUrl: true, imageUrl: true, images: true }
        })
      : Promise.resolve([]),
    blog.recommendedBlogSlugs?.length > 0
      ? prisma.blog.findMany({
          where: { slug: { in: blog.recommendedBlogSlugs }, published: true },
          select: { id: true, slug: true, title: true, excerpt: true, coverImage: true }
        })
      : prisma.blog.findMany({
          where: { published: true, slug: { not: slug } },
          orderBy: { publishedAt: 'desc' },
          take: 3,
          select: { id: true, slug: true, title: true, excerpt: true, coverImage: true }
        })
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt || '',
    image: blog.coverImage ? [blog.coverImage] : [],
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: { '@type': 'Person', name: blog.authorName || 'Bravito After School' },
    publisher: {
      '@type': 'Organization',
      name: 'Bravito After School',
      logo: { '@type': 'ImageObject', url: 'https://bravitoafterschool.md/bravito.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://bravitoafterschool.md/blog/${slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar forceOpaque />
      <BlogDetailPage blog={blog} recommendedCourses={recommendedCourses} recommendedBlogs={recommendedBlogs} />
      <Footer />
    </>
  )
}
