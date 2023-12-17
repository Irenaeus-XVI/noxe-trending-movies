import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet'
export default function Details() {
    const { id, type } = useParams();
    const [details, setDetails] = useState({});
    const basePath = 'https://image.tmdb.org/t/p/w500/';

    async function getDetails() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'
                }
            };

            const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options);
            setDetails(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    const getImageUrl = () => {
        return type === 'person' ? basePath + details?.profile_path : basePath + details?.poster_path;
    };

    return (
        <>
            <Helmet>
                <title className=' text-uppercase'>{`${details.name ? details.name : details.title} | ${type} DETAILS`}</title>
            </Helmet>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-3">
                        <img src={getImageUrl()} alt="" className="w-100" />
                    </div>

                    <div className="col-md-9">
                        {type === 'movie' || type === 'tv' ? (
                            <>
                                <h1>{details?.title}
                                    {details?.name} {details?.imdb_id && (

                                        <a href={`https://www.imdb.com/title/${details.imdb_id}/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_The%2520Family%2520Plan`} target="_blank" rel="noopener noreferrer" className=' text-info'>
                                            <i className="fa-brands fa-imdb "> </i>
                                        </a>


                                    )}</h1>

                                <p>{details?.tagline}</p>
                                <ul className="list-unstyled d-flex">
                                    {details?.genres?.map((genre) => (
                                        <div className="bg-info p-1 mx-2 rounded-2" key={genre.id}>
                                            {genre.name}
                                        </div>
                                    ))}
                                </ul>

                                {details?.release_date ? 'Release Date: ' + details?.release_date : ''}

                                <p>Vote Count: {details?.vote_count}</p>
                            </>
                        ) : type === 'person' ? (
                            <>
                                <h1>{details?.name}  {details?.imdb_id && (

                                    <a href={`https://www.imdb.com/name/${details.imdb_id}/?ref_=fn_al_nm_1`} target="_blank" rel="noopener noreferrer" className=' text-info'>
                                        <i className="fa-brands fa-imdb "> </i>
                                    </a>


                                )}</h1>

                                <p>Birthday: {details?.birthday}</p>

                            </>
                        ) : null}



                        <p>Popularity: {details?.popularity}</p>

                        <p className="fw-bold">{details?.overview}</p>
                        <p className="fw-bold">{details?.biography}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
