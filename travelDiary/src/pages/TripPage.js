import React from 'react'
import { useParams } from 'react-router-dom'
import TripDetails from '../components/trips/TripDetails/TripDetails'
import Layout from '../components/layout/Layout'
import styles from './TripPage.module.css'

const TripPage = () => {
  const { id } = useParams()

  return (
    <Layout>
      <div className={styles.tripPage}>
        <TripDetails tripId={id} />
      </div>
    </Layout>
  )
}

export default TripPage