import React from "react";
import Content1 from "./Content1";
import Content2 from "./Content2";
import Content3 from "./Content3";

const BigBar = ({ contentIndex }) => {
  return (
    <div className="shadow-card rounded-[1.5rem] h-[30rem]">
      {contentIndex === 0 && <Content1 cardType="bigCard" />}
      {contentIndex === 1 && <Content2 cardType="bigCard" />}
      {contentIndex === 2 && <Content3 cardType="bigCard" />}
    </div>
  );
};

export default BigBar;
