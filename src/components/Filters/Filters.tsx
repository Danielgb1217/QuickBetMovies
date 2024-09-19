"use client";
import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';
import Image from 'next/image';

//*********************************************DESCRIPTION**************************** */
// COMPONENT IN CHARGE OF FILTERING BY CATEGORIES OR NAME OF MOVIES
//*********************************************DESCRIPTION**************************** */

interface Genre {
    id: number;
    name: string;
}

interface FiltersProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    selectedGenre: string;
    setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FiltersProps> = ({ searchTerm, setSearchTerm, selectedGenre, setSelectedGenre }) => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    //get categories list
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es`);
                if (!response.ok) {
                    throw new Error('Failed to fetch genres');
                }
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, [apiKey]);

    return (
        <div className={styles.inputContainer}>
            <h3>Search</h3>
            <div>
                <input
                    type="text"
                    placeholder="keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <div className={styles.searchIcon}>
                    <Image
                        src="/assets/search.svg"
                        alt="Search Icon"
                        width={16}
                        height={16}
                    />
                </div>
            </div>

            {/* Genre Selector */}
            <div className={styles.selectContainer}>
                <h3>Genres</h3>
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={styles.selectInput}
                >
                    <option value="">_____________________</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;
