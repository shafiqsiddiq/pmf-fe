import { Routes, Route } from "react-router-dom";
import WEB_PAGES from "./pages";
import { PATH } from "./utils/path";
import PublicRoute from "./authorization/PublicRoute.jsx";
import ProtectedRoute from "./authorization/ProtectedRoute.jsx";
import { axiosInterceptors } from "./AxiosInterceptor";

function RouterConfig() {
  const user = localStorage.getItem("pms_user_token");
  axiosInterceptors(user)
  return (
    <Routes>
      <Route
        path={PATH.LOGIN}
        element={<PublicRoute element={<WEB_PAGES.LOGIN />} />}ss
      />
      <Route
        path={PATH.DASHBOARD}
        element={<ProtectedRoute element={<WEB_PAGES.DASHBOARD />} />}
      />
      <Route
        path={PATH.QUERY_REQUEST}
        element={<ProtectedRoute element={<WEB_PAGES.QUERY_REQUEST />} />}
      />
      <Route
        path={PATH.MY_RESOURCES_REQUEST}
        element={<ProtectedRoute element={<WEB_PAGES.MY_RESOURCES_REQUEST />} />}
      />
      <Route
        path={PATH.ALL_QUERY_REQUESTS}
        element={<ProtectedRoute element={<WEB_PAGES.ALL_QUERY_REQUESTS />} />}
      />
      <Route
        path={PATH.ADMIN_TASK_LIST}
        element={<ProtectedRoute element={<WEB_PAGES.ADMIN_TASK_LIST />} />}
      />
      <Route
        path={PATH.PROJECT_PROGRESS}
        element={<ProtectedRoute element={<WEB_PAGES.PROJECT_PROGRESS />} />}
      />
      <Route
        path={PATH.TEAM_LEAD_DASHBOARD}
        element={<ProtectedRoute element={<WEB_PAGES.TEAM_LEAD_DASHBOARD />} />}
      />
      <Route
        path={PATH.DSA_PRACTICE}
        element={<ProtectedRoute element={<WEB_PAGES.DSA_PRACTICE />} />}
      />
      
      <Route
        path={PATH.USER_DASHBOARD}
        element={<ProtectedRoute element={<WEB_PAGES.USER_DASHBOARD />} />}
      />
      <Route
        path={PATH.USER}
        element={<ProtectedRoute element={<WEB_PAGES.USER />} />}
      />
      <Route
        path={PATH.USER_PROFILE}
        element={<ProtectedRoute element={<WEB_PAGES.USER_PROFILE />} />}
      />
      <Route
        path={PATH.GENERATE_TEAM}
        element={<ProtectedRoute element={<WEB_PAGES.GENERATE_TEAM />} />}
      />
      <Route
        path={PATH.BLOG_REQUEST}
        element={<ProtectedRoute element={<WEB_PAGES.BLOG_REQUEST />} />}
      />
      <Route
        path={PATH.VIEW_RESOURCES_TASKS}
        element={<ProtectedRoute element={<WEB_PAGES.VIEW_RESOURCES_TASKS />} />}
      />
      <Route
        path={PATH.MY_BLOG}
        element={<ProtectedRoute element={<WEB_PAGES.MY_BLOG />} />}
      />
      <Route
        path={PATH.USER_BLOG_REQUEST}
        element={<ProtectedRoute element={<WEB_PAGES.USER_BLOG_REQUEST />} />}
      />
      <Route
        path={PATH.RESOURCE_SALLERY_SETTINGS}
        element={<ProtectedRoute element={<WEB_PAGES.RESOURCE_SALLERY_SETTINGS />} />}
      />
      <Route
        path={PATH.PROJECT_COST_ESTIMATION}
        element={<ProtectedRoute element={<WEB_PAGES.PROJECT_COST_ESTIMATION />} />}
      />
      <Route
        path={PATH.SALLERY_MANAGEMENT}
        element={<ProtectedRoute element={<WEB_PAGES.SALLERY_MANAGEMENT />} />}
      />
      <Route
        path={PATH.RESOURCE_DASHBOARD}
        element={<ProtectedRoute element={<WEB_PAGES.RESOURCE_DASHBOARD />} />}
      />
    </Routes>
  );
}

export default RouterConfig;
