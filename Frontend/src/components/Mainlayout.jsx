import React from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <div>
      sidebar
      
    <div><Outlet/></div>
    </div>
  )
}

export default Mainlayout
