import { BadgeCheckIcon } from '@heroicons/react/solid'
import './App.css'
import { Layout } from './components/Layout/Layout'

function App() {
  return (
    <Layout>
      <p>React18 basic lesson</p>
      <BadgeCheckIcon className="h-12 w-12 text-blue-500" />
    </Layout>
  )
}

export default App
