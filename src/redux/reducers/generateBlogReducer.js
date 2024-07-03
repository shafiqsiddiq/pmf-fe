import { GENERATEBLOG } from "../actions/utilities";

const INITIAL_STATE = {
  generateBlogLoading: false,
  generateBlogSuccess: false,
  generateBlogFailure: false,
  generateBlogError: null,
  generatedBlog: [],
};
export const generateBlogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GENERATEBLOG.GENERATE_BLOG_LOADING:
       
      return {
        ...state,
        generateBlogLoading: true,
        generateBlogSuccess: false,
        generateBlogFailure: false,
        generateBlogError: null,
      };
    case GENERATEBLOG.GENERATE_BLOG_SUCCESS:
       
      return {
        ...state,
        generateBlogLoading: false,
        generateBlogSuccess: true,
        generateBlogFailure: false,
        generateBlogError: null,
        generatedBlog: action.payload,
      };
    case GENERATEBLOG.GENERATE_BLOG_FAILURE:
       
      return {
        ...state,
        generateBlogLoading: false,
        generateBlogSuccess: false,
        generateBlogFailure: true,
        generateBlogError: action.payload,
      };
    default:
      return state;
  }
};
