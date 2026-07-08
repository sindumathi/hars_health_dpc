"use client";

import ackData from "@/src/data/acknowldgement.json";
import SwiperCarousel from "@/src/components/Swiper";
import { useState } from "react";

export default function UserAckPage() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  return (
    <>
      <SwiperCarousel swiperContent={ackData} />
    </>
  );
}
