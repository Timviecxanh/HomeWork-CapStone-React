import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListMovieAdmin,
  deleteFilmService,
  updateFilmService,
} from "./slice";
import ListMovieTable from "./listmovie";
import EditMovieModal from "./EditMovieModal";

export default function ManagerFilm() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.ManagerSlice);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchListMovieAdmin());
  }, [dispatch]);

  const handleDelete = (maPhim, tenPhim) => {
    if (window.confirm(`Xóa phim "${tenPhim}"?`)) {
      dispatch(deleteFilmService(maPhim));
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
  };

  const handleUpdate = (formData) => {
    dispatch(updateFilmService(formData));
    setSelectedMovie(null);
  };

  if (loading) return <p className="p-6">Đang tải...</p>;
  if (error) return <p className="p-6 text-red-500">Có lỗi</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Phim</h1>

      <ListMovieTable
        movies={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <EditMovieModal
        open={!!selectedMovie}
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
