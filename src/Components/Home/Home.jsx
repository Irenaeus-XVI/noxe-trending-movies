import Item from '../Item/Item'
import Loading from '../Loading/Loading'
import DetectOffline from '../DetectOffline/DetectOffline'
import { Offline } from 'react-detect-offline'
import { Helmet } from 'react-helmet'
import { useHomeContext } from '../Context/HomeContext'
export default function Home() {


  const { movies, tvShows, people, isLoading } = useHomeContext()



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
            {people?.slice(0, 10).map((person) => <Item data={person} key={person.id} />)}
          </div>

        </>}





      </div >
    </>
  )
}
