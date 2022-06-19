import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Layout } from '../Layout/Layout'
import { Spinner } from '../Spinner'
import { FetchUsers } from '../FetchUsers'
import { FetchTasks } from '../FetchTasks'
import { FetchComments } from '../FetchComments'

export const SuspenseDemo = () => {
  return (
    <Layout>
      <p className="my-3 text-xl font-bold text-blue-500">Suspense Demo</p>
      <ErrorBoundary fallback={<ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />}>
        <Suspense fallback={<Spinner />}>
          <FetchUsers />
          <FetchTasks />
          <FetchComments />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
