import axios from 'axios'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Layout } from './Layout'

export const AutoBatch = () => {
  const [count, setCount] = useState(0)
  const [fetchCount, setFetchCount] = useState(0)
  const [users, setUsers] = useState([])

  const clickHandler = () => {
    setCount((count) => count + 1)
    setFetchCount((fetchCount) => fetchCount + 1)
  }

  return (
    <Layout>
      <p className="my-3 text-xl font-bold text-blue-500">AutoBatch</p>
      <p className="my-5">{fetchCount}</p>
      <button
        className="my-5 rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
        onClick={clickHandler}
      >
        click
      </button>
    </Layout>
  )
}
