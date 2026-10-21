import React, { useState } from "react";
import subcribePhone from "../assets/images/subcribePhone.svg";
import Button from "./bits/Button";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import Success from "./bits/Success";

const Suscribe = () => {
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const subscribeHandler = (e) => {
    e.preventDefault();
    setemail("");
    setloading(true);
    setTimeout(() => {
      setloading(false);
      toast.success("Yaay!", {
        description: "Thank you for subscribing to our Newsletter!",
        duration: 5000,
        className: "testClass",
        style: { background: "#ff910a" },
        icon: <Success />,
      });
    }, 4000);
  };
  return (
    <div className="pt-[7rem] my-[4rem] subscribe-bg flex align-bottom justify-between px-[6rem] rounded-[1.3rem] sm:flex-col  md:px-[2rem] md2:rounded-none lg:gap-[2rem]">
      <div>
        <h2 className="font-roboto text-white text-[2.5rem] md:text-[1.4rem] lg2:">
          Be the first to know when we launch a new feature on the app.
        </h2>
        <p className="my-[2rem] leading-relaxed text-white font-generalsans-light md:text-[0.8rem]">
          We’re still building some new features. Subscribe for updates <br />{" "}
          when we launch.
        </p>
        <form
          action=""
          className="flex gap-[1.3rem] items-center sm:flex-col"
          onSubmit={subscribeHandler}
        >
          <input
            type="email"
            className="w-[300px] h-[40px] px-[0.4rem] placeholder:text-[.8rem]  rounded-[.4rem] outline-none text-[.9rem] text-[#4c4c4c] sm:w-[100%] "
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <Button
            text={
              loading ? (
                <TailSpin
                  height="30"
                  width="30"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Subscribe"
              )
            }
            background="#F58634"
            color="#ffffff"
            fontSize="14px"
            width="140px"
            height="40px"
            disabled={loading || email === ""}
          />
        </form>
        <p className="my-[1rem] leading-relaxed text-white font-generalsans-light text-[.8rem] sm:text-center">
          We care about your data in our privacy policy
        </p>
      </div>
      <img
        src={subcribePhone}
        alt=""
        className="w-[22rem] sm:mx-auto lg2:w-[14rem]"
      />
    </div>
  );
};

export default Suscribe;
