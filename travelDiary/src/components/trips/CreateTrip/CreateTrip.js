import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNewTrip } from '../../../store/slices/tripsSlice'
import Map from '../../common/Map/Map'
import styles from './CreateTrip.module.css'

const CreateTrip = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.trips)
  const { token } = useSelector((state) => state.auth)
  const [locations, setLocations] = useState([])
  const [images, setImages] = useState([])

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('cost', data.cost)
    formData.append('tags', data.tags)
    locations.forEach((loc, index) => {
      formData.append(`locations[${index}][name]`, loc.name)
      formData.append(`locations[${index}][coordinates][lat]`, loc.coordinates.lat)
      formData.append(`locations[${index}][coordinates][lng]`, loc.coordinates.lng)
      formData.append(`locations[${index}][description]`, loc.description)
    })
    images.forEach((image) => {
      formData.append('images', image)
    })

    const result = await dispatch(createNewTrip(formData))
    if (result.payload) {
      navigate(`/trips/${result.payload._id}`)
    }
  }

  const handleLocationAdd = (location) => {
    setLocations([...locations, location])
  }

  const handleImageChange = (e) => {
    setImages([...e.target.files])
  }

  return (
    <div className={styles.container}>
      <h2>Создать новое путешествие</h2>
      {error && <p className={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Название</label>
          <input
            {...register('title', { required: 'Название обязательно' })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Описание</label>
          <textarea
            {...register('description', { required: 'Описание обязательно' })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Бюджет</label>
          <input
            type="number"
            {...register('cost', { required: 'Укажите бюджет' })}
          />
          {errors.cost && <span>{errors.cost.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Теги (через запятую)</label>
          <input
            {...register('tags')}
            placeholder="пляж, горы, экскурсии"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Фотографии</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className={styles.mapSection}>
          <h3>Добавьте локации</h3>
          <Map 
            onLocationAdd={handleLocationAdd} 
            locations={locations}
            editable
          />
          <div className={styles.locationsList}>
            {locations.map((loc, index) => (
              <div key={index} className={styles.locationItem}>
                <h4>{loc.name}</h4>
                <p>{loc.description}</p>
                <p>{loc.coordinates.lat}, {loc.coordinates.lng}</p>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать путешествие'}
        </button>
      </form>
    </div>
  )
}

export default CreateTrip