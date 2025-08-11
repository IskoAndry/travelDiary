import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Login from '../components/auth/Login/Login'
import Register from '../components/auth/Register/Register'
import styles from './AuthPage.module.css'

const AuthPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const initialTab = queryParams.get('tab') || 'login'
  const [activeTab, setActiveTab] = useState(initialTab)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    navigate(`?tab=${tab}`, { replace: true })
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Вход
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Регистрация
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  )
}

export default AuthPage