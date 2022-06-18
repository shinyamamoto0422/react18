import axios from 'axios'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Layout } from '../Layout/Layout'

export const AutoBatch = () => {
  console.log('renderd')
  const [count, setCount] = useState(0)
  const [fetchCount, setFetchCount] = useState(0)
  const [users, setUsers] = useState([])

  // // React17でもバッチングされる
  // const clickHandler = () => {
  //   setCount((count) => count + 1)
  //   setFetchCount((fetchCount) => fetchCount + 1)
  // }

  // React18
  const clickHandler = () => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      flushSync(() => {
        setUsers(res.data)
      })
      setFetchCount((fetchCount) => fetchCount + 1)
    })
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
