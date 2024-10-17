"use client"

import { LoaderIcon } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <LoaderIcon className='size-8 animate-spin'/>
    </div>
  )
}

export default LoadingPage