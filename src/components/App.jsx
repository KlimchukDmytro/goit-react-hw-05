import "./App.css";
import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = React.lazy(() => import("../pages/MoviesPage/MoviesPage"));
const NotFoundPage = React.lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage")
);
const MovieCast = React.lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = React.lazy(() => import("./MovieReviews/MovieReviews"));
const MovieDetailsPage = React.lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);

const App = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
