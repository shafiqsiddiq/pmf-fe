import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TimeField from "react-simple-timefield";
import { Notification } from "../../../components/genericActions";
import IMAGES from "../../../assets/images";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import {
  addUserAction,
  createTaskAction,
  getAllProjectAction,
  getAllTeamsByoginIDAction,
  getAllUserAction,
  getTaskByUserIdAction,
  getUserTasksAction,
} from "../../../redux/actions/userAction";
import { PulseLoader } from "react-spinners";

export default function AddTaskModal(props) {
  const [timeState, settimeState] = useState("00:00");
  const [estimatedTaskTime, setestimatedTaskTime] = useState("00:00");

  const { show, handleClose, roleId, title } = props;
  const [currentDate] = useState(new Date().toISOString().slice(0, 10));
  const [projectTitle, setProjectTitle] = useState();
  const [pmIds, setpmIds] = useState([]);
  const [pmNames, setpmNames] = useState([]);
  const [projectId, setProjectId] = useState();
  const [validationState, setValidationState] = useState(false);
  const [estimatedTimeValidation, setEstimatedTimeValidation] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const userToken = localStorage.getItem("hea_user_token");
  useEffect(() => {
    let req = {
      userId: user?.userId,
    };
    dispatch(getUserTasksAction(req));
  }, []);
  // useEffect(() => {
  //   dispatch(getAllProjectAction());
  // }, []);
  const userReducer = useSelector((state) => state?.user);
  const onSuccess = () => {
    
    let req = {
      userId: user?.userId,
      taskStatus: "All",
      search_text: '',
      created_date:'',
    };
    dispatch(getTaskByUserIdAction(req));
    handleClose();
    setValidationState(false);
    setEstimatedTimeValidation(false);
    reset();
  };
  const handleChange = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    let value = e.target.value;

    setProjectId(projectId);
    // let oneId = userReducer?.getAllBlogRequestByUser?.teams?.filter(
    //   (item) => item.projectId === value
    // );
    // setpmIds(oneId?.[0]?.projectManager_id);
    // setpmNames(oneId?.[0]?.projectManagerName);
    setProjectTitle(label);
    // this.setState({ type: value, label: label});
  };
  function onSubmit(data) {
    let req = {
      userId: user?.userId,
      resourceName:
        user?.firstName + " " + user?.lastName,
      taskName: data.taskName,
      taskDescription: data.taskDescription,
      // createdTime: data.createdTime,
      createdDate: data.createdDate ? data.createdDate : currentDate,
      loggedTime:
        parseInt((estimatedTaskTime[0] + estimatedTaskTime[1]) * 60) +
        parseInt(estimatedTaskTime[3] + estimatedTaskTime[4]),
      estimatedTime:
        parseInt((timeState[0] + timeState[1]) * 60) +
        parseInt(timeState[3] + timeState[4]),
      taskStatus:
        data.status === "Inprogress"
          ? "Inprogress"
          : data.status === "Pending"
            ? "Pending"
            : data.status === "Done"
              ? "Done"
              : data.status === "Pause" ? "Pause" : "Resume",
      projectName: projectTitle
        ? projectTitle
        : userReducer?.getAllBlogRequestByUser?.teams?.[0]?.project?.projectName,
      projectId: projectId
        ? projectId
        : userReducer?.getAllBlogRequestByUser?.teams?.[0]?.project?.projectId,
    };
    if (parseInt(req.estimatedTime) > 0) {
      ;
      dispatch(createTaskAction(req, onSuccess, Notification));
    } else {
      if (req.estimatedTime < 1) {
        setEstimatedTimeValidation(true);
      }
      ;
    }
  }


  const onTimeChange = (event, value) => {
    const newTime = value.replace(/-/g, ":");
    const time = newTime.substr(0, 5);
    settimeState(time);
  };
  const onEstimatedTimeChange = (event, value) => {
    const newTime = value.replace(/-/g, ":");
    const time = newTime.substr(0, 5);
    setestimatedTaskTime(time);
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
                <Col lg={6} md={6} sm={12}>

                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Project Name
                    </Form.Label>
                    <Form.Select
                      {...register("projectName")}
                      aria-label="Default select example"
                      size="sm"
                      onChange={handleChange}
                    >
                      {userReducer?.getAllBlogRequestByUser?.teams?.map((item) => {
                        return (
                          <>
                            <option value={item?.project?.projectId}>
                              {item?.project?.projectName}
                            </option>
                          </>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Created Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      defaultValue={currentDate}
                      placeholder="Enter Created Date"
                      {...register("createdDate", { required: true })}
                    />
                    {errors.createdDate && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Estimated Time
                    </Form.Label>
                    <TimeField
                      value={estimatedTaskTime}
                      onChange={onEstimatedTimeChange}
                      style={{
                        border: "1px solid #ced4da",
                        fontSize: 12,
                        width: "100%",
                        padding: "5px 8px",
                        color: "#333",
                        borderRadius: 4,
                      }}
                    />
                    {estimatedTimeValidation === true ? (
                      <FieldError message={"This Field is Required"} />
                    ) : null}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Logged Time
                    </Form.Label>
                    <TimeField
                      value={timeState}
                      onChange={onTimeChange}
                      style={{
                        border: "1px solid #ced4da",
                        fontSize: 12,
                        width: "100%",
                        padding: "5px 8px",
                        color: "#333",
                        borderRadius: 4,
                      }}
                    />
                  </Form.Group>
                  {validationState === true ? (
                    <FieldError message={"This Field is Required"} />
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Select Status
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      size="sm"
                      {...register("status", { required: true })}
                    // onChange={(e) => onHandleChage(e.target.value)}
                    >
                      <option value="Inprogress">Inprogress</option>
                      <option value="Pending">Pending</option>
                      <option value="Done">Done</option>
                      <option value="Pause">Pause</option>
                      <option value="Resume">Resume</option>
                    </Form.Select>
                    {errors.status && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">Task Name</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter Task Name"
                      {...register("taskName", { required: true })}
                    />
                    {errors.taskName && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label className="label-primary">
                      Task Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      // size="sm"
                      // disabled={
                      //   user?.loginUser?.roleId === "2" ? false : true
                      // }
                      placeholder="Enter Task Description"
                      {...register("taskDescription", { required: true })}
                    />
                    {errors?.taskDescription && (
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
            {userReducer?.generateBlogRequestLoading ? (
              <Button className="btn-primary border-0 px-3">
                <PulseLoader color="#39b6fe" size={5} />
              </Button>
            ) : (
              <Button className="btn-primary border-0 px-3" type="submit">
                Save
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
