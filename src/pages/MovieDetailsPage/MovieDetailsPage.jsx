import { useEffect, useState, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/");

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={s.container}>
        <div>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
      <nav className={s.nav}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
