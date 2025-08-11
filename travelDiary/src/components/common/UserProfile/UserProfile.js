import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../api/auth'
import styles from './UserProfile.module.css'

const UserProfile = ({ user, editable }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    avatar: user.avatar || ''
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateUser(formData))
      setIsEditing(false)
    } catch (error) {
      console.error('Ошибка обновления:', error)
    }
  }

  return (
    <div className={styles.profile}>
      <div className={styles.avatarContainer}>
        <img 
          src={formData.avatar || '/default-avatar.png'} 
          alt={formData.username} 
          className={styles.avatar}
        />
        {isEditing && (
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="URL аватара"
          />
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Имя пользователя</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.info}>
          <h2>{formData.username}</h2>
          <p>{formData.email}</p>
          {editable && (
            <button 
              onClick={() => setIsEditing(true)} 
              className={styles.editButton}
            >
              Редактировать профиль
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default UserProfile