import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/index.css";

// import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";

const fadeImages = [
  {
    url: "slide1.png",
    caption: "Ngược dòng thời gian",
  },
  {
    url: "slide2.png",
    caption: "Mặt nạ của vợ",
  },
  {
    url: "slide3.png",
    caption: "Tôi làm bảo mẫu ở lảnh cung",
  },
  {
    url: "slide4.png",
    caption: "Supper men đại chiến khủng long bạo chúa",
  },
];

const Banner = () => {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={{ clickable: true }}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="swiper"
    >
      {fadeImages.map((fadeImage, index) => (
        <SwiperSlide key={index}>
          <div className="relative">
            <img
              style={{ width: "100%", objectFit: "cover" }}
              src={fadeImage.url}
              className="h-[600px]"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <h2 className="absolute bottom-10 left-10 text-white text-4xl font-extrabold drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              {fadeImage.caption}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
