import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../Item/Item';
export default function Movies() {


  const [movies, setMovies] = useState([])


  async function getTrending() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'
      }
    };


    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options)
    setMovies(data.results)
    console.log(data);
  }


  useEffect(() => {
    getTrending()
  }, [])





  return (
    <>


      <div className="container">
        <div className="row">

        
          {movies?.map((movie) => <Item data={movie} key={movie.id} />)}
        </div>




      </div >
    </>
  )
}
