// src/app/actions/auth.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUpAction(formData: FormData) {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const fullName = (formData.get('full_name') as string)?.trim()
  const university = (formData.get('university') as string)?.trim()
  const faculty = (formData.get('faculty') as string)?.trim()
  const major = (formData.get('major') as string)?.trim()
  
  const rawYear = formData.get('year_of_study')
  const rawSemester = formData.get('semester')

  // 1. Input Validation - Throw errors immediately if invalid
  if (!email || !password || !fullName) {
    throw new Error('Please fill in all required fields.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }

  // Safe integer parsing
  const yearOfStudy = rawYear ? parseInt(rawYear as string, 10) : null
  const semester = rawSemester ? parseInt(rawSemester as string, 10) : null

  // 2. Call Supabase Auth API
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        university: university || null,
        faculty: faculty || null,
        major: major || null,
        year_of_study: isNaN(yearOfStudy!) ? null : yearOfStudy,
        semester: isNaN(semester!) ? null : semester,
      },
    },
  })

  // 3. Throw Supabase API error (e.g. duplicate email, invalid domain)
  if (error) {
    throw new Error(error.message)
  }

  // 4. Redirect on success
  // (Next.js redirect throws its own internal exception to handle navigation)
  redirect('/login?message=Registration successful! Please check your email.')
}