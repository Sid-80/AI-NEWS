"use client"
import { useToast } from '@/components/ui/use-toast';
import { useCheckHealth } from '@/lib/react-query/mutations';
import { logOut } from '@/lib/redux/Auth/auth-slice';
import { RootState } from '@/lib/redux/store'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Page() {
  const isAuth = useSelector((state:RootState)=>state.auth.isAuth);
  const accessToken = useSelector((state:RootState)=>state.auth.accessToken);
  const id = useSelector((state:RootState)=>state.auth.id);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    mutateAsync: checkHealthFn,
    isPending: loadingResponse,
    isSuccess,
    isError,
  } = useCheckHealth();
  const {toast} = useToast()


  if(!isAuth) router.push('/signin')
  
  useEffect(()=>{
    const check = async() => {
      try {
        const res = await checkHealthFn({id,accessToken});
      } catch (err) {
        toast({
          title:"Session expired!",
          description: "Re-login. It's for your safety"
        });
        dispatch(logOut())
        router.push('/signin')
      }
    }
    check()
  },[])

  return (
    <div>page</div>
  )
}