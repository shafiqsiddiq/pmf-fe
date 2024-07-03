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
  getAllMyResourcerTaskAction,
  getAllProjectAction,
  getAllUserAction,
  getAllUserWithoutLoginIdAction,
  getTasksByProjectManagerAction,
  getTaskByUserIdAction,
} from "../../redux/actions/userAction";
import { TbArchiveOff } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TimeField from "react-simple-timefield";
import AddTaskModal from "../ResourceSide/Dashboard/AddTaskModal";
import RemoveModal from "../../components/genericModal/RemoveModal";
import ResourceDashboard from "../ResourceSide/Dashboard";
import { FieldError } from "../../components/errorMessage/ErrorMessage";
import GenericTaskComponent from "../../components/GenericTaskComponent";
import AddUserModal from "../adminSide/users/AddUserModal";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function ViewAllTaskOfesources() {
  const [selecteDate, setSelecteDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [timeState, settimeState] = useState("hh:mm");
  const [estimatedTaskTime, setestimatedTaskTime] = useState("hh:mm");
  const [viewState, setViewState] = useState(1);


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
  const [estimatedTimeValidation, setEstimatedTimeValidation] = useState(false);
  const [teamId, setTeamId] = useState();
  const [userModal, setUserModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [requestBlogModal, setRequestBlogModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("pms_user"));
  let blogRequestsData = useSelector((state) => state?.user);
  const [variable1, setVariable1] = useState();
  const [variable2, setVariable2] = useState();
  const [validationState, setValidationState] = useState(false);
  const [variable3, setVariable3] = useState();
  const [variable4, setVariable4] = useState();
  let dispatch = useDispatch();
  useEffect(() => {
    let finalData = {
      login_id: user?.loginUser?._id,
    };
    dispatch(getAllMyResourcerTaskAction(finalData));
  }, []);
  useEffect(() => {
    let finalData = {
      userId: user?.userId,
    };
    dispatch(getTaskByUserIdAction(finalData));
  }, [selectedOption]);
  useEffect(() => {
    let req = {
      search_text: user?.userId,
      limit: 10,
      isPagination: true,
      page: 1,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, [viewState]);
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
  // useEffect(() => {
  //   if (rowData) {
  //     setValue("projectName", rowData?.projectName || "");
  //     setValue("createdDate", rowData?.createdDate || "");
  //     setValue("estimatedTaskTime", rowData?.estimatedTaskTime || "");
  //     setValue("status", rowData?.status || "");
  //     setValue("taskName", rowData?.taskName || "");
  //   }
  // }, [rowData]);
  useEffect(() => {
    if (rowData) {
      let estimatedTime = rowData?.estimatedTime;
      let resultEstimatedTime = convertMinutesToHoursAndMinutes(estimatedTime);
      settimeState(resultEstimatedTime);
      let estimatedTaskTime = rowData?.estimatedTaskTime;
      let resultestimatedTaskTime =
        convertMinutesToHoursAndMinutes(estimatedTaskTime);
      setestimatedTaskTime(resultestimatedTaskTime);
      setValue("projectName", rowData?.projectName || "");
      setValue("createdDate", rowData?.createdDate || "");
      setValue("status", rowData?.status);
      setValue("taskName", rowData?.taskName || "");
    }
  }, [rowData]);
  function onEditSubmit(data) {
    let req = {
      estimatedTaskTime:
        parseInt((estimatedTaskTime[0] + estimatedTaskTime[1]) * 60) +
        parseInt(estimatedTaskTime[3] + estimatedTaskTime[4]),
      estimatedTime:
        parseInt((timeState[0] + timeState[1]) * 60) +
        parseInt(timeState[3] + timeState[4]),
      taskName: data.taskName,
      createdTime: data.createdTime,
      status:
        data?.status === "Inprogress"
          ? "Inprogress"
          : data?.status === "Pending"
            ? "Pending"
            : "Done",
      estimatedTime:
        parseInt((timeState[0] + timeState[1]) * 60) +
        parseInt(timeState[3] + timeState[4]),
      id: teamId,
    };
    if (parseInt(req.estimatedTaskTime) > 0) {
      dispatch(editTaskAction(req, onSuccess, Notification));
    } else {
      if (req.estimatedTaskTime < 1) {
        setEstimatedTimeValidation(true);
      }
    }
  }
  const handleEditClose = () => {
    setEditShow(false);
  };
  function onEdit(row, item) {
    debugger
    setEditShow(true);
    setEditRow(item);
    setrowData(item);
    setTeamId(item?._id);
    // setSelectedStatus(item?.status);
  }
  const userReducer = useSelector((state) => state?.user);

  let myResources = userReducer?.getUserNoLoginIdData?.data
  console.log("myResourceTasks test data", myResources)
    ?.filter((item) => item?.roleId === "3" || item?.roleId === "2")
    .map((filtered) => filtered);

  const handleFillter = () => { };
  const callApi = () => {
    let req = {
      search_text: '',
      limit: 10,
      page: 1,
      isPagination:false
    };
    // dispatch(getAllTasksAction(req));
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
    setRemoveId(item?._id);
  }
  const STATUS_LIST = [
    { id: 1, name: "Inprogress" },
    { id: 2, name: "Pending" },
    { id: 3, name: "Done" },
  ];
  const onSuccess = () => {
    debugger
    let req = {
      search_text: user?.userId,
      limit: 10,
      isPagination: false,
      page: 1,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
    setEstimatedTimeValidation(false);
    setValidationState(false);
    setEditShow(false);
  };
  function deleteUser(removeId) {
    dispatch(deletTaskAction(removeId, onSuccess, Notification));
  }
  const columns = [
    {
      text: "Resource Name",
      dataField: "firstName",
      selector: (row) => row,
      sort: true,
    },
    {
      text: "Project Name",
      dataField: "projectName",
      formatter: (row, item) => {
        return (
          <>
            <span>{item?.task?.[0]?.projectName}</span>
          </>
        );
      },
      sort: true,
    },
    {
      text: "Task Name",
      dataField: "taskName",
      formatter: (row, item) => {
        return (
          <>
            <>{item?.task?.map((ResourceTasks) => {
              return (
                <span>{ResourceTasks?.taskName}</span>
              )
            })}</>
          </>
        );
      },
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
      dataField: "estimatedTaskTime",
      sort: true,
      formatter: (row, item) => {
        let minutes = row;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return (
          <>
            {hours ? hours : 0} h {remainingMinutes ? remainingMinutes : 0} m
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
      formatter: (row) => CategoryFunction(row),
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
      text: "Action",
      dataField: "action",
      formatter: (row, item) => {
        return (
          <>
            {user?.loginUser?.roleId === "1" ? null : (
              <MdOutlineEdit
                className="edit-icon me-2"
                onClick={(row) => onEdit(row, item)}
              />
            )}
            <RiDeleteBin6Line
              className="delete-icon"
              onClick={(row) => onRemove(row, item)}
            />
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
      <div className="d-flex justify-content-between">
        <div>
          <button
            className={`${viewState === 1 ? "btn btn-primary " : "btn-default-style "
              }`}
            onClick={() => setViewState(1)}
          >
            My Tasks
          </button>
          <button
            className={`${viewState === 2 ? "btn btn-primary ms-3" : "btn-default-style ms-3"
              }`}
            onClick={() => setViewState(2)}
          >
            My Resources Tasks
          </button>
        </div>
        {viewState === 2 && <div className="d-flex  justify-content-end">
          <div className="d-flex">

            <Col lg={12}>
              <div className="d-flex  justify-content-end">
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
          </div>
        </div>}
        {viewState === 1 && <div className="d-flex  justify-content-end">
          <div className="d-flex">
            <Col lg={12}>
              <div className="d-flex  justify-content-end pb-3 ">
                <div className="d-flex">
                  <Button
                    data-tut="reactour__action"
                    className="btn-primary border-0"
                    onClick={() => setTaskModal(true)}
                  >
                    Add Task
                  </Button>
                </div>
              </div>
            </Col>
          </div>
        </div>}
      </div>
      {viewState === 2 && (
        <div className="border-0 mt-3">
          <Card.Body>
            <Row className=" blog-table table-responsive justify-content-center">
              {/* <ResourceDashboard /> */}
              <GenericTaskComponent isResource={true} taskData={myResources} />
            </Row>

          </Card.Body>
        </div>
      )}
      {viewState === 1 && (
        <div className="border-0 ">
          <Card.Body>
            <Row className=" blog-table table-responsive justify-content-center">
              {/* <ResourceDashboard /> */}
              <GenericTaskComponent isResource={false} />
            </Row>
          </Card.Body>
        </div>
      )}
      <div>
        {userModal && (
          <AddUserModal
            show={userModal}
            title="Add Resource"
            roleId="Resource"
            handleClose={() => setUserModal(false)}
          />
        )}
        {taskModal &&
          <AddTaskModal
            show={taskModal}
            title="Add Task"
            handleClose={() => setTaskModal(false)}
          />}
        <div>
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
                      {validationState === true ? (
                        <FieldError message={"This Field is Required"} />
                      ) : null}
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
                            user?.loginUser?.roleId === "2" ? false : true
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
                          // disabled={
                          //   user?.loginUser?.roleId === "2" ? false : true
                          // }
                          placeholder="Enter Task Name"
                          {...register("taskName", { required: true })}
                        />
                        {errors?.taskName && (
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
                        name="status"
                        // defaultValue={editRow?.status}
                        {...register("status")}
                      >
                        <option value="Inprogress">Inprogress</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  {/* <Row>
                    <Form.Group className="mb-3">
                      <Form.Label className="label-primary">Status</Form.Label>
                      <Form.Select
                        {...register("status")}
                        aria-label="Default select example"
                        size="sm"
                        value={selectedStatus} // Set the initial value here
                        onChange={(event) =>
                          setSelectedStatus(event.target.value)
                        } // Update the selected status value
                      >
                        {STATUS_LIST?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row> */}
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label className="label-primary">
                          Created Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          size="sm"
                          disabled={
                            user?.loginUser?.roleId === "2" ? false : true
                          }
                          placeholder="Enter Project Start Date"
                          {...register("createdDate", { required: true })}
                        />
                        {errors?.createdDate && (
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
                <Button className="btn-primary border-0 px-3" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
        <RemoveModal
          show={removeUserModal}
          handleClose={() => setRemoveUserModal(false)}
          title="task"
          remove={() => deleteUser(removeId)}
        />
      </div>
    </div>
  );
}
const CategoryFunction = (row) => {
  return (
    <div className="">
      {row === "Inprogress" ? (
        <span className="bg-warning text-white px-2 py-1 rounded">{row}</span>
      ) : row === "Pending" ? (
        <span className="bg-light-grey px-3 py-1 rounded">{row}</span>
      ) : (
        <span className="bg-success text-white  px-4 py-1 rounded">{row}</span>
      )}
    </div>
  );
};
