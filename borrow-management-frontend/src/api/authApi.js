import axiosInstance from "./axios";

export const authApi = {
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data; // Expected: { token, user }
  },
  logout: async () => {
    return await axiosInstance.post("/auth/logout");
  },
  getProfile: async () => {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  },
};