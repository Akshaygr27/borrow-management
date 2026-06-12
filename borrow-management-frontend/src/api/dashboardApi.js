import axiosInstance from "./axios";

export const dashboardApi = {
  getDashboardStats: async () => (await axiosInstance.get("/dashboard")).data,
};