import React from "react";
import Profile from "../assets/images/profilePicture.png";
import { useProfile } from "../context/ProfileProvider";


export default function DashboardTopBar() {
  const { profileFirstName, profileLastName, profilePic } = useProfile();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("userDetails");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setFirstName(parsedUser.FirstName || "");
  //     setLastName(parsedUser.Surname || "");
  //   }
  // }, []);

  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4 md2:flex-col md2:items-stretch md2:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <input
          type="text"
          className="h-[46px] min-w-0 max-w-[812px] flex-1 rounded-lg border border-[#E3E3E8] bg-white px-4 text-sm text-[#464255] outline-none transition focus:border-[#F58220]"
          placeholder="Search institutions, users, or transactions..."
        />
        <div className="flex h-[46px] w-[132px] shrink-0 items-center justify-between rounded-lg border border-[#E3E3E8] bg-white px-3">
          <span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_564_3289)">
                <path
                  d="M14.25 2.25H13.5V0.75H12V2.25H6V0.75H4.5V2.25H3.75C2.925 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.925 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V3.75C15.75 2.925 15.075 2.25 14.25 2.25ZM14.25 14.25H3.75V6.75H14.25V14.25ZM3.75 5.25V3.75H14.25V5.25H3.75ZM5.25 8.25H12.75V9.75H5.25V8.25ZM5.25 11.25H10.5V12.75H5.25V11.25Z"
                  fill="#464255"
                />
              </g>
              <defs>
                <clipPath id="clip0_564_3289">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <p className="text-sm text-[#464255] font-medium">Today</p>
          <span>
            <svg
              width="12"
              height="6"
              viewBox="0 0 12 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 0.75L6 5.25L10.5 0.75"
                stroke="#464255"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 md2:self-end">
        <img src={profilePic || Profile} alt="" className="h-10 w-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <p className="text-[12px] font-medium text-[#0A0A1F]">
            <span>{profileFirstName}</span>  {""}
            <span>{profileLastName}</span>

          </p>
          <p
            className="font-bold text-[10px] text-[#FF0000] cursor-pointer"
            onClick={logout}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}
