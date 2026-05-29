/**
 * Format ISO 8601 date string into readable format
 * @param {string} isoDateString - ISO 8601 date string (e.g., "2022-01-08T06:34:18.598Z")
 * @param {string} locale - Language locale ('id', 'en', 'ja', 'zh')
 * @returns {string} Formatted date string
 */
export function formatDate(isoDateString, locale = 'id') {
  const date = new Date(isoDateString)

  // Intl.DateTimeFormat options
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  // Map locale codes to BCP 47 language tags
  const localeMap = {
    id: 'id-ID', // Indonesian
    en: 'en-US', // English
    ja: 'ja-JP', // Japanese
    zh: 'zh-CN', // Chinese Simplified
  }

  const bcp47Locale = localeMap[locale] || 'id-ID'

  try {
    return new Intl.DateTimeFormat(bcp47Locale, options).format(date)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error formatting date:', error)
    return date.toISOString()
  }
}

/**
 * Format ISO 8601 date into "HH:MM" time format
 * @param {string} isoDateString - ISO 8601 date string
 * @returns {string} Time in HH:MM format
 */
export function formatTime(isoDateString) {
  const date = new Date(isoDateString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * Format ISO 8601 date into combined date and time
 * @param {string} isoDateString - ISO 8601 date string
 * @param {string} locale - Language locale ('id', 'en', 'ja', 'zh')
 * @returns {string} Formatted date and time
 */
export function formatDateTime(isoDateString, locale = 'id') {
  const date = formatDate(isoDateString, locale)
  const time = formatTime(isoDateString)
  return `${date} ${time}`
}

/**
 * Format ISO 8601 date into relative time (e.g., "2 days ago")
 * @param {string} isoDateString - ISO 8601 date string
 * @param {string} locale - Language locale ('id', 'en', 'ja', 'zh')
 * @returns {string} Relative time string
 */
export function formatRelativeTime(isoDateString, locale = 'id') {
  const date = new Date(isoDateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  const timeStrings = {
    id: {
      justNow: 'Baru saja',
      minutesAgo: (n) => `${n} menit yang lalu`,
      hoursAgo: (n) => `${n} jam yang lalu`,
      daysAgo: (n) => `${n} hari yang lalu`,
    },
    en: {
      justNow: 'Just now',
      minutesAgo: (n) => `${n} minute${n > 1 ? 's' : ''} ago`,
      hoursAgo: (n) => `${n} hour${n > 1 ? 's' : ''} ago`,
      daysAgo: (n) => `${n} day${n > 1 ? 's' : ''} ago`,
    },
    ja: {
      justNow: 'たった今',
      minutesAgo: (n) => `${n}分前`,
      hoursAgo: (n) => `${n}時間前`,
      daysAgo: (n) => `${n}日前`,
    },
    zh: {
      justNow: '刚刚',
      minutesAgo: (n) => `${n}分钟前`,
      hoursAgo: (n) => `${n}小时前`,
      daysAgo: (n) => `${n}天前`,
    },
  }

  const strings = timeStrings[locale] || timeStrings.id

  if (diffMins < 1) {
    return strings.justNow
  } else if (diffMins < 60) {
    return strings.minutesAgo(diffMins)
  } else if (diffHours < 24) {
    return strings.hoursAgo(diffHours)
  } else {
    return strings.daysAgo(diffDays)
  }
}
