import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperContent from "./SwiperContent";

export interface SlideContentProps {
  headerText: string;
  content: string;
}
type SlideKeyPattern = `slide${number}`;
export type SliderProps = { [K in SlideKeyPattern]?: SlideContentProps[] };

interface Slides {
  swiperContent: SliderProps[];
}

export default function SwiperCarousel(props: Slides) {
  const { swiperContent } = props;
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {swiperContent.map((data, i) => {
        return (
          <SwiperSlide key={`${Object.keys(data)}`}>
            <SwiperContent data={data} slideNumber={i} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
