'use client'
import { useState, useMemo } from 'react'

type Applicant = {
  application_id: number
  status: string | null
  answers: { motivation?: string; availability?: string } | null
  created_at: string
  profiles: { name: string; email: string } | null
}

export function ApplicantTable({ applicants }: { applicants: Applicant[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() =>
    applicants.filter(a =>
      a.profiles?.name.toLowerCase().includes(query.toLowerCase()) ||
      a.profiles?.email.toLowerCase().includes(query.toLowerCase())
    ), [applicants, query])

  function exportToCsv() {
    const headers = ['Name', 'Email', 'Status', 'Availability', 'Motivation']
    const rows = filtered.map(a => [
      a.profiles?.name ?? '',
      a.profiles?.email ?? '',
      a.status ?? '',
      a.answers?.availability ?? '',
      a.answers?.motivation ?? '',
    ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'applicants.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <input placeholder="Search applicants..." value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={exportToCsv}>Export CSV</button>

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Availability</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(a => (
            <tr key={a.application_id}>
              <td style={{ padding: '0.5rem' }}>{a.profiles?.name}</td>
              <td style={{ padding: '0.5rem' }}>{a.profiles?.email}</td>
              <td style={{ padding: '0.5rem' }}>{a.status ?? 'pending'}</td>
              <td style={{ padding: '0.5rem' }}>{a.answers?.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}