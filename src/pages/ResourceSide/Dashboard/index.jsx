import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import Select from "react-select";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFillArrowDownSquareFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  MdFilterAlt,
  MdOutlineEdit,
  MdOutlineModeEdit,
  MdUnarchive,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { IoMdArchive } from "react-icons/io";
import {
  deletTaskAction,
  deleterequestAction,
  editProjectAction,
  editTaskAction,
  getAllProjectAction,
  getAllUserAction,
  getAllUserWithoutLoginIdAction,
  getAllTasksAction,
  getUserTasksAction,
  getTasksByProjectManagerAction,
  getTaskByUserIdAction,
} from "../../../redux/actions/userAction";
import { TbArchiveOff } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";
import BlogRequestModal from "../../../components/genericModal/BlogRequestModal";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "../../../components/genericActions";
import AddTaskModal from "./AddTaskModal";
import RemoveModal from "../../../components/genericModal/RemoveModal";
import { useForm } from "react-hook-form";
import TimeField from "react-simple-timefield";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import { PulseLoader, ScaleLoader } from "react-spinners";
import Tooltip from "react-tooltip-lite";
import GenericTaskComponent from "../../../components/GenericTaskComponent";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function ResourceDashboard() {
  const [selecteDate, setSelecteDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [timeState, settimeState] = useState("00:00");
  const [estimatedTaskTime, setestimatedTaskTime] = useState("00:00");
  const [showEdit, setEditShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [rowData, setrowData] = useState(1);
  const [editRow, setEditRow] = useState();
  const [removeId, setRemoveId] = useState();
  const [teamId, setTeamId] = useState();
  const [userModal, setUserModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [requestBlogModal, setRequestBlogModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("pms_user"));
  const [variable1, setVariable1] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [variable2, setVariable2] = useState();
  const [validationState, setValidationState] = useState(false);
  const [estimatedTimeValidation, setEstimatedTimeValidation] = useState(false);
  const [variable3, setVariable3] = useState();
  const [variable4, setVariable4] = useState();
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
  function convertMinutesToHoursAndMinutes(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    let hoursString = hours < 10 ? "0" + hours : hours.toString();
    let minutesString =
      remainingMinutes < 10
        ? "0" + remainingMinutes
        : remainingMinutes.toString();
    return hoursString + ":" + minutesString;
  }

  useEffect(() => {
    if (editRow) {

      let estimatedTime = editRow?.estimatedTime;
      let resultEstimatedTime = convertMinutesToHoursAndMinutes(estimatedTime);
      settimeState(resultEstimatedTime);
      let estimatedTaskTime = editRow?.loggedTime;
      let resultestimatedTaskTime =
        convertMinutesToHoursAndMinutes(estimatedTaskTime);
      setestimatedTaskTime(resultestimatedTaskTime);
      setValue("projectName", editRow?.projectName || "");
      setValue("createdDate", editRow?.createdDate || "");
      setValue("taskStatus", editRow?.taskStatus);
      setValue("taskName", editRow?.taskName || "");
    }
  }, [editRow]);
  let dispatch = useDispatch();
  useEffect(() => {
    let finalData = {
      login_id: user?.userId,
    };
    dispatch(getTaskByUserIdAction(finalData));
  }, [selectedOption]);
  useEffect(() => {
    let req = {
      userId: user?.userId,
    };
    dispatch(getUserTasksAction(req));
  }, []);


  function onEditSubmit(data) {

    let req = {
      taskStatus:
        data.taskStatus === "1"
          ? "Inprogress"
          : data.taskStatus === "2"
            ? "Pending"
            : data.taskStatus === "3" ? "Done" : data.taskStatus === "4" ? "Pause" : "Resume",
      loggedTime:
        parseInt((estimatedTaskTime[0] + estimatedTaskTime[1]) * 60) +
        parseInt(estimatedTaskTime[3] + estimatedTaskTime[4]),
      estimatedTime:
        parseInt((timeState[0] + timeState[1]) * 60) +
        parseInt(timeState[3] + timeState[4]),
      id: teamId,
      createdDate: data.createdDate,
      taskName: data.taskName,
      userId: user?.userId
    };
    if (parseInt(req.estimatedTime) > 0) {
      dispatch(editTaskAction(req, onSuccess, Notification));
    } else {
      if (req.estimatedTime < 1) {
        setEstimatedTimeValidation(true);
      }
    }
  }
  const handleEditClose = () => {
    setEditShow(false);
  };
  function onEdit(row, item) {
    row.stopPropagation();
    // setSelectedStatus(item.status);
    setEditShow(true);
    setEditRow(item);
    setrowData(item);
    setTeamId(item?.taskId);
  }
  const userReducer = useSelector((state) => state?.user);
  let userRole = userReducer?.getUserNoLoginIdData?.data
    ?.filter((item) => item?.userRole == "Resource" || item?.userRole == "TeamLead")
    .map((filtered) => filtered);

  const handleFillter = () => { };
  const callApi = () => {
    // dispatch(getAllTasksAction({}));
    setVariable1();
    setVariable2();
    setVariable3();
    setVariable4();
  };
  const optionsss = [
    { value: "john", label: "John" },
    { value: "jane", label: "Jane" },
    { value: "mike", label: "Mike" },
  ];
  const handleVariable1Change = (e) => {
    setVariable1(e.target.value);
  };

  const handleVariable2Change = (e) => {
    setVariable2(e.target.value);
  };

  const handleVariable3Change = (e) => {
    setVariable3(e.target.value);
  };

  const handleVariable4Change = (e) => {
    setVariable4(e.target.value);
  };
  function onRemove(row, item) {
    row.stopPropagation();
    setRemoveUserModal(true);
    setRemoveId(item?.taskId);
  }

  const STATUS_LIST = [
    { id: 1, name: "Inprogress" },
    { id: 2, name: "Pending" },
    { id: 3, name: "Done" },
  ];
  const onSuccess = () => {

    let req = {
      userId: user?.userId,
    };
    dispatch(getUserTasksAction(req));
    setEstimatedTimeValidation(false);
    setEditShow(false);
  };
  function deleteUser(removeId) {

    dispatch(deletTaskAction(removeId, onSuccess, Notification));
  }
  const columns = [
    {
      text: "Resource Name",
      dataField: "resourceName",
      selector: (row) => row,
      sort: true,
    },
    {
      text: "Project Name",
      dataField: "projectName",
      selector: (row) => row,
      sort: true,
    },
    {
      text: "Task Name",
      dataField: "taskName",
      formatter: (row, item) => {
        return (
          <>
            <div className="row-container">
              <Tooltip
                key={row}
                content={row}
                className="tooltip-trigger"
                arrowSize={10}
                arrowColor="#333333"
              >
                <div className="tooltip-trigger">
                  {row?.length > 15 ? row?.slice(0, 20) + "..." : row}
                </div>
              </Tooltip>
            </div>
          </>
        );
      },
      selector: (row) => row,
      sort: true,
    },

    {
      text: "Date",
      dataField: "createdDate",
      formatter: (row, item) => {
        return (
          <>
            {/* <Moment format="YYYY/MM/DD">{this.props.dateToFormat}</Moment> */}
            {moment(row).format(" MMMM DD, YYYY")}
          </>
        );
      },
      sort: true,
    },
    {
      text: "Estimated Time",
      dataField: "loggedTime",
      sort: true,
      formatter: (row, item) => {

        let newTime = item?.estimatedTime;
        let minutes = row;
        const newHours = Math.floor(newTime / 60);
        const hours = Math.floor(minutes / 60);
        const newRemainingMinutes = newTime % 60;
        const remainingMinutes = minutes % 60;

        return (
          <>
            {hours ? hours : "0"} h {remainingMinutes ? remainingMinutes : "0"}{" "}
            m
          </>
        );
      },
    },
    {
      text: "Logged Time",
      dataField: "estimatedTime",
      sort: true,
      formatter: (row, item) => {
        let minutes = row;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return (
          <>
            {hours} h {remainingMinutes} m
          </>
        );
      },
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
      formatter: (row, item) => CategoryFunction(row, item),
    },

    // {
    //   text: "Status",
    //   dataField: "status",
    //   formatter: (row) => {
    //     return (
    //       <>
    //         {row === "Pending" && (
    //           <div className="status-style">
    //             <span>Active</span>
    //           </div>
    //         )}
    //         {row === false && (
    //           <div className="inactive-status-style">
    //             <span>InActive</span>
    //           </div>
    //         )}
    //       </>
    //     );
    //   },
    //   left: true,
    // },
    {
      text: `${user?.userRole === "Admin" || user?.userRole === "4"
        ? ""
        : "Action"
        }`,
      dataField: "action",
      formatter: (row, item) => {
        return (
          <>
            {user?.userRole === "Admin" ||
              user?.userRole === "4" ? null : (
              <MdOutlineEdit
                className="edit-icon me-2"
                onClick={(row) => onEdit(row, item)}
              />
            )}
            {user?.userRole === "Admin" ||
              user?.userRole === "4" ? null : (
              <RiDeleteBin6Line
                className="delete-icon"
                onClick={(row) => onRemove(row, item)}
              />
            )}
          </>
        );
      },
      left: true,
    },
  ];

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  // const selectRow = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //    onSelect:hanldeChange
  // };
  function requestBlog() {
    // setGenerateRequestBlogModal(true);
  }
  // const expandRow = {
  //   renderer: (row) => {
  //     let minutes = row.estimatedTime;
  //     const hours = Math.floor(minutes / 60);
  //     const remainingMinutes = minutes % 60;
  //     return (
  //       <>
  //         <div>
  //           <h5 className="text-bold">
  //             Total Time :{" "}
  //             <span className="result-text-style">
  //               {hours}h {remainingMinutes}m
  //             </span>
  //           </h5>
  //           <h5>
  //             Project Name :{" "}
  //             <span className="result-text-style">{row.projectName}</span>{" "}
  //           </h5>
  //           <h5>
  //             Task Name :{" "}
  //             <span className="result-text-style">{row.taskName}</span>{" "}
  //           </h5>
  //           <h5>
  //             Task Status :{" "}
  //             <span className={`${row.status==="Done"?"text-success":row.status==="Inprogress"?"text-warning":"result-text-style"} `}>{row.status}</span>
  //           </h5>
  //         </div>
  //       </>
  //     );
  //   },
  // };
  return (
    <div>
       <div className="d-flex  justify-content-end">
          <div className="d-flex">
            <Col lg={12}>
              <div className="d-flex  justify-content-end pb-3 ">
                <div className="d-flex">
                  <Button
                    data-tut="reactour__action"
                    className="btn-primary border-0"
                    onClick={() => setUserModal(true)}
                  >
                    Add Task
                  </Button>
                </div>
              </div>
            </Col>
          </div>
        </div>
      <div className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <Row className=" blog-table table-responsive justify-content-center">
                {/* <ResourceDashboard /> */}
                <GenericTaskComponent isResource={false} />
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </div>

      <div>
        {userModal && (
          <AddTaskModal
            show={userModal}
            title="Add Task"
            handleClose={() => setUserModal(false)}
          />
        )}
        <div>
          {showEdit && (
            <Modal
              show={showEdit}
              onHide={handleEditClose}
              backdrop="static"
              keyboard={false}
              size="md"
              row={editRow}
              className="user-modal"
            >
              <Modal.Header className="border-0 ">
                <Modal.Title> {"Edit Task"}</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit(onEditSubmit)}>
                <Modal.Body>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            Project Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            size="sm"
                            disabled
                            placeholder="Enter Task Name"
                            {...register("projectName", { required: true })}
                          />
                          {errors.projectName && (
                            <FieldError message={"This Field is Required"} />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="">
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
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3 mt-3">
                          <Form.Label className="label-primary">
                            Estimated Time
                          </Form.Label>
                          <TimeField
                            disabled={
                              user?.userRole === "Resource" ? false : true
                            }
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
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            Task Name
                          </Form.Label>
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
                      <Form.Group className="mb-3">
                        <Form.Label className="label-primary">
                          Select Status
                        </Form.Label>
                        <Form.Select
                          aria-label=""
                          size="sm"
                          name="taskStatus"
                          // defaultValue={editRow?.status}
                          {...register("taskStatus")}
                        >
                          <option value="1">Inprogress</option>
                          <option value="2">Pending</option>
                          <option value="3">Done</option>
                          <option value="4">Pause</option>
                          <option value="5">Resume</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label className="label-primary">
                            Created Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            size="sm"
                            // disabled={
                            //   user?.userRole === "2" ? false : true
                            // }
                            placeholder="Enter Project Start Date"
                            {...register("createdDate", { required: true })}
                          />
                          {errors.createdDate && (
                            <FieldError message={"This Field is Required"} />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-primary">
                          End Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          size="sm"
                          placeholder="Enter Project End Date"
                          {...register("projectEndDate", { required: true })}
                        />
                        {errors.projectEndDate && (
                          <FieldError message={"This Field is Required"} />
                        )}
                      </Form.Group>
                    </Col>
                  </Row> */}
                  </Card.Body>
                </Modal.Body>
                <Modal.Footer className="border-0 ">
                  <h6
                    className="me-3 cursor btn-closeAndBack"
                    onClick={handleEditClose}
                  >
                    Cancel
                  </h6>
                  {userReducer?.editTaskLoading ? (
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
          )}
        </div>
        {removeUserModal && (
          <RemoveModal
            show={removeUserModal}
            handleClose={() => setRemoveUserModal(false)}
            title="task"
            remove={() => deleteUser(removeId)}
          />
        )}
      </div>
    </div>
  );
}
const CategoryFunction = (row, item) => {

  return (
    <div className="">
      {item?.taskStatus === "Inprogress" ? (
        <span className="bg-warning text-white px-2 py-1 rounded">{item?.taskStatus}</span>
      ) : item?.taskStatus === "Pending" ? (
        <span className="bg-light-grey px-3 py-1 rounded">{item?.taskStatus}</span>
      ) : (
        <span className="bg-success text-white  px-4 py-1 rounded">{item?.taskStatus}</span>
      )}
    </div>
  );
};
