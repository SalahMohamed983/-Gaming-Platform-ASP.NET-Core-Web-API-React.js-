import axios from "axios";

const api = axios.create({
  baseURL: "https://sahgaming.runasp.net/api",
});

export default api;