export default function Contact() {
  return (
    <div className="min-h-screen  text-white flex items-center justify-center pt-24">
      <div className="max-w-3xl w-full  rounded-2xl shadow-2xl border border-gray-700 p-8">
        <h1 className="text-4xl font-extrabold text-center text-[#CDA566] tracking-widest mb-6">
          CONTACT • SUPPORT
        </h1>
        <p className="text-center text-gray-300 max-w-xl mx-auto mb-8 text-sm">
          Nếu bạn gặp lỗi khi đặt vé xem phim, muốn báo link hỏng hoặc góp ý
          nâng cấp trải nghiệm, hãy gửi tin nhắn cho đội ngũ hỗ trợ của chúng
          tôi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#CDA566] mb-4">
              Kênh liên hệ
            </h2>
            <p className="text-gray-300">
              <span className="text-[#CDA566] font-semibold">Email:</span>{" "}
              support@VIPMovie.com
            </p>
            <p className="text-gray-300">
              <span className="text-[#CDA566] font-semibold">Telegram:</span>{" "}
              @VIPMovie_support
            </p>
            <p className="text-gray-300">
              <span className="text-[#CDA566] font-semibold">Hotline:</span>{" "}
              0988 123 456
            </p>
            <p className="text-gray-400 text-sm pt-2">
              Hỗ trợ từ: <span className="text-white">08:00 - 24:00</span>
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Tên của bạn</label>
              <input
                type="text"
                className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                focus:border-[#CDA566] focus:ring-2 focus:ring-[#CDA566] outline-none transition"
                placeholder="Nhập tên..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                focus:border-[#CDA566] focus:ring-2 focus:ring-[#CDA566] outline-none transition"
                placeholder="Nhập email..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Nội dung</label>
              <textarea
                className="w-full mt-1 p-3 h-28 rounded-lg bg-gray-700 text-white border border-gray-600 
                focus:border-[#CDA566] focus:ring-2 focus:ring-[#CDA566] outline-none transition"
                placeholder="Bạn muốn gửi gì đến đội hỗ trợ?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#CDA566] text-gray-900 font-bold text-lg rounded-xl 
              hover:opacity-90 transition shadow-lg"
            >
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
