import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
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
import { jwtDecode } from 'jwt-decode'
import Details from './Components/Details/Details'
import Profile from './Components/Profile/Profile'
import { MediaProvider } from './Components/Context/MediaContext'
import { HomeProvider } from './Components/Context/HomeContext'
import { SearchProvider } from './Components/Context/SearchContext'

export default function App() {

  const [userData, setUserData] = useState(null)
  function getUserData() {
    let token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    setUserData(decoded)
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserData()
    }
  }, [])



  function ProtectedRoutes(props) {
    if (localStorage.getItem('token')) {
      return props.children
    } else {
      return <Navigate to={'/login'} />
    }
  }




  function logOut() {
    localStorage.removeItem('token')
    setUserData(null)
    return <Navigate to={'/login'} />
  }
  const routers = createBrowserRouter([{
    path: '', element: <Layout userData={userData} logOut={logOut} />, children: [
      {
        index: true, element:
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
      },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <LogIn saveUser={getUserData} /> },
      {
        path: 'movies', element:
          <ProtectedRoutes>
            <Movies />
          </ProtectedRoutes>
      },
      {
        path: 'tvShows', element:
          <ProtectedRoutes>
            <TvShows />
          </ProtectedRoutes>
      },
      {
        path: 'people', element:
          <ProtectedRoutes>
            <People />
          </ProtectedRoutes>
      },
      {
        path: 'profile', element:
          <ProtectedRoutes>
            <Profile userData={userData} />
          </ProtectedRoutes>
      },
      {
        path: 'network', element:
          <ProtectedRoutes>
            <Network />
          </ProtectedRoutes>
      },
      {
        path: 'about', element:
          <ProtectedRoutes>
            <About />
          </ProtectedRoutes>
      },
      {
        path: 'details/:id/:type', element:
          <ProtectedRoutes>
            <Details />
          </ProtectedRoutes>
      },
      { path: '*', element: <NotFound /> },

    ]
  }])
  return (

    <>
      <HomeProvider>
        <MediaProvider>
          <SearchProvider>
            <RouterProvider router={routers}></RouterProvider>
          </SearchProvider>
        </MediaProvider>
      </HomeProvider>

    </>
  )
}
