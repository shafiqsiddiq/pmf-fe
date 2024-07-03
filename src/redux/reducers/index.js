import { combineReducers } from "redux";
import { blogsReducer } from "./blogsReducer";
import { generateBlogReducer } from "./generateBlogReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  generateBlog: generateBlogReducer,
  user: userReducer,
  blogs: blogsReducer,
});
