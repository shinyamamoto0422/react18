import axios from 'axios'
import { useEffect, useState, useTransition } from 'react'
import { NavBar } from '../Layout/NavBar'
import { VerConcurrent } from '../VerConcurrent'

export const Concurrent = () => {
  const [isApply, setIsApply] = useState(false)
  const [photos, setPhotos] = useState([])
  const [input, setInput] = useState('') //urgent state update
  const [searchKey, setSearchKey] = useState('') // not urgent state update

  // todo: ここにuseTransitionをする
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

    //todo: startTransition ！！！！！！
    startTransition(() => setSearchKey(e.target.value))
  }

  return (
    <div className="flex flex-col items-center font-mono text-gray-600">
      <NavBar />
      <button
        onClick={() => setIsApply(!isApply)}
        className="my-5 rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
      >
        切り替え
      </button>
      <p className="text-sm  text-blue-500">{isApply ? '優先づけ適用' : 'なし'}</p>
      <p className={`my-3 text-xl font-bold ${isPending ? `text-pink-500` : `text-blue-500`}`}>
        StartTransition
      </p>
      <p className="text-sm  text-blue-500">一気に消したら、違いがよりわかります</p>
      {isApply && (
        <input
          type="text"
          className="mb-5 rounded border border-gray-300 px-3 py-1 text-sm"
          value={input}
          onChange={updateHandler}
        />
      )}
      {isApply ? (
        filteredPhoto.map((photo) => {
          return (
            <div key={photo.title} className="center mb-5 flex items-center text-center">
              <p className="text-sm  text-blue-500">{photo?.title}</p>
              <image className="w-10m-4 h-10" src={photo?.url} alt={photo?.titile} />
            </div>
          )
        })
      ) : (
        <VerConcurrent />
      )}
    </div>
  )
}
