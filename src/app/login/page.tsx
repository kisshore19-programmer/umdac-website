'use client'

import { useState } from 'react'
import { loginAction } from '@/app/actions/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    // Catches and displays all backend edge case errors
    try {
      await loginAction(formData)
    } catch (err: any) {
      
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>Login (Backend Test)</h1>

      {error && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label>Email:</label>
          <input 
            name="email" 
            type="email" 
            placeholder="student@um.edu.my" 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px', marginTop: '8px' }}>
          {loading ? 'Authenticating...' : 'Login'}
        </button>
      </form>
    </div>
  )
}