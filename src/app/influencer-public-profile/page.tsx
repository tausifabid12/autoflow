import React from 'react'
import Main from './(components)/Main'
import Loading from '@/components/shared/Loading'
import { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
    <Main/>
    </Suspense>
   
  )
}
