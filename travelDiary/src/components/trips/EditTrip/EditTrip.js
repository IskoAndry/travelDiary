import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTrips } from '../../../hooks/useTrips'
import Map from '../../common/Map/Map'
import styles from './EditTrip.module.css'

const EditTrip = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentTrip, updateTrip, fetchTripById } = useTrips()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [locations, setLocations] = useState([])
  const [images, setImages] = useState([])
  const [existingImages, setExistingImages] = useState([])

  useEffect(() => {
    fetchTripById(id)
  }, [id, fetchTripById])

  useEffect(() => {
    if (currentTrip) {
      setValue('title', currentTrip.title)
      setValue('description', currentTrip.description)
      setValue('cost', currentTrip.cost)
      setValue('tags', currentTrip.tags.join(', '))
      setLocations(currentTrip.locations)
      setExistingImages(currentTrip.images)
    }
  }, [currentTrip, setValue])

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
    
    images.forEach(image => {
      formData.append('images', image)
    })

    await updateTrip(id, formData)
    navigate(`/trips/${id}`)
  }

  const handleLocationAdd = (location) => {
    setLocations([...locations, location])
  }

  const handleLocationRemove = (index) => {
    setLocations(locations.filter((_, i) => i !== index))
  }

  const handleImageChange = (e) => {
    setImages([...e.target.files])
  }

  const handleImageRemove = (imageUrl) => {
    setExistingImages(existingImages.filter(img => img !== imageUrl))
  }

  if (!currentTrip) return <div className={styles.loading}>Загрузка...</div>

  return (
    <div className={styles.container}>
      <h2>Редактировать путешествие</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Название</label>
          <input
            {...register('title', { required: 'Название обязательно' })}
          />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Описание</label>
          <textarea
            {...register('description', { required: 'Описание обязательно' })}
          />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Бюджет</label>
          <input
            type="number"
            {...register('cost', { required: 'Укажите бюджет' })}
          />
          {errors.cost && <span className={styles.error}>{errors.cost.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Теги (через запятую)</label>
          <input
            {...register('tags')}
            placeholder="пляж, горы, экскурсии"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Добавить фотографии</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className={styles.imagePreview}>
          <label>Текущие фотографии</label>
          <div className={styles.imagesGrid}>
            {existingImages.map((img, index) => (
              <div key={index} className={styles.imageItem}>
                <img src={img} alt={`Preview ${index}`} />
                <button 
                  type="button" 
                  onClick={() => handleImageRemove(img)}
                  className={styles.removeImage}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mapSection}>
          <h3>Локации</h3>
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
                <p>{loc.coordinates.lat.toFixed(4)}, {loc.coordinates.lng.toFixed(4)}</p>
                <button
                  type="button"
                  onClick={() => handleLocationRemove(index)}
                  className={styles.removeLocation}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Сохранить изменения
        </button>
      </form>
    </div>
  )
}

export default EditTrip