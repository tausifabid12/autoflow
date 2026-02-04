import Loading from '@/components/shared/Loading'

import React, { Suspense } from 'react'
import Main from './(component)/Main'

export default function page() {
  return (
    <Suspense fallback={<Loading/>}>
      <Main />
    </Suspense>
  )
}
