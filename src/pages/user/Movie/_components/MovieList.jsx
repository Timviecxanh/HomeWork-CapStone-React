import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "@store/movie/movieApi.js";
import { MovieCardSkeleton } from "@components/user/Loader.jsx";
import MovieCard from "./MovieCard.jsx";

export default function MovieList({ searchKey, filter }) {
  const dispatch = useDispatch();
  const { movieData, loading, error } = useSelector((state) => state.movie);

  useEffect(() => {
    if (movieData.length === 0) {
      dispatch(getMovies());
    }
  }, []);

  const filterData = useMemo(() => {
    let result = [...movieData];

    if (searchKey.trim()) {
      result = result.filter((movie) =>
        movie.tenPhim.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    switch (filter) {
      case "NOW SHOWING":
        return result.filter((movie) => movie.dangChieu);
      case "COMING SOON":
        return result.filter((movie) => movie.sapChieu);
      default:
        return result;
    }
  }, [movieData, searchKey, filter]);

  return (
    <>
      {loading ? (
        <MovieCardSkeleton count={10} />
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filterData?.map((movie) => (
            <MovieCard key={movie.maPhim} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
