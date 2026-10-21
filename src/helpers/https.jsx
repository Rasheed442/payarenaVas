import axios from "axios";

const https = () => {
    let options = {
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    if (localStorage.getItem("token")) {
        options.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return axios.create(options);
};

export default https;