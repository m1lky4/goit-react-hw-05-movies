import { Routes, Route } from 'react-router-dom';
import { Header } from './Header/Header';
import { lazy } from 'react';
import { Suspense } from 'react';
import React from 'react';

const Home = lazy(() =>
  import('./Pages/Home').then(module => ({ default: module.Home }))
);
const Movies = lazy(() =>
  import('./Pages/Movies').then(module => ({ default: module.Movies }))
);
const MovieDetails = lazy(() =>
  import('./Pages/MovieDetails').then(module => ({
    default: module.MovieDetails,
  }))
);

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/movies/:movieId/reviews" element={<MovieDetails />} />
          <Route path="/movies/:movieId/cast" element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </>
  );
};
