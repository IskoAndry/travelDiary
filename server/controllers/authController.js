const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    // Валидация
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Все поля обязательны' })
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Некорректный email' })
    }

    // Проверка на существование пользователя
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' })
    }

    // Создание пользователя
    const user = await User.create({ username, email, password })

    // Генерация токена
    const token = user.generateAuthToken()

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Проверка email и пароля
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' })
    }

    // Поиск пользователя
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Неверные учетные данные' })
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверные учетные данные' })
    }

    // Генерация токена
    const token = user.generateAuthToken()

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (err) {
    next(err)
  }
}

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({
      success: true,
      user
    })
  } catch (err) {
    next(err)
  }
}