import React, { useEffect, useState } from "react";
import BigBar from "./whatwedo/BigBar";
import SmallCard from "./whatwedo/SmallCard";
import SmallCard2 from "./whatwedo/SmallCard2";

const WhatWeDoCarousel = () => {
  const [contentIndex, setcontentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setcontentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="mb-[5rem]">
      <BigBar contentIndex={contentIndex} />
      <div className="flex items-center justify-between gap-[2.5rem] mt-[2.5rem] sm:flex-col">
        <SmallCard contentIndex={contentIndex} />
        <SmallCard2 contentIndex={contentIndex} />
      </div>
    </div>
  );
};

export default WhatWeDoCarousel;
