import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.29.113:3000/v1",
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

export { apiClient };
