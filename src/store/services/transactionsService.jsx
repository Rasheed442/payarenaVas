import http from "../../helpers/http";

export const getTransactions = async () => {
    const res = await http().get("/mobile/mytransactions");
    return res.data;
}