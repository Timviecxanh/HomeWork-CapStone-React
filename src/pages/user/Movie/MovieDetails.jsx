import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMovieDetail } from "@store/movie/movieApi.js";
import Cinema from "../Movie/_components/Cinema.jsx";

export default function MovieDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { movieInfo } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovieDetail({ id }));
  }, [id]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white pt-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${movieInfo?.hinhAnh})` }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      <div className="relative z-10 flex flex-col md:flex-row lg:flex-row max-w-7xl mx-auto h-full  px-10">
        <div className="sm:w-2/3 md:w-1/3 lg:w-1/3">
          <img
            src={movieInfo?.hinhAnh}
            className="rounded-xl shadow-xl w-full"
            alt={movieInfo?.tenPhim}
          />

          <div className="flex gap-4 mt-6 items-center">
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-2 bg-[#CDA566] rounded-lg  hover:bg-[#38923c]"
            >
              ▶ Trailer
            </button>
            <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black">
              ♥ List
            </button>
          </div>
        </div>

        <div className="w-3/4 pl-14 ">
          <h1 className="text-3xl font-bold mb-3">
            {movieInfo?.tenPhim} (
            {new Date(movieInfo?.ngayKhoiChieu).getFullYear()})
          </h1>

          <div className="flex items-center gap-4 text-gray-300 mb-6">
            <span className="bg-gray-700 px-2 rounded">PG</span>
            <span>1 hr 48 min</span>
            <span>•</span>
            <span>Rating: ⭐ {movieInfo?.danhGia}/10</span>
          </div>

          <p className="text-lg max-w-2xl leading-relaxed text-gray-200">
            {movieInfo?.moTa}
          </p>
          <div className="mt-2 w-full">
            <Cinema maPhim={id} />
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-70 flex justify-center items-center z-100">
          <div className="bg-black rounded-lg relative p-2 w-[90%] max-w-3xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl"
            >
              ✕
            </button>
            <iframe
              className="w-full aspect-video rounded"
              src={movieInfo.trailer.replace("watch?v=", "embed/")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
