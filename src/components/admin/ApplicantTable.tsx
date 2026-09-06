// src/components/admin/ApplicantTable.tsx
'use client'

import type { ApplicantRecord } from '@/lib/supabase/queries/applicants'

interface Props {
  initialApplicants: ApplicantRecord[]
}

export default function ApplicantTable({ initialApplicants }: Props) {
  const getBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800'
      case 'rejected':
        return 'bg-rose-100 text-rose-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-amber-100 text-amber-800'
    }
  }

  return (
    <div className="space-y-4">
      {/* Search & Action Bar Placeholder */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-4 rounded-lg border border-slate-200">
        <div className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-800">{initialApplicants.length}</span> applicants
        </div>
        <div className="text-xs text-slate-400 italic">
          [Filters & CSV Export to be wired here]
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-semibold">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Applicant Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Faculty / Major</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {initialApplicants.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No applicants found.
                </td>
              </tr>
            ) : (
              initialApplicants.map((app) => (
                <tr key={app.application_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    #{app.application_id}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {app.profiles?.name ?? 'Unknown'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {app.profiles?.email ?? '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-800">{app.profiles?.faculty ?? '-'}</span>
                    {app.profiles?.major && (
                      <span className="text-xs text-slate-500 block">({app.profiles.major})</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {app.profiles?.year_of_study ? `Year ${app.profiles.year_of_study}` : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${getBadgeColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}