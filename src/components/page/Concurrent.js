import axios from 'axios'
import { Suspense, useEffect, useState, useTransition } from 'react'
import { NavBar } from '../Layout/NavBar'
import { Spinner } from '../Spinner'

export const Concurrent = () => {
  const [photos, setPhotos] = useState([])
  const [input, setInput] = useState('') //urgent state update
  const [searchKey, setSearchKey] = useState('') // not urgent state update
  const [isPending, startTransition] = useTransition()

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
    setInput(e.target.value)
    startTransition(() => setSearchKey(e.target.value))
  }

  return (
    <div className="flex flex-col items-center font-mono text-gray-600">
      <NavBar />
      <p
        className={`my-3 text-xl font-bold ${
          isPending ? `text-pink-500` : `text-blue-500`
        }`}
      >
        StartTransition
      </p>
      <input
        type="text"
        className="mb-5 rounded border border-gray-300 px-3 py-1 text-sm"
        value={input}
        onChange={updateHandler}
      />
      <Suspense fallback={<Spinner />}>
        {filteredPhoto.map((photo) => {
          return (
            <div className="center mb-5 flex items-center text-center">
              <p className="text-sm  text-blue-500">{photo.title}</p>
              <img
                className="w-10m-4 h-10"
                src={photo.url}
                alt={photo.titile}
              />
            </div>
          )
        })}
      </Suspense>
    </div>
  )
}
