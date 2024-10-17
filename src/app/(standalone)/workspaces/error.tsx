"use client"

import { AlertTriangle } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Errorpage = () => {
  return (
    <div className='h-screen flex flex-col  gap-y-3 items-center justify-center'>
        <AlertTriangle className='size-8'/>
        <p>Something Went Wrong</p>
        <Button variant={'secondary'} size={"sm"}>
          <Link href={"/"}>
          Back to home
          </Link>
        </Button>
    </div>
  )
}

export default Errorpage