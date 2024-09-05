import React from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'
import Sliderleft from './Sliderleft'

const Mainlayout = () => {
  return (
    <div>
      <Sliderleft/>
      
    <div><Outlet/></div>
    </div>
  )
}

export default Mainlayout
