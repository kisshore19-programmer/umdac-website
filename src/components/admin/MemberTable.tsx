'use client'

import { useState, useMemo } from 'react'
import type { MemberRecord } from '@/lib/supabase/queries/members'

interface Props {
  initialMembers: MemberRecord[]
}

export default function MemberTable({ initialMembers }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return initialMembers
    const term = searchTerm.toLowerCase()
    return initialMembers.filter(
      (m) =>
        m.name?.toLowerCase().includes(term) ||
        m.email?.toLowerCase().includes(term) ||
        m.faculty?.toLowerCase().includes(term) ||
        m.major?.toLowerCase().includes(term) ||
        m.university?.toLowerCase().includes(term)
    )
  }, [initialMembers, searchTerm])

  return (
    <div className="space-y-4">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-600">Total Members:</span>
          <span className="inline-flex items-center justify-center rounded-lg bg-indigo-50 px-2.5 py-1 text-sm font-black text-indigo-700 border border-indigo-200">
            {initialMembers.length}
          </span>
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="Search name, email, major..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border-2 border-slate-900 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition focus:bg-white focus:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto rounded-xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <table className="min-w-full divide-y-2 divide-slate-900 text-sm text-left">
          <thead className="bg-slate-100 text-xs font-black uppercase tracking-wider text-slate-800">
            <tr>
              <th className="px-5 py-3.5">Member Name</th>
              <th className="px-5 py-3.5">Email</th>
              <th className="px-5 py-3.5">University & Faculty</th>
              <th className="px-5 py-3.5">Major</th>
              <th className="px-5 py-3.5">Academic Level</th>
              <th className="px-5 py-3.5">Role</th>
              <th className="px-5 py-3.5">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm font-semibold text-slate-400">
                  {searchTerm ? 'No members match your search criteria.' : 'No members registered yet.'}
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member.user_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900">
                    {member.name || 'Unnamed'}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-medium font-mono text-xs">
                    {member.email}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-800">
                      {member.university ?? 'UM'}
                    </span>
                    {member.faculty && (
                      <span className="text-xs text-slate-500 block font-medium">
                        {member.faculty}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium">
                    {member.major ?? '-'}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-semibold">
                    {member.year_of_study
                      ? `Year ${member.year_of_study}${member.semester ? `, Sem ${member.semester}` : ''}`
                      : '-'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider ${
                        member.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {member.role === 'admin' ? 'Admin' : 'Member'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-500">
                    {member.created_at
                      ? new Date(member.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '-'}
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
