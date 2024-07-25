"use client"
import { RootState } from '@/lib/redux/store'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const isAuth = useSelector((state:RootState)=>state.auth.isAuth);
  const router = useRouter();

  if(!isAuth) router.push('/signin')

  return (
    <div>page</div>
  )
}