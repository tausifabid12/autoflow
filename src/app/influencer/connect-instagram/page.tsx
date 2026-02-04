'use client'


import React, { Suspense } from 'react'
import Main from './(components)/Main'
import Loading from '@/components/shared/Loading'



export default function page() {
    return (
        <Suspense fallback={<Loading />}>
            <Main />
        </Suspense>
    )
}
