import React, { useState } from "react";
import {
  Faq1,
  Faq10,
  Faq11,
  Faq12,
  Faq13,
  Faq14,
  Faq15,
  Faq2,
  Faq3,
  Faq4,
  Faq5,
  Faq6,
  Faq7,
  Faq8,
  Faq9,
} from "./FAQs/Faq1";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const Faqs = () => {
  const [faqs, setFaqs] = useState([
    {
      open: false,
      title: "What types of services are available on Payarena?",
      desc: <Faq1 />,
    },
    {
      open: false,
      title: "How do I register, and how long does it take?",
      desc: <Faq2 />,
    },
    {
      open: false,
      title: "What happens if I cannot remember my password?",
      desc: <Faq3 />,
    },
    {
      open: false,
      title: "How do I locate services to pay for?",
      desc: <Faq4 />,
    },
    {
      open: false,
      title: "What are the payment options accepted on the website?",
      desc: <Faq5 />,
    },
    {
      open: false,
      title: "Who do I contact for services paid for without receiving value?",
      desc: <Faq6 />,
    },
    {
      open: false,
      title: "Is Payarena safe and secure?",
      desc: <Faq7 />,
    },
    {
      open: false,
      title: "Will I be charged for registering on Payarena?",
      desc: <Faq8 />,
    },
    {
      open: false,
      title: "What is Safe token or OTP?",
      desc: <Faq9 />,
    },
    {
      open: false,
      title: "How do I view transaction history?",
      desc: <Faq10 />,
    },
    {
      open: false,
      title:
        "How do I get notification when my transactions on the web are successful?",
      desc: <Faq11 />,
    },
    {
      open: false,
      title:
        "What happens when a wrong number is entered when trying to buy airtime?",
      desc: <Faq12 />,
    },
    {
      open: false,
      title: "What is Payarena e-Wallet?",
      desc: <Faq13 />,
    },
    {
      open: false,
      title: "How do I fund my Payarena e-Wallet?",
      desc: <Faq14 />,
    },
    {
      open: false,
      title:
        "Who can I contact for support and more information about Payarena?",
      desc: <Faq15 />,
    },
  ]);

  const handleItemClick = (clickedIndex) => {
    const updatedFaqs = faqs.map((item, idx) => {
      if (idx === clickedIndex) {
        return { ...item, open: !item.open };
      } else {
        return { ...item, open: false };
      }
    });
    setFaqs(updatedFaqs);
  };
  return (
    <div className="pt-[6rem]" id="faqs">
      <h2 className="font-roboto text-center  text-[#242331] text-[2.2rem] mb-[2rem] sm:text-[1.5rem]">
        Frequently Asked Questions
      </h2>
      <p className="text-[#7A7D9C] text-center font-generalsans-regular mb-[2rem] text-[1.2rem] sm:text-[0.8rem]">
        Browse through our FAQs for answers to <br /> commonly asked questions
      </p>

      <div className="mt-[10%]">
        {faqs.map((item, idx) => {
          return (
            <div
              className="flex items-start justify-between w-full py-[4%] border-b border-[#EAECF0] transition"
              key={idx}
            >
              <div>
                <div className="font-medium text-[1.1vw] mb-[2%] sm:text-[.75rem]">
                  {item.title}
                </div>
                {item.open && (
                  <div className="text-[#667085] text-[0.9vw] sm:text-[0.8rem]">
                    {item.desc}
                  </div>
                )}
              </div>
              {item.open ? (
                <SlArrowUp
                  onClick={() => handleItemClick(idx)}
                  className="cursor-pointer"
                  width="6%"
                  height="6%"
                />
              ) : (
                <SlArrowDown
                  onClick={() => handleItemClick(idx)}
                  className="cursor-pointer"
                  width="3%"
                  height="3%"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faqs;
