import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/notFound/NotFound";
import MovieList from "../pages/movieList/MovieList";
import MovieListDetails from "../pages/movieListDetails/MovieListDetails";

const RoutePath = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie_details/:id" element={<MovieListDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default RoutePath;
