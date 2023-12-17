// MediaContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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
        getTrending('tv', setTvShows)
        getTrending('person', setPeople)
    }, [])


    return (
        <HomeContext.Provider value={{ movies, tvShows, people, isLoading }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHomeContext = () => {
    return useContext(HomeContext);
};
