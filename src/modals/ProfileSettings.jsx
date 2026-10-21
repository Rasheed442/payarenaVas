import React, { useEffect, useRef, useState } from "react";
import defaultPic from "../assets/images/defaultPic.png"
import { updatePhoto, updateProfile } from "../store/services/auth/forgotPassword";
import { useProfile } from "../context/ProfileProvider";

export default function ProfileSettingsModal({ modal, closeModal }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const {setProfileFirstName,setProfileLastName,setProfilePic} = useProfile();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setPreviewImage(reader.result);
        try {
          const formData = new FormData();
          formData.append("file", file);

          // Call your API here
          const response = await updatePhoto(formData); // You may need to import this function
          setProfilePic(response.Data);
          console.log("Photo uploaded:", response);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProfile = {
      FirstName: firstName, LastName: lastName,
      Dob: dob, Address: address, Gender: gender
    }

    try {
      const response = await updateProfile(updatedProfile);
      // Update localStorage here
      const oldDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
      const merged = { ...oldDetails, ...updatedProfile };
      localStorage.setItem("userDetails", JSON.stringify(merged));
      setProfileFirstName(firstName);
      setProfileLastName(lastName);
      setLoading(false);

      // queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        setLoading(false);
      }

    }
  };

  // const handleProfileInfo = async () => {
  //   try {
  //     const res = await getProfileInfo();
  //     setProfileInfo(res.data);
  //     setFirstName(res.data.firstName); // Update state variables with profileInfo data
  //     setLastName(res.data.lastName);
  //     setEmailAddress(res.data.email);
  //     setPhoneNumber(res.data.phoneNumber);
  //     if (res.data.base64File) {
  //       // Convert binary data to a data URL
  //       const dataUrl = `data:image/jpeg;base64,${res.data.base64File}`;
  //       setPreviewImage(dataUrl);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       toast.error(error.response.data.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handleProfileInfo();
  // }, [globalProfile]);


  useEffect(() => {
    // Disable scroll on open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll on close
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const parseDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        // Format to YYYY-MM-DD
        return date.toISOString().split("T")[0];
      };
      setFirstName(parsedUser.FirstName || "");
      setLastName(parsedUser.Surname || "");
      setDob(parseDate(parsedUser.BirthDate || ""));
      setAddress(parsedUser.Address || "");
      setGender(parsedUser.Gender || "");
    }
  }, []);

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md min-h-screen flex flex-col absolute right-0 p-10">
        {/* Close Icon */}
        <svg
          onClick={closeModal}
          style={{ marginLeft: "auto", cursor: "pointer" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.94 1.02L2 0.08 0.11 1.96 1.06 2.9 2.94 1.02ZM17.06 18.89L18 19.83 19.89 17.94 18.94 17 17.06 18.89ZM1.06 17 0.11 17.94 2 19.83 2.94 18.89 1.06 17ZM18.94 2.9 19.89 1.96 18 0.08 17.06 1.02 18.94 2.9ZM1.06 2.9 17.06 18.89 18.94 17 2.94 1.02 1.06 2.9ZM2.94 18.89 18.94 2.9 17.06 1.02 1.06 17 2.94 18.89Z"
            fill="#252B33"
          />
        </svg>

        <div>
          <p className="text-3xl font-semibold">Update Profile</p>
          <p className="font-normal text-[20px] mt-1">
            Provide the required info below to update
            your profile
          </p>
          <div className="w-[100px] border-b mt-4 border-[#A7A9C0]"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">

          <input
            type="file"
            id="upload"
            name="upload"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <div
            className="w-[212px] h-[174px] flex flex-col items-center justify-center relative"
            onClick={handleImageClick}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-[114px] h-[114px]
             rounded-full"
              />
            ) : (
              <div className="flex-col items-center">
                <div className="w-[114px] h-[114px] bg-gray/20 rounded-full relative ">
                  <img
                    src={defaultPic}
                    alt="preview"
                    className="w-[38.4px] h-[31.74px] absolute top-9 right-9                                  "
                  />
                </div>
              </div>

            )}
            <p className="text-sm text-center w-[212px] h-[45px] mt-3 font-normal text-darker-grey">
              *The uploaded image must be 500px wide and 500px long
            </p>
          </div>




          {/* First Name */}

          <div>
            <label className="text-[#004663] text-[15px] font-medium">Enter First Name</label>
            <div className="relative mt-1">
              <input
                placeholder="Enter First Name"
                type="text"
                className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

            </div>
          </div>

          {/* Last Name */}

          <div>
            <label className="text-[#004663] text-[15px] font-medium">Enter Last Name</label>
            <div className="relative mt-1">
              <input
                placeholder="Enter last Name"
                type="text"
                className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

            </div>
          </div>

          {/* Date Of Birth */}
          <div>
            <label className="text-[#004663] text-[15px] font-medium">Enter Date of Birth</label>
            <div className="relative mt-1">
              <input
                type="date"
                className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-[#004663] text-[15px] font-medium">Enter Address</label>
            <div className="relative mt-1">
              <input
                placeholder="Enter Address"
                type="text"
                className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Gender */}
          <label className="text-[#004663] text-[15px] font-medium">Enter Gender</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full h-12 rounded border border-[#CDCDCD] px-4 pr-12 focus:outline-none"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 mt-6 bg-[#f58220] text-white font-semibold rounded hover:bg-[#e57210] transition"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>





    // <AppModal
    //   modalState={modal}
    //   heading="Update Profile"
    //   desc="Provide the required info below to update
    //   your profile"
    //   closeModal={closeModal}
    //   walletBalance={false}
    // >
    //   <Formik
    //     innerRef={formRef}
    //     initialValues={initialValues}
    //     validationSchema={validateSchema}
    //     onSubmit={() => {}}
    //   >
    //     {({ isSubmitting, isValid }) => (
    //       <div className="flex-[1] py-[0]">
    //         <Form className="mt-10">
    //           <Input
    //             error={error}
    //             showError={error}
    //             label="Enter Full Name"
    //             type="text"
    //             name="name"
    //             placeHolder="Enter Full Name"
    //           />

    //           <Input
    //             error={error}
    //             showError={error}
    //             label="Enter Email Address"
    //             type="email"
    //             name="account"
    //             placeHolder="Enter Email"
    //           />

    //           <Input
    //             error={error}
    //             showError={error}
    //             label="Enter Phone Number"
    //             type="number"
    //             name="number"
    //             placeHolder="Enter Phone Number"
    //           />

    //           <Button
    //             text="UPDATE"
    //             background="#F58220"
    //             color="#ffffff"
    //             style={{ flexDirection: "row-reverse", marginTop: "4rem" }}
    //             height="50px"
    //             fontSize="13px"
    //           />
    //         </Form>
    //       </div>
    //     )}
    //   </Formik>
    // </AppModal>
  );
}
