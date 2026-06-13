export const storage = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token) => localStorage.setItem("token", token),
  clearToken: () => localStorage.removeItem("token"),
  setUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch (e) {
      console.error("Error parsing user data from localStorage:", e);
      return null;
    }
  },
  clearAll: () => localStorage.clear(),
};