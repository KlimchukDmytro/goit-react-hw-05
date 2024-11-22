import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    setError(null);

    fetchMoviesByQuery(query)
      .then(setMovies)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const value = form.elements.query.value.trim();

    setSearchParams(value ? { query: value } : {});
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input name="query" type="text" placeholder="Search for a movie..." />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong. Please try again later.</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
