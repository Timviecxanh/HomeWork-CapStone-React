import HeaderSile from "./_components/HeaderSile.jsx";
import { useSelector } from "react-redux";
import MovieCard from "./_components/MovieCard.jsx";

export default function Movie() {
  const { movieData, loading, error } = useSelector((state) => state.movie);
  const hotMovies = movieData.filter((item) => item.hot === true).slice(0, 10);
  return (
    <div className=" min-h-screen text-white pt-24">
      <HeaderSile hotMovies={hotMovies} />
      <div>
        <h1 className="text-4xl font-bold text-center text-[#CDA566] tracking-widest mb-5 mt-24">
          HOT MOVIES
        </h1>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-12">
        {hotMovies?.map((movie) => (
          <MovieCard key={movie.maPhim} movie={movie} />
        ))}
      </div>
    </div>
  );
}
