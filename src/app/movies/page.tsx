// "use client";
// import React, { useEffect, useState } from 'react';
// import styles from './movies.module.css';
// import Filters from '@/components/Filters/Filters';
// import MoviesList from '../moviesList/page';

// //**********************************************DESCRITION********************* */
// // Parent component in charge of executing the consumption of movies to the API.
// // Gets the filter selections, consumes movies and renders them in the movie list
// //  component.
// //***************************************************************************** */

// interface Movie {
//     id: number;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     release_date: string;
// }

// interface Genre {
//     id: number;
//     name: string;
// }

// const MoviesPage = () => {

//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [reloadMovies, setReloadMovies] = useState<boolean>(false);
//     const [page, setPage] = useState<number>(1);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [selectedGenre, setSelectedGenre] = useState<string>('');

//     const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

//     useEffect(() => {
//     }, [selectedGenre])

//     useEffect(() => {
//         if (searchTerm.length === 0) {
//             setMovies([]);
//             setReloadMovies(true);
//             return;
//         }
//     }, [searchTerm]);

//     useEffect(() => {
//         setReloadMovies(false);
//         const fetchMovies = async () => {
//             try {
//                 let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
//                 if (selectedGenre) url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es&with_genres=${selectedGenre}`;
//                 else if (searchTerm) url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&language=es`;

//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch movies');
//                 }
//                 const data = await response.json();
//                 setMovies(data.results);
//             } catch (error) {
//                 console.error('Error fetching movies:', error);
//             }
//         };

//         fetchMovies();
//     }, [selectedGenre, apiKey, page, reloadMovies, searchTerm]);

//     return (
//         <div className={styles.container}>
//             <aside className={styles.sidebar}>
//                 <Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm}
//                     selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
//             </aside>
//             <div className={styles.mainContent}>
//                 <MoviesList movies={movies} setPage={setPage} />
//             </div>
//         </div>
//     );
// };

// export default MoviesPage;