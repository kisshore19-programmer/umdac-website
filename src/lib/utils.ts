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

export function formatMultiDayRange(startDateStr: string, endDateStr: string): string {
  if (!startDateStr) return 'TBA'
  if (!endDateStr || startDateStr === endDateStr) {
    const d = new Date(startDateStr)
    if (isNaN(d.getTime())) return startDateStr
    return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const start = new Date(startDateStr)
  const end = new Date(endDateStr)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return `${startDateStr} – ${endDateStr}`

  const startDay = start.getDate()
  const endDay = end.getDate()
  const startMonth = start.toLocaleDateString('en-MY', { month: 'short' })
  const endMonth = end.toLocaleDateString('en-MY', { month: 'short' })
  const startYear = start.getFullYear()
  const endYear = end.getFullYear()

  // Same year, same month
  if (startYear === endYear && startMonth === endMonth) {
    // 2 consecutive days: "23 & 24 Feb 2026"
    if (endDay - startDay === 1) {
      return `${startDay} & ${endDay} ${startMonth} ${startYear}`
    }
    // Multiple days: "23 – 25 Feb 2026"
    return `${startDay} – ${endDay} ${startMonth} ${startYear}`
  }

  // Same year, different months
  if (startYear === endYear) {
    return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`
  }

  // Different years
  return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`
}

export function parseEventDateTime(dateString?: string | null, timeLabel?: string | null): { displayDate: string; displayTime: string } {
  let displayDate = 'TBA'
  let displayTime = timeLabel || '10:00 AM - 1:00 PM MYT'

  if (timeLabel && timeLabel.includes(' | ')) {
    const parts = timeLabel.split(' | ')
    displayDate = parts[0].trim()
    displayTime = parts.slice(1).join(' | ').trim() || '10:00 AM - 1:00 PM MYT'
    if (displayDate.toUpperCase() === 'TBA') {
      displayTime = 'TBA'
    }
    return { displayDate, displayTime }
  }

  if (dateString && dateString !== 'TBA' && !dateString.includes('2026-12-31')) {
    try {
      const d = new Date(dateString)
      if (!isNaN(d.getTime())) {
        displayDate = d.toLocaleDateString('en-MY', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      } else {
        displayDate = dateString
      }
    } catch {
      displayDate = dateString
    }
  }

  // If date is TBA (or unset / placeholder), the time must also be TBA
  if (displayDate.toUpperCase() === 'TBA' || (!dateString && (!timeLabel || timeLabel.toUpperCase() === 'TBA'))) {
    displayDate = 'TBA'
    displayTime = 'TBA'
  } else if (timeLabel && timeLabel.toUpperCase() === 'TBA') {
    displayTime = 'TBA'
  }

  return { displayDate, displayTime }
}

/**
 * Parses the notice text to see if an external registration link was embedded using format:
 * "LINK:https://forms.gle/xyz | Original notice text"
 */
export function parseEventNotice(rawNotice?: string | null): { noticeText: string; registrationLink: string | null } {
  if (!rawNotice) {
    return { noticeText: 'Registration details will be announced soon.', registrationLink: null }
  }

  if (rawNotice.startsWith('LINK:')) {
    const separatorIdx = rawNotice.indexOf(' | ')
    if (separatorIdx !== -1) {
      const linkPart = rawNotice.substring(5, separatorIdx).trim()
      const textPart = rawNotice.substring(separatorIdx + 3).trim()
      return { noticeText: textPart, registrationLink: linkPart || null }
    } else {
      const linkPart = rawNotice.substring(5).trim()
      return { noticeText: 'Registration is handled via external form.', registrationLink: linkPart || null }
    }
  }

  // Also check if the notice itself is a raw URL
  if (rawNotice.startsWith('http://') || rawNotice.startsWith('https://')) {
    return { noticeText: 'Registration is handled via external form.', registrationLink: rawNotice.trim() }
  }

  return { noticeText: rawNotice, registrationLink: null }
}

/**
 * Encodes an external link into notice if provided
 */
export function formatEventNotice(noticeText?: string | null, registrationLink?: string | null): string {
  const cleanText = (noticeText || 'Registration details and requirements will be confirmed upon RSVP.').trim()
  const cleanLink = (registrationLink || '').trim()

  if (cleanLink) {
    return `LINK:${cleanLink} | ${cleanText}`
  }
  return cleanText
}