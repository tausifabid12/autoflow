import Loading from '@/components/shared/Loading'
import Main from './(component)/Main'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<Loading/>}>
      <Main />
    </Suspense>
  )
}
