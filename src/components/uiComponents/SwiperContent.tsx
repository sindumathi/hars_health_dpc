import { SliderProps, SlideContentProps } from "./Swiper";
interface SwiperContentProps {
  data: SliderProps;
  slideNumber: number;
}

export default function SwiperContent({
  data,
  slideNumber,
}: SwiperContentProps) {
  const sliderDisplay = (sliderContent: SlideContentProps) => {
    return (
      <>
        <h2>{sliderContent.headerText}</h2>
        <p>{sliderContent.content}</p>
      </>
    );
  };
  return (
    <>
      {Object.values(data).forEach((slides) => {
        slides?.forEach((slideContent) => {
          return sliderDisplay(slideContent);
        });
      })}
    </>
  );
}
