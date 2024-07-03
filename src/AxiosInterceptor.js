import axios from "axios";
import APP_SETTINGS from "./config";

export const axiosInterceptors = (token) => {
    
  return axios.interceptors.request.use((config) => {

    if (
      config?.url === APP_SETTINGS.API_PATH.userLogin
    ) {
      return config;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  });
};
