import { useSelector } from "react-redux";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen  p-6 pt-24 ">
      {userInfo ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="bg-gray-900 rounded-2xl shadow p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                {userInfo.hoTen.charAt(0)}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#CDA566]">
                {userInfo.hoTen}
              </h2>
              <p className="text-[#CDA566]">@{userInfo.taiKhoan}</p>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <p className="flex justify-between">
                <span className="text-[#CDA566]">Email</span>
                <span className="text-white">{userInfo.email}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[#CDA566]">SĐT</span>
                <span className="text-white">{userInfo.soDT}</span>
              </p>
            </div>
          </div>

          {/* Booking History */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-[#CDA566]">
              Phim đã đặt
            </h3>

            {userInfo.thongTinDatVe.map((ticket) => (
              <div
                key={ticket.maVe}
                className="bg-gray-900 rounded-2xl shadow overflow-hidden flex flex-col md:flex-row"
              >
                <img
                  src={ticket.hinhAnh}
                  alt={ticket.tenPhim}
                  className="w-full md:w-48 h-64 md:h-auto object-cover"
                />

                <div className="p-5 flex-1">
                  <h4 className="text-lg font-semibold text-[#CDA566]">
                    {ticket.tenPhim}
                  </h4>
                  <p className="text-sm text-white mt-1">
                    Ngày đặt: {new Date(ticket.ngayDat).toLocaleString()}
                  </p>

                  <div className="mt-3 text-sm">
                    <p className="text-white">
                      <span className="text-[#CDA566]">Mã vé:</span>{" "}
                      {ticket.maVe}
                    </p>
                    <p className="text-white">
                      <span className="text-[#CDA566]">Ghế:</span>{" "}
                      {ticket.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
                    </p>
                    <p className="text-white">
                      <span className="text-[#CDA566]">Giá vé:</span>{" "}
                      {ticket.giaVe.toLocaleString()} đ
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
          {/* Profile Skeleton */}
          <div className="bg-gray-900 rounded-2xl shadow p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-700" />

              <div className="mt-4 h-5 w-40 bg-gray-700 rounded" />
              <div className="mt-2 h-4 w-28 bg-gray-700 rounded" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-700 rounded" />
                <div className="h-4 w-32 bg-gray-700 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-gray-700 rounded" />
                <div className="h-4 w-28 bg-gray-700 rounded" />
              </div>
            </div>
          </div>

          {/* Booking History Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-6 w-40 bg-gray-700 rounded" />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-900 rounded-2xl shadow overflow-hidden flex flex-col md:flex-row"
              >
                <div className="w-full md:w-48 h-64 bg-gray-700" />

                <div className="p-5 flex-1 space-y-3">
                  <div className="h-5 w-48 bg-gray-700 rounded" />
                  <div className="h-4 w-40 bg-gray-700 rounded" />

                  <div className="space-y-2 mt-3">
                    <div className="h-4 w-52 bg-gray-700 rounded" />
                    <div className="h-4 w-64 bg-gray-700 rounded" />
                    <div className="h-4 w-32 bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
