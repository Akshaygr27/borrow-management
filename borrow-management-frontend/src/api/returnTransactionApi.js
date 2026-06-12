import axiosInstance from "./axios";

export const returnTransactionApi = {
  returnEquipment: async (data) => (await axiosInstance.post("/returns", data)).data,
};