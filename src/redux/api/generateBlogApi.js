import axios from "axios";
import APP_SETTINGS from "../../config";

export function generateBlogApi(data) {
   
  return axios.post(APP_SETTINGS.API_PATH.generateBlog, data);
}
