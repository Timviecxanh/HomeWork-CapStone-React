export default function Footer() {
  return (
    <footer className=" text-gray-300 pt-10 pb-6 px-6 bg-[url('footer_bg.png')] bg-cover bg-no-repeat bg-center ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold mb-3 text-lg">CGV Ticket</h4>
          <p className="text-sm">
            Website đặt vé phim uy tín, nhanh chóng và tiện lợi.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 text-lg">Hỗ trợ</h4>
          <ul className="space-y-2">
            <li>Trung tâm trợ giúp</li>
            <li>Liên hệ</li>
            <li>Bảo mật thông tin</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 text-lg">Rạp phim</h4>
          <ul className="space-y-2">
            <li>CGV</li>
            <li>BHD Star</li>
            <li>Galaxy Cinema</li>
            <li>Lotte Cinema</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3 text-lg">Kết nối</h4>
          <div className="flex gap-4 text-xl">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        © 2024 – Powered by Cuong Dev
      </div>
    </footer>
  );
}
