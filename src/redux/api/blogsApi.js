import axios from "axios";
import APP_SETTINGS from "../../config";

export function getAllBlogsByLoginIDApi(data) {
   
  return axios.post(`${APP_SETTINGS.API_PATH.getBlogsByUser}/${data?.login_id}`,data);
}

export function requestBlogApi(data) {
  return axios.post(APP_SETTINGS.API_PATH.generateBlog, data); 
}

export function getRequestedBlogApi(data) {
  return axios.post(APP_SETTINGS.API_PATH.generateBlog, data);
}
