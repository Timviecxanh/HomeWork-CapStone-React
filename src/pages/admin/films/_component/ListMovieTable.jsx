export default function ListMovieTable({ movies, onDelete, onEdit }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Mã Phim
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hình Ảnh
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tên Phim
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
            Mô Tả
          </th>
          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Thao Tác
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {movies.map((movie) => (
          <tr key={movie.maPhim} className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {movie.maPhim}
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              <img
                className="h-10 w-10 rounded object-cover"
                src={movie.hinhAnh}
                alt={movie.tenPhim}
              />
            </td>

            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
              {movie.tenPhim}
            </td>

            <td className="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">
              {movie.moTa.length > 80
                ? `${movie.moTa.substring(0, 80)}...`
                : movie.moTa}
            </td>

            <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
              <button
                onClick={() => onEdit(movie)}
                className="text-blue-600 hover:text-blue-900 transition duration-150 mr-3 p-1 rounded hover:bg-blue-100"
                title="Chỉnh Sửa"
              >
                Chỉnh Sửa
              </button>
              <button
                onClick={() => onDelete(movie.maPhim, movie.tenPhim)}
                className="text-red-600 hover:text-red-900 transition duration-150 p-1 rounded hover:bg-red-100"
                title="Xóa"
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
