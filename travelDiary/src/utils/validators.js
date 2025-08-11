/**
 * Валидация данных пользователя
 */
export const validateUser = {
  username: (value) => {
    if (!value) return 'Имя пользователя обязательно'
    if (value.length < 3) return 'Минимум 3 символа'
    if (value.length > 20) return 'Максимум 20 символов'
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Только буквы, цифры и подчеркивание'
    }
    return null
  },

  email: (value) => {
    if (!value) return 'Email обязателен'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Некорректный email'
    }
    return null
  },

  password: (value) => {
    if (!value) return 'Пароль обязателен'
    if (value.length < 6) return 'Минимум 6 символов'
    if (!/[A-Z]/.test(value)) return 'Должна быть хотя бы одна заглавная буква'
    if (!/[0-9]/.test(value)) return 'Должна быть хотя бы одна цифра'
    return null
  },

  confirmPassword: (value, allValues) => {
    if (value !== allValues.password) return 'Пароли не совпадают'
    return null
  }
}

/**
 * Валидация данных поездки
 */
export const validateTrip = {
  title: (value) => {
    if (!value) return 'Название обязательно'
    if (value.length < 5) return 'Минимум 5 символов'
    if (value.length > 100) return 'Максимум 100 символов'
    return null
  },

  description: (value) => {
    if (!value) return 'Описание обязательно'
    if (value.length < 20) return 'Минимум 20 символов'
    if (value.length > 2000) return 'Максимум 2000 символов'
    return null
  },

  cost: (value) => {
    if (!value) return 'Укажите бюджет'
    if (isNaN(value)) return 'Должно быть числом'
    if (value < 0) return 'Не может быть отрицательным'
    if (value > 1000000) return 'Максимум 1 000 000'
    return null
  },

  locations: (value) => {
    if (!value || value.length === 0) return 'Добавьте хотя бы одну локацию'
    return null
  },

  images: (value) => {
    if (!value || value.length === 0) return 'Добавьте хотя бы одно фото'
    if (value.length > 10) return 'Максимум 10 фото'
    return null
  }
}

/**
 * Валидация комментариев
 */
export const validateComment = {
  text: (value) => {
    if (!value) return 'Комментарий не может быть пустым'
    if (value.length < 5) return 'Минимум 5 символов'
    if (value.length > 500) return 'Максимум 500 символов'
    return null
  }
}

/**
 * Общая функция валидации формы
 */
export const validateForm = (values, validators) => {
  const errors = {}
  Object.keys(validators).forEach((key) => {
    const error = validators[key](values[key], values)
    if (error) {
      errors[key] = error
    }
  })
  return errors
}