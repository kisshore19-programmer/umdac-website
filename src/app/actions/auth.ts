// src/app/actions/auth.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import * as validate from '@/lib/validation/auth-validator'
import * as utils from '@/lib/utils'


/**
 * Handles student registration by validating user input and creating a new Supabase Auth account.
 * Passes extra metadata (name, university, faculty, major, year, semester) to be synced with public profiles.
 *
 * @param {FormData} formData - The raw form data containing sign-up fields.
 * @throws {Error} If required fields are missing, validation fails, or Supabase Auth returns an error.
 * @returns {Promise<never>} Redirects to the login page upon successful account creation.
 */
type ActionResponse = {
  success: boolean
  error?: string
}

export async function signUpAction(formData: FormData): Promise<ActionResponse> {
  try {
    const supabase = await createClient()

    // Validate Email
    const email = await validate.sanitizeAndValidateEmail(formData.get('email'))
    
    // Validate Password Complexity
    const password = formData.get('password') as string
    await validate.validatePassword(password)


    // Metadata extraction and validations
    const fullName = (formData.get('full_name') as string)?.trim()
    if (utils.isEmpty(fullName)) {
      throw new Error('Please enter your full name')
    }

    const university = (formData.get('university') as string)?.trim()
    if(utils.isEmpty(university)) {
      throw new Error('Please enter your university name!')
    }

    const faculty = (formData.get('faculty') as string)?.trim()
    if (utils.isEmpty(faculty)) {
      throw new Error('Please enter your faculty name!')
    }

    const major = (formData.get('major') as string)?.trim()
    if (utils.isEmpty(major)) {
      throw new Error('Please enter your academic major!')
    }

    const rawYear = formData.get('year_of_study')
    const rawSemester = formData.get('semester')
    
    const yearOfStudy = rawYear ? parseInt(rawYear as string, 10) : null
    if (utils.isEmpty(yearOfStudy)) {
      throw new Error('Please enter your current academic year!')
    }

    const semester = rawSemester ? parseInt(rawSemester as string, 10) : null
    if (utils.isEmpty(semester)) {
      throw new Error('Please enter your current semester!')
    }

    validate.validateAcademicInfo(yearOfStudy, semester)


    
    // Supabase Sign Up Call
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

    if (error) {
      return { success: false, error: error.message }
    }

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
    return { success: false, error: message }
  }

  redirect('/login')
}

/**
 * Handles user login authentication via Supabase.
 *
 * Sanitizes and validates input credentials, executes the sign-in request,
 * and redirects the user upon successful authentication.
 *
 * @param {FormData} formData - The submitted form data containing the user's email and password.
 * @returns {Promise<never>} Automatically redirects to '/home' on success and does not return a direct value.
 * @throws {Error} If email or password validation fails, or if Supabase authentication fails.
 */
export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  const email = await validate.sanitizeAndValidateEmail(formData.get('email'))

  const password = formData.get('password') as string
  validate.validatePassword(password)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })  

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Invalid email or password.')
    }
    throw new Error(error.message)
  }

  redirect('/home')
}

/**
 * Signs out the currently authenticated user by revoking their session cookies.
 *
 * @returns {Promise<never>} Redirects to the login page after signing out.
 */
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

