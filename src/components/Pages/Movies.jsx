import { useEffect, useState } from 'react';
import { searchMovies } from '../API/getMovies';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './Home.module.css';
export const Movies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchQuery = new URLSearchParams(location.search).get('query');
      if (searchQuery) {
        try {
          const response = await searchMovies(searchQuery);
          setSearchResults(response.results);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchSearchResults();
  }, [location.search]);

  const handleSearchSubmit = e => {
    e.preventDefault();
    navigate(`/movies?query=${searchQuery}`);
  };

  const handleMovieClick = movieId => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={s.input}
        />
        <button className={s.formBtn} type="submit">
          Search
        </button>
      </form>

      <ul className={s.List}>
        {searchResults.map(movie => (
          <li key={movie.id}>
            <a className={s.link} onClick={() => handleMovieClick(movie.id)}>
              {movie.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
