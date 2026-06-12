import axiosInstance from "./axios";

export const borrowerApi = {
  getBorrowers: async () => (await axiosInstance.get("/borrowers")).data,
  getBorrower: async (id) => (await axiosInstance.get(`/borrowers/${id}`)).data,
  createBorrower: async (data) => (await axiosInstance.post("/borrowers", data)).data,
  updateBorrower: async (id, data) => (await axiosInstance.put(`/borrowers/${id}`, data)).data,
  deleteBorrower: async (id) => (await axiosInstance.delete(`/borrowers/${id}`)).data,
};