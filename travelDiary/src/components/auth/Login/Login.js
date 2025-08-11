import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../../api/auth'
import { loginSuccess, loginFailure } from '../../../store/slices/authSlice'
import styles from './Login.module.css'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    try {
      dispatch(loginStart())
      const userData = await login(data)
      dispatch(loginSuccess(userData))
    } catch (err) {
      dispatch(loginFailure(err.message))
      setError(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Вход</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email обязателен' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Пароль</label>
          <input
            type="password"
            {...register('password', { required: 'Пароль обязателен' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login