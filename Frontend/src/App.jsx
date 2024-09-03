import React from 'react'
import Singup from './components/Singup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'

const App = () => {
  return (
    <div className='w-screen  h-screen '>

<Routes>
  <Route path='/' element={  <Singup/>} />
  <Route path='/login' element={  <Login/>} />
</Routes>
     
      
    </div>
  )
}

export default App
