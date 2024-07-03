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
import RemoveModal from "../../../components/genericModal/RemoveModal";
import { useForm } from "react-hook-form";
import TimeField from "react-simple-timefield";
import { FieldError } from "../../../components/errorMessage/ErrorMessage";
import { PulseLoader, ScaleLoader } from "react-spinners";
import Tooltip from "react-tooltip-lite";
import GenericTaskComponent from "../../../components/GenericTaskComponent";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function TaskList() {
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
  const [searchName, setsearchName] = useState("");
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
    if (user?.userRole === "TeamLead" || user?.userRole === "Resource") {

      let req = {
        userId: user?.userId,
      };
      dispatch(getUserTasksAction(req));
    }
  }, []);
 
  useEffect(() => {
    let req = {
      search_text: searchName,
      limit: 10,
      page: 1,
      isPagination: false
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, [searchName]);
 
  useEffect(() => {
    let req = {
      projectName: "",
    };
    dispatch(getAllProjectAction(req));
  }, []);
  const userList = useSelector((state) => state.user);
  let allResources = userList?.getUserNoLoginIdData?.data;
  function onEditSubmit(data) {
    let req = {
      status:
        data.status === "Inprogress"
          ? "Inprogress"
          : data.status === "Pending"
            ? "Pending"
            : "Done",
      estimatedTaskTime:
        parseInt((estimatedTaskTime[0] + estimatedTaskTime[1]) * 60) +
        parseInt(estimatedTaskTime[3] + estimatedTaskTime[4]),
      estimatedTime:
        parseInt((timeState[0] + timeState[1]) * 60) +
        parseInt(timeState[3] + timeState[4]),
      id: teamId,
      createdDate: data.createdDate,
      taskName: data.taskName,
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
    row.stopPropagation();
    // setSelectedStatus(item.status);
    setEditShow(true);
    setEditRow(item);
    setrowData(item);
    setTeamId(item?._id);
  }
  const userReducer = useSelector((state) => state?.user);
  let userRole = userReducer?.getUserNoLoginIdData?.data
    ?.filter((item) => item?.userRole == "Resource" || item?.userRole == "TeamLead")
    .map((filtered) => filtered);

  const handleFillter = () => { };
  const callApi = () => {
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
    if (user?.userRole === "TeamLead" || user?.userRole === "Resource") {
      let req = {
        userId: user?.userId,
      };

      dispatch(getUserTasksAction(req));
      setEstimatedTimeValidation(false);
      setEditShow(false);
    }
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
                  {/* {row?.length > 15 ? row?.slice(0, 20) + "..." : row} */}
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
      text: `${user?.userRole === "Admin" || user?.userRole === "PM"
        ? ""
        : "Action"
        }`,
      dataField: "action",
      formatter: (row, item) => {
        return (
          <>
            {user?.userRole === "Admin" ||
              user?.userRole === "PM" ? null : (
              <MdOutlineEdit
                className="edit-icon me-2"
                onClick={(row) => onEdit(row, item)}
              />
            )}
            {user?.userRole === "Admin" ||
              user?.userRole === "PM" ? null : (
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
    <Card className="border-0 mt-3">
      <Card.Body>
        <GenericTaskComponent isResource={true} taskData={allResources} />
      </Card.Body>
    </Card>
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
