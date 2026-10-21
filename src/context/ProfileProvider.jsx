/* eslint-disable react/prop-types */
import { useState, useContext, createContext } from "react";
import ProfileContext from "./ProfileContext";
// import CountryContext from "./CountryContext";


export const ProfileProvider = ({ children }) => {
    //const [profileFirstName, setProfileFirstName] = useState("");
    //const [profileLastName, setProfileLastName] = useState("");

    const [profileFirstName, setProfileFirstName] = useState(() => {
        // Load user data from local storage upon component initialization
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.FirstName ? user.FirstName : "";
        }
    });

    const [profileLastName, setProfileLastName] = useState(() => {
        // Load user data from local storage upon component initialization
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.Surname ? user.Surname : ""
        }
    });

    const [profilePic,setProfilePic] = useState(() => {
        // Load user data from local storage upon component initialization
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.ProfilePhoto ? user.ProfilePhoto : ""
        }
        })



    return (
        <ProfileContext.Provider
            value={{ profileFirstName, setProfileFirstName, profileLastName, setProfileLastName,profilePic,setProfilePic }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};
