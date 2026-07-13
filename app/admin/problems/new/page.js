export const dynamic = 'force-dynamic'

import prisma from '@/lib/prisma'
import PermissionGuard from '@/components/admin/PermissionGuard'
import ProblemForm from '@/components/admin/ProblemForm'
import Link from 'next/link'

export default async function NewProblemPage({ searchParams }) {
  return (
    <PermissionGuard permission="problems.create">
      <Content searchParams={searchParams} />
    </PermissionGuard>
  )
}

async function Content({ searchParams }) {
  const sp = await searchParams
  const backUrl = sp?.back ? decodeURIComponent(sp.back) : '/admin/problems'
  const lessonId = sp?.lessonId || null
  const courses = await prisma.course.findMany({ orderBy: { title: 'asc' }, select: { id: true, title: true } })
  return (
    <div className="space-y-4">
      <Link href={backUrl} className="text-indigo-600 hover:underline text-sm">← Înapoi</Link>
      <h1 className="text-2xl font-bold text-gray-900">+ Adaugă problemă</h1>
      <ProblemForm courses={courses} backUrl={backUrl} lessonId={lessonId} />
    </div>
  )
}
