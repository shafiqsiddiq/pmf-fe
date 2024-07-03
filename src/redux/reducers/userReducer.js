import { USER } from "../actions/utilities";
const INITIAL_STATE = {
  addUserLoading: false,
  addUserSuccess: false,
  addUserFailure: false,
  addUserError: null,

  editUserLoading: false,
  editUserSuccess: false,
  editUserFailure: false,
  editUserError: null,

  editTeamLoading: false,
  editTeamSuccess: false,
  editTeamFailure: false,
  editTeamError: null,
  editTeamData: null,

  deleteTeamLoading: false,
  deleteTeamSuccess: false,
  deleteTeamFailure: false,
  deleteTeamError: null,
  deleteTeamData: null,

  editProjectLoading: false,
  editProjectSuccess: false,
  editProjectFailure: false,
  editProjectError: null,
  editProjectData: null,

  deleteProjectLoading: false,
  deleteProjectSuccess: false,
  deleteProjectFailure: false,
  deleteProjectError: null,
  deleteProjectData: null,

  archiveUserLoading: false,
  archiveUserSuccess: false,
  archiveUserFailure: false,
  archiveUserError: null,

  deleteUserLoading: false,
  deleteUserSuccess: false,
  deleteUserFailure: false,
  deleteUserError: null,

  getBlogsByUserIdLoading: false,
  getBlogsByUserIdSuccess: false,
  getBlogsByUserIdFailure: false,
  getBlogsByUserIdError: null,

  userLoginLoading: false,
  userLoginSuccess: false,
  userLoginFailure: false,
  userLoginError: null,
  userLoginList: [],

  getUserLoading: false,
  getUserSuccess: false,
  getUserFailure: false,
  getUserError: null,
  userList: [],

  getUserNoLoginIdLoading: false,
  getUserNoLoginIdSuccess: false,
  getUserNoLoginIdFailure: false,
  getUserNoLoginIdError: null,
  getUserNoLoginIdData: [],

  generateBlogRequestLoading: false,
  generateBlogRequestSuccess: false,
  generateBlogRequestFailure: false,
  generateBlogRequestError: null,
  generateBlogRequest: [],

  getAllBlogRequestLoading: false,
  getAllBlogRequestSuccess: false,
  getAllBlogRequestFailure: false,
  getAllBlogRequestError: null,
  getAllBlogRequest: [],

  getAssetRequestByresourceLoading: false,
  getAssetRequestByresourceSuccess: false,
  getAssetRequestByresourceFailure: false,
  getAssetRequestByresourceError: null,
  getAssetRequestByresource: [],

  getAllAssetRequestLoading: false,
  getAllAssetRequestSuccess: false,
  getAllAssetRequestFailure: false,
  getAllAssetRequestError: null,
  getAllAssetRequest: [],

  createAssetRequestByresourceLoading: false,
  createAssetRequestByresourceSuccess: false,
  createAssetRequestByresourceFailure: false,
  createAssetRequestByresourceError: null,
  createAssetRequestByresource: [],

  editAssetRequestByresourceLoading: false,
  editAssetRequestByresourceSuccess: false,
  editAssetRequestByresourceFailure: false,
  editAssetRequestByresourceError: null,
  editAssetRequestByresource: [],

  getAllBlogRequestByUserLoading: false,
  getAllBlogRequestByUserSuccess: false,
  getAllBlogRequestByUserFailure: false,
  getAllBlogRequestByUserError: null,
  getAllBlogRequestByUser: [],

  blogChangestatusLoading: false,
  blogChangestatusSuccess: false,
  blogChangestatusFailure: false,
  blogChangestatusError: null,
  blogChangestatus: [],

  deleteRequestLoading: false,
  deleteRequestSuccess: false,
  deleteRequestFailure: false,
  deleteRequestError: null,

  deleteTaskLoading: false,
  deleteTaskSuccess: false,
  deleteTaskFailure: false,
  deleteTaskError: null,

  createProjectLoading: false,
  createProjectSuccess: false,
  createProjectFailure: false,
  createProjectError: null,
  createProject: [],

  createTeamLoading: false,
  createTeamSuccess: false,
  createTeamFailure: false,
  createTeamError: null,
  createTeam: [],

  getAllTeamsLoading: false,
  getAllTeamsSuccess: false,
  getAllTeamsFailure: false,
  getAllTeamsError: null,
  getAllTeamsData: [],

  getAllProjectLoading: false,
  getAllProjectSuccess: false,
  getAllProjectFailure: false,
  getAllProjectError: null,
  getAllProjectData: [],

  getAllTeamsByLoginIdLoading: false,
  getAllTeamsByLoginIdSuccess: false,
  getAllTeamsByLoginIdFailure: false,
  getAllTeamsByLoginIdError: null,
  getAllTeamsByLoginIdData: [],

  getTasksByProjectManagerLoading: false,
  getTasksByProjectManagerSuccess: false,
  getTasksByProjectManagerFailure: false,
  getTasksByProjectManagerError: null,
  getTasksByProjectManagerData: [],

  getAllSalleryResourcesLoading: false,
  getAllSalleryResourcesSuccess: false,
  getAllSalleryResourcesFailure: false,
  getAllSalleryResourcesError: null,
  getAllSalleryResourcesData: [],

  createSalleryResourceLoading: false,
  createSalleryResourceSuccess: false,
  createSalleryResourceFailure: false,
  createSalleryResourceError: null,
  createSalleryResourceData: [],

  deleteSalleryResourceLoading: false,
  deleteSalleryResourceSuccess: false,
  deleteSalleryResourceFailure: false,
  deleteSalleryResourceError: null,
  deleteSalleryResourceData: [],

  editSalleryResourceLoading: false,
  editSalleryResourceSuccess: false,
  editSalleryResourceFailure: false,
  editSalleryResourceError: null,
  editSalleryResourceData: [],

  getProjectProgressDataLoading: false,
  getProjectProgressDataSuccess: false,
  getProjectProgressDataFailure: false,
  getProjectProgressDataError: null,
  getProjectProgressData: [],

  getTeamLeadResourcesTasksLoading: false,
  getTeamLeadResourcesTasksSuccess: false,
  getTeamLeadResourcesTasksFailure: false,
  getTeamLeadResourcesTasksError: null,
  getTeamLeadResourcesTasksData: [],

  editTaskLoading: false,
  editTaskSuccess: false,
  editTaskFailure: false,
  editTaskError: null,
  editTaskData: [],

  getAllMyReourceDataTaskTasksLoading: false,
  getAllMyReourceDataTaskTasksSuccess: false,
  getAllMyReourceDataTaskTasksFailure: false,
  getAllMyReourceDataTaskTasksError: null,
  getAllMyReourceDataTaskTasksData: [],

  getResourceWithDecrepetedSalaryLoading: false,
  getResourceWithDecrepetedSalarySuccess: false,
  getResourceWithDecrepetedSalaryFailure: false,
  getResourceWithDecrepetedSalaryError: null,
  getResourceWithDecrepetedSalaryData: [],
};
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER.GET_DATA_BY_DECREPTED_KEY_LOADING:
      return {
        ...state,
        getResourceWithDecrepetedSalaryLoading: true,
        getResourceWithDecrepetedSalarySuccess: false,
        getResourceWithDecrepetedSalaryFailure: false,
        getResourceWithDecrepetedSalaryError: null,
      };
    case USER.GET_DATA_BY_DECREPTED_KEY_SUCCESS:
      return {
        ...state,
        getResourceWithDecrepetedSalaryLoading: false,
        getResourceWithDecrepetedSalarySuccess: true,
        getResourceWithDecrepetedSalaryFailure: false,
        getResourceWithDecrepetedSalaryError: null,
        getResourceWithDecrepetedSalaryData: action.payload,
      };
    case USER.GET_DATA_BY_DECREPTED_KEY_FAILURE:
      return {
        ...state,
        getResourceWithDecrepetedSalaryLoading: false,
        getResourceWithDecrepetedSalarySuccess: false,
        getResourceWithDecrepetedSalaryFailure: true,
        getResourceWithDecrepetedSalaryError: action.payload,
      };
    case USER.GET_ALL_RESOURCE_DATA_RESOURCE_LOADING:
      return {
        ...state,
        getAllMyReourceDataTaskTasksLoading: true,
        getAllMyReourceDataTaskTasksSuccess: false,
        getAllMyReourceDataTaskTasksFailure: false,
        getAllMyReourceDataTaskTasksError: null,
      };
    case USER.GET_ALL_RESOURCE_DATA_RESOURCE_SUCCESS:
      return {
        ...state,
        getAllMyReourceDataTaskTasksLoading: false,
        getAllMyReourceDataTaskTasksSuccess: true,
        getAllMyReourceDataTaskTasksFailure: false,
        getAllMyReourceDataTaskTasksError: null,
        getAllMyReourceDataTaskTasksData: action.payload,
      };
    case USER.GET_ALL_RESOURCE_DATA_RESOURCE_FAILURE:
      return {
        ...state,
        getAllMyReourceDataTaskTasksLoading: false,
        getAllMyReourceDataTaskTasksSuccess: false,
        getAllMyReourceDataTaskTasksFailure: true,
        getAllMyReourceDataTaskTasksError: action.payload,
      };

    case USER.GET_TEAM_LEAD_RESOURCES_TASKS_LOADING:
      return {
        ...state,
        getTeamLeadResourcesTasksLoading: true,
        getTeamLeadResourcesTasksSuccess: false,
        getTeamLeadResourcesTasksFailure: false,
        getTeamLeadResourcesTasksError: null,
      };
    case USER.GET_TEAM_LEAD_RESOURCES_TASKS_SUCCESS:
      return {
        ...state,
        getTeamLeadResourcesTasksLoading: false,
        getTeamLeadResourcesTasksSuccess: true,
        getTeamLeadResourcesTasksFailure: false,
        getTeamLeadResourcesTasksError: null,
        getTeamLeadResourcesTasksData: action.payload,
      };
    case USER.GET_TEAM_LEAD_RESOURCES_TASKS_FAILURE:
      return {
        ...state,
        getTeamLeadResourcesTasksLoading: false,
        getTeamLeadResourcesTasksSuccess: false,
        getTeamLeadResourcesTasksFailure: true,
        getTeamLeadResourcesTasksError: action.payload,
      };
    case USER.EDIT_TASK_LOADING:
      return {
        ...state,
        editTaskLoading: true,
        editTaskSuccess: false,
        editTaskFailure: false,
        editTaskError: null,
      };
    case USER.EDIT_TASK_SUCCESS:
      return {
        ...state,
        editTaskLoading: false,
        editTaskSuccess: true,
        editTaskFailure: false,
        editTaskError: null,
        editTaskData: action.payload,
      };
    case USER.EDIT_TASK_FAILURE:
      return {
        ...state,
        editTaskLoading: false,
        editTaskSuccess: false,
        editTaskFailure: true,
        editTaskError: action.payload,
      };
    case USER.EDIT_RESOURCE_SALLERY_LOADING:
      return {
        ...state,
        editSalleryResourceLoading: true,
        editSalleryResourceSuccess: false,
        editSalleryResourceFailure: false,
        editSalleryResourceError: null,
      };
    case USER.EDIT_RESOURCE_SALLERY_SUCCESS:
      return {
        ...state,
        editSalleryResourceLoading: false,
        editSalleryResourceSuccess: true,
        editSalleryResourceFailure: false,
        editSalleryResourceError: null,
        editSalleryResourceData: action.payload,
      };
    case USER.EDIT_RESOURCE_SALLERY_FAILURE:
      return {
        ...state,
        editSalleryResourceLoading: false,
        editSalleryResourceSuccess: false,
        editSalleryResourceFailure: true,
        editSalleryResourceError: action.payload,
      };
    case USER.GET_PROJECT_PROGRESS_DATA_LOADING:
      return {
        ...state,
        getProjectProgressDataLoading: true,
        getProjectProgressDataSuccess: false,
        getProjectProgressDataFailure: false,
        getProjectProgressDataError: null,
      };
    case USER.GET_PROJECT_PROGRESS_DATA_SUCCESS:
      return {
        ...state,
        getProjectProgressDataLoading: false,
        getProjectProgressDataSuccess: true,
        getProjectProgressDataFailure: false,
        getProjectProgressDataError: null,
        getProjectProgressData: action.payload,
      };
    case USER.GET_PROJECT_PROGRESS_DATA_FAILURE:
      return {
        ...state,
        getProjectProgressDataLoading: false,
        getProjectProgressDataSuccess: false,
        getProjectProgressDataFailure: true,
        getProjectProgressDataError: action.payload,
      };
    case USER.DELETE_RESOURCE_SALLERY_LOADING:
      return {
        ...state,
        deleteSalleryResourceLoading: true,
        deleteSalleryResourceSuccess: false,
        deleteSalleryResourceFailure: false,
        deleteSalleryResourceError: null,
      };
    case USER.DELETE_RESOURCE_SALLERY_SUCCESS:
      return {
        ...state,
        deleteSalleryResourceLoading: false,
        deleteSalleryResourceSuccess: true,
        deleteSalleryResourceFailure: false,
        deleteSalleryResourceError: null,
        deleteSalleryResourceData: action.payload,
      };
    case USER.DELETE_RESOURCE_SALLERY_FAILURE:
      return {
        ...state,
        deleteSalleryResourceLoading: false,
        deleteSalleryResourceSuccess: false,
        deleteSalleryResourceFailure: true,
        deleteSalleryResourceError: action.payload,
      };
    case USER.CREATE_SALLERY_RESOURCE_LOADING:
      return {
        ...state,
        createSalleryResourceLoading: true,
        createSalleryResourceSuccess: false,
        createSalleryResourceFailure: false,
        createSalleryResourceError: null,
      };
    case USER.CREATE_SALLERY_RESOURCE_SUCCESS:
      return {
        ...state,
        createSalleryResourceLoading: false,
        createSalleryResourceSuccess: true,
        createSalleryResourceFailure: false,
        createSalleryResourceError: null,
        createSalleryResourceData: action.payload,
      };
    case USER.CREATE_SALLERY_RESOURCE_FAILURE:
      return {
        ...state,
        createSalleryResourceLoading: false,
        createSalleryResourceSuccess: false,
        createSalleryResourceFailure: true,
        createSalleryResourceError: action.payload,
      };
    case USER.GET_ALL_SALLERY_RESOURCES_LOADING:
      return {
        ...state,
        getAllSalleryResourcesLoading: true,
        getAllSalleryResourcesSuccess: false,
        getAllSalleryResourcesFailure: false,
        getAllSalleryResourcesError: null,
      };
    case USER.GET_ALL_SALLERY_RESOURCES_SUCCESS:
      return {
        ...state,
        getAllSalleryResourcesLoading: false,
        getAllSalleryResourcesSuccess: true,
        getAllSalleryResourcesFailure: false,
        getAllSalleryResourcesError: null,
        getAllSalleryResourcesData: action.payload,
      };
    case USER.GET_ALL_SALLERY_RESOURCES_FAILURE:
      return {
        ...state,
        getAllSalleryResourcesLoading: false,
        getAllSalleryResourcesSuccess: false,
        getAllSalleryResourcesFailure: true,
        getAllSalleryResourcesError: action.payload,
      };
    case USER.GET_TASK_BY_PROJECT_MANAGER_LOADING:
      return {
        ...state,
        getTasksByProjectManagerLoading: true,
        getTasksByProjectManagerSuccess: false,
        getTasksByProjectManagerFailure: false,
        getTasksByProjectManagerError: null,
      };
    case USER.GET_TASK_BY_PROJECT_MANAGER_SUCCESS:
      return {
        ...state,
        getTasksByProjectManagerLoading: false,
        getTasksByProjectManagerSuccess: true,
        getTasksByProjectManagerFailure: false,
        getTasksByProjectManagerError: null,
        getTasksByProjectManagerData: action.payload,
      };
    case USER.GET_TASK_BY_PROJECT_MANAGER_FAILURE:
      return {
        ...state,
        getTasksByProjectManagerLoading: false,
        getTasksByProjectManagerSuccess: false,
        getTasksByProjectManagerFailure: true,
        getTasksByProjectManagerError: action.payload,
      };
    case USER.GET_ALL_PROJECTS_LOADING:
      return {
        ...state,
        getAllProjectLoading: true,
        getAllProjectSuccess: false,
        getAllProjectFailure: false,
        getAllProjectError: null,
      };
    case USER.GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        getAllProjectLoading: false,
        getAllProjectSuccess: true,
        getAllProjectFailure: false,
        getAllProjectError: null,
        getAllProjectData: action.payload,
      };
    case USER.GET_ALL_PROJECTS_FAILURE:
      return {
        ...state,
        getAllProjectLoading: false,
        getAllProjectSuccess: false,
        getAllProjectFailure: true,
        getAllProjectError: action.payload,
      };
    case USER.DELETE_REQUEST_LOADING:
      return {
        ...state,
        deleteRequestLoading: true,
        deleteRequestSuccess: false,
        deleteRequestFailure: false,
        deleteRequestError: null,
      };
    case USER.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        deleteRequestLoading: false,
        deleteRequestSuccess: true,
        deleteRequestFailure: false,
        deleteRequestError: null,
        deleteRequestData: action.payload,
      };
    case USER.DELETE_REQUEST_FAILURE:
      return {
        ...state,
        deleteRequestLoading: false,
        deleteRequestSuccess: false,
        deleteRequestFailure: true,
        deleteRequestError: action.payload,
      };
    case USER.CHANGE_REQUESTED_BLOG_STATUS_LOADING:
      return {
        ...state,
        blogChangestatusLoading: true,
        blogChangestatusSuccess: false,
        blogChangestatusFailure: false,
        blogChangestatusError: null,
      };
    case USER.CHANGE_REQUESTED_BLOG_STATUS_SUCCESS:
      return {
        ...state,
        blogChangestatusLoading: false,
        blogChangestatusSuccess: true,
        blogChangestatusFailure: false,
        blogChangestatusError: null,
        blogChangestatus: action.payload,
      };
    case USER.CHANGE_REQUESTED_BLOG_STATUS_FAILURE:
      return {
        ...state,
        blogChangestatusLoading: false,
        blogChangestatusSuccess: false,
        blogChangestatusFailure: true,
        blogChangestatusError: action.payload,
      };
    case USER.GET_BLOG_REQUEST_BY_USER_LOADING:
      return {
        ...state,
        getAllBlogRequestByUserLoading: true,
        getAllBlogRequestByUserSuccess: false,
        getAllBlogRequestByUserFailure: false,
        getAllBlogRequestByUserError: null,
      };
    case USER.GET_BLOG_REQUEST_BY_USER_SUCCESS:
      return {
        ...state,
        getAllBlogRequestByUserLoading: false,
        getAllBlogRequestByUserSuccess: true,
        getAllBlogRequestByUserFailure: false,
        getAllBlogRequestByUserError: null,
        getAllBlogRequestByUser: action.payload,
      };
    case USER.GET_BLOG_REQUEST_BY_USER_FAILURE:
      return {
        ...state,
        getAllBlogRequestByUserLoading: false,
        getAllBlogRequestByUserSuccess: false,
        getAllBlogRequestByUserFailure: true,
        getAllBlogRequestByUserError: action.payload,
      };
    case USER.GET_ALL_BLOG_REQUEST_LOADING:
      return {
        ...state,
        getAllBlogRequestLoading: true,
        getAllBlogRequestSuccess: false,
        getAllBlogRequestFailure: false,
        getAllBlogRequestError: null,
      };
    case USER.GET_ALL_BLOG_REQUEST_SUCCESS:
      return {
        ...state,
        getAllBlogRequestLoading: false,
        getAllBlogRequestSuccess: true,
        getAllBlogRequestFailure: false,
        getAllBlogRequestError: null,
        getAllBlogRequest: action.payload,
      };
    case USER.GET_ALL_BLOG_REQUEST_FAILURE:
      return {
        ...state,
        getAllBlogRequestLoading: false,
        getAllBlogRequestSuccess: false,
        getAllBlogRequestFailure: true,
        getAllBlogRequestError: action.payload,
      };
    case USER.GET_ASSET_REQUEST_BY_RESOURCE_LOADING:
      return {
        ...state,
        getAssetRequestByresourceLoading: true,
        getAssetRequestByresourceSuccess: false,
        getAssetRequestByresourceFailure: false,
        getAssetRequestByresourceError: null,
      };
    case USER.GET_ASSET_REQUEST_BY_RESOURCE_SUCCESS:
      return {
        ...state,
        getAssetRequestByresourceLoading: false,
        getAssetRequestByresourceSuccess: true,
        getAssetRequestByresourceFailure: false,
        getAssetRequestByresourceError: null,
        getAssetRequestByresource: action.payload,
      };
    case USER.GET_ASSET_REQUEST_BY_RESOURCE_FAILURE:
      return {
        ...state,
        getAssetRequestByresourceLoading: false,
        getAssetRequestByresourceSuccess: false,
        getAssetRequestByresourceFailure: true,
        getAssetRequestByresourceError: action.payload,
      };
    case USER.GET_ALL_ASSET_REQUEST_LOADING:
      return {
        ...state,
        getAllAssetRequestLoading: true,
        getAllAssetRequestSuccess: false,
        getAllAssetRequestFailure: false,
        getAllAssetRequestError: null,
      };
    case USER.GET_ALL_ASSET_REQUEST_SUCCESS:
      return {
        ...state,
        getAllAssetRequestLoading: false,
        getAllAssetRequestSuccess: true,
        getAllAssetRequestFailure: false,
        getAllAssetRequestError: null,
        getAllAssetRequest: action.payload,
      };
    case USER.GET_ALL_ASSET_REQUEST_FAILURE:
      return {
        ...state,
        getAllAssetRequestLoading: false,
        getAllAssetRequestSuccess: false,
        getAllAssetRequestFailure: true,
        getAllAssetRequestError: action.payload,
      };
    case USER.CREATE_ASSET_REQUEST_BY_RESOURCE_LOADING:
      return {
        ...state,
        createAssetRequestByresourceLoading: true,
        createAssetRequestByresourceSuccess: false,
        createAssetRequestByresourceFailure: false,
        createAssetRequestByresourceError: null,
      };
    case USER.CREATE_ASSET_REQUEST_BY_RESOURCE_SUCCESS:
      return {
        ...state,
        createAssetRequestByresourceLoading: false,
        createAssetRequestByresourceSuccess: true,
        createAssetRequestByresourceFailure: false,
        createAssetRequestByresourceError: null,
        //Update the listing for every new records added, no need to call listing api when new records added "By Shafiq Siddiq 05/17/2024"
        // createAssetRequestByresource: state?.getAssetRequestByresource?.data?.push(action.payload?.data),
        createAssetRequestByresource: action.payload,
      };
    case USER.CREATE_ASSET_REQUEST_BY_RESOURCE_FAILURE:
      return {
        ...state,
        createAssetRequestByresourceLoading: false,
        createAssetRequestByresourceSuccess: false,
        createAssetRequestByresourceFailure: true,
        createAssetRequestByresourceError: action.payload,
      };
    case USER.EDIT_ASSET_REQUEST_BY_RESOURCE_LOADING:
      return {
        ...state,
        editAssetRequestByresourceLoading: true,
        editAssetRequestByresourceSuccess: false,
        editAssetRequestByresourceFailure: false,
        editAssetRequestByresourceError: null,
      };
    case USER.EDIT_ASSET_REQUEST_BY_RESOURCE_SUCCESS:
      return {
        ...state,
        editAssetRequestByresourceLoading: false,
        editAssetRequestByresourceSuccess: true,
        editAssetRequestByresourceFailure: false,
        editAssetRequestByresourceError: null,
        //Update the listing for every new records added, no need to call listing api when new records added "By Shafiq Siddiq 05/17/2024"
        // editAssetRequestByresource: state?.getAssetRequestByresource?.data?.filter((asset)=>asset.assetId==action.payload?.data?.assetId),
        editAssetRequestByresource: action.payload,
      };
    case USER.EDIT_ASSET_REQUEST_BY_RESOURCE_FAILURE:
      return {
        ...state,
        editAssetRequestByresourceLoading: false,
        editAssetRequestByresourceSuccess: false,
        editAssetRequestByresourceFailure: true,
        editAssetRequestByresourceError: action.payload,
      };

    case USER.GENERATE_BLOG_REQUEST_LOADING:
      return {
        ...state,
        generateBlogRequestLoading: true,
        generateBlogRequestSuccess: false,
        generateBlogRequestFailure: false,
        generateBlogRequestError: null,
      };
    case USER.GENERATE_BLOG_REQUEST_SUCCESS:
      return {
        ...state,
        generateBlogRequestLoading: false,
        generateBlogRequestSuccess: true,
        generateBlogRequestFailure: false,
        generateBlogRequestError: null,
        generateBlogRequest: action.payload,
      };
    case USER.GENERATE_BLOG_REQUEST_FAILURE:
      return {
        ...state,
        generateBlogRequestLoading: false,
        generateBlogRequestSuccess: false,
        generateBlogRequestFailure: true,
        generateBlogRequestError: action.payload,
      };
    case USER.CREATE_PROJECT_LOADING:
      return {
        ...state,
        createProjectLoading: true,
        createProjectSuccess: false,
        createProjectFailure: false,
        createProjectError: null,
      };
    case USER.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        createProjectLoading: false,
        createProjectSuccess: true,
        createProjectFailure: false,
        createProjectError: null,
        createProject: action.payload,
      };
    case USER.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        createProjectLoading: false,
        createProjectSuccess: false,
        createProjectFailure: true,
        createProjectError: action.payload,
      };
    case USER.CREATE_TEAM_LOADING:
      return {
        ...state,
        createTeamLoading: true,
        createTeamSuccess: false,
        createTeamFailure: false,
        createTeamError: null,
      };
    case USER.CREATE_TEAM_SUCCESS:
      return {
        ...state,
        createTeamLoading: false,
        createTeamSuccess: true,
        createTeamFailure: false,
        createTeamError: null,
        createTeam: action.payload,
      };
    case USER.CREATE_TEAM_FAILURE:
      return {
        ...state,
        createTeamLoading: false,
        createTeamSuccess: false,
        createTeamFailure: true,
        createTeamError: action.payload,
      };
    case USER.GET_ALL_TEAMS_LOADING:
      return {
        ...state,
        getAllTeamsLoading: true,
        getAllTeamsSuccess: false,
        getAllTeamsFailure: false,
        getAllTeamsError: null,
      };
    case USER.GET_ALL_TEAMS_SUCCESS:
      return {
        ...state,
        getAllTeamsLoading: false,
        getAllTeamsSuccess: true,
        getAllTeamsFailure: false,
        getAllTeamsError: null,
        getAllTeams: action.payload,
      };
    case USER.GET_ALL_TEAMS_FAILURE:
      return {
        ...state,
        getAllTeamsLoading: false,
        getAllTeamsSuccess: false,
        getAllTeamsFailure: true,
        getAllTeamsError: action.payload,
      };
    case USER.GET_ALL_TEAMS_BY_LOGIN_ID_LOADING:
      return {
        ...state,
        getAllTeamsByLoginIdLoading: true,
        getAllTeamsByLoginIdSuccess: false,
        getAllTeamsByLoginIdFailure: false,
        getAllTeamsByLoginIdError: null,
      };
    case USER.GET_ALL_TEAMS_BY_LOGIN_ID_SUCCESS:
      return {
        ...state,
        getAllTeamsByLoginIdLoading: false,
        getAllTeamsByLoginIdSuccess: true,
        getAllTeamsByLoginIdFailure: false,
        getAllTeamsByLoginIdError: null,
        getAllTeamsByLoginId: action.payload,
      };
    case USER.GET_ALL_TEAMS_BY_LOGIN_ID_FAILURE:
      return {
        ...state,
        getAllTeamsByLoginIdLoading: false,
        getAllTeamsByLoginIdSuccess: false,
        getAllTeamsByLoginIdFailure: true,
        getAllTeamsByLoginIdError: action.payload,
      };

    case USER.LOGIN_USER_LOADING:
      return {
        ...state,
        userLoginLoading: true,
        userLoginSuccess: false,
        userLoginFailure: false,
        userLoginError: null,
      };
    case USER.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userLoginLoading: false,
        userLoginSuccess: true,
        userLoginFailure: false,
        userLoginError: null,
        userLoginData: action.payload,
      };
    case USER.LOGIN_USER_FAILURE:
      return {
        ...state,
        userLoginLoading: false,
        userLoginSuccess: false,
        userLoginFailure: true,
        userLoginError: action.payload,
      };

    case USER.GET_USER_LOADING:
      return {
        ...state,
        getUserLoading: true,
        getUserSuccess: false,
        getUserFailure: false,
        getUserError: null,
      };
    case USER.GET_USER_SUCCESS:
      return {
        ...state,
        getUserLoading: false,
        getUserSuccess: true,
        getUserFailure: false,
        getUserError: null,
        userList: action.payload,
      };
    case USER.GET_USER_FAILURE:
      return {
        ...state,
        getUserLoading: false,
        getUserSuccess: false,
        getUserFailure: true,
        getUserError: action.payload,
      };
    case USER.GET_USER_NO_LOGIN_ID_LOADING:
      return {
        ...state,
        getUserNoLoginIdLoading: true,
        getUserNoLoginIdSuccess: false,
        getUserNoLoginIdFailure: false,
        getUserNoLoginIdError: null,
      };
    case USER.GET_USER_NO_LOGIN_ID_SUCCESS:
      ;
      return {
        ...state,
        getUserNoLoginIdLoading: false,
        getUserNoLoginIdSuccess: true,
        getUserNoLoginIdFailure: false,
        getUserNoLoginIdError: null,
        getUserNoLoginIdData: action.payload,
      };
    case USER.GET_USER_NO_LOGIN_ID_FAILURE:
      return {
        ...state,
        getUserNoLoginIdLoading: false,
        getUserNoLoginIdSuccess: false,
        getUserNoLoginIdFailure: true,
        getUserNoLoginIdError: action.payload,
      };
    case USER.ADD_USER_LOADING:
      return {
        ...state,
        addUserLoading: true,
        addUserSuccess: false,
        addUserFailure: false,
        addUserError: null,
      };
    case USER.ADD_USER_SUCCESS:
      return {
        ...state,
        addUserLoading: false,
        addUserSuccess: true,
        addUserFailure: false,
        addUserError: null,
        generatedBlog: action.payload,
      };
    case USER.ADD_USER_FAILURE:
      return {
        ...state,
        addUserLoading: false,
        addUserSuccess: false,
        addUserFailure: true,
        addUserError: action.payload,
      };

    case USER.EDIT_USER_LOADING:
      return {
        ...state,
        editUserLoading: true,
        editUserSuccess: false,
        editUserFailure: false,
        editUserError: null,
      };
    case USER.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserLoading: false,
        editUserSuccess: true,
        editUserFailure: false,
        editUserError: null,
        generatedBlog: action.payload,
      };
    case USER.EDIT_USER_FAILURE:
      return {
        ...state,
        editUserLoading: false,
        editUserSuccess: false,
        editUserFailure: true,
        editUserError: action.payload,
      };
    case USER.EDIT_TEAM_LOADING:
      return {
        ...state,
        editTeamLoading: true,
        editTeamSuccess: false,
        editTeamFailure: false,
        editTeamError: null,
      };
    case USER.EDIT_TEAM_SUCCESS:
      return {
        ...state,
        editTeamLoading: false,
        editTeamSuccess: true,
        editTeamFailure: false,
        editTeamError: null,
        editTeamData: action.payload,
      };
    case USER.EDIT_TEAM_FAILURE:
      return {
        ...state,
        editTeamLoading: false,
        editTeamSuccess: false,
        editTeamFailure: true,
        editTeamError: action.payload,
      };
    case USER.DELETE_PROJECT_LOADING:
      return {
        ...state,
        deleteProjectLoading: true,
        deleteProjectSuccess: false,
        deleteProjectFailure: false,
        deleteProjectError: null,
      };
    case USER.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        deleteProjectLoading: false,
        deleteProjectSuccess: true,
        deleteProjectFailure: false,
        deleteProjectError: null,
        deleteProjectData: action.payload,
      };
    case USER.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        deleteProjectLoading: false,
        deleteProjectSuccess: false,
        deleteProjectFailure: true,
        deleteProjectError: action.payload,
      };
    case USER.EDIT_PROJECT_LOADING:
      return {
        ...state,
        editProjectLoading: true,
        editProjectSuccess: false,
        editProjectFailure: false,
        editProjectError: null,
      };
    case USER.EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        editProjectLoading: false,
        editProjectSuccess: true,
        editProjectFailure: false,
        editProjectError: null,
        editProjectData: action.payload,
      };
    case USER.EDIT_PROJECT_FAILURE:
      return {
        ...state,
        editProjectLoading: false,
        editProjectSuccess: false,
        editProjectFailure: true,
        editProjectError: action.payload,
      };
    case USER.DELETE_TEAM_LOADING:
      return {
        ...state,
        deleteTeamLoading: true,
        deleteTeamSuccess: false,
        deleteTeamFailure: false,
        deleteTeamError: null,
      };
    case USER.DELETE_TEAM_SUCCESS:
      return {
        ...state,
        deleteTeamLoading: false,
        deleteTeamSuccess: true,
        deleteTeamFailure: false,
        deleteTeamError: null,
        deleteTeamData: action.payload,
      };
    case USER.DELETE_TEAM_FAILURE:
      return {
        ...state,
        deleteTeamLoading: false,
        deleteTeamSuccess: false,
        deleteTeamFailure: true,
        deleteTeamError: action.payload,
      };
    case USER.DELETE_TASK_LOADING:
      return {
        ...state,
        deleteTaskLoading: true,
        deleteTaskSuccess: false,
        deleteTaskFailure: false,
        deleteTaskError: null,
      };
    case USER.DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskSuccess: true,
        deleteTaskFailure: false,
        deleteTaskError: null,
        deleteTaskData: action.payload,
      };
    case USER.DELETE_TASK_FAILURE:
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskSuccess: false,
        deleteTaskFailure: true,
        deleteTaskError: action.payload,
      };

    case USER.ARCHIVE_USER_LOADING:
      return {
        ...state,
        archiveUserLoading: true,
        archiveUserSuccess: false,
        archiveUserFailure: false,
        archiveUserError: null,
      };
    case USER.ARCHIVE_USER_SUCCESS:
      return {
        ...state,
        archiveUserLoading: false,
        archiveUserSuccess: true,
        archiveUserFailure: false,
        archiveUserError: null,
        generatedBlog: action.payload,
      };
    case USER.ARCHIVE_USER_FAILURE:
      return {
        ...state,
        archiveUserLoading: false,
        archiveUserSuccess: false,
        archiveUserFailure: true,
        archiveUserError: action.payload,
      };

    case USER.DELETE_USER_LOADING:
      return {
        ...state,
        deleteUserLoading: true,
        deleteUserSuccess: false,
        deleteUserFailure: false,
        deleteUserError: null,
      };
    case USER.DELETE_USER_SUCCESS:
      let deleteId = action.payload;
      let list = state.userList;
      let result = list.filter((item) => item.id !== deleteId);
      return {
        ...state,
        deleteUserLoading: false,
        deleteUserSuccess: true,
        deleteUserFailure: false,
        deleteUserError: null,
        userList: result,
      };
    case USER.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserLoading: false,
        deleteUserSuccess: false,
        deleteUserFailure: true,
        deleteUserError: action.payload,
      };
    case USER.GET_BLOGS_BY_USERID_LOADING:
      return {
        ...state,
        getBlogsByUserIdLoading: true,
        getBlogsByUserIdSuccess: false,
        getBlogsByUserIdFailure: false,
        getBlogsByUserIdError: null,
      };
    case USER.GET_BLOGS_BY_USERID_SUCCESS:
      return {
        ...state,
        getBlogsByUserIdLoading: false,
        getBlogsByUserIdSuccess: true,
        getBlogsByUserIdFailure: false,
        getBlogsByUserIdError: null,
        generatedBlog: action.payload,
      };
    case USER.GET_BLOGS_BY_USERID_FAILURE:
      return {
        ...state,
        getBlogsByUserIdLoading: false,
        getBlogsByUserIdSuccess: false,
        getBlogsByUserIdFailure: false,
        getBlogsByUserIdError: action.payload,
      };

    default:
      return state;
  }
};
