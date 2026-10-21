import React from "react";
import about1 from "../assets/images/about1.jpeg";
import about2 from "../assets/images/about2.jpeg";
import about3 from "../assets/images/about3.png";
import styled from "styled-components";

const AboutFirstSection = () => {
  return (
    <div className="">
      <h2 className="font-roboto text-center text-[3rem] pt-[15rem] text-[#242331] sm:text-[2rem] md:pt-[8rem]">
        About Payarena
      </h2>
      <p className="text-center text-[1rem] text-[#797979] mt-[.5rem] sm:hidden">
        Enabling Seamless payments, elevating shopping experiences, <br />{" "}
        ensuring trustworthiness: where seamless meets security
      </p>
      <p className="hidden sm:block text-center text-[1.4vw] text-[#797979] mt-[.5rem] sm:text-[1rem]">
        Enabling Seamless payments, elevating shopping experiences, ensuring
        trustworthiness: where seamless meets security
      </p>
      {/* <ImagesWrapper className="mt-[2rem] grid grid-cols-[1fr 0.6fr] grid-rows-[repeat(2, 1fr)] gap-0	"> */}
      <ImagesWrapper>
        {/* <div className="flex justify-between h-[30rem] md:h-[unset] md:flex-col sm:gap-[0] md:gap-[3rem] "> */}
        <img
          src={about1}
          alt=""
          className="img1"
          // className="rounded-[3rem] sm: sm:h-[15rem] sm:mb-[3rem]"
        />
        <img
          src={about2}
          alt=""
          className="img2"

          // className="rounded-[3rem]  sm:h-[25rem] min-lg:h-[20rem] object-fill"
        />
        {/* </div> */}
        {/* <div className="mt-[2rem] lg2:hidden"> */}
        <img
          src={about3}
          alt=""
          className="img3"
          //className="rounded-[3rem]"
        />
        {/* </div> */}
      </ImagesWrapper>

      {/* </ImagesWrapper> */}
    </div>
  );
};

export default AboutFirstSection;

const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;
  margin-top: 2rem;

  .img1 {
    grid-area: 1 / 1 / 2/ 2;
    height: 350px;
    border-radius: 2rem;
    width: 100%;
    object-fit: fill;
  }
  .img2 {
    grid-area: 1 / 2 / 2 / 3;
    height: 350px;
    border-radius: 2rem;
    width: 100%;
  }
  .img3 {
    grid-area: 2 / 1 / 3 / 3;
    border-radius: 2rem;
    height: 350px;
    width: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 480px) {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

    .img1,
    .img2,
    .img3 {
      border-radius: 1rem;
    }
    .img3 {
      height: 130px;
    }
    .img1,
    .img2 {
      height: 130px;
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 890px) {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

    .img1,
    .img2,
    .img3 {
      border-radius: 1rem;
    }
    .img3 {
      height: 250px;
    }
    .img1,
    .img2 {
      height: 250px;
    }
  }
  @media only screen and (min-width: 891px) and (max-width: 1200px) {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;

    .img1,
    .img2,
    .img3 {
      border-radius: 1rem;
    }
    .img3 {
      height: 250px;
    }
    .img1,
    .img2 {
      height: 250px;
    }
  }
`;
