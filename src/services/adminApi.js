import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
});

adminApi.interceptors.request.use((config) => {
  const user = localStorage.getItem("userAdmin");
  const accessToken = user ? JSON.parse(user)?.content.accessToken : "";
  config.headers = {
    ...config.headers,
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTMiLCJIZXRIYW5TdHJpbmciOiIxMi8wNi8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODEyMjI0MDAwMDAiLCJuYmYiOjE3NjI4ODQwMDAsImV4cCI6MTc4MTM3MzYwMH0.ZxhiMsctm3eKMVBpn81V6ioC1EwaG05VEeMMv-ReXVA",
    Authorization: `Bearer ${accessToken}`,
  };
  return config;
});

export default adminApi;
