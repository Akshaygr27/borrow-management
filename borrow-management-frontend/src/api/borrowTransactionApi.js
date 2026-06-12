import axiosInstance from "./axios";

export const borrowTransactionApi = {
  getTransactions: async () => (await axiosInstance.get("/borrow-transactions")).data,
  getTransaction: async (id) => (await axiosInstance.get(`/borrow-transactions/${id}`)).data,
  createTransaction: async (data) => (await axiosInstance.post("/borrow-transactions", data)).data,
};