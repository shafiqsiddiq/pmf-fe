import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import BlogList from "./BlogList";
import RejectedTable from "./RejectedTable";
import AddUserModal from "../../adminSide/users/AddUserModal";

export default function UserDashboard() {
  const [blogsBackground, setBlogsBackground] = useState(0);
  const [viewState, setviewState] = useState(0);
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const [userModal, setUserModal] = useState(false);
  const [countBackground, setcountBackground] = useState(1);
  return (
    <div>
      <Row>
        <Row>
          <Col lg={12}>
            <div className="d-flex  justify-content-end pb-3 ">
              {/* <h3 className="  mb-2">
              User
            </h3> */}
              <div className="d-flex">
                <Button
                  data-tut="reactour__action"
                  className="btn-primary border-0"
                  onClick={() => setUserModal(true)}
                >
                  Add Resource
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* <Col md={4} sm={12} className="mb-sm-3" onClick={() => setviewState(0)}>
          <Card
            className={`${
              blogsBackground === 0
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setBlogsBackground(0);
              setcountBackground(0);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Total</p>
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
        </Col> */}

        {/* <Col md={4} sm={12} className="mb-sm-3" onClick={() => setviewState(2)}>
          <Card
            className={`${
              blogsBackground === 2
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setBlogsBackground(2);
              setcountBackground(2);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Pending</p>
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
        <Col md={4} sm={12} className="mb-sm-3" onClick={() => setviewState(3)}>
          <Card
            className={`${
              blogsBackground === 3
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setBlogsBackground(3);
              setcountBackground(3);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Rejected</p>
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
        </Col> */}
      </Row>
      <BlogList />
      <AddUserModal
        show={userModal}
        title="Add Resource"
        roleId="3"
        handleClose={() => setUserModal(false)}
      />
    </div>
  );
}
