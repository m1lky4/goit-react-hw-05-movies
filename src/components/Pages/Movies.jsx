import { useEffect, useState } from 'react';
import { searchMovies } from '../API/getMovies';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
            <Link
              state={{
                from: location.pathname,
                search: location.search,
              }}
              className={s.link}
              to={`/movies/${movie.id}`}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
