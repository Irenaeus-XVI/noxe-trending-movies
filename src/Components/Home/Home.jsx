import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import axios from 'axios'
import Loading from '../Loading/Loading'
import DetectOffline from '../DetectOffline/DetectOffline'
import { Offline } from 'react-detect-offline'
import { Helmet } from 'react-helmet'
export default function Home() {


  const [movies, setMovies] = useState([])
  const [tvShows, setTvShow] = useState([])
  const [peoples, setPeoples] = useState([])
  const [isLoading, setIsLoading] = useState(true)



  async function getTrending(type, dest) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'
      }
    };

    try {
      let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`, options)
      dest(data.results)
      setIsLoading(false)
      // console.log(data.results, '-------');
    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    getTrending('movie', setMovies)
    getTrending('tv', setTvShow)
    getTrending('person', setPeoples)
  }, [])


  return (
    <>

      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container">
        <Offline><DetectOffline /></Offline>

        {isLoading ? <Loading /> : <>
          <div className="row">
            <div className="col-md-4 ">
              <div className="content  d-flex justify-content-center h-100 flex-column ">
                <h2 className='position-relative'>Trending <br /> Movies <br />To Watch Now</h2>
                <p className=' '>Watch Them Now On Our App</p>
              </div>
            </div>
            {movies?.slice(0, 10).map((movie) => <Item data={movie} key={movie.id} />)}
          </div>



          <div className="row">

            <div className="col-md-4 ">
              <div className="content  d-flex justify-content-center h-100 flex-column ">
                <h2 className='position-relative'>Trending <br /> TV <br />To Watch Now</h2>
                <p className=' '>Watch Them Now On Our App</p>
              </div>
            </div>
            {tvShows?.slice(0, 10).map((tv) => <Item data={tv} key={tv.id} />)}
          </div>


          <div className="row">

            <div className="col-md-4 ">
              <div className="content  d-flex justify-content-center h-100 flex-column ">
                <h2 className='position-relative'>Trending <br /> People  <br />To Watch Now</h2>
                <p className=' '>Watch Them Now On Our App</p>
              </div>
            </div>
            {peoples?.slice(0, 10).map((person) => <Item data={person} key={person.id} />)}
          </div>

        </>}





      </div >
    </>
  )
}
