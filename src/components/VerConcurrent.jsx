import axios from 'axios'
import { memo, useEffect, useState } from 'react'

export const VerConcurrent = memo(() => {
  const [photos, setPhotos] = useState([])
  const [searchKey, setSearchKey] = useState('') // not urgent state update

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios('https://jsonplaceholder.typicode.com/photos')
      setPhotos(res.data)
    }
    fetchData()
  }, [])

  const filteredPhoto = photos.filter((photo) => {
    return photo.title.includes(searchKey)
  })

  const updateHandler = (e) => {
    setSearchKey(e.target.value)
  }

  return (
    <div className="flex flex-col items-center font-mono text-gray-600">
      <input
        type="text"
        className="mb-5 rounded border border-gray-300 px-3 py-1 text-sm"
        value={searchKey}
        onChange={updateHandler}
      />
      {filteredPhoto.map((photo) => {
        return (
          <div key={photo.title} className="center mb-5 flex items-center text-center">
            <p className="text-sm  text-blue-500">{photo?.title}</p>
            <img className="w-10m-4 h-10" src={photo?.url} alt={photo?.titile} />
          </div>
        )
      })}
    </div>
  )
})
