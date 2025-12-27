import { useDispatch, useSelector } from "react-redux";
import {
  toggleSeat,
  clearSeat,
  resetCheckoutState,
} from "@store/booking/movieBookingSlice.js";
import {
  getListCinemaTicket,
  checkoutTicket,
} from "@store/booking/movieBookingApi.js";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SeatsSkeleton, MovieInfoSkeleton } from "@components/user/Loader.jsx";
export default function SeatsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    moviesInfor,
    listSeats,
    selectedSeats,
    loading,
    checkoutLoading,
    checkoutSuccess,
    checkoutError,
  } = useSelector((state) => state.booking);
  console.log("listSeats", listSeats);
  const [modal, setModal] = useState({
    open: false,
    type: "success", // success | error
    message: "",
  });
  const { vipPrice, normalPrice } = useMemo(() => {
    const vipSeat = listSeats.find((item) => item.loaiGhe === "Vip");
    const normalSeat = listSeats.find((item) => item.loaiGhe === "Thuong");
    return {
      vipPrice: vipSeat?.giaVe ?? 0,
      normalPrice: normalSeat?.giaVe ?? 0,
    };
  }, [listSeats]);

  useEffect(() => {
    if (!checkoutSuccess && !checkoutError) return;
    setModal({
      open: true,
      type: checkoutSuccess ? "success" : "error",
      message: checkoutSuccess
        ? "Đặt vé thành công!"
        : checkoutError || "Đặt vé thất bại",
    });
  }, [checkoutSuccess, checkoutError]);
  const handleToggleSeat = useCallback(
    (seat) => {
      dispatch(toggleSeat(seat));
    },
    [dispatch]
  );

  const handleModalConfirm = useCallback(() => {
    setModal((prev) => {
      if (prev.type === "success") {
        dispatch(getListCinemaTicket({ maLichChieu: id }));
      }
      return { ...prev, open: false };
    });

    dispatch(clearSeat());
    dispatch(resetCheckoutState());
  }, [dispatch, id]);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.giaVe, 0);
  }, [selectedSeats]);

  const handleCheckout = useCallback(() => {
    if (selectedSeats.length === 0) return;
    dispatch(
      checkoutTicket({
        bookingData: {
          maLichChieu: id,
          danhSachVe: selectedSeats.map((seat) => ({
            maGhe: seat.maGhe,
            giaVe: seat.giaVe,
          })),
        },
      })
    );
  }, [dispatch, id, selectedSeats]);

  useEffect(() => {
    if (!id) return;
    dispatch(getListCinemaTicket({ maLichChieu: id }));
    dispatch(clearSeat());
  }, [id]);

  return (
    <>
      <div className="max-w-[80%] mx-auto text-white pt-24 grid grid-cols-12 gap-8 pb-8">
        {/* Danh sách ghế */}
        <div className="col-span-8 shadow-2xl shadow-gray-400 rounded-2xl p-2">
          <div className="flex flex-row items-center justify-center gap-6 p-2">
            <div className="flex flex-col items-center gap-4 border-2 border-[#CDA566] p-4 rounded-2xl">
              <div className="flex flex-row items-center gap-4">
                <p className="w-5 h-5 bg-gray-600 border boder-white"></p>
                <p>Ordered seats</p>
              </div>
              <div>
                <p className="text-yellow-400">Price: 0đ</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 border-2 border-[#CDA566] p-4 rounded-2xl">
              <div className="flex flex-row items-center gap-4">
                <p className="w-5 h-5 bg-gray-600 border boder-white"></p>
                <p>Vip seats</p>
              </div>
              <div>
                <p className="text-yellow-400">
                  Price: {vipPrice.toLocaleString()}đ
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 border-2 border-[#CDA566] p-4 rounded-2xl">
              <div className="flex flex-row items-center gap-4">
                <p className="w-5 h-5 bg-gray-600 border boder-white"></p>
                <p>Empty seats</p>
              </div>
              <div>
                <p className="text-yellow-400">
                  Price: {normalPrice.toLocaleString()}đ
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-300 text-gray-800 py-2 text-center mt-2 rounded-md font-semibold">
            SCREEN
          </div>

          {/* Danh sách ghế */}
          {loading ? (
            <SeatsSkeleton />
          ) : (
            <div className="grid grid-cols-10 gap-3 mt-6">
              {listSeats.map((ghe) => {
                const isSelected = selectedSeats.some(
                  (g) => g.maGhe === ghe.maGhe
                );

                return (
                  <button
                    key={ghe.maGhe}
                    disabled={ghe.daDat}
                    onClick={() => handleToggleSeat(ghe)}
                    className={`
              h-10 rounded-md text-sm font-semibold
              flex items-center justify-center
              ${
                ghe.daDat
                  ? "bg-gray-600 cursor-not-allowed text-white"
                  : isSelected
                  ? "bg-yellow-400 text-black"
                  : ghe.loaiGhe === "Vip"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }
            `}
                  >
                    {ghe.tenGhe}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Thông tin phim */}
        {loading ? (
          <MovieInfoSkeleton />
        ) : (
          <div className="col-span-4 bg-gray-800 p-5 rounded-xl shadow-lg space-y-6">
            <img
              src={moviesInfor.hinhAnh}
              alt={moviesInfor.tenPhim}
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
            <h2 className="text-2xl font-bold mt-2">{moviesInfor.tenPhim}</h2>

            {/* Chi tiết phim */}
            <div className="text-gray-300 space-y-2">
              <p>
                <span className="font-semibold text-white">Cụm rạp:</span>{" "}
                {moviesInfor.tenCumRap}
              </p>
              <p>
                <span className="font-semibold text-white">Rạp:</span>{" "}
                {moviesInfor.tenRap}
              </p>
              <p>
                <span className="font-semibold text-white">Địa chỉ:</span>{" "}
                {moviesInfor.diaChi}
              </p>
              <p>
                <span className="font-semibold text-white">Ngày chiếu:</span>{" "}
                {moviesInfor.ngayChieu}
              </p>
              <p>
                <span className="font-semibold text-white">Giờ chiếu:</span>{" "}
                {moviesInfor.gioChieu}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-yellow-500/40">
              <div className="flex justify-between text-white text-lg font-bold">
                <span>Tổng thanh toán</span>
                <span className="text-yellow-400 text-xl">
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={selectedSeats.length === 0 || loading}
              className={`
    w-full py-3 rounded-lg text-lg font-bold 
    ${
      selectedSeats.length === 0
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-yellow-500 hover:bg-yellow-600 text-black"
    }
  `}
            >
              {checkoutLoading ? "Đang xử lý..." : "Đặt vé ngay"}
            </button>
            {/* Hiển thị danh sách ghế đã chọn */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-bold text-white">Ghế đã chọn</h3>

              {selectedSeats.length === 0 ? (
                <p className="text-gray-400 mt-2">Bạn chưa chọn ghế nào.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {selectedSeats.map((ghe) => (
                    <li
                      key={ghe.maGhe}
                      className="flex justify-between bg-gray-600 px-3 py-2 rounded-md text-sm text-gray-200"
                    >
                      <span>
                        Ghế: <b>{ghe.tenGhe}</b>
                      </span>
                      <span className="font-semibold">
                        {ghe.giaVe.toLocaleString()}đ
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 animate-scaleIn">
            {modal.type === "success" ? (
              <>
                <h3 className="text-2xl font-bold text-green-600 text-center mb-3">
                  Đặt vé thành công 🎉
                </h3>
                <p className="text-gray-600 text-center">
                  Chúc bạn xem phim vui vẻ!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-red-600 text-center mb-3">
                  Đặt vé thất bại ❌
                </h3>
                <p className="text-gray-600 text-center">{modal.message}</p>
              </>
            )}

            <button
              onClick={handleModalConfirm}
              className="mt-6 w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
