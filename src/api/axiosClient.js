import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://5fa5abf2732de900162e9634.mockapi.io/app"
});
axiosClient.interceptors.response.use(
  res => {
    if (res && res.data) return res.data;
    return res;
  },
  err => {
    throw err;
  }
);
export default axiosClient;
