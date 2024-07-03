import React, { useEffect, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../../assets/images";
import RemoveModal from "../../../components/genericModal/RemoveModal";
import { getAllBlogsByLoginIDAction } from "../../../redux/actions/blogsAction";

export default function BlogsList({ taskData }) {
  const [removeBlogModal, setRemoveBlogModal] = useState(false);
  const [taskLists, settaskLists] = useState([]);

  function deleteBlog() {
  }
  const today = new Date();
  const calculateTotalTime = () => {
    const totalMinutes = taskData.reduce((total, item) => {
      return total + parseInt(item.estimatedTime);
    }, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${totalHours}h ${remainingMinutes}m`;
  };
  const [desiredDate, setdesiredDate] = useState(new Date().toISOString().slice(0, 10));
  const findTasksAndCalculateHours = () => {
    const filteredTasks = taskData.filter(
      (task) => task.createdDate === desiredDate
    );
    const totalMinutes = filteredTasks.reduce((total, item) => {
      return total + parseInt(item.estimatedTime);
    }, 0);
    // settaskLists(filteredTasks)
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${totalHours}h ${remainingMinutes}m`;
  };
  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          {/* <Row className=" mt-2">
            <Col md={3} sm={12} className="mb-sm-3">
              <Card
                className={`${
                  usersBackground === 0
                    ? "border-0 p-2 text-style-default cursor"
                    : "border-0 p-2 text-style cursor light-shadow"
                }`}
                onClick={() => {
                  setusersBackground(0);
                  setcountBackground(0);
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p className=" mb-0 card-internal-heading">All Blogs</p>
                  <p
                    className={`${
                      countBackground === 0
                        ? "bg-cutom-color mb-0 p-1 rounded"
                        : "bg-light mb-0 p-1 rounded"
                    } card-internal-heading`}
                  >
                    300
                  </p>
                </div>
              </Card>
            </Col>
            <Col md={3} sm={12} className="mb-sm-3">
              <Card
                className={`${
                  usersBackground === 1
                    ? "border-0 p-2 text-style-default cursor"
                    : "border-0 p-2 text-style cursor light-shadow"
                }`}
                onClick={() => {
                  setusersBackground(1);
                  setcountBackground(1);
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p className=" mb-0 card-internal-heading">Pending Blogs</p>
                  <p
                    className={`${
                      countBackground === 1
                        ? "bg-cutom-color mb-0 p-1 rounded"
                        : "bg-light mb-0 p-1 rounded "
                    } card-internal-heading`}
                  >
                    128
                  </p>
                </div>
              </Card>
            </Col>
            <Col md={3} sm={12} className="mb-sm-3">
              <Card
                className={`${
                  usersBackground === 2
                    ? "border-0 p-2 text-style-default cursor"
                    : "border-0 p-2 text-style cursor light-shadow"
                }`}
                onClick={() => {
                  setusersBackground(2);
                  setcountBackground(2);
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p className=" mb-0 card-internal-heading">Requested Blogs</p>
                  <p
                    className={`${
                      countBackground === 2
                        ? "bg-cutom-color mb-0 p-1 rounded"
                        : "bg-light mb-0 p-1 rounded"
                    } card-internal-heading`}
                  >
                    145
                  </p>
                </div>
              </Card>
            </Col>
            <Col md={3} sm={12} className="mb-sm-3">
              <Card
                className={`${
                  usersBackground === 3
                    ? "border-0 p-2 text-style-default cursor"
                    : "border-0 p-2 text-style cursor light-shadow"
                }`}
                onClick={() => {
                  setusersBackground(3);
                  setcountBackground(3);
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p className=" mb-0 card-internal-heading">Rejected Blogs</p>
                  <p
                    className={`${
                      countBackground === 3
                        ? "bg-cutom-color mb-0 p-1 rounded"
                        : "bg-light mb-0 p-1 rounded"
                    } card-internal-heading`}
                  >
                    100
                  </p>
                </div>
              </Card>
            </Col>
          </Row> */}
          <div className="mb-1 ">
            <Row>
              <Col md={8}>
              <div>
              <h5>Total Working Time : <span className="time-style"> {calculateTotalTime()}</span></h5>
              </div>
              </Col>
              <Col md={2}>
                <h5>Per Day Time : <span className="time-style"> {findTasksAndCalculateHours()}</span></h5>
              </Col>
              <Col md={2}>
                <input
                  className=" form-control "
                  type="date"
                  value={desiredDate}
                  onChange={(e) => setdesiredDate(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-4 mt-4">

              {taskData?.map((blog, index) => {
                return (
                  <>
                    <Col md={3} sm={12} className="mb-4">
                      <Card>
                        <div className=" card-img-div-styling">
                          <div className="d-flex justify-content-end m-1 user-profile">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                <BsThreeDots
                                  size={24}
                                  className="text-dark mb-2 me-1"
                                />
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="p-3 border-0">
                                <Dropdown.Item className="generic-color">
                                  <MdOutlineModeEdit
                                    size={14}
                                    className=" generic-color "
                                  />{" "}
                                  <span className="generic-color">Edit</span>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="delete-btn mt-2 border-0 text-white"
                                  // onClick={() => setRemoveBlogModal(true)}
                                >
                                  <RiDeleteBin6Line className="mb-1 me-1" />
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <p className="text-center">
                            <strong>{"Project Name"}</strong>
                            <br />
                            {blog.projectName}
                          </p>
                          {/* <div
                            className="d-flex justify-content-center m-1 "
                            onClick={() => navigate("/generate-blog")}
                          >
                            <img
                              className="blog-image-style cursor-pointer"
                              src={IMAGES.AVATAR}
                              alt="Ryan Taylor"
                            />
                          </div> */}
                        </div>
                        <div className="px-2 pt-1">
                          <p className="">
                            <strong>{"Created Date :"}</strong>
                            <br />
                            <span className="generic-text-muted mb-0">
                              {blog.createdDate}
                            </span>
                          </p>

                          <p>
                            <strong>{"Task Details : "}</strong>
                            <br /> {blog.taskName}
                          </p>
                        </div>
                      </Card>
                    </Col>
                  </>
                );
              })}
            </Row>
            <RemoveModal
              show={removeBlogModal}
              handleClose={() => setRemoveBlogModal(false)}
              title="Blog"
              remove={deleteBlog}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
