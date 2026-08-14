'use client'

import { useState } from 'react'
import { signUpAction } from '../actions/auth'

/**
 * Renders the test user sign-up page component.
 * 
 * Manages form state, handles submission to the backend server action, 
 * and displays error messages returned during validation or authentication.
 * 
 * @component
 * @returns {JSX.Element} The rendered sign-up form test component.
 */
export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const formData = new FormData(event.currentTarget)
    const res = await signUpAction(formData)

    if (res && !res.success) {
      setErrorMessage(res.error || 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h1>Sign Up (Backend Test Page)</h1>

      {errorMessage && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '14px',
          }}
        >
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="full_name" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />

        <input name="university" placeholder="University (e.g. Universiti Malaya)" required />
        <input name="faculty" placeholder="Faculty" required />
        <input name="major" placeholder="Major (e.g. Computer Science)" required />

        <input name="year_of_study" type="number" placeholder="Year of Study (e.g. 2)" required />
        <input name="semester" type="number" placeholder="Semester (e.g. 1)" required />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Register Test User'}
        </button>
      </form>
    </div>
  )
}