import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Form,
  // FormControl,
  InputGroup,
  Modal,
  Row,
  // Row,
} from "react-bootstrap";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaExchangeAlt, FaRegUser } from "react-icons/fa";
import Select from "react-select";
import { debounce } from 'lodash';
// import IMAGES from "../../../assets/images";
import { MdEditNote, MdFilterAlt, MdOutlineEdit } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScaleLoader } from "react-spinners";
// import RequestModal from "./RequestModal";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { SlCalender } from "react-icons/sl";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";
import { FcClock } from "react-icons/fc";
import IMAGES from "../../assets/images";
import { deletTaskAction, editTaskAction, editUserAction, getAllUserWithoutLoginIdAction, getTaskByUserIdAction } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatTime } from "../genericFunctions";
import RemoveModal from "../genericModal/RemoveModal";
import AddTaskModal from "../../pages/ResourceSide/Dashboard/AddTaskModal";
import { useForm } from "react-hook-form";
import { Notification } from "../genericActions";
import TimeField from "react-simple-timefield";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FieldError } from "../errorMessage/ErrorMessage";
import { constructNow } from "date-fns";


const GenericTaskComponent = ({ isResource, taskData }) => {
  let filteredData = taskData?.filter((resource) => resource?.userRole == "TeamLead" || resource?.userRole == "Resource")
  console.log("taskData", taskData)
  const user = JSON.parse(localStorage.getItem("pms_user"));
  let dispatch = useDispatch();
  const [rowData, setrowData] = useState(1);
  const [teamId, setTeamId] = useState();
  const [showEdit, setEditShow] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [row, setRow] = useState();
  const [projectId, setProjectId] = useState();
  const [userId, setUserId] = useState();
  const [taskStatus, setTaskStatus] = useState("All");
  const [taskname, setTaskname] = useState('');
  const [createdDate, setCreatedDate] = useState();
  const [removeId, setRemoveId] = useState();
  const [listSearch, setListSearch] = useState("");
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [nameListing, setNameListing] = useState("");
  const [calenderShow, setCalenderShow] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [showTeamLeadsDropDown, setShowTeamLeadsDropDown] = useState(false);
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [timeState, settimeState] = useState("hh:mm");
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [estimatedTaskTime, setestimatedTaskTime] = useState("hh:mm");
  const [estimatedTimeValidation, setEstimatedTimeValidation] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(filteredData?.[0]?.userId);
  const userReducer = useSelector((state) => state?.user);
  const [editRow, setEditRow] = useState();
  const [validationState, setValidationState] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();


  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      debugger
      setDebouncedValue(value);
    }, 500),
    [] // The empty array ensures the debounce function is only created once
  );
  const handleChange = (event) => {
    setTaskname(event.target.value);
    debouncedChangeHandler(event.target.value);
  };
  useEffect(() => {
    if (editRow) {
      setUserId(editRow?.userId)
      setProjectId(editRow?.projectId)
      let estimatedTime = editRow?.estimatedTime;
      let resultEstimatedTime = convertMinutesToHoursAndMinutes(estimatedTime);
      settimeState(resultEstimatedTime);
      let estimatedTaskTime = editRow?.loggedTime;
      let resultestimatedTaskTime =
        convertMinutesToHoursAndMinutes(estimatedTaskTime);
      setestimatedTaskTime(resultestimatedTaskTime);
      setValue("projectName", editRow?.projectName || "");
      setValue("createdDate", editRow?.createdDate || "");
      setValue("status", editRow?.taskStatus);
      setValue("taskName", editRow?.taskName || "");
      setValue("taskDescription", editRow?.taskDescription || "");
    }
  }, [editRow]);
  let myResourceTasks = userReducer?.userList
  const [selectedUser, setselectedUser] = useState('');
  useEffect(() => {
    setselectedUser(filteredData?.[0]?.userId)
  }, [])
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
  const [dateState, setdateState] = useState();

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems((prevItems) => prevItems.concat(data.slice(0, 10)));
    }, 1000);
  };
  useEffect(() => {
    let finalData = {
      userId: isResource ? selectedUser || filteredData?.[0]?.userId : user?.userId,
      taskStatus: taskStatus ? taskStatus : "All",
      search_text: taskname || '',
      created_date: createdDate || '',

    };
    dispatch(getTaskByUserIdAction(finalData));
  }, [selectedUser, taskStatus, debouncedValue,createdDate]);
  const listData = [
    { name: "Salman" },
    { name: "Abid" },
    { name: "Shafiq" },
    { name: "Ali" },
    { name: "fahad" },
  ];
  function onEditSubmit(data) {
    let req = {
      userId: userId,
      createdDate: data.createdDate,
      taskDescription: data.taskDescription,
      projectName: data.projectName,
      resourceName:
        user?.firstName + " " + user?.lastName,
      loggedTime:
        parseInt((estimatedTaskTime[0] + estimatedTaskTime[1]) * 60) +
        parseInt(estimatedTaskTime[3] + estimatedTaskTime[4]),
      estimatedTime:
        parseInt((timeState[0] + timeState[1]) * 60) +
        parseInt(timeState[3] + timeState[4]),
      taskName: data.taskName,
      projectId: projectId,
      taskStatus:
        data.status === "Inprogress"
          ? "Inprogress"
          : data.status === "Pending"
            ? "Pending"
            : data.status === "Done"
              ? "Done"
              : data.status === "Pause" ? "Pause" : "Resume",
      estimatedTime:
        parseInt((timeState[0] + timeState[1]) * 60) +
        parseInt(timeState[3] + timeState[4]),
      id: teamId,
    };
    if (parseInt(req.estimatedTime) > 0) {
      ;
      dispatch(editTaskAction(req, onSuccess, Notification));
    } else {
      if (req.estimatedTime < 1) {
        setEstimatedTimeValidation(true);
      }
      ;
    }
  }
  const handleClearSearch = () => {
    setTaskStatus("");
  };
  const ClearSearch = () => {
    setDebouncedValue('')
    setTaskname('');
  };

  const handleFilter = () => {
    setCalenderShow(!calenderShow);
  };
  const handleSelect = (date) => {
    debugger
    const formattedDate = moment(date).format("yyyy-MM-DD");
    setCreatedDate(formattedDate);
    // setItems(myFilteredArray);
     setCalenderShow(false);
  };

  const handleDivClick = (data, index) => {
    setSelectedDiv(index);
    setNameListing(data.name);
    setselectedUser(data?.userId)
    setShowTeamLeadsDropDown(false)
  };
  const handleChangeTeam = (data, index) => {
    setSelectedDiv(index);
    setNameListing(data.name);
    setselectedUser(data?.userId)
    setShowTeamLeadsDropDown(!showTeamLeadsDropDown)
  };
  const onhandleChangeTeamLead = (data) => {
    let finalData = {
      firstName: data?.data?.firstName,
      lastName: data?.data?.lastName,
      email: data?.data?.email,
      password: data?.data?.password,
      phoneNumber: data?.data?.phoneNumber,
      userRole: data?.data?.userRole,
      loginId: data?.value,
      userId: data?.data?.userId
    };
    dispatch(editUserAction(finalData, onSuccess, Notification));
  }
  const handleCalender = () => {
    setdateState(null);
    setItems(data.slice(0, 10));
  };
  const handleStatusChange = (event) => {
    setTaskStatus(event.target.value)
    setSelectedStatus(event.target.value);
  };


  const handleEditClose = () => {
    setEditShow(false);
  };
  function onRemove(item) {
    debugger
    setRemoveUserModal(true);
    setRemoveId(item?.taskId);
  }
  const onSuccess = () => {
    let finalData = {
      userId: isResource ? userId : user?.userId,
      taskStatus: "All"
    };
    dispatch(getTaskByUserIdAction(finalData));
    setEditShow(false)
  }

  function onEdit(item) {
    debugger
    setEditShow(true);
    setEditRow(item);
    setrowData(item);
    setTeamId(item?.taskId);
  }
  function deleteUser(removeId) {
    dispatch(deletTaskAction(removeId, onSuccess, Notification));
  }
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

  return (
    <>
      <Row>

        {isResource &&
          <Col lg={3} xl={3} md={4}>
            <div className="h-100">
              <Card className="mb-2 border-0">
                <div className="d-flex ms-2 mt-3 border-bottom pb-3 flex-wrap justify-content-between align-items-center">
                  <div className="d-flex w-100">
                    <InputGroup className="position-relative custom-design-input">
                      <input
                        type="text"
                        size="sm"
                        placeholder="Search User"
                        className="Search-User me-2 border-0 w-100"
                      // value={taskStatus}
                      // onChange={(e) => setTaskStatus(e.target.value)}
                      />
                      {/* {taskStatus ? (
                        <InputGroup.Text
                          className="custom-searchBar"
                          style={{ cursor: "pointer" }}
                          onClick={handleClearSearch}
                        >
                          <RxCross2 />
                        </InputGroup.Text>
                      ) : (
                        <InputGroup.Text
                          className="custom-searchBar"
                          style={{ cursor: "pointer" }}
                          onClick={handleClearSearch}
                        >
                          <IoIosSearch />
                        </InputGroup.Text>
                      )} */}
                    </InputGroup>
                  </div>
                </div>
                <div className="user-listing-names user-list-card pb-0">
                  {filteredData?.map((data, index) => (
                    <> <div
                      className={`d-flex align-items-center user-listing justify-content-between ${selectedDiv === index ? "selected-div" : ""
                        }`}
                      key={index}
                      onClick={() => handleDivClick(data, index)}
                    >
                      <div className="d-flex align-items-center">
                        <img src={IMAGES.LOGO} className="user-img-logo" />
                        <p className="mb-0 ms-2">{data.firstName + " " + data.lastName}</p>
                      </div>
                      {user?.userRole == "Admin" && data?.userRole == "Resource" && <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-top`}>Change Team Lead</Tooltip>}
                      >
                        <p
                          className="mb-0 ms-2"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChangeTeam(data, index);
                          }}
                        >
                          <FaExchangeAlt />
                        </p>
                      </OverlayTrigger>}
                    </div>
                      <>
                        {showTeamLeadsDropDown && selectedDiv === index && <div className="px-3">
                          <>
                            <p className="checkbox_select_teamlead mb-1"> Select Team Lead:</p>
                            <Select
                              required
                              placeholder="Select Team Lead"
                              options={filteredData?.filter((option) => option.userRole == "TeamLead")?.map((item) => {
                                return (
                                  {
                                    value: item?.userId,
                                    label: item?.firstName + ' ' + item?.lastName,
                                    data: data
                                  }
                                );
                              })}
                              // isMulti
                              // value={selectedResource}
                              onChange={onhandleChangeTeamLead}

                            />
                          </>

                        </div>}
                      </>
                    </>
                  ))}

                </div>
              </Card>
            </div>
          </Col>}
        <Col lg={isResource ? 9 : 12} xl={isResource ? 9 : 129} md={isResource ? 8 : 12} className="">
          <div className="h-100">
            {/* <p className="mb-2 font-weight-600">{nameListing}</p> */}
            <Card className="mb-2 user-list-card p-3">
              <Row className="d-flex align-items-center">
                <Col lg={6} className="heading-name mb-0">
                  Task Lists
                </Col>
                <Col lg={2}>
                  <Form.Select
                    aria-label="Default select example"
                    className="status-dropdown"
                    onChange={handleStatusChange}
                    value={selectedStatus}
                  >
                    <option value="All">All</option>
                    <option value="Inprogress">Inprogress</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                    <option value="Pause">Pause</option>
                    <option value="Resume">Resume</option>
                  </Form.Select>
                </Col>
                <Col lg={4} className="d-flex justify-content-end ps-0">
                  <InputGroup className="position-relative custom-search-input">
                    <input
                      type="text"
                      size="sm"
                      placeholder="Search by Task"
                      className="Search-User me-2 border-0 w-100"
                      value={taskname}
                      onChange={(e) => handleChange(e)}
                    />
                    {taskname ? (
                      <InputGroup.Text
                        className="custom-searchBar"
                        style={{ cursor: "pointer" }}
                        onClick={() => ClearSearch()}
                      >
                        <RxCross2 />
                      </InputGroup.Text>
                    ) : (
                      <InputGroup.Text
                        className="custom-searchBar"
                        style={{ cursor: "pointer" }}
                        onClick={() => ClearSearch()}
                      >
                        <IoIosSearch />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <div className="filter-btn d-flex align-items-center view-all-button cursor-pointer text-white">
                    {calenderShow === false && dateState ? (
                      <div onClick={() => handleCalender()}>
                        <RxCross2 />
                      </div>
                    ) : (
                      <div onClick={() => handleFilter()}>
                        <SlCalender />
                      </div>
                    )}
                    <div className="position-absolute custom-calender">
                      {calenderShow && (
                        <Calendar date={new Date()} onChange={handleSelect} />
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <div
                id="scrollableDiv"
                style={{
                  height: 587,
                  overflow: "auto",
                  marginTop: 12,
                }}
                className="h-100"
              >
                {console.log("myResourceTasks groupBy", myResourceTasks)}
                <InfiniteScroll
                  dataLength={myResourceTasks?.data?.length || 0}
                  next={fetchMoreData}
                  // hasMore={true}
                  // hasMore={myResourceTasks?.data?.length < data.length}
                  scrollableTarget="scrollableDiv"
                  loader={
                    myResourceTasks?.data?.length <= 1 ? (
                      <div className="d-flex justify-content-around">
                        No records found
                      </div>
                    ) : (
                      <div className="w-100 d-flex justify-content-center mt-3">
                        <ScaleLoader
                          color="#313251"
                          loading="true"
                          size={150}
                        />
                      </div>
                    )
                  }
                // endMessage={
                //   <p style={{ textAlign: "center" }}>
                //     <b>Not Found More Record</b>
                //   </p>
                // }
                >

                  {myResourceTasks?.data?.map((item, index) => (
                    <Accordion
                      className="mb-3"
                      key={index}
                      activeKey={activeAccordionKey}
                      onSelect={() =>
                        setActiveAccordionKey(
                          index === activeAccordionKey ? null : index
                        )
                      }
                    >
                      <Accordion.Item eventKey={index} className="border-0">
                        <Accordion.Header className="accordian-head">
                          <Row className="w-100 m-0 p-0">
                            <Col lg={5}>
                              <div className="d-flex">
                                <div className="ms-4 text-dark d-flex align-items-center">
                                  <span className="heading-name me-1">
                                    Date:{" "}
                                  </span>
                                  <span className="time-date">
                                    {item?.createdDate}
                                  </span>
                                </div>
                                <div className="ms-4 text-dark">
                                  <span className="time-date">
                                    <Badge bg="secondary">
                                      {moment(item?.createdDate).format("dddd")}
                                    </Badge>
                                  </span>
                                </div>
                              </div>
                            </Col>
                            <Col lg={7} className="d-flex ">
                              <div className="d-flex align-items-center text-dark">
                                <span className="heading-name state-user me-1 badge bg-dark">
                                  Pause
                                </span>
                                <span className="time-date ms-1">
                                  {item?.specificDayTasks?.filter((PendingLength) => PendingLength?.taskStatus == "Pause")?.length || 0}

                                </span>
                              </div>
                              <div className="ms-2 text-dark d-flex align-items-center">
                                <span className="heading-name state-user me-1 badge bg-warning text-dark">
                                  Inprogress
                                </span>
                                <span className="time-date ms-1">
                                  {item?.specificDayTasks?.filter((inprogressLength) => inprogressLength?.taskStatus == "Inprogress")?.length || 0}
                                </span>
                              </div>
                              <div className="ms-2 d-flex align-items-center text-dark">
                                <span className="heading-name state-user me-1 badge bg-success">
                                  Done
                                </span>
                                <span className="time-date ms-1">
                                  {item?.specificDayTasks?.filter((DoneLength) => DoneLength?.taskStatus == "Done")?.length || 0}

                                </span>
                              </div>
                              <div className="ms-2 d-flex align-items-center text-dark">
                                <span className="heading-name state-user me-1 badge bg-secondary">
                                  Pending
                                </span>
                                <span className="time-date ms-1">
                                  {item?.specificDayTasks?.filter((PendingLength) => PendingLength?.taskStatus == "Pending")?.length || 0}

                                </span>
                              </div>

                            </Col>

                          </Row>
                        </Accordion.Header>
                        <Accordion.Body className="">
                          <Row
                            key={index}
                            className="user-description-head mb-3"

                          >
                            {item?.specificDayTasks?.map((subTasks, index) => {
                              return (
                                <div className={`px-2   px-0 ${!(item?.specificDayTasks?.length - 1 == index) && `border-bottom pb-3`} ${index > 0 && `pt-2`}`}>
                                  {!(subTasks?.taskStatus === "Done") && <div className={`mb-2 ${index > 0 && `mt-2`}`}>
                                    <Col className="d-flex justify-content-end">
                                      <div className="ms-1 d-flex justify-content-end align-items-center text-dark ">
                                        <AiFillEdit
                                          className=" me-2"
                                          color={"#386697"}
                                          onClick={(row) => onEdit(subTasks)}
                                        />
                                        <RiDeleteBin6Line
                                          className="delete-icon"
                                          onClick={(row) => onRemove(subTasks)}
                                        />
                                      </div>
                                    </Col>
                                  </div>}
                                  <Row >
                                    <Col lg={isResource ? 9 : 10} md={isResource ? 7 : 8} sm={12}>
                                      <div>
                                        <span className="heading-name">
                                          Task Name :
                                        </span>
                                        <span className="ms-2 font-size-10">
                                          {subTasks?.taskName}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="heading-name">
                                          User Name :
                                        </span>
                                        <span className="ms-2 font-size-10">
                                          {subTasks?.resourceName}
                                        </span>
                                      </div>
                                    </Col>
                                    <Col lg={isResource ? 3 : 2} md={isResource ? 5 : 4} sm={12} className="ps-0">
                                      <div className="d-flex justify-content-between">
                                        <span className="heading-name">
                                          Logged Time :
                                        </span>
                                        <span className="ms-2 font-size-10">
                                          {formatTime(subTasks.estimatedTime)}
                                        </span>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <span className="heading-name">
                                          Estimated Time :
                                        </span>
                                        <span className="ms-2 font-size-10">
                                          {formatTime(subTasks.loggedTime)}
                                        </span>
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col lg={isResource ? 9 : 10} md={isResource ? 7 : 8} sm={12}>

                                      <div>
                                        <span className="heading-name">
                                          Description :
                                        </span>
                                        <span className="ms-3 font-size-10">
                                          {subTasks?.taskDescription}
                                        </span>
                                      </div>
                                    </Col>
                                    <Col lg={isResource ? 3 : 2} md={isResource ? 5 : 4} sm={12} className="ps-0">
                                      <div className="d-flex justify-content-between">
                                        <span className="heading-name">
                                          Status :
                                        </span>
                                        <span
                                          className={`state-user  heading-name ${subTasks?.taskStatus === "Done"
                                            ? "badge bg-success "
                                            : subTasks?.taskStatus === "Inprogress" ? "badge bg-warning" : subTasks?.taskStatus === "Pending"
                                              ? "badge bg-secondary"
                                              : subTasks?.taskStatus === "Resume" ? "badge bg-dark" : "badge bg-dark"
                                            }`}
                                        >

                                          {subTasks?.taskStatus}
                                        </span>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              )
                            })}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </InfiniteScroll>
                {myResourceTasks?.data?.length < 1 &&
                  <p style={{ textAlign: "center" }}>
                    <b>Not Found More Record</b>
                  </p>}
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <div>
        <AddTaskModal
          show={userModal}
          title="Add Task"
          handleClose={() => setUserModal(false)}
        />
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
                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="">
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

                    <Col lg={6} md={6} sm={12}>
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
                    <Col lg={6} md={6} sm={12}>
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

                    <Col lg={6} md={6} sm={12}>
                      <Form.Group className="mb-3 mt-3">
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
                  <Row >
                    <Col lg={6} md={6} sm={12}>

                      <Form.Group className="mb-3">
                        <Form.Label className="label-primary">
                          Select Status
                        </Form.Label>
                        <Form.Select
                          aria-label=""
                          size="sm"
                          className="label-primary"
                          name="status"
                          // defaultValue={editRow?.status}
                          {...register("status")}
                        >
                          <option value="Inprogress">Inprogress</option>
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                          <option value="Pause">Pause</option>
                          <option value="Resume">Resume</option>
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
                          // disabled={
                          //   user?.loginUser?.roleId === "Resource" ? false : true
                          // }
                          placeholder="Enter Project Start Date"
                          {...register("createdDate", { required: true })}
                        />
                        {errors?.createdDate && (
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
                          name="taskDescription"
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
      {/* <RequestModal
        show={userModal}
        multiple={true}
        userListData={row}
        title="Task Detail"
        handleClose={() => setUserModal(false)}
      /> */}
    </>
  );
};

export default GenericTaskComponent;
