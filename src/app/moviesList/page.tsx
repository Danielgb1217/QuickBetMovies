"use client";
import React from "react";
import styles from "./list.module.css";
import MovieCard from "@/components/Card/MovieCard";

/***************************************DESCRIPTION********************** */
// This component receives an array of movies and the list through the component 
// card, it is also responsible for handling the pager logic.
//********************************************************************** */

interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    overview?: string;
    vote_average: number;
    release_date: string;
}

interface MoviesListProps {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    movies: Movie[];
}

export default function MoviesList({ setPage, movies }: MoviesListProps): JSX.Element {
    return (
        <div className={styles.container}>
            <h1>Popular Movies</h1>
            <div className={styles.grid}>
                {movies.map((movie) => (<MovieCard key={movie.id} movie={movie} />))}
            </div>
            <div className={styles.pagination}>
                <div className={styles.pagination}>
                    <button className={styles.prevButton} onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
                        Previous
                    </button>
                    <button className={styles.nextButton} onClick={() => setPage(prev => prev + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
