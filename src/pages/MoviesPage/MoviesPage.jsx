import { useState } from "react";
import { useFormik, Field, Form, Formik } from "formik";
import { fetchMoviesByQuery } from "../../api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: async (values) => {
      setMovies([]);
      const data = await fetchMoviesByQuery(values.query);
      setMovies(data);
    },
  });

  return (
    <div>
      <Formik>
        <Form onSubmit={formik.handleSubmit}>
          {" "}
          <Field
            type="text"
            name="query"
            placeholder="Search for a movie..."
            value={formik.values.query}
            onChange={formik.handleChange}
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;