import http from "../../helpers/http";
import https from "../../helpers/https";

export const otpWallet = async () => {
  const res = await http().get("mobile/validate-phone-number");
  return res.data;
};

export const createWallet = async (payload) => {
  const res = await http().post("mobile/create-wallet", payload);
  return res.data;
};

export const getGraphData = async () => {
  const res = await http().get("transaction/getgraphdata");
  return res.data;
};

export const validateBulk = async (payload) => {
  const res = await https().post("api/bulk/validate", payload);
  return res.data;
};

export const processBulk = async (payload) => {
  const res = await http().post("api/bulk/process", payload);
  return res.data;
};

export const walletBalance = async () => {
  const res = await http().get("mobile/balance");
  return res.data;
};
export const GetReward = async () => {
  const res = await http().get("loyalty/getloyalty");
  return res.data;
};

export const paymentWallet = async (payload) => {
  const res = await http().post("transaction/process",payload);
  return res.data;
} 