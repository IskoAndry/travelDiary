import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Travel Diary</h3>
            <p className={styles.footerText}>
              Делитесь своими путешествиями и вдохновляйтесь историями других.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Навигация</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/" className={styles.footerLink}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/auth" className={styles.footerLink}>
                  Вход/Регистрация
                </Link>
              </li>
              <li>
                <Link to="/profile" className={styles.footerLink}>
                  Профиль
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Контакты</h3>
            <ul className={styles.footerContacts}>
              <li>Email: contact@traveldiary.com</li>
              <li>Телефон: +7 (123) 456-7890</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Travel Diary. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer