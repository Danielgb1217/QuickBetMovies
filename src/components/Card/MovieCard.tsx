"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './MovieCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import CircularProgress from './CircularProgress';

//**************************************DESCRIPTION********************************** */
// This component renders the cards based on the movie object obtained from the props, 
// it also redirects to the movie detail page
//**************************************DESCRIPTION********************************** */
interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    vote_average: number;
    release_date: string;
}

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/movies/${movie.id}`); //detail page
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.imageContainer}>
                {movie.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={200}
                        height={300}
                        objectFit="cover"
                    />
                ) : (
                    <div className={styles.placeholder}>No Image Available</div>
                )}
            </div>
            <div className={styles.details}>
                <h2 className={styles.title}>{movie.title}</h2>
                <div className={styles.date}>
                    <p className={styles.releaseDate}>{formatDate(movie.release_date)}</p>
                </div>
                <div className={styles.ratingContainer}>
                    <div className={styles.rating}>
                        <p className={styles.ratingText}>Rating</p>
                        <CircularProgress value={Math.round(movie.vote_average * 10)} />
                    </div>
                    <div className={styles.favorites}>
                        <p className={styles.ratingText}>Favorites</p>
                        <button
                            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : styles.favoriteInactive}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFavorite(!isFavorite);
                            }}
                        >
                            <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

//2024-06-17 => Jun 17, 2024
function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

export default MovieCard;
