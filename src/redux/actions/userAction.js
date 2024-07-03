import {
  addUserApi,
  archiveUserApi,
  blogChangestatusApi,
  createNewSalleryResourceApi,
  createProjectApi,
  createTeamApi,
  deletTaskApi,
  deleteProjectApi,
  deleteSalleryResourceApi,
  deleteTeamApi,
  deleteUserApi,
  deleterequestApi,
  editNewSalleryResourceApi,
  editProjectApi,
  editTaskApi,
  editTeamApi,
  //   deleteUserApi,
  editUserApi,
  createTaskApi,
  getAllMyResourcerTask,
  getAllMyResourcerTaskApi,
  getAllProjectApi,
  getAllSalleryResourcesApi,
  getAllTeamsApi,
  getAllTeamsByoginIDApi,
  getAllUserApi,
  getAllUserWithoutLoginIdApi,
  getAllTasksApi,
  getBlogsByUserIdApi,
  getGenerateBlogRequestByLoginIdApi,
  getTasksByProjectManagerApi,
  getTasksByTreamLeadResurcesApi,
  getUserTasksApi,
  loginUserApi,
  matchEncryptionKeyValueApi,
  projectProgressDataApi,
  getTaskByUserIdApi,
  getAssetRequestByResourceApi,
  createAssetRequestApi,
  getAllAssetRequestApi,
  editAssetRequestApi,
} from "../api/userApi";
import { failure, request, success, USER } from "./utilities";
export const LoginUserAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.LOGIN_USER_LOADING));
    loginUserApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {
          dispatch(success(USER.LOGIN_USER_SUCCESS, response.data.data));
          localStorage.setItem("pms_user_token", response.data.access_token);
          // localStorage.setItem("pms_token_expiry", response.data.tokenExpire);
          if (onSuccess) {
            onSuccess(response.data.data);
          }
          if (Notification) {
            Notification("Login successfully", "success");
          }
        } else {
          dispatch(failure(USER.LOGIN_USER_FAILURE, response.data.message));
          if (Notification) {
            Notification("Something went wrong", "error");
          }
        }
      },
      (error) => {
        debugger
        dispatch(
          failure(
            USER.LOGIN_USER_FAILURE,
            error && error.message && error.message === "Network Error"
              ? Notification(error?.message, "error")
              : Notification(error.response.data.message, "error")
          )
        );
      }
    );
  };
};
export const getTaskByUserIdAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.GET_USER_LOADING));
    getTaskByUserIdApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {
          dispatch(success(USER.GET_USER_SUCCESS, response.data));
        } else {
          dispatch(failure(USER.GET_USER_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_USER_FAILURE,
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
export const getAllUserWithoutLoginIdAction = (req) => {
  return (dispatch) => {
    dispatch(request(USER.GET_USER_LOADING));
    getAllUserWithoutLoginIdApi(req).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.GET_USER_NO_LOGIN_ID_SUCCESS, response.data));
        } else {
          dispatch(
            failure(USER.GET_USER_NO_LOGIN_ID_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_USER_NO_LOGIN_ID_FAILURE,
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
export const addUserAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.ADD_USER_LOADING));
    addUserApi(data).then(
      (response) => {

        if (response.data.statusCode === 201) {
          dispatch(
            success(USER.ADD_USER_SUCCESS, response.data, response.statusText)
          );
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Record added successfully", "success");
          }
        } else {
          dispatch(failure(USER.ADD_USER_FAILURE, response.data.status));
          if (Notification) {
            Notification(response.data.status, "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.ADD_USER_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.status
              ? error.response.data.status
              : Notification(error.message, "error")
          )
        );
      }
    );
  };
};

export const editUserAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.EDIT_USER_LOADING));
    editUserApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {
          dispatch(success(USER.EDIT_USER_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("User updated successfully", "success");
          }
        } else {
          dispatch(
            failure(USER.GET_USER_NO_LOGIN_ID_FAILURE, response.data.message)
          );
          if (Notification) {
            Notification("User not updated", "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.EDIT_USER_FAILURE,
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
export const editTeamAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.EDIT_TEAM_LOADING));
    editTeamApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {
          dispatch(success(USER.EDIT_TEAM_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Team updated successfully", "success");
          }
        } else {
          dispatch(failure(USER.EDIT_TEAM_FAILURE, response.data.message));
          if (Notification) {
            Notification("Team not updated", "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.EDIT_TEAM_FAILURE,
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
export const editTaskAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.EDIT_TASK_LOADING));
    editTaskApi(data).then(
      (response) => {

        if (response.data.statusCode === 200) {
          dispatch(success(USER.EDIT_TASK_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Task updated successfully", "success");
          }
        } else {
          dispatch(failure(USER.EDIT_TASK_FAILURE, response.data.message));
          if (Notification) {
            Notification("Task not updated", "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.EDIT_TASK_FAILURE,
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
export const deleteTeamAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.DELETE_TEAM_LOADING));
    deleteTeamApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.DELETE_TEAM_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Team deleted successfully", "success");
          }
        } else {
          dispatch(failure(USER.DELETE_TEAM_FAILURE, response.data.message));
          if (Notification) {
            Notification("Team not deleted", "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.DELETE_TEAM_FAILURE,
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
export const editProjectAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.EDIT_PROJECT_LOADING));
    editProjectApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {
          dispatch(success(USER.EDIT_PROJECT_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Project updated successfully", "success");
          }
        } else {
          dispatch(failure(USER.EDIT_PROJECT_FAILURE, response.data.message));
          if (Notification) {
            Notification("Project not updated", "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.EDIT_PROJECT_FAILURE,
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
export const editNewSalleryResourceAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.EDIT_RESOURCE_SALLERY_LOADING));
    editNewSalleryResourceApi(data).then(
      (response) => {

        if (response.data.statusCode === 200) {
          dispatch(success(USER.EDIT_RESOURCE_SALLERY_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Resource sallery updated successfully", "success");
          }
        } else {
          dispatch(
            failure(USER.EDIT_RESOURCE_SALLERY_FAILURE, response.data.message)
          );
          if (Notification) {
            Notification("Resource sallery not updated", "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.EDIT_RESOURCE_SALLERY_FAILURE,
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
export const deleteNewSalleryResourceAction = (
  data,
  onSuccess,
  Notification
) => {
  return (dispatch) => {
    dispatch(request(USER.DELETE_RESOURCE_SALLERY_LOADING));
    deleteSalleryResourceApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.DELETE_RESOURCE_SALLERY_SUCCESS, response.data)
          );
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Resource deleted successfully", "success");
          }
        } else {
          dispatch(
            failure(USER.DELETE_RESOURCE_SALLERY_FAILURE, response.data.message)
          );
          if (Notification) {
            Notification("Resource not deleted", "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.DELETE_RESOURCE_SALLERY_FAILURE,
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
export const deleteProjectAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.DELETE_PROJECT_LOADING));
    deleteProjectApi(data).then(
      (response) => {

        if (response.data.statusCode === 200) {
          dispatch(success(USER.DELETE_PROJECT_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification(response.data.message, "success");
          }
        } else {
          dispatch(failure(USER.DELETE_PROJECT_FAILURE, response.data.message));
          if (Notification) {
            Notification(response.data.message, "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.DELETE_PROJECT_FAILURE,
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

export const archiveUserAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.ARCHIVE_USER_LOADING));
    archiveUserApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.ARCHIVE_USER_SUCCESS, response.data));
        } else {
          dispatch(failure(USER.ARCHIVE_USER_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.ARCHIVE_USER_FAILURE,
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

export const deleteUserAction = (data, onSuccess, Notification) => {

  return (dispatch) => {
    dispatch(request(USER.DELETE_USER_LOADING));
    // dispatch(success(USER.DELETE_USER_SUCCESS, data));
    deleteUserApi(data).then(
      (response) => {
        if (data) {
          dispatch(success(USER.DELETE_USER_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("User deleted successfuly", "success");
          }
        } else {
          dispatch(failure(USER.DELETE_USER_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.DELETE_USER_FAILURE,
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

export const getBlogsByUserIdAction = (data, userData) => {
  return (dispatch) => {
    dispatch(request(USER.GET_BLOGS_BY_USERID_LOADING));
    getBlogsByUserIdApi(data, userData).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.GET_BLOGS_BY_USERID_SUCCESS, response.data));
        } else {
          dispatch(
            failure(USER.GET_BLOGS_BY_USERID_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_BLOGS_BY_USERID_FAILURE,
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

export const createTaskAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.GENERATE_BLOG_REQUEST_LOADING));
    createTaskApi(data).then(
      (response) => {

        if (response.data.statusCode === 201) {
          dispatch(success(USER.GENERATE_BLOG_REQUEST_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification(response.data.message, "success");
          }
        } else {
          if (Notification) {
            Notification(response.data.status, "error");
          }
          dispatch(
            failure(USER.GENERATE_BLOG_REQUEST_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GENERATE_BLOG_REQUEST_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.status
              ? Notification(error.response.data.status, "error")
              : Notification(error.message, "error")
          )
        );
      }
    );
  };
};
export const createProjectAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.CREATE_PROJECT_LOADING));
    createProjectApi(data).then(
      (response) => {
        if (response.data.statusCode === 201) {
          dispatch(success(USER.CREATE_PROJECT_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification(response.data.status, "success");
          }
        } else {
          dispatch(failure(USER.CREATE_PROJECT_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.CREATE_PROJECT_FAILURE,
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
export const createTeamAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.CREATE_TEAM_LOADING));
    createTeamApi(data).then(
      (response) => {
        if (response.data.statusCode === 201) {
          dispatch(success(USER.CREATE_TEAM_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Team created successfully", "success");
          }
        } else {
          dispatch(failure(USER.CREATE_TEAM_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.CREATE_TEAM_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? Notification(error.response.data.message, "error")
              : Notification(error.message, "error")
          )
        );
      }
    );
  };
};
export const getAllTeamsAction = (req) => {
  return (dispatch) => {
    dispatch(request(USER.GET_ALL_TEAMS_LOADING));
    getAllTeamsApi(req).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.GET_ALL_TEAMS_SUCCESS, response.data));
        } else {
          dispatch(failure(USER.GET_ALL_TEAMS_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ALL_TEAMS_FAILURE,
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
export const getAllTeamsByoginIDAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.GET_ALL_TEAMS_BY_LOGIN_ID_LOADING));
    getAllTeamsByoginIDApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.GET_ALL_TEAMS_BY_LOGIN_ID_SUCCESS, response.data)
          );
          // if(onSuccess){
          //   onSuccess()
          // }
          // if(Notification){
          //   Notification(response.data.status, "success");
          // }
        } else {
          dispatch(
            failure(
              USER.GET_ALL_TEAMS_BY_LOGIN_ID_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ALL_TEAMS_BY_LOGIN_ID_FAILURE,
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
export const getAllProjectAction = (req) => {
  return (dispatch) => {
    dispatch(request(USER.GET_ALL_PROJECTS_LOADING));
    getAllProjectApi(req).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.GET_ALL_PROJECTS_SUCCESS, response.data));
        } else {
          dispatch(
            failure(USER.GET_ALL_PROJECTS_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ALL_PROJECTS_FAILURE,
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
export const BlogChangestatusAction = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(request(USER.CHANGE_REQUESTED_BLOG_STATUS_LOADING));
    blogChangestatusApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.CHANGE_REQUESTED_BLOG_STATUS_SUCCESS, response.data)
          );
          // if (Notification) {
          //   Notification("Status Change Successfully", "success");
          // }
          if (onSuccess) {
            onSuccess();
          }
        } else {
          dispatch(
            failure(
              USER.CHANGE_REQUESTED_BLOG_STATUS_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.CHANGE_REQUESTED_BLOG_STATUS_FAILURE,
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
export const getAllTasksAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.GET_ALL_BLOG_REQUEST_LOADING));
    getAllTasksApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.GET_ALL_BLOG_REQUEST_SUCCESS, response.data));
        } else {
          dispatch(
            failure(USER.GET_ALL_BLOG_REQUEST_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ALL_BLOG_REQUEST_FAILURE,
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
  }; s
};
export const getAssetRequestByResourceAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.GET_ASSET_REQUEST_BY_RESOURCE_LOADING));
    getAssetRequestByResourceApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {
          dispatch(success(USER.GET_ASSET_REQUEST_BY_RESOURCE_SUCCESS, response.data));
        } else {
          dispatch(
            failure(USER.GET_ASSET_REQUEST_BY_RESOURCE_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ASSET_REQUEST_BY_RESOURCE_FAILURE,
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
export const getAllAssetRequestAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.GET_ALL_ASSET_REQUEST_LOADING));
    getAllAssetRequestApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {
          dispatch(success(USER.GET_ALL_ASSET_REQUEST_SUCCESS, response.data));
        } else {
          dispatch(
            failure(USER.GET_ALL_ASSET_REQUEST_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ALL_ASSET_REQUEST_FAILURE,
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
export const createAssetRequestAction = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(request(USER.CREATE_ASSET_REQUEST_BY_RESOURCE_LOADING));
    createAssetRequestApi(data).then(
      (response) => {

        if (response.data.statusCode === 201) {
          dispatch(success(USER.CREATE_ASSET_REQUEST_BY_RESOURCE_SUCCESS, response.data));
          if (onSuccess) {

            onSuccess()
          }
        } else {
          dispatch(
            failure(USER.CREATE_ASSET_REQUEST_BY_RESOURCE_FAILURE, response.data.message)
          );

        }
      },
      (error) => {
        dispatch(
          failure(
            USER.CREATE_ASSET_REQUEST_BY_RESOURCE_FAILURE,
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
export const editAssetRequestAction = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(request(USER.EDIT_ASSET_REQUEST_BY_RESOURCE_LOADING));
    editAssetRequestApi(data).then(
      (response) => {

        if (response.data.statusCode === 200) {

          dispatch(success(USER.EDIT_ASSET_REQUEST_BY_RESOURCE_SUCCESS, response.data));
          if (onSuccess) {
            onSuccess()
          }
        } else {
          dispatch(
            failure(USER.EDIT_ASSET_REQUEST_BY_RESOURCE_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.EDIT_ASSET_REQUEST_BY_RESOURCE_FAILURE,
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
export const deleterequestAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.DELETE_REQUEST_LOADING));
    deleterequestApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(success(USER.DELETE_REQUEST_SUCCESS, response.data.data));
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Request Deleted", "success");
          }
        } else {
          dispatch(failure(USER.DELETE_REQUEST_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.DELETE_REQUEST_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? Notification(error.response.data.message, "error")
              : Notification(error.message, "error")
          )
        );
      }
    );
  };
};
export const deletTaskAction = (data, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.DELETE_TASK_LOADING));
    deletTaskApi(data).then(
      (response) => {

        if (response.data.statusCode === 200) {
          dispatch(success(USER.DELETE_TASK_SUCCESS, response.data.data));
          if (onSuccess) {

            onSuccess();
          }
          if (Notification) {
            Notification("Task Deleted", "success");
          }
        } else {
          dispatch(failure(USER.DELETE_TASK_FAILURE, response.data.message));
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.DELETE_TASK_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? Notification(error.response.data.message, "error")
              : Notification(error.message, "error")
          )
        );
      }
    );
  };
};
export const getUserTasksAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.GET_BLOG_REQUEST_BY_USER_LOADING));
    getUserTasksApi(data).then(
      (response) => {
        if (response.data.statusCode === 200) {

          dispatch(
            success(USER.GET_BLOG_REQUEST_BY_USER_SUCCESS, response.data?.data)
          );
        } else {
          dispatch(
            failure(
              USER.GET_BLOG_REQUEST_BY_USER_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_BLOG_REQUEST_BY_USER_FAILURE,
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
export const getTasksByProjectManagerAction = (data) => {
  return (dispatch) => {
    dispatch(request(USER.GET_TASK_BY_PROJECT_MANAGER_LOADING));
    getTasksByProjectManagerApi(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.GET_TASK_BY_PROJECT_MANAGER_SUCCESS, response.data)
          );
        } else {
          dispatch(
            failure(
              USER.GET_TASK_BY_PROJECT_MANAGER_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_TASK_BY_PROJECT_MANAGER_FAILURE,
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
export const createNewSalleryResourceAction = (
  data,
  onSuccess,
  Notification
) => {
  return (dispatch) => {
    dispatch(request(USER.CREATE_SALLERY_RESOURCE_LOADING));
    createNewSalleryResourceApi(data).then(
      (response) => {
        if (response.data.statusCode === 201) {
          dispatch(
            success(USER.CREATE_SALLERY_RESOURCE_SUCCESS, response.data)
          );
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Resource's sallery added successfully", "success");
          }
        } else {
          if (Notification) {
            Notification("Resource's sallery added successfully", "success");
          }
          dispatch(
            failure(USER.CREATE_SALLERY_RESOURCE_FAILURE, response.data.message)
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.CREATE_SALLERY_RESOURCE_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.status
              ? Notification(error.response.data.status, "error")
              : Notification("Network Error", "error")
          )
        );
      }
    );
  };
};
export const getAllSalleryResourcesAction = () => {
  return (dispatch) => {
    dispatch(request(USER.GET_ALL_SALLERY_RESOURCES_LOADING));
    getAllSalleryResourcesApi().then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.GET_ALL_SALLERY_RESOURCES_SUCCESS, response.data)
          );
        } else {
          dispatch(
            failure(
              USER.GET_ALL_SALLERY_RESOURCES_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ALL_SALLERY_RESOURCES_FAILURE,
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
export const projectProgressDataAction = (req) => {
  return (dispatch) => {
    dispatch(request(USER.GET_PROJECT_PROGRESS_DATA_LOADING));
    projectProgressDataApi(req).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.GET_PROJECT_PROGRESS_DATA_SUCCESS, response.data)
          );
        } else {
          dispatch(
            failure(
              USER.GET_PROJECT_PROGRESS_DATA_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_PROJECT_PROGRESS_DATA_FAILURE,
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
export const getTasksByTreamLeadResurcesAction = (req) => {
  return (dispatch) => {
    dispatch(request(USER.GET_TEAM_LEAD_RESOURCES_TASKS_LOADING));
    getTasksByTreamLeadResurcesApi(req).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.GET_TEAM_LEAD_RESOURCES_TASKS_SUCCESS, response.data)
          );
        } else {
          dispatch(
            failure(
              USER.GET_TEAM_LEAD_RESOURCES_TASKS_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_TEAM_LEAD_RESOURCES_TASKS_FAILURE,
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
export const getAllMyResourcerTaskAction = (req) => {
  return (dispatch) => {
    dispatch(request(USER.GET_ALL_RESOURCE_DATA_RESOURCE_LOADING));
    getAllMyResourcerTaskApi(req).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            success(USER.GET_ALL_RESOURCE_DATA_RESOURCE_SUCCESS, response.data)
          );
        } else {
          dispatch(
            failure(
              USER.GET_ALL_RESOURCE_DATA_RESOURCE_FAILURE,
              response.data.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_ALL_RESOURCE_DATA_RESOURCE_FAILURE,
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
export const matchEncryptionKeyValueAction = (req, onSuccess, Notification) => {
  return (dispatch) => {
    dispatch(request(USER.GET_DATA_BY_DECREPTED_KEY_LOADING));
    matchEncryptionKeyValueApi(req).then(
      (response) => {
        if (response.data.httpStatusCode === 200) {
          dispatch(
            success(USER.GET_DATA_BY_DECREPTED_KEY_SUCCESS, response.data)
          );
          if (onSuccess) {
            onSuccess();
          }
          if (Notification) {
            Notification("Salaray Decrepted", "success");
          }
        } else {
          dispatch(
            failure(
              USER.GET_DATA_BY_DECREPTED_KEY_FAILURE,
              response.data.message
            )
          );
          if (Notification) {
            Notification(response.data, "error");
          }
        }
      },
      (error) => {
        dispatch(
          failure(
            USER.GET_DATA_BY_DECREPTED_KEY_FAILURE,
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? Notification(error.response.data, "error")
              : Notification(error.data, "error")
          )
        );
      }
    );
  };
};
