import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import DetectOffline from '../DetectOffline/DetectOffline';
import { Offline } from 'react-detect-offline';
import { Helmet } from 'react-helmet'
export default function TvShows() {
  const [tvShows, setTvShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pagesList = new Array(10).fill().map((ele, index) => index + 1);

  async function getTrending(page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'
      }
    };

    setIsLoading(true);
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${page || 1}`, options);
    setTvShow(data.results);
    console.log(data);
    setIsLoading(false);
  }

  async function search(e) {
    const inputValue = e.target.value.trim(); // Trim to handle whitespace
    if (inputValue === '') {
      // Call trending API when input is empty
      getTrending();
    } else {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'
        }
      };

      setIsLoading(true);
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${inputValue}&include_adult=false&language=en-US&page=1`, options);
      setTvShow(data.results.map((tvShow) => ({ ...tvShow, media_type: 'tv' })));
      console.log(data.results);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTrending();
  }, []);

  function onPagination(page) {
    console.log(page);
    getTrending(page);
  }

  return (
    <>
      <Helmet>
        <title>TvShows</title>
      </Helmet>
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
          <input onChange={search} type="text" className='form-control  mb-5 bg-dark text-white' placeholder='Search...' />

          {isLoading ? <Loading /> : (<div className="row">
            {tvShows?.map((tvShow) => <Item data={tvShow} key={tvShow.id} />)}
          </div>)}
        </div>
      </div >
    </>
  );
}
