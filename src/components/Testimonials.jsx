import React, { useContext } from "react";
import TestimonialsPagination from "./TestimonialsPagination";
import vas from "../assets/images/testimonials/vas.jpeg";
import verification from "../assets/images/testimonials/verification.jpeg";
import shop from "../assets/images/testimonials/shop.jpeg";
import testimonialAvatar from "../assets/images/testimonialAvatar.svg";
import Button from "./bits/Button";
import TestimonialContext from "../context/pagination/PaginationContext";
import { AnimatePresence, motion } from "framer-motion";
import yvonne from "../assets/images/testimonials/yvonne.jpeg";
import emmy from "../assets/images/testimonials/emmy.jpeg";
import tope from "../assets/images/testimonials/tope.jpeg";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const { currentIndex, goToNext, goToPrev, direction } =
    useContext(TestimonialContext);

  return (
    <div className="bg-[#F9FAFB] mt-[5rem] px-[9rem] py-[4rem] md:px-[1.4rem]">
      <p className="px-[1.4rem] py-[0.4rem] w-fit  bg-accent2 text-white rounded-lg font-generalsans-semiBold sm:text-left md:text-center mx-auto">
        What makes us stand-out{" "}
      </p>
      <h2 className="font-roboto text-[2.2rem] text-[#1D2939] mt-[1.7rem] sm:text-left md:text-center">
        Testimonials
      </h2>
      <div className="flex items-center justify-between md:flex-col md:gap-[4rem]">
        <p className="text-[#344054]">
          We take security seriously, and our platform is designed to protect
          your <br /> business and your customers from fraud and data breaches.
        </p>
        <TestimonialsPagination />
      </div>
      <div className="w-[100%] max-w-[100%] overflow-hidden">
        <AnimatePresence custom={direction}>
          {currentIndex === 0 && (
            <motion.div
              className="flex items-center justify-between mt-[5rem] px-[0] md:flex-col md:px-[0rem] md:gap-[3rem] md:mt-[2rem]"
              initial={{ x: direction === "left" ? 300 : -300 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-[1.8rem] text-[#101828] font-roboto-regular lg:text-[1.2rem]">
                  Using this payment service has been <br /> an absolute
                  game-changer for me! The <br /> seamless and secure
                  transactions have <br /> made managing my finances a breeze.
                </h2>
                <div className="flex items-center gap-[1rem] mt-[2rem]">
                  <img
                    src={yvonne}
                    alt=""
                    className="w-[60px] h-[60px] rounded-[50%]"
                  />
                  <div>
                    <h3 className="font-roboto-regular text-[#101828]">
                      Yvonne Ede{" "}
                    </h3>
                    <p className="font-generalsans-extralight text-[#667085] text-[.9rem]">
                      Product Manager.
                    </p>
                  </div>
                </div>
                <Link to="/payment/airtime_recharge">
                  <Button
                    text="Try Payarena"
                    background="#009BFF"
                    style={{ marginTop: "3rem", borderRadius: "0.6rem" }}
                    width="160px"
                    height="50px"
                  />
                </Link>
              </div>
              <div>
                <img src={vas} alt="" className="w-[30rem]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence custom={direction}>
          {currentIndex === 1 && (
            <motion.div
              className="flex items-center justify-between mt-[5rem] px-[0]  md:flex-col md:px-[0rem] md:gap-[3rem] md:mt-[2rem]"
              initial={{ x: direction === "left" ? 300 : -300, opacity: 0.4 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-[1.8rem] text-[#101828] font-roboto-regular lg:text-[1.2rem] ">
                  The simplicity of the shopping service and the <br />{" "}
                  responsive customer support are highly <br /> appreciated. We
                  rely on it every single day.
                </h2>
                <div className="flex items-center gap-[1rem] mt-[2rem]">
                  <img
                    src={tope}
                    alt=""
                    className="w-[60px] h-[60px] rounded-[50%]"
                  />
                  <div>
                    <h3 className="font-roboto-regular text-[#101828]">
                      Temitope Alli{" "}
                    </h3>
                    <p className="font-generalsans-extralight text-[#667085] text-[.9rem]">
                      Product Designer.
                    </p>
                  </div>
                </div>
                <a href="https://mall.payarena.com/" target="_blank">
                  <Button
                    text="Try Payarena"
                    background="#009BFF"
                    style={{ marginTop: "3rem", borderRadius: "0.6rem" }}
                    width="160px"
                    height="50px"
                  />
                </a>
              </div>
              <div>
                <img src={shop} alt="" className="w-[32rem]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence custom={direction}>
          {currentIndex === 2 && (
            <motion.div
              className="flex items-center justify-between mt-[5rem] px-[0]  md:flex-col md:px-[0rem] md:gap-[3rem] md:mt-[2rem]"
              initial={{ x: direction === "left" ? 300 : -300, opacity: 0.4 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-[1.8rem] text-[#101828] font-roboto-regular lg:text-[1.2rem] ">
                  We are incredibly reliant on this verification <br /> service{" "}
                  due to its user-friendly nature and <br /> excellent customer
                  support that is always available.
                </h2>
                <div className="flex items-center gap-[1rem] mt-[2rem]">
                  <img
                    src={emmy}
                    alt=""
                    className="w-[60px] h-[60px] rounded-[50%]"
                  />
                  <div>
                    <h3 className="font-roboto-regular text-[#101828]">
                      Emmanuel Owolabi
                    </h3>
                    <p className="font-generalsans-extralight text-[#667085] text-[.9rem]">
                      Frontend Engineer.
                    </p>
                  </div>
                </div>
                <a href="https://payarenaverification.com/home" target="_blank">
                  <Button
                    text="Try Payarena"
                    background="#009BFF"
                    style={{ marginTop: "3rem", borderRadius: "0.6rem" }}
                    width="160px"
                    height="50px"
                  />
                </a>
              </div>
              <div>
                <img src={verification} alt="" className="w-[32rem]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Testimonials;
