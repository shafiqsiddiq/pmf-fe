import { generateBlogApi } from "../api/generateBlogApi";
import { failure, GENERATEBLOG, request, success } from "./utilities";

export const generateBlogAction = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(request(GENERATEBLOG.GENERATE_BLOG_LOADING));
    generateBlogApi(data).then(
      (response) => {
         
        if (response.status === 200) {
          dispatch(
            success(
              GENERATEBLOG.GENERATE_BLOG_SUCCESS,
              response.data.generated_text
            )
          );
          if (onSuccess) {
            onSuccess();
          }
        } else {
          dispatch(
            failure(GENERATEBLOG.GENERATE_BLOG_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            GENERATEBLOG.GENERATE_BLOG_FAILURE,
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
