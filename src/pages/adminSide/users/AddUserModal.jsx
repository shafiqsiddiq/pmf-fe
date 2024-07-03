import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "../../../components/genericActions";
import IMAGES from "../../../assets/images";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import {
  addUserAction,
  getAllUserAction,
  getAllUserWithoutLoginIdAction,
  getTaskByUserIdAction,
} from "../../../redux/actions/userAction";

export default function AddUserModal(props) {
  const [teamLeadOpen, setTeamLeadOpen] = useState(false);
  const [viewState, setViewState] = useState(false);
  const { show, handleClose, roleId, title } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const userToken = localStorage.getItem("pms_user_token");
  useEffect(() => {
    if (user?.userRole == "Admin") {
      let req = {
        search_text: '',
        limit: 10,
        isPagination: true,
        // comments \\\\\\\\\\\\\\\\\\\,
        page: 1,
      };
      dispatch(getAllUserWithoutLoginIdAction(req));
    }
  }, []);
  const userReducer = useSelector((state) => state.user);

  let userRole = userReducer?.getUserNoLoginIdData?.data
    ?.filter((item) => item?.userRole === "TeamLead")
    .map((filtered) => filtered);
  const onSuccess = () => {
    let req = {
      search_text: user?.userId,
      limit: 10,
      isPagination: true,
      page: 1,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
    handleClose()
  };


  function onSubmit(data) {
    
    let finalData = {
      loginId:
        user?.userRole === "Admin" &&
          title === "Add Resource" &&
          data.checkbox === true &&
          viewState === true
          ? data.teamLead
          : user?.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      userRole: data.roleId ? data.roleId : roleId,
    };
    dispatch(addUserAction(finalData, onSuccess, Notification));
  }
  const onHandleChage = (data) => {
    if (data === "Resource") {
      setTeamLeadOpen(true);
    } else if (data === "Admin" || data === "TeamLead" || data === "HumanResource" || data === "ProjectManager") {
      setTeamLeadOpen(false);
    }
  };

  const onHandleChage2 = (data) => {
    setViewState(!viewState);
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        className="user-modal"
      >
        <Modal.Header className="border-0 ">
          <Modal.Title> {title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Name"
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Name"
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Email</Form.Label>
                    <Form.Control
                      type="email"
                      size="sm"
                      placeholder="Enter Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>

                {user?.userRole === "Admin" && (
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        Select Role
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        {...register("roleId", { required: true })}
                        onChange={(e) => onHandleChage(e.target.value)}
                      >
                        <option value="Admin">Admin</option>
                        <option value="TeamLead">Team Lead</option>
                        <option value="Resource">Resource</option>
                        <option value="ProjectManager">Project Manager</option>
                        <option value="HumanResource">Human Resource</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Password</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Confirm Password"
                      {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      name="phoneNumber"
                      placeholder="Enter Phone"
                      {...register("phoneNumber", { required: true })}
                    />
                    {errors.phoneNumber && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                {user?.userRole === "Admin" &&
                  title === "Add Resource" &&
                  teamLeadOpen === true && (

                    <Col lg={6} md={6} sm={12}>
                      <input
                        type="checkbox"
                        {...register("checkbox")}
                        onChange={onHandleChage2}
                      />
                      <span className="checkbox_select_teamlead"> Select Team Lead:</span>
                      {viewState === true ? (
                        <select
                          {...register("teamLead")}
                          className="form-control mt-2"
                        >
                          {userRole?.map((item) => {
                            return (
                              <>
                                <option value={item?.userId}>
                                  {item?.firstName + " " + item?.lastName}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      ) : null}
                    </Col>

                  )}
              </Row>
            </Card.Body>
          </Modal.Body>
          <Modal.Footer className="border-0 ">
            <h6 className="me-3 cursor btn-closeAndBack" onClick={handleClose}>
              Cancel
            </h6>
            <Button className="btn-primary border-0 px-3" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
