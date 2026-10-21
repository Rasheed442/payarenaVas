import http from "../../helpers/http";

export const getDashboardData = async () => {
  const response = await http().get("/transaction/getdashboarddata");
  return response.data;
};

export const BulkRec = async (trxId) => {
  const response = await http().get(`/api/bulk/downloadstatement/${trxId}`, {
    responseType: "blob",
  });
  return response.data;
};
