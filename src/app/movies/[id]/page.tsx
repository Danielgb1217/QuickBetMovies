"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importar desde next/navigation en Next.js 13+
import styles from "./MovieDetail.module.css";
import CircularProgress from "@/components/Card/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faLessThan } from "@fortawesome/free-solid-svg-icons";

interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: Genre[];
}

interface Recommendation {
    id: number;
    title: string;
    poster_path: string;
}

async function fetchMovie(id: string): Promise<Movie> {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch movie details");
    }
    return res.json();
}

async function fetchRecommendations(id: string): Promise<Recommendation[]> {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch movie recommendations");
    }
    const data = await res.json();
    return data.results.slice(0, 5);
}

const MoviePage = ({ params }: { params: { id: string } }) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        async function loadMovie() {
            try {
                const fetchedMovie = await fetchMovie(params.id);
                setMovie(fetchedMovie);

                const fetchedRecommendations = await fetchRecommendations(params.id);
                setRecommendations(fetchedRecommendations);
                console.log("Recommendations:", fetchedRecommendations);
            } catch (error: any) {
                setError("Error fetching movie data");
                console.error("Error fetching movie data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadMovie();
    }, [params.id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return <p>No movie data available</p>;

    return (
        <>
            {/* back to movies */}
            <button
                onClick={() => router.push("/")}
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <FontAwesomeIcon icon={faLessThan} className={styles.backButton} />

            </button>

            <div className={styles.container}>
                <div className={styles.background}>
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={300}
                        />
                        <button className={styles.trailerButton}>
                            Official Trailer <FontAwesomeIcon icon={faPlay} />
                        </button>
                    </div>
                    <div className={styles.details}>
                        <h1>{movie.title}</h1>
                        <div className={styles.info}>
                            <p>{formatDate(movie.release_date)}</p>
                            <p>{movie.runtime} minutes</p>
                        </div>
                        <p>Overview:</p>
                        <p>{movie.overview}</p>

                        <div className={styles.rating}>
                            <CircularProgress value={Math.round(movie.vote_average * 10)} />
                            <p className={styles.ratingText}>
                                Users <br /> Score
                            </p>
                        </div>
                        <div className={styles.suggestionsContainer}>
                            {movie.genres.map((genre) => (
                                <button key={genre.id} className={styles.suggestionsButton}>
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.recommendations}>
                <h2>Recommendations</h2>
                <div className={styles.recommendationsContainer}>
                    {recommendations.map((rec) => (
                        <div key={rec.id} className={styles.recommendationCard}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                                alt={rec.title}
                                width={200}
                                height={270}
                            />
                            <p className={styles.recommendationTitle}>{rec.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
}

export default MoviePage;
