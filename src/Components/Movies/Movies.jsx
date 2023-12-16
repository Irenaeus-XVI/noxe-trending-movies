import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import DetectOffline from '../DetectOffline/DetectOffline';
import { Offline } from 'react-detect-offline';
export default function Movies() {


  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const pagesList = new Array(10).fill().map((ele, index) => index + 1)

  async function getTrending(page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'
      }
    };

    setIsLoading(true)
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page || 1}`, options)
    setMovies(data.results)
    console.log(data);
    setIsLoading(false)
  }


  useEffect(() => {
    getTrending()
  }, [])


  function onPagination(page) {
    console.log(page);
    getTrending(page)
  }



  return (
    <>

      <div className="container">
        <div className="row py-3">
          <Offline><DetectOffline /></Offline>
          <nav aria-label="Page navigation example" className='d-flex justify-content-center'>
            <ul className="pagination mx-auto">
              {pagesList.map((ele) => (
                <li className="page-item " key={ele} onClick={() => onPagination(ele)}>
                  <span className="page-link" >{ele}</span>
                </li>
              ))}

            </ul>
          </nav>
          {isLoading ? <Loading /> : (<div className="row">
            {movies?.map((movie) => <Item data={movie} key={movie.id} />)}
          </div>)}

        </div>


      </div >
    </>
  )
}
