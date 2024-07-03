import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { MdCall, MdFilterAlt, MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { TbWorld } from "react-icons/tb";
import EditUserProfileModal from "./EditUserProfileModal";
import BlogsList from "./BlogsList";
import IMAGES from "../../../assets/images";
import { useLocation } from "react-router-dom";
import { getUserTasksAction } from "../../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile() {
  const [editProfile, setEditProfile] = useState(false);
  let dispatch = useDispatch();
  const { state } = useLocation();
  useEffect(() => {
    let req = {
      login_id: state?.data?._id,
    };
    dispatch(getUserTasksAction(req));
  }, []);
  const userReducer = useSelector((state) => state?.user);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Card className="border-0 p-2">
            <div className="d-flex  justify-content-between  pb-3 ">
              <div className="user-profile mt-0 d-flex">
                <span className="user-img mt-0">
                  <div className="username-heading me-0">
                    {state?.data?.firstName?.[0] + state?.data?.lastName?.[0]}
                  </div>
                </span>
                <div className="ms-1 ps-1">
                  <h6 className="secondary-heading mb-1">
                    {state?.data?.firstName} {state?.data?.lastName}
                  </h6>
                  <p className="card-internal-text mb-0">
                    <AiOutlineMail className="me-3  generic-color" />
                    {state?.data?.email}
                  </p>
                  <Row className="mb-0 mt-2">
                    {/* <Col md={3} sm={6}>
                      <p className="card-internal-text mb-0">
                        <MdCall className="me-3 generic-color" />
                        +64 (1215 121)
                      </p>
                    </Col> */}
                    {/* <Col >
                      <p className="card-internal-text mb-0">
                        <AiOutlineMail className="me-3  generic-color" />
                        {state?.data?.email}
                      </p>
                    </Col> */}
                    {/* <Col md={3} sm={6}>
                      <p className="card-internal-text mb-0">
                        <TbWorld className="me-3 generic-color" />
                        www.johndoe.com
                      </p>
                    </Col> */}
                    {/* <Col md={3} sm={6}>
                      <p className="card-internal-text mb-0">
                        <SlLocationPin className="me-3 generic-color" />
                        981 Street 3 NY, USA
                      </p>
                    </Col> */}
                  </Row>
                </div>
              </div>
              {/* <div>
                <MdOutlineModeEdit
                  className="edit-icon-rounded cursor"
                  onClick={() => setEditProfile(true)}
                />
              </div> */}
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4 mb-2 px-2">
        <Col lg={12}>
          <div className="d-flex flex-wrap justify-content-between align-items-center ">
            {/* <h5 className="mb-2">{state?.data?.firstName} {state?.data?.lastName} Tasks</h5> */}
            <h5 className="mb-2">My Tasks</h5>
            {/* <div className="d-flex ">
              <Form.Group className="me-2">
                <Form.Control type="text" size="sm" placeholder="Search Task" />
              </Form.Group>
              <div className="filter-btn d-flex align-items-center view-all-button cursor-pointer text-white">
                <MdFilterAlt />
              </div>
            </div> */}
          </div>
        </Col>
      </Row>
      <Row>
        <BlogsList taskData={userReducer?.getAllBlogRequestByUser} />
      </Row>
      <EditUserProfileModal
        show={editProfile}
        handleClose={() => setEditProfile(false)}
        title="Profile"
      />
    </div>
  );
}
