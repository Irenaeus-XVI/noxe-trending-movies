// MediaContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
    const [mediaData, setMediaData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMediaData = async (mediaType = 'all', page = 1) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'

                },
            };

            setIsLoading(true);
            const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US&page=${page}`, options);
            setMediaData(data.results);
            setIsLoading(false);
            console.log(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMediaData();
    }, []);

    return (
        <MediaContext.Provider value={{ mediaData, isLoading,setIsLoading,setMediaData, fetchMediaData }}>
            {children}
        </MediaContext.Provider>
    );
};

export const useMediaContext = () => {
    return useContext(MediaContext);
};
