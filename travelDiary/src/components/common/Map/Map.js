import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'


delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const Map = ({ 
  locations = [], 
  onLocationAdd, 
  editable = false,
  zoom = 13,
  center = [55.751244, 37.618423] // Москва по умолчанию
}) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])

  
  useEffect(() => {
    if (!mapRef.current) return

    const newMap = L.map(mapRef.current).setView(center, zoom)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap)

    setMap(newMap)

    return () => {
      newMap.remove()
    }
  }, [])

  
  useEffect(() => {
    if (!map || !editable) return

    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng
      const newLocation = {
        name: `Локация ${markers.length + 1}`,
        coordinates: { lat, lng },
        description: ''
      }

      if (onLocationAdd) {
        onLocationAdd(newLocation)
      }
    }

    map.on('click', handleMapClick)

    return () => {
      map.off('click', handleMapClick)
    }
  }, [map, editable, markers.length, onLocationAdd])

  
  useEffect(() => {
    if (!map) return

    
    markers.forEach(marker => marker.removeFrom(map))
    const newMarkers = []

   
    locations.forEach((location, index) => {
      const marker = L.marker([
        location.coordinates.lat, 
        location.coordinates.lng
      ])
        .addTo(map)
        .bindPopup(`
          <b>${location.name}</b><br>
          ${location.description || ''}
        `)

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)

    
    if (locations.length > 0) {
      const latLngs = locations.map(loc => [
        loc.coordinates.lat, 
        loc.coordinates.lng
      ])
      const bounds = L.latLngBounds(latLngs)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [locations, map])

  return <div ref={mapRef} className={styles.mapContainer} />
}

export default Map