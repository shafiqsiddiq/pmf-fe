import React, { useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasksAction } from "../../../redux/actions/userAction";

export default function BlogList() {
  const user = JSON.parse(localStorage.getItem("pms_user"));

  let dispatch = useDispatch();
  useEffect(() => {
    let req = {
      login_id: user?.loginUser?._id,
    };
    dispatch(getUserTasksAction(req));
  }, []);
  const userReducer = useSelector((state) => state?.user);
  const usersFiltered = userReducer?.getAllBlogRequestByUser
    ?.filter((item) => item?.status === "Pending")
    ?.map((filtered) => filtered);

  const columns = [
    {
      text: "Request ID",
      dataField: "_id",
      selector: (row) => row,
      sort: true,
    },
    {
      text: " Blog Title",
      dataField: "blogTitle",
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row ? row : "N/A"}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Requested Date",
      dataField: "requestedDate",
      selector: (row) => row.phone,
      sort: true,
      align: "center",
      headerAlign: "center",
    },
    {
      text: "Status",
      dataField: "status",
      align: "center",
      headerAlign: "center",
      sort: true,
      formatter: (row) => {
        return (
          <>
            <div className="status-style">
              <span>{row}</span>
            </div>
          </>
        );
      },
      left: true,
    },
  ];

  // const selectRow = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //    onSelect:hanldeChange
  // };
  const options = {
    // pageStartIndex: 0,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row className=" blog-table table-responsive">
            <BootstrapTable
              className=""
              bootstrap4
              noDataIndication={"No Record Found"}
              keyField="id"
              data={usersFiltered ? usersFiltered : []}
              columns={columns}
              // selectRow={selectRow}
              hover
              pagination={paginationFactory(options)}
            />
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
