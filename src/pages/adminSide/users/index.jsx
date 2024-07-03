import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import AddUserModal from "./AddUserModal";
import UserList from "./UserList";

export default function User() {
  const [userModal, setUserModal] = useState(false);
  const [countBackground, setcountBackground] = useState(1);
  const [usersBackground, setusersBackground] = useState(1);
  const userData = JSON.parse(localStorage.getItem("pms_user"));
  return (
    <>
      <Row>
        {userData?.userRole === "Admin" && (
          <Col lg={12}>
            <div className="d-flex  justify-content-end pb-3 ">
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
        )}
      </Row>
      {/* <Row >
        <Col md={3} sm={12} className="mb-sm-3">
          <Card
            className={`${
              usersBackground === 1
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setusersBackground(1);
              setcountBackground(1);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Total Users</p>
              <p
                className={`${
                  countBackground === 1
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
              usersBackground === 2
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setusersBackground(2);
              setcountBackground(2);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">New Users</p>
              <p
                className={`${
                  countBackground === 2
                    ? "bg-cutom-color mb-0 p-1 rounded"
                    : "bg-light mb-0 p-1 rounded"
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
              usersBackground === 3
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setusersBackground(3);
              setcountBackground(3);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Active Users</p>
              <p
                className={`${
                  countBackground === 3
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
              usersBackground === 4
                ? "border-0 p-2 text-style-default cursor"
                : "border-0 p-2 text-style cursor"
            }`}
            onClick={() => {
              setusersBackground(4);
              setcountBackground(4);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className=" mb-0 card-internal-heading">Inactive Users</p>
              <p
                className={`${
                  countBackground === 4
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
      <UserList userTypeID={countBackground} />
      {userModal && (
        <AddUserModal
          show={userModal}
          title="Add Resource"
          roleId="2"
          handleClose={() => setUserModal(false)}
        />
      )}
    </>
  );
}
