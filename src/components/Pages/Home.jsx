import { getTrendingMovies } from 'components/API/getMovies';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './Home.module.css';
export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <h1>Trending movies this week</h1>
      <ul className={s.List}>
        {movies.map(el => (
          <li key={el.id} className={s.Item}>
            <Link className={s.link} to={`/movies/${el.id}`}>
              {el.title || el.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
