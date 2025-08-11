import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import styles from './Header.module.css'

const Header = () => {
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🌍</span>
          <span className={styles.logoText}>Travel Diary</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                Главная
              </Link>
            </li>
            {user && (
              <li className={styles.navItem}>
                <Link to="/profile" className={styles.navLink}>
                  Мой профиль
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.authSection}>
          {token ? (
            <div className={styles.userControls}>
              <span className={styles.username}>{user?.username}</span>
              <button onClick={handleLogout} className={styles.authButton}>
                Выйти
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/auth?tab=login" className={styles.authButton}>
                Вход
              </Link>
              <Link 
                to="/auth?tab=register" 
                className={`${styles.authButton} ${styles.registerButton}`}
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header