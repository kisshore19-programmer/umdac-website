import { createClient } from '@/lib/supabase/server'

/**
 * Validates standard email format and sanitizes whitespace/case.
 * 
 * @param {string} rawEmail - The raw email input.
 * @returns {string} Cleaned, lowercased, and trimmed email address.
 * @throws {Error} If email is missing or malformed.
*/
export async function sanitizeAndValidateEmail(rawEmail: unknown): Promise<string> {
  const email = (rawEmail as string)?.toLowerCase().trim()

  if (!email) {
    throw new Error('Email address is required.')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address.')
  }

  return email
}

/**
 * Validates password strength requirements.
 * Requirements: Minimum 8 characters, at least 1 uppercase letter, at least 1 number.
 * 
 * @param {string} password - The raw password string to validate.
 * @throws {Error} If the password fails any complexity rule.
 */
export async function validatePassword(password: string): Promise<void> {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long.')
  }

  const hasUppercase = /[A-Z]/.test(password)
  if (!hasUppercase) {
    throw new Error('Password must contain at least one uppercase letter (A-Z).')
  }

  const hasNumber = /[0-9]/.test(password)
  if (!hasNumber) {
    throw new Error('Password must contain at least one number (0-9).')
  }
}

/**
 * Validates the academic bounds for year of study and semester.
 *
 * Enforces year constraints (1 to 7 to accommodate standard and extended programs like Medicine)
 * and semester constraints (1 to 8).
 *
 * @param {number | null} year - The user's year of study, or null if unprovided.
 * @param {number | null} semester - The user's current semester, or null if unprovided.
 * @returns {void} Does not return a value if validation succeeds.
 * @throws {Error} If either the year or semester falls outside acceptable academic bounds.
 */
export function validateAcademicInfo(year: number | null, semester: number | null): void {
  if (year !== null) {
    if (year < 1 || year > 7) {
      throw new Error('Year of study must be between 1 and 7.')
    }
  }

  if (semester !== null) {
    if (semester < 1 || semester > 8) {
      throw new Error('Semester must be between 1 and 8.')
    }
  }
}


/**
 * Retrieves the currently logged-in user from the active Supabase session.
 * Safe for use in Server Components and Server Actions.
 *
 * @returns {Promise<import('@supabase/supabase-js').User | null>} The authenticated User object, or `null` if unauthenticated.
 */
export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}