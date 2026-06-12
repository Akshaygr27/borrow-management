import axiosInstance from "./axios";

export const equipmentApi = {
  getEquipments: async () => (await axiosInstance.get("/equipments")).data,
  getEquipment: async (id) => (await axiosInstance.get(`/equipments/${id}`)).data,
  createEquipment: async (data) => (await axiosInstance.post("/equipments", data)).data,
  updateEquipment: async (id, data) => (await axiosInstance.put(`/equipments/${id}`, data)).data,
  deleteEquipment: async (id) => (await axiosInstance.delete(`/equipments/${id}`)).data,
};