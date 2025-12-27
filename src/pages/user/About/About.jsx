export default function About() {
  return (
    <div className="min-h-screen  text-white pt-24 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('banner_movie.webp')",
        }}
      />
      <div className="relative w-full mx-20 bg-[url('https://www.majorplatinumcineplex.la/assets/images/background-top.png')] bg-cover bg-no-repeat bg-center backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-10">
        <h1 className="text-4xl font-extrabold text-center text-[#CDA566] tracking-widest mb-10">
          ABOUT • VIPMovie
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
          <img
            src="movie.png"
            alt="Cinema"
            className="rounded-xl shadow-lg border border-gray-700"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#CDA566] mb-4">
              Chúng tôi là ai?
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              VIPMovie là nền tảng đặt vé xem phim trực tuyến tốc độ cao, cập
              nhật liên tục phim mới, mang đến trải nghiệm đặt vé xem phim mượt
              mà, chất lượng cao cho người dùng. Giao diện trực quan, bố cục tối
              ưu giúp bạn dễ dàng tìm kiếm và theo dõi phim yêu thích.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
          <img
            src="slide1.png"
            alt="Film Reel"
            className="rounded-xl shadow-lg border border-gray-700 md:order-2"
          />
          <div className="md:order-1">
            <h2 className="text-2xl font-bold text-[#CDA566] mb-4">Tầm nhìn</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Chúng tôi hướng đến việc trở thành nền tảng giải trí hàng đầu, nơi
              mọi người có thể trải nghiệm phim ảnh chất lượng cao trong không
              gian tối ưu và an toàn.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-center">
          <img
            src="cinemaPoint.jpg"
            alt="Movie Set"
            className="rounded-xl shadow-lg border border-gray-700"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#CDA566] mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tốc độ – Trải nghiệm – Liên tục cải tiến. Chúng tôi luôn lắng nghe
              người dùng để hoàn thiện nền tảng tốt hơn mỗi ngày, mang đến trải
              nghiệm đặt vé xem phim tốt nhất.
            </p>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm mt-10">
          © 2025 VIPMovie. All rights reserved.
        </div>
      </div>
    </div>
  );
}
