/**
 * Checks if a given value is null, undefined, an empty string, or whitespace-only.
 * Also checks for NaN numbers and empty arrays/objects.
 *
 * @param {unknown} value - The input value of any type to evaluate.
 * @returns {boolean} True if the value is considered empty, false otherwise.
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  if (typeof value === 'number') {
    return isNaN(value)
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}