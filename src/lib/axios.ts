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
  followUser: async (userId: string) => {
    const { data } = await axios.post("/api/follow-user/" + userId);
    return data;
  },
  createPost: async (content: string) => {
    const { data } = await axios.post("/api/create-post", { content });
    return data;
  },
  getPosts: async () => {
    const { data } = await axios.get("/api/get-posts");
    return data;
  },
  getUserPosts: async (userId: string) => {
    const { data } = await axios.get("/api/get-user-posts/" + userId);
    return data;
  },
  getPost: async (postId: string) => {
    const { data } = await axios.get("/api/get-post/" + postId);
    return data;
  },
  likePost: async (postId: string) => {
    const { data } = await axios.post("/api/like-post/" + postId);
    return data;
  },
  replyToPost: async (postId: string, content: string) => {
    const { data } = await axios.post("/api/reply-post/" + postId, { content });
    return data;
  },
  searchUser: async (query: string) => {
    const { data } = await axios.post("/api/search-users", { query });
    return data;
  },
};
