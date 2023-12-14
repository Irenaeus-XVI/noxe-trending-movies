import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import LogIn from './Components/LogIn/LogIn'
import Movies from './Components/Movies/Movies'
import TvShows from './Components/TvShows/TvShows'
import People from './Components/People/People'
import Network from './Components/Network/Network'
import About from './Components/About/About'
import NotFound from './Components/NotFound/NotFound'

export default function App() {


  const routers = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { path: 'home', element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <LogIn /> },
      { path: 'movies', element: <Movies /> },
      { path: 'tvShows', element: <TvShows /> },
      { path: 'people', element: <People /> },
      { path: 'network', element: <Network /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },

    ]
  }])
  return (

    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  )
}
