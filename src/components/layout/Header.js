import React, { useState } from "react";
import IMAGES from "../../assets/images";
import Dropdown from "react-bootstrap/Dropdown";
// import { FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../utils/path";
// import { GoPrimitiveDot } from "react-icons/go";
// import { useDispatch } from "react-redux";
import { Badge, Breadcrumb, Form, Modal, Row } from "react-bootstrap";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import BlogRequestModal from "../genericModal/BlogRequestModal";
import GenerateBlogRequestModal from "../genericModal/GenerateBlogRequestModal";
import RequestSentModal from "../genericModal/RequestSentModal";
import RejectionBlogModal from "../genericModal/RejectionBlogModal";
import GenerateBlogModal from "../../pages/adminSide/generateBlogs/GenerateBlogModal";
import { useDispatch } from "react-redux";
import {
  createTaskAction,
  getUserTasksAction,
} from "../../redux/actions/userAction";
import { Notification } from "../genericActions";
import ProfileUpdateModal from "../genericModal/ProfileUpdateModal";
import { AiFillSetting } from "react-icons/ai";
export function Header() {
  document.body.style.backgroundColor = "#f5f5f5";
  let location = useLocation();
  let navigate = useNavigate();
  const [generateBlogModal, setGenerateBlogModal] = useState(false);
  const [requestBlogModal, setRequestBlogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [GenerateRequestBlogModal, setGenerateRequestBlogModal] =
    useState(false);
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const [requestSentModal, setRequestSentModal] = useState(false);
  const [rejectionBlogModal, setRejectionBlogModal] = useState(false);
  function requestBlog() {
    setGenerateRequestBlogModal(true);
  }
  function GenerateRequestBlog() {
    setGenerateRequestBlogModal(false);
    setRequestSentModal(true);
  }
  const Logout = () => {
    localStorage?.removeItem("pms_user");
    localStorage?.removeItem("pms_token_expiry");
    localStorage?.removeItem("pms_user_token");
    navigate(PATH.LOGIN);
  };
  const [show, setShow] = useState(false);
  const [blogRequestQuantity, setblogRequestQuantity] = useState();
  let dispatch = useDispatch();
  const onSuccess = () => {
    let req = {
      login_id: user?.loginUser?._id,
    };
    dispatch(getUserTasksAction(req));
    setblogRequestQuantity("");
    setShow(false);
  };
  const generateRequestBlog = () => {
    let req = {
      login_id: user?.loginUser?._id,
      blogRequestQuantity: +blogRequestQuantity,
      userName: user?.loginUser?.firstName + " " + user?.loginUser?.lastName,
    };
    dispatch(createTaskAction(req, onSuccess, Notification));
  };
  const handleClose = () => {
    setShow(false);
  };

  const UserNameTwoCharacter = user?.loginUser?.firstName?.slice(0, 2);
  return (
    <>
      <div className="header">
        {/* Logo */}
        <div className="PageName">
          {/* Mobile Menu Toggle */}
          <a href="javascript:void(0)" className="mobile_btn" id="mobile_btn">
            <FaBars />
          </a>
          <>
            {location.pathname === PATH.DASHBOARD && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Dashboard
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === PATH.VIEW_RESOURCES_TASKS && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    My Resources Tasks
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname.includes("/team-lead-dashboard") && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Dashboard
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname.includes("/my-team") && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Resources
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === PATH.USER && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                    onClick={() => navigate("/user")}
                  >
                    {user?.userRole === "Admin"
                      ? "Resources Settings"
                      : user?.loginUser?.roleId === "4"
                        ? "Resources"
                        : nul}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === PATH.GENERATE_TEAM && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                    onClick={() => navigate("/user")}
                  >
                    Project Team
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === "/project-progress" && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                    onClick={() => navigate("/projects")}
                  >
                    Projects &gt;
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Project Progress
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname.includes("/resource-tasks") &&
              user?.loginUser?.roleId === "1" && (
                <div className="col-12">
                  <Breadcrumb className="header-breadcrumb">
                    <Breadcrumb.Item
                      className="breadcrum_Project"
                      href="#"
                      onClick={() => navigate("/resources-settings")}
                    >
                      Resources &gt;
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      active
                      className="breadcrum_Project"
                      href="#"
                    >
                      Tasks
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              )}
            {location.pathname.includes("/resource-tasks") &&
              user?.loginUser?.roleId === "2" && (
                <div className="col-12">
                  <Breadcrumb className="header-breadcrumb">
                    <Breadcrumb.Item
                      className="breadcrum_Project"
                      href="#"
                      onClick={() => navigate("/my-team")}
                    >
                      Resources &gt;
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                      active
                      className="breadcrum_Project"
                      href="#"
                    >
                      Tasks
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              )}
            {location.pathname.includes("/task-list") && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Tasks List
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname.includes("/sallery-management") && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Salary Management
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname.includes("/sallery-settings") && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Salary Settings
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname.includes("/projectCost-estimation") && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Project Cost Estimation
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}

            {location.pathname === PATH.GENERATE_BLOG && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    className="breadcrum_Project"
                    href="#"
                    onClick={() => navigate("/user")}
                  >
                    Rersource &gt;
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    className="breadcrum_Project"
                    href="#"
                    onClick={() => navigate("/resource-tasks")}
                  >
                    Tasks &gt;
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Blog Generator
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === PATH.BLOG_REQUEST && (
              <div className="col-12">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    className="breadcrum_Project"
                    href="#"
                    active
                  >
                    Resources
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === PATH.MY_BLOG && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Projects
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === PATH.USER_BLOG_REQUEST && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Resources
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === PATH.ALL_QUERY_REQUESTS && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Resources Queries
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === "/all-tasks" && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Tasks List
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === "/query-request" && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                    Queries List
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
            {location.pathname === "/my-resources-requests" && (
              <div className="col-12 head-breadcrumb">
                <Breadcrumb className="header-breadcrumb">
                  <Breadcrumb.Item
                    active
                    className="breadcrum_Project"
                    href="#"
                  >
                   Resources Queries List
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            )}
          </>
        </div>
        {/* /Logo */}

        {/* /Mobile Menu Toggle */}
        <ul className="nav user-menu ">
          <li className="nav-item dropdown noti-dropdown pr-0 notification_dropdown">
            {/* <Notification /> */}
          </li>
          {/* {(location.pathname.includes("/user-profile") ||
            location.pathname.includes("/generate-blog") ||
            location.pathname.includes("/resources")) && (
            <li className="d-flex align-self-center me-4">
              <button
                className="btn-header"
                onClick={() => setGenerateBlogModal(true)}
              >
                Generate Blog
              </button>
            </li>
          )} */}
          {location.pathname.includes("/user-dashboard") && (
            <li className="d-flex align-self-center me-4">
              <button className="btn-header" onClick={() => setShow(true)}>
                Request Blog
              </button>
            </li>
          )}

          <li className="nav-item dropdown has-arrow ">
            <Dropdown className="user-dropdown  h-100">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="user_dropdown h-100 d-flex align-items-center"
              >
                <span className="user-img mt-0">
                  {/* <img
                    className="rounded-circle"
                    src={IMAGES.USER_HEADER_IMG}
                    width="31"
                    alt="Ryan Taylor"
                  /> */}
                  <div className="username-heading">
                    {user?.firstName?.[0] +
                      user?.lastName?.[0]}
                  </div>
                  <span className="text-black text-black-role ms-2">
                    {user?.firstName +
                      " " +
                      user?.lastName}{" "}
                    <span className="role-setting">
                      {user?.userRole === "Admin"
                        ? "Admin"
                        : user?.userRole === "TeamLead"
                          ? "Team Lead"
                          : user?.userRole === "ProjectManager"
                            ? "Project Manager"
                            : user?.userRole === "HumanResource" ? "Human Resou.." : "Resource"}
                    </span>
                  </span>
                </span>
              </Dropdown.Toggle>
              {/* <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="user_dropdown h-100"
              >
                <span className="user-img mt-0">
                  <img
                    className="rounded-circle"
                    src={IMAGES.USER_HEADER_IMG}
                    width="31"
                    alt="Ryan Taylor"
                  />
                  <span className="text-black ms-2">
                    {user?.loginUser?.firstName+" "+user?.loginUser?.lastName} 
                  </span>
                </span>
              </Dropdown.Toggle> */}
              <Dropdown.Menu className="profile-dropmenu">
                <Dropdown.Item
                  className="d-block px-0"
                  onClick={() => setProfileModal(true)}
                >
                  <AiFillSetting fill="#386697" className="me-2" />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-block px-0"
                  onClick={() => {
                    Logout();
                  }}
                >
                  <FaSignOutAlt color="#386697" className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        {/* <ReactTooltip /> */}
        <div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="md"
            // centered
            className="generate-blog-modal"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="align-self-center ">
              <h4 className="blog-modal-header mb-3">Quantity of Blogs</h4>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    size="sm"
                    value={blogRequestQuantity}
                    onChange={(e) => setblogRequestQuantity(e.target.value)}
                    placeholder="Enter Quantity of Blogs"
                  />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn-closeAndBack me-3" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  generateRequestBlog();
                }}
              >
                Submit Request
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <GenerateBlogModal
        show={generateBlogModal}
        handleClose={() => setGenerateBlogModal(false)}
      />
      <BlogRequestModal
        show={requestBlogModal}
        handleClose={() => setRequestBlogModal(false)}
        title="Request a blog"
        requestBlog={requestBlog}
      />
      <GenerateBlogRequestModal
        show={GenerateRequestBlogModal}
        handleClose={() => setGenerateRequestBlogModal(false)}
        generateRequestBlog={GenerateRequestBlog}
      />
      <RequestSentModal
        handleClose={() => setRequestSentModal(false)}
        show={requestSentModal}
      />
      <RejectionBlogModal
        handleClose={() => setRejectionBlogModal(false)}
        show={rejectionBlogModal}
      />
      <ProfileUpdateModal
        handleClose={() => setProfileModal(false)}
        show={profileModal}
      />
    </>
  );
}
