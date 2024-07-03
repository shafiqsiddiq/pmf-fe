import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { MdFilterAlt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import { Notification } from "../../../components/genericActions";
import { useNavigate } from "react-router-dom";
import EditUserProfileModal from "./EditUserProfileModal";
import RemoveModal from "../../../components/genericModal/RemoveModal";
import ArchiveModal from "../../../components/genericModal/ArchiveModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  editUserAction,
  getAllUserWithoutLoginIdAction,
} from "../../../redux/actions/userAction";
import { AiFillEdit, AiOutlineEye } from "react-icons/ai";
import CustomPagination from "../../../components/genericModal/CustomPagination";

export default function UserList() {
  const [editUserModal, setEditUserModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [editRow, setEditRow] = useState();
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [removeId, setRemoveId] = useState();
  const [archiveUserModal, setArchiveUserModal] = useState(false);
  const [archive, setArchive] = useState();
  const [randomString, setRandomString] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("pms_user"));
  const user = useSelector((state) => state.user);
  const userRole = user?.getUserNoLoginIdData?.data;

  useEffect(() => {
    const req = {
      search_text: searchName,
      limit: 10,
      isPagination: true,
      page: searchName ? 1 : page,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, [searchName, page, dispatch]);

  const handleSearch = () => {
    setPage(1)
    setSearchName("");
  };

  const generateRandomString = () => {
    const length = 8;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomString(result);
  };

  const handleRemove = useCallback((row, item) => {
    row.stopPropagation();
    setRemoveUserModal(true);
    setRemoveId(item?.userId);
  }, []);

  const handleArchive = useCallback((row, item) => {
    row.stopPropagation();
    setArchiveUserModal(true);
    setArchive(item);
  }, []);

  const handleEdit = useCallback((row, item) => {
    row.stopPropagation();
    setEditUserModal(true);
    setEditRow(item);
  }, []);

  const deleteUser = useCallback((removeId) => {
    dispatch(deleteUserAction(removeId, onSuccess, Notification));
  }, [dispatch]);

  const archiveUser = useCallback((archive) => {
    const finalData = {
      login_id: archive?._id,
      password: randomString,
    };
    dispatch(editUserAction(finalData, () => setShowPassword(true), Notification));
  }, [dispatch, randomString]);

  const onSuccess = () => {
    const req = {
      search_text: '',
      isPagination: true,
      limit: 10,
      page: 1,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }

  const handlePageChange = (page, sizePerPage) => {
    
    setPage(page);
    setSizePerPage(sizePerPage);
  };

  const columns = [
    { text: "First Name", dataField: "firstName", sort: true },
    { text: "Last Name", dataField: "lastName", sort: true },
    { text: "Email", dataField: "email", sort: true },
    {
      text: "Role",
      dataField: "roleId",
      formatter: (cell, item) => {
        const roleMap = {
          "TeamLead": "Team Lead",
          "Resource": "Resource",
          "4": "Project Manager",
          "Admin": "Admin"
        };
        return roleMap[item?.userRole] || "Admin";
      },
      sort: true,
    },
    {
      text: "Action",
      dataField: "action",
      formatter: (row, item) => (
        <>
          <AiFillEdit className="me-2" color={"#386697"} onClick={(e) => handleEdit(e, item)} />
          <RiDeleteBin6Line className="delete-icon me-2" onClick={(e) => handleRemove(e, item)} />
          <AiOutlineEye className="download-icon" color="#386697" size={20} onClick={() => navigate("/resource-tasks", { state: { data: item } })} />
        </>
      ),
      left: true,
    },
  ];

  const columnsPm = [
    { text: "First Name", dataField: "firstName", sort: true },
    { text: "Last Name", dataField: "lastName", sort: true },
    { text: "Email", dataField: "email", sort: true },
    {
      text: "Role",
      dataField: "userRole",
      formatter: (row) => {
        const roleMap = {
          "TeamLead": "Team Lead",
          "Resource": "Resource",
          "4": "Project Manager",
          "Admin": "Admin"
        };
        return roleMap[row] || "Admin";
      },
      sort: true,
    },
  ];

  return (
    <>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5>{userData?.userRole === "Admin" ? "Resources Settings" : "Resources"}</h5>
                <div className="d-flex">
                  <Form.Group className="me-2">
                    <Form.Control
                      type="text"
                      size="sm"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      placeholder="Search Users"
                    />
                  </Form.Group>
                  <div className="filter-btn d-flex align-items-center view-all-button cursor-pointer text-white" onClick={handleSearch}>
                    <MdFilterAlt />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="user-table table-responsive">
            {user?.getUserNoLoginIdLoading && (
              <div className="text-center user-listing-loader">
                <ScaleLoader color="#0f71b0" />
              </div>
            )}
            {user?.getUserNoLoginIdSuccess && (
              <BootstrapTable
                className="mb-2"
                noDataIndication={"No Record Found"}
                keyField="_id"
                data={userRole || []}
                columns={columns}
                hover
              />
            )}
            <CustomPagination
              page={page}
              sizePerPage={sizePerPage}
              totalSize={user?.getUserNoLoginIdData?.meta?.totalRecords || 0} // Replace with your actual total size
              onPageChange={handlePageChange}
            />
          </Row>
        </Card.Body>
      </Card>
      {editUserModal && (
        <EditUserProfileModal
          show={editUserModal}
          handleClose={() => setEditUserModal(false)}
          title="Resource"
          row={editRow}
        />
      )}
      <RemoveModal
        show={removeUserModal}
        handleClose={() => setRemoveUserModal(false)}
        title="User"
        remove={() => deleteUser(removeId)}
      />
      <ArchiveModal
        show={archiveUserModal}
        handleClose={() => setArchiveUserModal(false)}
        title="Resource"
        archive={() => archiveUser(archive)}
      />
      {showPassword && (
        <Modal
          show={showPassword}
          onHide={() => setShowPassword(false)}
          backdrop="static"
          className="user-modal"
        >
          <Modal.Header className="border-0">
            <Modal.Title>Generated Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Control type="text" size="sm" value={randomString} readOnly />
                </Col>
              </Row>
            </Card.Body>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="secondary" onClick={() => setShowPassword(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
