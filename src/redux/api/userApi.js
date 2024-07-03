import axios from "axios";
import APP_SETTINGS from "../../config";
export async function loginUserApi(data) {
  const result = await axios.post(APP_SETTINGS.API_PATH.userLogin, data);
  return result
}
export const getAllUserWithoutLoginIdApi = (req) => {
  return axios.get(`${APP_SETTINGS.API_PATH.user}?isPagination=${req?.isPagination}&search_text=${req?.search_text}&limit=${req?.limit}&page=${req?.page}`);
};
export const getTaskByUserIdApi = (data) => {

  return axios.get(`${APP_SETTINGS.API_PATH.getTaskByUserId}/${data?.userId}?taskStatus=${data?.taskStatus || "All"}&search_text=${data?.search_text}&created_date=${data?.created_date}`);
};
export const addUserApi = (data) => {
  return axios.post(APP_SETTINGS.API_PATH.addUser, data);
};
export const editUserApi = (data) => {
  const { userId, ...rest } = data;
  return axios.put(`${APP_SETTINGS.API_PATH.updateUser}/${data?.userId}`, rest);
};
export const editTeamApi = (data) => {
  const { id, ...rest } = data;
  debugger
  return axios.put(`${APP_SETTINGS.API_PATH.editTeam}/${data?.id}`, rest);
};
export const deleteTeamApi = (data) => {
  return axios.delete(`${APP_SETTINGS.API_PATH.deleteTeam}/${data}`);
};
export const editProjectApi = (data) => {
  const { projectId, ...rest } = data;
  return axios.patch(`${APP_SETTINGS.API_PATH.editProject}/${data?.projectId}`, rest);
};

export const editNewSalleryResourceApi = (data) => {
  const { salaryId, ...rest } = data;
  debugger
  return axios.patch(`${APP_SETTINGS.API_PATH.editSalleryResource}/${data?.salaryId}`, rest);
};
export const deleteProjectApi = (data) => {
  debugger
  return axios.delete(`${APP_SETTINGS.API_PATH.deleteProject}/${data?.projectId}`);
};
export const deleteSalleryResourceApi = (data) => {
  return axios.delete(`${APP_SETTINGS.API_PATH.deleteSalleryResource}/${data?.salaryId}`);
};
export const archiveUserApi = (data) => {
  return axios.post(APP_SETTINGS.API_PATH.user, data);
};
export const deleteUserApi = (data) => {
  debugger
  return axios.delete(`${APP_SETTINGS.API_PATH.deleteUser}/${data}`);
};
export const getBlogsByUserIdApi = (data, userData) => {
  return axios.post(APP_SETTINGS.API_PATH.user, data, {
    headers: {
      Authorization: "Bearer " + userData,
    },
  });
};
export const getUserTasksApi = (data) => {
  return axios.get(`${APP_SETTINGS.API_PATH.getUserTasks}/${data?.userId}`);
};
export const getTasksByProjectManagerApi = (data) => {
  return axios.post(`${APP_SETTINGS.API_PATH.getTasksByProjectManager}`, data);
};
export const getAllTasksApi = (req) => {
  return axios.get(`${APP_SETTINGS.API_PATH.getAllTasks}?search_text=${req?.search_text}&limit=${req?.limit}&page=${req?.page}`);
};
export const getAssetRequestByResourceApi = (req) => {
  return axios.get(`${APP_SETTINGS.API_PATH.getAssetRequestByResource}/${req?.userId}`);
};
export const getAllAssetRequestApi = (req) => {
  return axios.get(`${APP_SETTINGS.API_PATH.getAllAssetRequest}?search_text=${req?.search_text}&limit=${req?.limit}&page=${req?.page}`);
};
export const createAssetRequestApi = (req) => {
  return axios.post(`${APP_SETTINGS.API_PATH.createAssetRequest}`, req);
};
export const editAssetRequestApi = (req) => {
  const { assetId, ...rest } = req;
  return axios.patch(`${APP_SETTINGS.API_PATH.editAssetRequest}/${req?.assetId}`, rest);
};
export const createTaskApi = (data) => {
  return axios.post(APP_SETTINGS.API_PATH.createTask, data);
};
export const createProjectApi = (data) => {
  return axios.post(APP_SETTINGS.API_PATH.createProject, data);
};
export const createTeamApi = (data) => {
  return axios.post(APP_SETTINGS.API_PATH.createTeam, data);
};
export const getAllTeamsApi = (req) => {
  return axios.get(`${APP_SETTINGS.API_PATH.getAllTeams}?search_text=${req?.search_text}&limit=${req?.limit}&page=${req?.page}`);
};
export const getAllTeamsByoginIDApi = (data) => {

  return axios.post(APP_SETTINGS.API_PATH.getAllTeamsByoginID, data);
};
export const getAllProjectApi = (req) => {
  return axios.get(`${APP_SETTINGS.API_PATH.getAllProject}?isPagination=${req?.isPagination}&search_text=${req?.search_text}&limit=${req?.limit}&page=${req?.page}`);
};
export function blogChangestatusApi(data) {
  return axios.put(`${APP_SETTINGS.API_PATH.blogChangestatus}/${data?.request_id}`, data);
}
export const deleterequestApi = (data) => {
  return axios.delete(
    `${APP_SETTINGS.API_PATH.deleterequest}/${data?.requestId}`
  );
};
export const deletTaskApi = (data) => {
  return axios.delete(
    `${APP_SETTINGS.API_PATH.deletTask}/${data}`
  );
};
export const createNewSalleryResourceApi = (data) => {
  return axios.post(APP_SETTINGS.API_PATH.createNewSalleryResource, data);
};
export const getAllSalleryResourcesApi = () => {
  return axios.get(APP_SETTINGS.API_PATH.getAllSalleryResources);
};
export const projectProgressDataApi = (req) => {
  return axios.post(APP_SETTINGS.API_PATH.projectProgressData, req);
};
export const getTasksByTreamLeadResurcesApi = (req) => {
  return axios.post(APP_SETTINGS.API_PATH.getTasksByTreamLeadResurces, req);
};
export const editTaskApi = (data) => {
  const { id, ...taskWithoutId } = data

  return axios.put(`${APP_SETTINGS.API_PATH.editTask}/${data?.id}`, taskWithoutId);
};
export const getAllMyResourcerTaskApi = (data) => {
  return axios.post(`${APP_SETTINGS.API_PATH.getAllMyResourcesTasks}`, data);
};
export const matchEncryptionKeyValueApi = (data) => {

  return axios.post(`${APP_SETTINGS.API_PATH.matchEncryptionKeyValue}`, data);
};