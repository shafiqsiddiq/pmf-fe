import {
  getAllBlogsByLoginIDApi,
  getRequestedBlogApi,
  requestBlogApi,
} from "../api/blogsApi";
import { BLOGS, failure, request, success } from "./utilities";

export const getAllBlogsByLoginIDAction = (data) => {
  return (dispatch) => {
    dispatch(request(BLOGS.GET_ALL_BLOG_LOADING));
    getAllBlogsByLoginIDApi(data).then(
      (response) => {
         
        if (response.status === 200) {
          dispatch(success(BLOGS.GET_ALL_BLOG_SUCCESS, response.data));
        } else {
          dispatch(failure(BLOGS.GET_ALL_BLOG_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            BLOGS.GET_ALL_BLOG_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    );
  };
};

export const getRequestedBlogAction = (data) => {
  return (dispatch) => {
    dispatch(request(BLOGS.GET_REQUESTED_BLOG_LOADING));
    getRequestedBlogApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(BLOGS.GET_REQUESTED_BLOG_SUCCESS, response.data));
        } else {
          dispatch(
            failure(BLOGS.GET_REQUESTED_BLOG_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            BLOGS.GET_REQUESTED_BLOG_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    );
  };
};

export const requestBlogAction = (data,onSuccess) => {
  return (dispatch) => {
    dispatch(request(BLOGS.REQUEST_BLOG_LOADING));
    requestBlogApi(data).then(
      (response) => {
         
        if (response.status === 200) {
          dispatch(success(BLOGS.REQUEST_BLOG_SUCCESS, response.data));
          if(onSuccess){
            onSuccess()
          }
        } else {
          dispatch(failure(BLOGS.REQUEST_BLOG_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            BLOGS.REQUEST_BLOG_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    );
  };
};
