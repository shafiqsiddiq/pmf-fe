import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { CgEyeAlt } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import { FieldError } from "../errorMessage/ErrorMessage";
import { Notification } from "../genericActions";
import { editUserAction } from "../../redux/actions/userAction";

export default function ProfileUpdateModal(props) {
  const { show, handleClose } = props;
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const { userInfoList } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   dispatch(getUserInfoAction(user?.Id));
  // }, [user?.Id]);
  const onSuccess = () => {
    handleClose();
    reset();
  };
  function onSubmit(data) {
    let finalData = {
      login_id: user?.loginUser?._id,
      firstName: user?.loginUser?.firstName,
      lastName: user?.loginUser?.lastName,
      email: user?.loginUser?.email,
      password: data.password,
      ConfirmPassword: data.confirmPassword,
    };
    if (finalData.password === finalData.ConfirmPassword) {
      dispatch(editUserAction(finalData, onSuccess, Notification));
    } else {
      Notification("Password and Confirm Password must be same", "error");
    }
  }
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
        <Modal.Header  className="border-0">
          <Modal.Title>
            {user?.userRole =="Admin" ? "Profile Detail" : "Update Profile"}
          </Modal.Title>
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
                      disabled
                      placeholder="Enter Name"
                      defaultValue={user?.firstName}
                      // {...register("firstName", {
                      //   required: true,
                      //   pattern: /\S+/,
                      // })}
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
                      disabled
                      placeholder="Enter Name"
                      defaultValue={user?.lastName}
                      // {...register("lastName", {
                      //   required: true,
                      //   pattern: /\S+/,
                      // })}
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
                      disabled
                      defaultValue={user?.email}
                      placeholder="Enter Email"
                      // {...register("Email")}
                    />
                    {/* {errors.Email && (
                      <FieldError message={"This Field is Required"} />
                    )} */}
                  </Form.Group>
                </Col>
              </Row>
              <Row></Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label className="label-primary">
                      Change Password
                    </Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      size="sm"
                      disabled={parseInt(user?.RoleId) === 1 ? true : false}
                      placeholder="Enter Password"
                      defaultValue={userInfoList?.Password}
                      {...register("password", {
                        required: true,
                        pattern: /\S+/,
                      })}
                    />
                    <div onClick={handleClickShowPassword} className="eye-icon">
                      {showPassword ? <CgEyeAlt /> : <AiFillEyeInvisible />}
                    </div>
                    {errors.password && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label className="label-primary">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      size="sm"
                      disabled={parseInt(user?.RoleId) === 1 ? true : false}
                      defaultValue={userInfoList?.Password}
                      placeholder="Enter Confirm Password"
                      {...register("confirmPassword", {
                        required: true,
                        pattern: /\S+/,
                      })}
                    />
                    <div
                      onClick={handleClickShowConfirmPassword}
                      className="eye-icon"
                    >
                      {showConfirmPassword ? (
                        <CgEyeAlt />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </div>
                    {errors.confirmPassword && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Modal.Body>
          <Modal.Footer className="border-0 ">
            <h6 className="me-3 cursor btn-closeAndBack" onClick={handleClose}>
              Cancel
            </h6>
            <Button className="btn-primary border-0 px-3" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
