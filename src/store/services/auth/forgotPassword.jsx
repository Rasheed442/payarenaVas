import http from "../../../helpers/http"
import https from "../../../helpers/https";


export const forgetPassword = async (payload) => {
    const res = await http().post("/account/forgetpassword", payload);
    return res.data;
}

export const resetPassword = async (payload) => {
    const res = await http().post("/account/resetpassword", payload);
    return res.data;
}

export const passwordChange = async (payload) => {
    const response = await http().post("/account/changepassword", payload);
    return response.data;
};

export const updateProfile = async (payload) => {
    const response = await http().post("/account/update-profile", payload);
    return response.data;
};

export const updatePhoto = async (payload) => {
    const response = await https().post("/account/uploadPhoto", payload);
    return response.data;
};