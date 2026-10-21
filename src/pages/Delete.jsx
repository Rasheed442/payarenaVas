import React, { useState } from "react";
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

const Delete = () => {
  const [email, setEmail] = useState(""); // State to hold country data
  const [reason, setReason] = useState(""); // State to hold country data
  const [loading, setLoading] = useState(false); // State to indicate loading

  //   const deleteAccount = async (email, reason) => {
  //     try {
  //       setLoading(true); // Start loading
  //       const payload = { email: pvs, reason }; // Prepare payload
  //       const res = await fetch("http://test.payarena.com:8088/account/delete", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         body: JSON.stringify(payload), // Include payload in the body
  //       });

  //       if (!res.ok) {
  //         throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
  //       }

  //       const data = await res.json();
  //       console.log(data);

  //       // Validate the response data
  //       if (data.success) {
  //         toast.success("Account deleted successfully."); // Example success message
  //       } else {
  //         throw new Error(data.message || "Unexpected response format.");
  //       }
  //     } catch (error) {
  //       console.error("Error deleting account:", error);

  //       if (error.name === "TypeError") {
  //         toast.error("Network error. Please check your internet connection.");
  //       } else {
  //         toast.error(error.message || "An unexpected error occurred.");
  //       }
  //     } finally {
  //       setLoading(false); // End loading
  //     }
  //   };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://test.payarena.com:8088/account/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Email: email, // Replace `email` with the actual variable holding the user's email
          Reason: reason, // Replace `reason` with the actual variable holding the user's reason
        }),
      });

      const data = await res.json(); // Parse the JSON response

      if (res.ok) {
        toast.success(data.message || "Account deleted successfully.");
      } else {
        toast.error(
          data.message || "Failed to delete account. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full max-w-[1440px] mx-auto relative">
      <img src={bg} alt="" className="w-[100%] absolute z-[-1]" />
      <div className="px-[9rem] md:px-[1.5rem]">
        {/* <Navbar2 /> */}
        <h2 className="font-roboto text-[#242331] text-[3.75rem] text-center pt-[15rem] md:pt-[8rem] md:text-[2rem]">
          Delete Account{" "}
        </h2>
        <p className="text-center text-[1rem] text-[#797979] mt-[.5rem] md:hidden">
          Are you sure you want to leave? Connect, thrive, and grow with our
          network—your journey of support and collaboration matters to us
        </p>
        <p className="hidden md:block text-center text-[1.4vw] text-[#797979] mt-[.5rem] md:text-[1rem]">
          Are you sure you want to leave? Connect, thrive, and grow with our
          network—your journey of support and collaboration matters to us
        </p>
      </div>
      <div className="px-[12rem] flex gap-[3rem] mt-[7rem] md:px-[1.5rem] md:flex-col md:mt-[5rem] lg:px-[5rem]">
        <form
          onSubmit={handleDelete}
          className="shadow-contact-form border border-[#EFF0F6] rounded-[2rem] py-[1.9rem] px-[2rem] bg-white flex-[1]"
        >
          <div className="flex items-center gap-[1rem] justify-between md:flex-col">
            <div className="flex flex-col gap-[.4rem]  w-[100%] ">
              <label
                htmlFor="name"
                className="text-[.9rem] font-generalsans-semiBold"
              >
                Email
              </label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
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
                Reason
              </label>
              <textarea
                name="message"
                onChange={(e) => setReason(e.target.value)}
                className="border border-[#EFF0F6] rounded-[.4rem] h-[140px] w-[100%] px-[1rem] outline-none resize-none"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-[170px] h-[50px] bg-[#00AFEF] text-[#ffffff] flex-row-reverse mt-8 rounded-md font-semibold"
          >
            {loading ? "Processing..." : "Delete Account"}
          </button>
          {/* <Button
            text="Delete"
            background="#00AFEF"
            color="#ffffff"
            icon={arrow}
            iconType="img"
            style={{ flexDirection: "row-reverse", marginTop: "2rem" }}
            width="170px"
            height="50px"
          /> */}
        </form>
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

export default Delete;
