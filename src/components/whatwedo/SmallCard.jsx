import React from "react";
import Content1 from "./Content1";
import Content2 from "./Content2";
import Content3 from "./Content3";

const SmallCard = ({ contentIndex }) => {
  return (
    <div className="shadow-card rounded-[1.5rem] h-[26rem] w-[100%]">
      {contentIndex === 2 && <Content1 cardType="smallCard" />}
      {contentIndex === 0 && <Content2 cardType="smallCard" />}
      {contentIndex === 1 && <Content3 cardType="smallCard" />}
    </div>
  );
};

export default SmallCard;
