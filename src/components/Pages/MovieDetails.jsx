import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getMovieDetails,
  getMovieReviews,
  getMovieCast,
} from 'components/API/getMovies';
import s from './MovieDetails.module.css';

export const MovieDetails = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cast, setCast] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showCast, setShowCast] = useState(false);
  const [showLayout, setShowLayout] = useState(true);
  const [path, setPath] = useState(null);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    setPath(location.state.from);
    setSearch(location.state.search);
  }, []);
  const handleShowReviews = async () => {
    try {
      const movieReviews = await getMovieReviews(movieId);
      setReviews(movieReviews.results);
      setShowReviews(true);
      setShowCast(false);
      setShowLayout(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowCast = async () => {
    try {
      const movieCast = await getMovieCast(movieId);
      setCast(movieCast.cast);
      setShowCast(true);
      setShowReviews(false);
      setShowLayout(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBack = () => {
    if (search !== null) {
      navigate(path + search);
    } else {
      navigate(path);
    }
  };

  if (!showLayout) {
    return null;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button className={s.goBack} onClick={handleGoBack}>
        &larr; Go Back
      </button>
      <div className={s.detailsWrapper}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || movie.name}
            className={s.detailsPoster}
          />
        )}
        <div>
          <h2>{`${movie.title || movie.name} (${movie.release_date.slice(
            0,
            4
          )})`}</h2>
          <p>User Score: {Math.floor(movie.vote_average * 10)}%</p>
          <div>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          <div>
            <h3>Genres</h3>
            <ul className={s.genres}>
              {movie.genres.map(el => (
                <li key={el.id}>
                  <p>{el.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={s.informationWrapper}>
        <p>Additional information</p>
        <Link
          className={s.link}
          to={`/movies/${movieId}/cast`}
          onClick={handleShowCast}
        >
          Cast
        </Link>
        <Link
          className={s.link}
          to={`/movies/${movieId}/reviews`}
          onClick={handleShowReviews}
        >
          Reviews
        </Link>
      </div>
      {showCast && (
        <div>
          {cast.length > 0 ? (
            <ul className={s.castList}>
              {cast.map(
                person =>
                  person.profile_path && (
                    <li key={person.id} className={s.castListItem}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt={person.name}
                        className={s.personImg}
                      />
                      <div>
                        <p>{person.name}</p>
                        <p>Character: {person.character}</p>
                      </div>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
      )}
      {showReviews && (
        <div>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <p className={s.author}>Author: {review.author}</p>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      )}
    </>
  );
};
