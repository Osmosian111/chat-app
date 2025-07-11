import { useRouter } from 'next/navigation'
import React from 'react'
import { FRONTEND_URL } from './config'

const Home = () => {
    const router = useRouter()
    router.push(`${FRONTEND_URL}/home`)
  return (
    <div>Home</div>
  )
}

export default Home