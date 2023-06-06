import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY = 'a986bb655e026ac8399dc737bac9fcf3';

export async function getTrendingMovies() {
  try {
    const response = await axios.get('/trending/all/week', {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchMovies(query) {
  try {
    const response = await axios.get('search/movie', {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieCast(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieReviews(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}/reviews`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}