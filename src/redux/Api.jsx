import axios from "axios";
import config from "./Config";

const api = axios.create({
  baseURL: config.url,
});

export default api;