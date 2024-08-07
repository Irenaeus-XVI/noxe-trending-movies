import React, { useEffect } from 'react'
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import DetectOffline from '../DetectOffline/DetectOffline';
import { Offline } from 'react-detect-offline';
import { useMediaContext } from '../Context/MediaContext';
import { useSearchContext } from '../Context/SearchContext';
import { Helmet } from 'react-helmet'

export default function People() {



  const { mediaData, isLoading, fetchMediaData } = useMediaContext();
  const { searchMedia, searchQuery, setSearchQuery } = useSearchContext();
  const pagesList = new Array(10).fill().map((ele, index) => index + 1);



  function onPagination(page) {
    if (searchQuery) {
      // If there is an active search, use searchMedia with the existing query
      searchMedia('person', searchQuery, page);
    } else {
      // Otherwise, use fetchMediaData for trending movies
      fetchMediaData('person', page);
    }
  }

  const search = (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue === '') {
      fetchMediaData('person');
      setSearchQuery('')

    } else {
      setSearchQuery(inputValue)
      searchMedia('person', inputValue);

    }
  };

  useEffect(() => {
    fetchMediaData('person')
  }, [])





  return (
    <>
     <Helmet>
        <title>People</title>
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
          {mediaData.length ? (mediaData.map((movie) => <Item data={movie} key={movie.id} />)) : (<>
              <div className="d-flex justify-content-center align-items-center ">
                <i className="fa-solid fa-ban fa-beat-fade fa-2xl "></i>
                <h2>No Data Found...</h2>
              </div>
            </>)}
          </div>)}

        </div>


      </div >
    </>
  )
}
