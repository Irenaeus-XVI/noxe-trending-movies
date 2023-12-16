import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import DetectOffline from '../DetectOffline/DetectOffline';
import { Offline } from 'react-detect-offline';
export default function People() {


  const [peoples, setPeoples] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  async function getTrending() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'
      }
    };


    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/day?language=en-US`, options)
    setPeoples(data.results)
    console.log(data);
    setIsLoading(false)
  }


  useEffect(() => {
    getTrending()
  }, [])





  return (
    <>
      <div className="container">
        <div className="row py-3">
          <Offline><DetectOffline /></Offline>

          {isLoading ? <Loading /> : (<div className="row">
            {peoples?.map((person) => <Item data={person} key={person.id} />)}
          </div>)}

        </div>


      </div >
    </>
  )
}
