import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative rounded-sm overflow-hidden">
        <img
          src={movie.hinhAnh}
          className="w-full h-100 object-cover hover:opacity-60 transition-all duration-300 shadow-xl shadow-gray-900"
        />

        <div className="flex flex-row gap-2 p-1">
          <CalendarMonthIcon className="!w-6 !h-6 text-white" />
          <div className="p-1 text-white text-sm">
            {new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}
          </div>
        </div>

        <div className="p-2 text-white text-lg">{movie.tenPhim}</div>

        <div
          className="
    absolute inset-0 bg-black/50 bg-opacity-70 
    flex flex-col justify-center items-center gap-4
    opacity-0 hover:opacity-100 transition-all duration-300
  "
        >
          <div className="flex justify-start p-2">
            <PlayCircleOutlineIcon
              onClick={() => setOpen(true)}
              className="!w-14 !h-14 text-white cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4 mt-12 p-2 ">
            <button
              onClick={() => {
                console.log("Điều hướng đi: ", movie.maPhim);
                navigate(`/movies/${movie.maPhim}`);
              }} // link đến movie details
              className="
            px-8 py-1 
            border border-white
             hover:bg-white 
            text-white hover:text-black font-semibold 
            shadow-lg cursor-pointer
        "
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-70 flex justify-center items-center z-100">
          {/* Popup content */}
          <div className="bg-black rounded-lg relative p-2 w-[90%] max-w-3xl">
            {/* Nút đóng */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl"
            >
              ✕
            </button>

            {/* Video trailer */}
            <iframe
              className="w-full aspect-video rounded"
              src={movie.trailer.replace("watch?v=", "embed/")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
export default MovieCard;
