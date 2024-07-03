import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../../assets/images";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import { Notification } from "../../../components/genericActions";
import {
  editUserAction,
  getAllUserAction,
  getAllUserWithoutLoginIdAction,
  getTaskByUserIdAction,
} from "../../../redux/actions/userAction";
export default function EditUserProfileModal(props) {
  const [teamLeadOpen, setTeamLeadOpen] = useState(false);
  const [viewState, setViewState] = useState(false);
  const { show, handleClose, title, row } = props;
  const {
    register,
    handleSubmit, setValue,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("pms_user"));
  useEffect(() => {
    if (row) {
      
      setValue(
        "firstName",
        row?.firstName || ""
      );
      setValue(
        "lastName",
        row?.lastName || ""
      );
      setValue(
        "password",
        row?.password || ""
      );
      setValue(
        "email",
        row?.email || ""
      );
      setValue(
        "userRole",
        row?.userRole || ""
      );
      setValue(
        "phoneNumber",
        row?.phoneNumber || ""
      );
    }
  }, [row]);
  let dispatch = useDispatch();
  const userToken = localStorage.getItem("pms_user_token");
  const onSuccess = () => {
    let finalData = {
      login_id: user?.loginUser?._id,
    };
    dispatch(getTaskByUserIdAction(finalData));

    handleClose();
  };
  function onSubmit(data) {
    ;
    let finalData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      userRole:row?.userRole,
      loginId: row?.loginId,
      userId: row?.userId
    };
    dispatch(editUserAction(finalData, onSuccess, Notification));
  }
  const onHandleChage = (data) => {

    if (data === "3") {
      // setTeamLeadOpen(true);
      setTeamLeadOpen(false);
    } else if (data === "1" || data === "2") {
      setTeamLeadOpen(false);
    }
  };

  const onHandleChage2 = (data) => {
    ;
    setViewState(!viewState);
  };
  useEffect(() => {

    let req = {
      search_text: user?.userId,
      limit: 10,
      isPagination: true,
      page: 1,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, []);
  const userReducer = useSelector((state) => state.user);
  let userRole = userReducer?.getUserNoLoginIdData?.data
    ?.filter((item) => item?.userRole === "Resource")
    .map((filtered) => filtered);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="user-modal"
      >
        <Modal.Header className="border-0 ">
          <Modal.Title>Edit {title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Card.Body>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Name"
                      // defaultValue={row?.firstName}
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Name"
                      // defaultValue={row?.lastName}
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Email</Form.Label>
                    <Form.Control
                      type="email"
                      size="sm"
                      placeholder="Enter Email"
                      // defaultValue={row?.email}
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                {user?.loginUser?.userRole === "1" && (
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        Select Role
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        {...register("userRole", { required: true })}
                        onChange={(e) => onHandleChage(e.target.value)}
                      >
                        <option value="1">Admin</option>
                        <option value="2">Team Lead</option>
                        <option value="3">Resource</option>
                        <option value="4">Project Manager</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
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
                {user?.loginUser?.userRole === "1" && (
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">
                        Select Role
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        {...register("userRole", { required: true })}
                        onChange={(e) => onHandleChage(e.target.value)}
                      >
                        <option value="1">Admin</option>
                        <option value="2">Team Lead</option>
                        <option value="3">Resource</option>
                        <option value="4">Project Manager</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </Row>

              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Password</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Password"
                      // defaultValue={row?.password}
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Confirm Password"
                      defaultValue={row?.confirmPassword}
                      {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {user?.userRole == "Admin" &&
                teamLeadOpen === true && (
                  <Row>
                    <Col>
                      <label>
                        <input
                          type="checkbox"
                          {...register("checkbox")}
                          onChange={onHandleChage2}
                        />
                        Select Team Lead:
                      </label>
                    </Col>
                    {viewState === true ? (
                      <Col>
                        <Form.Label className="label-primary">
                          Team Lead
                        </Form.Label>
                        <select
                          {...register("teamLead")}
                          className="form-control"
                        >
                          {userRole?.map((item) => {
                            return (
                              <>
                                <option value={item?._id}>
                                  {item?.firstName + " " + item?.lastName}
                                </option>
                              </>
                            );
                          })}

                          {/* <option value="male">male</option>
                      <option value="other">other</option> */}
                        </select>
                      </Col>
                    ) : null}
                  </Row>
                )}
            </Card.Body>
          </Modal.Body>
          <Modal.Footer className="border-0 ">
            <h6 className="me-3 cursor btn-closeAndBack" onClick={handleClose}>
              Cancel
            </h6>
            <Button className="btn-primary border-0" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
