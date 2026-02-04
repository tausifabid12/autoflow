import React, { Suspense } from 'react'
import Main from './Main'
import Loading from '@/components/shared/Loading'

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  )
}
