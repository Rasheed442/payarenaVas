import React, { useState, useEffect } from "react";
import paymentSide from "../assets/images/paymentSide.png";
import billSide from "../assets/images/billsSide.png";
import { AnimatePresence, motion } from "framer-motion";

const AdBanner = () => {
  const images = [paymentSide, billSide];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt="airtime_banner.png"
          className="w-[160px]"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default AdBanner;
