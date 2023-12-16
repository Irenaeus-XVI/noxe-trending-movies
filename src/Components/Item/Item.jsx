import React from 'react';
import { Link } from 'react-router-dom';

export default function Item({ data }) {
    const knownForTitle = data.known_for && data.known_for.length > 0 ? data.known_for[0].original_title : '';
    const basePath = 'https://image.tmdb.org/t/p/w500/';
    const imageUrl =
        data.media_type === 'movie' || data.media_type === 'tv'
            ? basePath + data.poster_path
            : data.media_type === 'person'
                ? basePath + data.profile_path
                : '';

    const title = data.title || data.name;
    const rating = data.vote_average || data.popularity;

    return (
        <div className="col-md-2 position-relative">
            <div className="item position-relative overflow-hidden">
                <img src={imageUrl} alt="" className="w-100" />
                <Link to={`/details/${data.id}/${data.media_type}`}>
                    <div className="overLay p-2 text-white">
                        {data.overview?.split(' ').splice(0, 15).join(' ')}
                        {knownForTitle && (
                            <>
                                <h4 className='text-info'>Known For</h4>
                                {knownForTitle}
                            </>
                        )}
                    </div>
                </Link>
            </div>
            <h4>{title}</h4>
            <div className="vote bg-info p-2 position-absolute top-0 end-0">
                {rating?.toFixed(1)}
            </div>
        </div>
    );
}
