// SearchContext.js
import React, { createContext, useContext, useState } from 'react';
import { useMediaContext } from './MediaContext'; // Adjust the path based on your actual structure
import axios from 'axios';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const { setMediaData, setIsLoading } = useMediaContext();
    const [searchQuery, setSearchQuery] = useState('');
    const searchMedia = async (mediaType, query, page = 1) => {
        try {
            setIsLoading(true);
            // Implement your search logic here
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2NhMTY0YWIwYWI0YTY5ZTQ5NTk4Y2UzNjkxZWY4ZSIsInN1YiI6IjY0MzVlYjkwOWFjNTM1MDA5ZDM3Yzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yJl7Xv--ydm8fJn9K3DkR2Op7DE9FnwVFJa16eB1myU'

                },
            };

            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&include_adult=false&language=en-US&page=${page}`,
                options
            );

            setMediaData(data.results.map((result) => ({ ...result, media_type: mediaType })));
            setIsLoading(false);
            console.log(mediaType, query, data);
        } catch (error) {
            console.error('Error searching media:', error);
            setIsLoading(false);
        }
    };

    return (
        <SearchContext.Provider value={{ searchMedia, searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    return useContext(SearchContext);
};
