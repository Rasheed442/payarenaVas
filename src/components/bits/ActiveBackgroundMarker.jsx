import React from "react";
import styled from "styled-components";
import { colors } from "./colors";

const ActiveBackgroundMarker = ({ currentIdx, backgroundLength }) => {
  return (
    <Wrapper>
      {backgroundLength.map((bar, idx) => {
        return (
          <div
            key={`activeBG${idx}`}
            className={currentIdx === idx ? "bar activeBar" : "bar"}
          ></div>
        );
      })}
    </Wrapper>
  );
};

export default ActiveBackgroundMarker;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  transform: translate(-3%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.3rem;
  .bar {
    height: 3px;
    width: 24px;
    background: #ffffffa8;
    border-radius: 10px;
    transition: 0.8s ease-in-out;
  }
  .activeBar {
    transition: 0.8s ease-in-out;
    background: ${colors.accent1};
    border-radius: 10px;
    width: 30px;
  }

  @media screen and (max-width: 970px) {
    top: 35%;
    opacity: 0.7;
    .bar {
      height: 3px;
      width: 14px;
    }
    .activeBar {
      transition: 0.8s ease-in-out;
      background: ${colors.accent1};
      border-radius: 10px;
      width: 25px;
    }
  }
`;
