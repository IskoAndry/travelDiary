import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { validateUser } from '../../../utils/validators'
import styles from './Register.module.css'

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const { register: registerUser, isLoading, error: apiError } = useAuth()

  const onSubmit = async (data) => {
    await registerUser(data)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>
      
      {apiError && <div className={styles.apiError}>{apiError}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            {...register('username', {
              validate: validateUser.username
            })}
            autoComplete="username"
          />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              validate: validateUser.email
            })}
            autoComplete="email"
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              validate: validateUser.password
            })}
            autoComplete="new-password"
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              validate: (value) => validateUser.confirmPassword(value, watch('password'))
            })}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className={styles.loginLink}>
        Уже есть аккаунт? <Link to="/auth?tab=login">Войти</Link>
      </div>
    </div>
  )
}

export default Register