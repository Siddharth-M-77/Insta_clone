import React from 'react'
import Singup from './components/Singup'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './components/Login'
import Mainlayout from './components/Mainlayout'
import Home from './components/Home'
import Profile from './components/Profile'

const browserRouter = createBrowserRouter([
  {
    path:"/",
    element:<Mainlayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/profile',
        element:<Profile/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/sign-up',
    element:<Singup/>
  }
])

const App = () => {
  return (
    <div className='w-screen  min-h-screen overflow-hidden'>

    <>
    <RouterProvider router={browserRouter}/>
    </>
     
      
    </div>
  )
}

export default App
