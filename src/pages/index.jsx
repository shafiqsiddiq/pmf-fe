import React from "react";
const Login = React.lazy(() => import("./login/index.jsx"));
const Dashboard = React.lazy(() => import("./adminSide/dashboard/index.jsx"));
const User = React.lazy(() => import("./adminSide/users/index.jsx"));
const Resource = React.lazy(() => import("./ResourceSide/index.jsx"));
const QueryRequest = React.lazy(() => import("./QueryRequest"));
const MyResourcesRequests = React.lazy(() => import("./QueryRequest/myResourcesRequests.jsx"));
const SalleryManagement = React.lazy(() => import("./adminSide/salleryManagement/index.jsx"));
const ResourceSettings = React.lazy(() => import("./adminSide/settings/index.jsx"));
const ProjectCostEstimation = React.lazy(() => import("./adminSide/projectCostEstimation/index.jsx"));
const projectprogress = React.lazy(() => import("./adminSide/projectProgress/index.jsx"));
const TaskList = React.lazy(() => import("./adminSide/taskList/index.js"));
const UserProfile = React.lazy(() =>
  import("./adminSide/users/UserProfile.jsx")
);
const CreateTeam = React.lazy(() =>
  import("./adminSide/generateBlogs/index.jsx")
);
const BlogRequest = React.lazy(() =>
  import("./adminSide/blogRequest/index.jsx")
);
const DsaPractice = React.lazy(() =>
  import("./DsaPractice/index.js")
);
const UserDashboard = React.lazy(() =>
  import("./userSide/userDashboard/index.jsx")
);
const MyBlog = React.lazy(() => import("./userSide/blogs/index.jsx"));
const UserBlogRequest = React.lazy(() =>
  import("./userSide/blogRequest/index.jsx")
);
const TeamLeadDashoard = React.lazy(() =>
  import("./TeamLeadDashboard/index.js")
);
const ViewAllTaskOfesources = React.lazy(() =>
  import("./TeamLeadDashboard/ViewAllTaskOfesources.js")
);
const AllQueryRequestsRequests = React.lazy(() =>
  import("./QueryRequest/adminSideRquests.js")
);

const WEB_PAGES = {
  LOGIN: Login,
  DASHBOARD: Dashboard,
  ADMIN_TASK_LIST: TaskList,
  USER: User,
  USER_PROFILE: UserProfile,
  GENERATE_TEAM: CreateTeam,
  BLOG_REQUEST: BlogRequest,
  USER_DASHBOARD: UserDashboard,
  QUERY_REQUEST: QueryRequest,
  MY_RESOURCES_REQUEST: MyResourcesRequests,
  ALL_QUERY_REQUESTS: AllQueryRequestsRequests,
  MY_BLOG: MyBlog,
  USER_BLOG_REQUEST: UserBlogRequest,
  RESOURCE_DASHBOARD: Resource,
  SALLERY_MANAGEMENT: SalleryManagement,
  RESOURCE_SALLERY_SETTINGS: ResourceSettings,
  PROJECT_COST_ESTIMATION: ProjectCostEstimation,
  PROJECT_PROGRESS: projectprogress,
  TEAM_LEAD_DASHBOARD: TeamLeadDashoard,
  VIEW_RESOURCES_TASKS: ViewAllTaskOfesources,
  DSA_PRACTICE: DsaPractice,
};
export default WEB_PAGES;
