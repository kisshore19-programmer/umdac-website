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

  } catch (err: any) {
    // Catch validation errors thrown by helper functions
    return { success: false, error: err.message || 'An unexpected error occurred.' }
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

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })  

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Invalid email or password.')
    }
    throw new Error(error.message)
  }

  // Check if authenticated user is an admin
  if (data.user) {
    const isAdmin = await isUserAdmin(data.user.id)
    console.log('User ID:', data.user.id)
    console.log('Is Admin?:', isAdmin)
    
    if (isAdmin) {
      redirect('/admin')
    }
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

/**
 * Checks whether a given user ID possesses the 'admin' role.
 *
 * @param {string} userId - The Supabase auth user UUID.
 * @returns {Promise<boolean>} True if the user's role is 'admin', false otherwise.
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    console.error('Supabase Query Error:', error.message)
    return false
  }

  return data.role === 'admin'
}

/**
 * Triggers a password reset email for the specified user account.
 *
 * Sanitizes and validates the recipient's email address and initiates
 * Supabase's email-based password recovery flow with a redirect URL.
 *
 * @param {FormData} formData - The submitted form data containing the target 'email'.
 * @returns {Promise<{ success: boolean }>} Resolves with a success indicator if the email is dispatched.
 * @throws {Error} If email validation fails or Supabase encounters an error issuing the reset link.
 */
export async function requestPasswordResetAction(formData: FormData) {
  const supabase = await createClient()
  const email = await validate.sanitizeAndValidateEmail(formData.get('email'))

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

/**
 * Updates the password for the currently authenticated user session.
 *
 * Validates the new password string and updates the user's credential details
 * via Supabase Auth before automatically redirecting to the login page.
 *
 * @param {FormData} formData - The submitted form data containing the new 'password'.
 * @returns {Promise<never>} Automatically redirects to '/login' upon successful update.
 * @throws {Error} If password validation fails or Supabase fails to update the user account.
 */
export async function updatePasswordAction(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  validate.validatePassword(password)

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/login')
}

