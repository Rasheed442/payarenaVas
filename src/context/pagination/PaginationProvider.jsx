/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TestimonialContext from "./PaginationContext";

const PaginationProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");

  const goToNext = () => {
    if (currentIndex === 2) {
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    setDirection("left");
  };

  const goToPrev = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    setDirection("right");
  };

  return (
    <TestimonialContext.Provider
      value={{ currentIndex, goToNext, goToPrev, direction }}
    >
      {children}
    </TestimonialContext.Provider>
  );
};

export default PaginationProvider;
