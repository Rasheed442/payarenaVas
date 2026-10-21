import React from "react";
import Navbar2 from "../components/Navbar2";
import bg from "../assets/images/about-patterns.svg";
import contactMail from "../assets/images/contactMail.svg";
import contactPhone from "../assets/images/contactPhone.svg";
import contactVector from "../assets/images/contactVector.svg";
import analytics from "../assets/images/analytics.svg";
import journey from "../assets/images/journey.svg";
import Button from "../components/bits/Button";
import arrow from "../assets/icons/arrow.svg";
import Suscribe from "../components/Suscribe";
import arrowRight from "../assets/icons/icon.svg";
import Faqs from "../components/Faqs";

const Contact = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto relative">
      <img src={bg} alt="" className="w-[100%] absolute z-[-1]" />
      <div className="px-[9rem] md:px-[1.5rem]">
        {/* <Navbar2 /> */}
        <h2 className="font-roboto text-[#242331] text-[3.75rem] text-center pt-[15rem] md:pt-[8rem] md:text-[2rem]">
          Get in touch today!
        </h2>
        <p className="text-center text-[1rem] text-[#797979] mt-[.5rem] md:hidden">
          Engage, Connect, Thrive: Join Our Network for Exceptional <br />{" "}
          Support and Collaboration
        </p>
        <p className="hidden md:block text-center text-[1.4vw] text-[#797979] mt-[.5rem] md:text-[1rem]">
          Engage, Connect, Thrive: Join Our Network for Exceptional Support and
          Collaboration
        </p>
      </div>
      <div className="px-[12rem] flex gap-[3rem] mt-[7rem] md:px-[1.5rem] md:flex-col md:mt-[5rem] lg:px-[5rem]">
        <div className="flex-[.98]">
          <h2 className="font-roboto text-[#242331] text-[2.2rem] mb-[2rem]">
            Contact Us
          </h2>
          {/* <p className="text-[1rem] text-[#797979] md:hidden  mb-[2rem]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit <br />{" "}
            interdum ullamcorper sed pharetra sene.
          </p>
          <p className="hidden md:block text-[1.4vw] text-[#797979] md:text-[1rem]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit interdum
            ullamcorper sed pharetra sene.
          </p> */}

          <div className="flex items-center gap-[1rem] mb-[2rem]">
            <img src={contactMail} alt="" className="w-[40px]" />
            <p className="font-generalsans-semiBold text-[.9rem]">
              helpdesk@up-ng.com{" "}
            </p>
          </div>
          <div className="flex items-start gap-[1rem] mb-[2rem]">
            <img src={contactPhone} alt="" className="w-[40px]" />
            <div className="flex flex-col gap-1">
              <p className="font-generalsans-semiBold text-[.9rem]">
                0700UNIFIED (07008643433)
              </p>
              <p className="font-generalsans-semiBold text-[.9rem]">
                +234 (1) 2778930
              </p>
              <p className="font-generalsans-semiBold text-[.9rem]">
                +234 (1) 2808472
              </p>
              <p className="font-generalsans-semiBold text-[.9rem]">
                +234 (1) 2703010 – 14
              </p>
              <p className="font-generalsans-semiBold text-[.9rem]">
                +234 (1) 2272870 (Payattitude)
              </p>
              <p className="font-generalsans-semiBold text-[.9rem]">
                +234 (1) 2272871 (Hope PSBank){" "}
              </p>
            </div>
          </div>
          <img src={contactVector} alt="" className="w-[350px]" />
        </div>
        <form className="shadow-contact-form border border-[#EFF0F6] rounded-[2rem] py-[1.9rem] px-[2rem] bg-white flex-[1]">
          <div className="flex items-center gap-[1rem] justify-between md:flex-col">
            <div className="flex flex-col gap-[.4rem]  w-[100%] ">
              <label
                htmlFor="name"
                className="text-[.9rem] font-generalsans-semiBold"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none"
              />
            </div>
            <div className="flex flex-col gap-[.4rem]  w-[100%] ">
              <label
                htmlFor="name"
                className="text-[.9rem] font-generalsans-semiBold"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Email address"
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-[1rem] justify-between mt-[2rem] md:flex-col">
            <div className="flex flex-col gap-[.4rem]  w-[100%] ">
              <label
                htmlFor="name"
                className="text-[.9rem] font-generalsans-semiBold"
              >
                Phone
              </label>
              <input
                type="phone"
                placeholder="(123) 456 - 789"
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none"
              />
            </div>
            <div className="flex flex-col gap-[.4rem]  w-[100%] ">
              <label
                htmlFor="name"
                className="text-[.9rem] font-generalsans-semiBold"
              >
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-[1rem] justify-between mt-[2rem]">
            <div className="flex flex-col gap-[.4rem]  w-[100%] ">
              <label
                htmlFor="message"
                className="text-[.9rem] font-generalsans-semiBold"
              >
                Message
              </label>
              {/* <input
                type="phone"
                placeholder="(123) 456 - 789"
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none"
              /> */}
              <textarea
                name="message"
                className="border border-[#EFF0F6] rounded-[.4rem] h-[140px] w-[100%] px-[1rem] outline-none resize-none"
              ></textarea>
            </div>
          </div>
          <Button
            text="Send message"
            background="#00AFEF"
            color="#ffffff"
            icon={arrow}
            iconType="img"
            style={{ flexDirection: "row-reverse", marginTop: "2rem" }}
            width="170px"
            height="50px"
          />
        </form>
      </div>
      <div className="px-[12rem] mt-[8rem] md:px-[1.5rem]">
        <h2 className="font-roboto text-center  text-[#242331] text-[2.2rem] mb-[1rem]">
          Need more help?{" "}
        </h2>
        <p className="text-[#7A7D9C] text-center font-generalsans-extralight mb-[2rem] md:hidden">
          Chat with us
        </p>
        <p className="text-[#7A7D9C] text-center font-generalsans-extralight md:text-[1rem] hidden md:block mb-[2rem]">
          Chat with us
        </p>
        <div className="flex flex-wrap gap-[3rem] justify-between items-center">
          <div className="border border-[#EFF0F6] shadow-contact-form pt-[1.8rem] pb-[3rem] px-[1.5rem] rounded-[.7rem] w-[100%] flex-[1] flex-grow flex-shrink-[auto] min-w-[300px]">
            <img src={analytics} alt="" className="w-[75px] mb-[1.3rem]" />
            <h3 className="font-generalsans-medium text-[1.5rem] mb-[.7rem]">
              Support
            </h3>
            <p className="font-generalsans-light text-[.9rem] mb-[.7rem] text-[#7A7D9C]">
              Empowering Seamless Transactions: <br /> Your Trust, Our Support
            </p>
            <p className="text-footerHead font-generalsans-medium text-[.9rem] flex items-center gap-2">
              support@payarena.com <img src={arrowRight} alt="" />
            </p>
          </div>
          <div className="border border-[#EFF0F6] shadow-contact-form pt-[1.8rem] pb-[3rem] px-[1.5rem] rounded-[.7rem] w-[100%]  flex-1 flex-grow flex-shrink-[auto] min-w-[300px]">
            <img src={journey} alt="" className="w-[75px] mb-[1.3rem]" />
            <h3 className="font-generalsans-medium text-[1.5rem] mb-[.7rem]">
              Partners
            </h3>
            <p className="font-generalsans-light text-[.9rem] mb-[.7rem] text-[#7A7D9C]">
              Elevating Transactions: Seamless <br /> Support for Your Payment
              Success
            </p>
            <p className="text-footerHead font-generalsans-medium text-[.9rem] flex items-center gap-2">
              partners@payarena.com <img src={arrowRight} alt="" />
            </p>
          </div>
          <div className="border border-[#EFF0F6] shadow-contact-form pt-[1.8rem] pb-[3rem] px-[1.5rem] rounded-[.7rem] w-[100%]  flex-1 flex-grow flex-shrink-[auto] min-w-[300px]">
            <img src={journey} alt="" className="w-[75px] mb-[1.3rem]" />
            <h3 className="font-generalsans-medium text-[1.5rem] mb-[.7rem]">
              Billing Issues
            </h3>
            <p className="font-generalsans-light text-[.9rem] mb-[.7rem] text-[#7A7D9C]">
              Elevate Your Experience with Our Dedicated Billing Support
            </p>
            <p className="text-footerHead font-generalsans-medium text-[.9rem] flex items-center gap-2">
              billing@payarena.com <img src={arrowRight} alt="" />
            </p>
          </div>
        </div>
      </div>
      <div className="px-[28%] mt-[8rem] md:px-[1.5rem]">
        <Faqs />
      </div>
      {/* <div className="px-[9rem] my-[6rem]">
        <Suscribe />
      </div> */}
    </section>
  );
};

export default Contact;
