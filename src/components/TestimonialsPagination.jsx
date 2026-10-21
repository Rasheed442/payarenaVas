import React, { useContext } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import styled from "styled-components";
import TestimonialContext from "../context/pagination/PaginationContext";

const TestimonialsPagination = () => {
  const { currentIndex, goToNext, goToPrev } = useContext(TestimonialContext);

  return (
    <Wrapper className="flex items-center gap-[1.5rem]">
      <div
        className={currentIndex === 0 ? "pagination  disabled " : "pagination"}
        onClick={goToPrev}
      >
        <BiLeftArrowAlt />
      </div>
      <div className="dotWrapper flex items-center gap-[.8rem]">
        {[0, 1, 2].map((arr) => {
          return (
            <span
              key={`${arr}Slide`}
              className={currentIndex === arr ? "dot activeDot" : "dot"}
            ></span>
          );
        })}
      </div>
      <div
        className={currentIndex === 2 ? "pagination  disabled " : "pagination"}
        onClick={goToNext}
      >
        <BiRightArrowAlt />
      </div>
    </Wrapper>
  );
};

export default TestimonialsPagination;

const Wrapper = styled.div`
  .pagination {
    /* border: 1px solid; */
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #009bff;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    svg {
      font-size: 1.6rem;
      color: #fff;
    }
  }
  .disabled {
    background: #f2f2f2;
    svg {
      color: #667085;
    }
  }
  .dotWrapper {
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #d0d5dd;
    }
    .activeDot {
      background: #f58220;
    }
  }
`;
