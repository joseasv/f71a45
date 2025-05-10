import axios from "axios";
import { apiBaseUrl } from "./constants";

let config = {
  baseURL: apiBaseUrl,
  timeout: 1000,
  withCredentials: true,
};

const instance = axios.create(config);

export default instance;