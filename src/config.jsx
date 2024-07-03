// const baseUrlocal = "https://pmsapi.xeventechnologies.com/";
const baseUrlocal = "http://localhost:5000/api/";
const APP_SETTINGS = {
  API_PATH: {
    userLogin: baseUrlocal + "auth/login",
    // generateBlog: baseUrl + "/generate_blog_from_prompt",
    generateBlog: baseUrlocal + "getSearchData",
    user: baseUrlocal + "users/all",
    getTaskByUserId: baseUrlocal + "tasks",
    addUser: baseUrlocal + "auth/register",
    deleteUser: baseUrlocal + "users/delete",
    updateUser: baseUrlocal + "users/update",
    getBlogsByUser: baseUrlocal + "get/blogByloginId",
    createTask: baseUrlocal + "tasks",
    createProject: baseUrlocal + "projects",
    createTeam: baseUrlocal + "project-team",
    getAllTeams: baseUrlocal + "project-team/all",
    editTeam: baseUrlocal + "project-team",
    editTask: baseUrlocal + "tasks",
    deleteTeam: baseUrlocal + "deleteTeam",
    editProject: baseUrlocal + "projects",
    editSalleryResource: baseUrlocal + "resources-salary-management",
    deleteSalleryResource: baseUrlocal + "resources-salary-management",
    deleteProject: baseUrlocal + "projects",
    getAllProject: baseUrlocal + "projects/all",
    getAllTeamsByoginID: baseUrlocal + "getAllTeamsByLoginID",
    getAllTasks: baseUrlocal + "tasks",
    getUserTasks: baseUrlocal + "users/findUserByIdWithProjects",
    getTasksByProjectManager: baseUrlocal + "getTasksByProjectManager",
    blogChangestatus: baseUrlocal + "changeBlogStatus",
    deleterequest: baseUrlocal + "deleteResource",
    deletTask: baseUrlocal + "tasks",
    getAssetRequestByResource: baseUrlocal + "asset-request",
    getAllAssetRequest: baseUrlocal + "asset-request",
    createAssetRequest: baseUrlocal + "asset-request",
    editAssetRequest: baseUrlocal + "asset-request",
    createNewSalleryResource: baseUrlocal + "resources-salary-management",
    getAllSalleryResources: baseUrlocal + "resources-salary-management",
    projectProgressData: baseUrlocal + "projectProgressData",
    getTasksByTreamLeadResurces:
      baseUrlocal + "getCurrentDateTasksByTeamLeadResurces",
    getAllMyResourcesTasks: baseUrlocal + "getAllMyResourcesTasks",
    matchEncryptionKeyValue: baseUrlocal + "matchEncryptionKeyValue",
  },
};
export default APP_SETTINGS;