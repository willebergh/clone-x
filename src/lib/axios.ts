import axios from "axios";

export default {
  getCurrentUser: async () => {
    const { data } = await axios.get("/api/get-current-user");
    return data;
  },
  getUser: async (userId: string) => {
    const { data } = await axios.get("/api/get-user/" + userId);
    return data;
  },
};
