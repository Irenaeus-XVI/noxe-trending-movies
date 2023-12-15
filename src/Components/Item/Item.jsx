import React from 'react'
import axios from 'axios'
export default function Item({ data }) {
    return (
        <>

            <div className="col-md-2 position-relative ">
                <div className="item position-relative overflow-hidden">
                    <img src={'https://image.tmdb.org/t/p/w500/' + data.poster_path} alt="" className='w-100' />
                    <div className="overLay p-2">
                        {data.overview.split(' ').splice(0, 15).join(' ')}
                    </div>
                </div>
                <h4>{data.title?data.title:data.name}</h4>
                <div className="vote bg-info p-2 position-absolute top-0 end-0">
                    {data.vote_average.toFixed(1)}
                </div>
            </div>

        </>
    )
}
