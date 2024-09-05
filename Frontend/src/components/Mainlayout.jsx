import React from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'
import Sliderleft from './Sliderleft'

const Mainlayout = () => {
  return (
    <div className='w-full bg-black'>
      <Sliderleft/>
      
    <div><Outlet/></div>
    </div>
  )
}

export default Mainlayout
