import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
export default function HeaderSile({ hotMovies }) {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {hotMovies.map((item) => (
          <SwiperSlide
            onClick={() => navigate(`/movies/${item.maPhim}`)}
            className="cursor-pointer"
            key={item.maPhim}
          >
            <img src={item.hinhAnh} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
