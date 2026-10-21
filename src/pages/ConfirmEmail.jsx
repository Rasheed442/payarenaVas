import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { confirmEmail } from "../services/onboarding";
// import toast from "react-hot-toast";

const ConfirmEmail = () => {
  //   const [responseData, setResponseData] = useState(false);

  //   useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);

  //     const email = urlParams.get("emailAddress");
  //     const decodedEmail = atob(email);
  //     const token = urlParams.get("token");
  //     const decodedToken = atob(token);

  //     const verifyEmail = async () => {
  //       try {
  //         const response = await confirmEmail({
  //           EmailAddress: decodedEmail,
  //           Token: decodedToken,
  //         });
  //         if (response.success === true) {
  //           setResponseData(true);
  //         }
  //       } catch (error) {
  //         if (error.response) {
  //           toast.error(error.response.data.message);
  //         }
  //       }
  //     };
  //     verifyEmail();
  //   }, []);

  return (
    <>
      {/* {responseData && ( */}
      <div className="text-center py-10 px-0 bg-[#EBF0F5] h-screen">
        <div className="bg-white p-[60px] rounded-md inline-block mt-20 mx-auto">
          <div className="rounded-[200px] h-[200px] w-[200px] bg-[#F5822033] my-0 mx-auto">
            <i className="text-[100px] leading-[200px] ml-[-15px] text-[#F58220]">
              ✓
            </i>
          </div>
          <h1 className="font-black text-[40px] mb-[10px] text-[#F58220]">
            Email Verification Successful
          </h1>
          <p className="text-xl m-0 text-[#030229]">
            You can now proceed to{" "}
            <span>
              <Link to="/login" className="text-[#F58220]">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default ConfirmEmail;
