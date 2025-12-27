import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShowTimeDetails } from "@store/cinema/cinemaApi.js";
import { useNavigate } from "react-router-dom";
import { TheaterSkeleton, MovieSkeleton } from "@components/user/Loader.jsx";

export default function Cinema({ maPhim }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cinemaSystemData, listMovieTheater, listShowTime, loadingShowTime } =
    useSelector((state) => state.cinema);

  const [activeCinema, setActiveCinema] = useState();
  const [activeTheater, setActiveTheater] = useState();
  const [moviesShowTime, setMoviesShowTime] = useState([]);

  useEffect(() => {
    if (!cinemaSystemData) return;
    setActiveCinema(cinemaSystemData[0]?.maHeThongRap);
  }, [cinemaSystemData]);

  useEffect(() => {
    if (!listMovieTheater || !listMovieTheater.length) return;
    setActiveTheater(listMovieTheater[0]?.maCumRap);
  }, [listMovieTheater]);

  useEffect(() => {
    if (!activeCinema || !cinemaSystemData.length) return;
    dispatch(getShowTimeDetails({ maHeThongRap: activeCinema }));
  }, [activeCinema]);

  useEffect(() => {
    if (loadingShowTime || !activeTheater) return;
    const danhSachPhim = listShowTime[0]?.lstCumRap[0]?.danhSachPhim || [];
    let movieList = danhSachPhim.filter(
      (item) => item.dangChieu === true && (!maPhim || item.maPhim == maPhim)
    );
    movieList = movieList.slice(0, 20);
    const cinema = listMovieTheater.find(
      (item) => item.maCumRap === activeTheater
    );
    if (!cinema?.danhSachRap?.length) return;
    const cinemaIDs = cinema.danhSachRap.map((rap) => rap.maRap);
    const groupedMovies = movieList.map((movie) => {
      const lichChieu = movie.lstLichChieuTheoPhim?.filter((lc) =>
        cinemaIDs.includes(Number(lc.maRap))
      );
      return {
        tenPhim: movie.tenPhim,
        hinhAnh: movie.hinhAnh,
        thoiLuong: movie.thoiLuong,
        danhGia: movie.danhGia,
        lichChieu,
      };
    });

    setMoviesShowTime(groupedMovies);
  }, [activeTheater, maPhim]);

  return (
    <div className={`${maPhim ? "mt-4" : "mt-4 mx-18 "}`}>
      <div
        id="cinema"
        className="flex flex-wrap  items-center justify-around rounded-xl mt-8 py-2  gap-4"
      >
        {cinemaSystemData?.map((item) => (
          <div
            key={item.maHeThongRap}
            onClick={() => setActiveCinema(item.maHeThongRap)}
            className={` w-50 h-30 flex flex-col items-center gap-4 p-3 rounded-lg cursor-pointer transition hover:bg-[#CDA566] shadow-md shadow-gray-400 
                      ${
                        activeCinema === item.maHeThongRap
                          ? "bg-[#CDA566]"
                          : "hover:border-gray-700"
                      }`}
          >
            <img
              src={item.logo}
              alt={item.tenHeThongRap}
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-semibold">
              {item.tenHeThongRap}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-4 ">
        <div className="sm:w-full md:w-2/6 lg:w-2/6 mt-12 mb-12">
          <h1 className="uppercase text-2xl text-[#CDA566] flex justify-center">
            movie location
          </h1>
          <div className="h-[500px] max-h-[500px] overflow-y-auto pr-2 hide-scrollbar mt-4">
            {loadingShowTime
              ? Array(5)
                  .fill(0)
                  .map((_, i) => <TheaterSkeleton key={i} />)
              : listMovieTheater?.map((item) => (
                  <div
                    key={item.maCumRap}
                    onClick={() => {
                      setActiveTheater(item.maCumRap);
                    }}
                    className={`flex items-center gap-8 p-3 mt-2 shadow-sm shadow-gray-600 hover:bg-[#CDA566] rounded-lg cursor-pointer transition 
                ${
                  activeTheater === item.maCumRap
                    ? "bg-[#CDA566]"
                    : "hover:border-gray-700"
                }`}
                  >
                    <img
                      src="../cinemaPoint.jpg"
                      alt={item.maCumRap}
                      className="w-10 h-10 object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-md">
                        {item.tenCumRap}
                      </span>
                      <span className="text-white text-sm">{item.diaChi}</span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="sm:w-full md:w-4/6 lg:w-4/6 mt-12 mb-12">
          {moviesShowTime.length > 0 && (
            <div className="space-y-6">
              <h1 className="uppercase text-2xl text-[#CDA566] flex justify-center">
                movie showtimes
              </h1>
              <div className="h-[500px] max-h-[500px] overflow-y-auto pr-2 hide-scrollbar">
                {loadingShowTime ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <MovieSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  moviesShowTime?.map((movie, index) => (
                    <div
                      key={index}
                      className=" p-4 rounded-lg shadow-sm shadow-gray-600 hover:bg-gray-900 cursor-pointer transition"
                    >
                      {/* Phần info phim */}
                      <div className="flex gap-4">
                        <img
                          src={movie.hinhAnh}
                          className="w-20 h-28 object-cover rounded"
                          alt=""
                        />

                        <div className="flex flex-col">
                          <h2 className="text-white text-xl font-bold">
                            {movie.tenPhim}
                          </h2>
                          <p className="text-gray-400 text-sm">
                            {movie.thoiLuong} phút - IMDb {movie.danhGia}
                          </p>
                        </div>
                      </div>

                      {/* DANH SÁCH GIỜ CHIẾU */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        {movie.lichChieu.map((item) => (
                          <button
                            key={item.maLichChieu}
                            onClick={() =>
                              navigate(
                                "/movie/booking-details/" + item.maLichChieu
                              )
                            }
                            className="px-4 py-2 bg-gray-800 border text-white rounded hover:bg-gray-700"
                          >
                            {new Date(
                              item.ngayChieuGioChieu
                            ).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
