import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({ userData, logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2">
        <div className="container-fluid  ">
          <Link className="navbar-brand" to={'home'}>Noxe</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <li className="nav-item">
                <Link className="nav-link active" to={'home'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'movies'}>Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'tvShows'}>TvShows</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'people'}>People</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'about'}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'network'}>Network</Link>
              </li>


            </ul> : ''}

            <div className='d-flex ms-auto align-items-center' >
              <input type="text" className='form-control me-3' placeholder='Search' />
              <ul className=' list-unstyled d-flex mb-0'>
                <li className='mx-2'>
                  <i className='fab fa-facebook'></i>
                </li>
                <li className='mx-2'>
                  <i className="fa-brands fa-x-twitter"></i>
                </li>
                <li className='mx-2'>
                  <i className="fa-brands fa-spotify"></i>
                </li>
                <li className='mx-2'>
                  <i className="fa-brands fa-instagram"></i>
                </li>
                <li className='mx-2'>
                  <i className="fa-brands fa-youtube"></i>
                </li>
              </ul>


              <ul className="navbar-nav  mb-2 mb-lg-0">

                {userData ? <li className="nav-item">
                  <span className="nav-link" onClick={logOut}>Logout</span>
                </li> : <>
                  <li className="nav-item">
                    <Link className="nav-link active" to={'register'}>Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'login'}>Login</Link>
                  </li>
                </>}





              </ul>
            </div>

          </div>
        </div>
      </nav>

    </>
  )
}
