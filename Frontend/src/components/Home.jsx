import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import Rightsidebar from './Rightsidebar'

const Home = () => {
  return (
    <div className='flex bg-sky-500 overflow-x-hidden w-full'>
    <div className='flex-grow'>
      <Feed/>
      <Outlet/>
    </div>
    <Rightsidebar/>
    </div>
  )
}

export default Home
