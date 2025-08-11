/**
 * Форматирование даты
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    ...options
  }
  return new Date(dateString).toLocaleDateString('ru-RU', defaultOptions)
}

/**
 * Форматирование стоимости
 */
export const formatCost = (cost, currency = '₽') => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(cost) + ` ${currency}`
}

/**
 * Форматирование длинного текста с обрезанием
 */
export const formatText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/**
 * Форматирование координат
 */
export const formatCoordinates = (lat, lng, precision = 4) => {
  return `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`
}

/**
 * Форматирование тегов
 */
export const formatTags = (tags) => {
  if (!tags || tags.length === 0) return []
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag)
  }
  return tags
}

/**
 * Форматирование имени пользователя
 */
export const formatUsername = (username) => {
  if (!username) return 'Аноним'
  return `@${username}`
}

/**
 * Форматирование времени для комментариев
 */
export const formatCommentTime = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))

  if (diffInMinutes < 1) return 'только что'
  if (diffInMinutes < 60) return `${diffInMinutes} мин назад`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ч назад`
  
  return formatDate(dateString, { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}