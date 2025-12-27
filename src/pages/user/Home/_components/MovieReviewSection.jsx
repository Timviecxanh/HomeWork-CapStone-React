import { memo } from "react";
import { useSelector } from "react-redux";
function MovieReviewSection() {
  const { movieData, loading, error } = useSelector((state) => state.movie);
  console.log("movies data view: ", movieData);
  if (!movieData || movieData.length === 0) {
    return null;
  }
  return (
    <div className=" bg-gray-800 text-white py-12 px-22 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-[#CDA566] text-2xl font-bold mb-6 uppercase">
            Tin tức
          </h2>
          {movieData.slice(0, 5).map((movie) => (
            <div key={movie.maPhim} className="flex items-start gap-4 mb-6">
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                className="w-28 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg">{movie.tenPhim}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
                </p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {movie.moTa || "Hiện chưa có mô tả cho bộ phim này."}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-[#CDA566] text-2xl font-bold mb-6 uppercase">
            Review
          </h2>
          {movieData.slice(0, 5).map((movie) => (
            <div key={movie.maPhim} className="flex items-start gap-4 mb-6">
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                className="w-28 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  [Review] {movie.tenPhim}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(movie.ngayKhoiChieu).toLocaleDateString()}
                </p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  Bộ phim được đánh giá {movie.danhGia}/10 điểm từ khán giả.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieReviewSection;
