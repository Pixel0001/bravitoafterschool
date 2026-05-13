'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { XMarkIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export default function EnrollmentModal({ isOpen, onClose, course }) {
  const [formData, setFormData] = useState({
    studentName: '',
    studentAge: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    city: '',
    observations: ''
  })
  const [loading, setLoading] = useState(false)

  if (!isOpen || !course) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/public/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          courseId: course.id,
          studentAge: formData.studentAge ? parseInt(formData.studentAge) : null
        })
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Înscrierea a fost trimisă cu succes! Vă vom contacta în curând.')
        setFormData({
          studentName: '',
          studentAge: '',
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          city: '',
          observations: ''
        })
        onClose()
      } else {
        toast.error(data.error || 'A apărut o eroare. Vă rugăm încercați din nou.')
      }
    } catch (error) {
      toast.error('A apărut o eroare. Vă rugăm încercați din nou.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-3" onClick={onClose}>
      <div
        className="bg-[#15292e] rounded-xl xs:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#1e3d44]"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#15292e] border-b border-[#1e3d44] px-4 xs:px-6 py-3 xs:py-4 flex items-center justify-between rounded-t-xl xs:rounded-t-2xl z-10">
          <h2 className="text-lg xs:text-xl font-bold text-white keep-white">Înscriere la curs</h2>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 xs:p-2 hover:bg-[#1e3d44] rounded-lg transition-colors"
            aria-label="Închide"
          >
            <XMarkIcon className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" />
          </button>
        </div>

        <div className="px-4 xs:px-6 py-3 xs:py-4 bg-[#136976]/20 border-b border-[#1e3d44]">
          <div className="flex items-center gap-2 xs:gap-3">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-[#30919f] to-[#136976] rounded-lg xs:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <BookOpenIcon className="w-5 h-5 xs:w-6 xs:h-6 text-white keep-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm xs:text-base text-white keep-white leading-tight">{course.title}</h3>
              <p className="text-xs xs:text-sm text-gray-400">
                <span className="text-[#f8b316] font-medium">{course.discountPrice || course.price} MDL</span>
                {course.lessonsCount ? ` • ${course.lessonsCount} lecții` : ''}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 xs:p-6 space-y-3 xs:space-y-4">
          <div>
            <label className="block text-xs xs:text-sm font-medium text-gray-300 mb-1">
              Nume elev <span className="text-[#f8b316]">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 py-2.5 bg-[#0c1a1d] border border-[#1e3d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#30919f] transition-colors text-sm"
              placeholder="Nume și prenume copil"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 xs:gap-4">
            <div>
              <label className="block text-xs xs:text-sm font-medium text-gray-300 mb-1">
                Vârstă elev
              </label>
              <input
                type="number"
                name="studentAge"
                value={formData.studentAge}
                onChange={handleChange}
                min="6"
                max="18"
                disabled={loading}
                className="w-full px-3 py-2.5 bg-[#0c1a1d] border border-[#1e3d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#30919f] transition-colors text-sm"
                placeholder="ex: 12"
              />
            </div>
            <div>
              <label className="block text-xs xs:text-sm font-medium text-gray-300 mb-1">
                Oraș
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2.5 bg-[#0c1a1d] border border-[#1e3d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#30919f] transition-colors text-sm"
                placeholder="Chișinău"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs xs:text-sm font-medium text-gray-300 mb-1">
              Nume părinte <span className="text-[#f8b316]">*</span>
            </label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 py-2.5 bg-[#0c1a1d] border border-[#1e3d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#30919f] transition-colors text-sm"
              placeholder="Nume și prenume părinte"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
            <div>
              <label className="block text-xs xs:text-sm font-medium text-gray-300 mb-1">
                Telefon <span className="text-[#f8b316]">*</span>
              </label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-3 py-2.5 bg-[#0c1a1d] border border-[#1e3d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#30919f] transition-colors text-sm"
                placeholder="+373 XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-xs xs:text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2.5 bg-[#0c1a1d] border border-[#1e3d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#30919f] transition-colors text-sm"
                placeholder="email@exemplu.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs xs:text-sm font-medium text-gray-300 mb-1">
              Observații
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              rows={3}
              disabled={loading}
              className="w-full px-3 py-2.5 bg-[#0c1a1d] border border-[#1e3d44] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#30919f] transition-colors text-sm resize-none"
              placeholder="Mesaj opțional..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-3 bg-gradient-to-r from-[#f8b316] to-[#e5a310] text-[#231f20] rounded-xl font-bold text-sm xs:text-base hover:shadow-lg hover:shadow-[#f8b316]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Se trimite...' : 'Trimite înscrierea'}
          </button>

          <p className="text-center text-xs text-gray-500">
            Prin înscriere accepți{' '}
            <a href="/gdpr" className="text-[#30919f] hover:underline">politica de confidențialitate</a>.
          </p>
        </form>
      </div>
    </div>
  )
}
