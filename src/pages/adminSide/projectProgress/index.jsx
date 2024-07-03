import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { projectProgressDataAction } from "../../../redux/actions/userAction";
import BootstrapTable from "react-bootstrap-table-next";
const ProgressBardd = ({ projectCost, expense, profit }) => {
  // const progress = (expense / projectCost) * 100;

  // const progressBarStyles = {
  //   width: `${progress}%`,
  // };

  // let progressBarColor = '';
  // if (expense > projectCost) {
  //   progressBarColor = 'bg-danger';
  // } else {
  //   progressBarColor = 'bg-success';
  // }
  return (
    <div>
      {/* <ProgressBar> */}

      {/* <ProgressBar striped variant="success" now={projectCost} key={1} /> */}
      {/* <ProgressBar variant="warning" now={4400} key={2} /> */}

      {profit > 0 ? (
        <ProgressBar
          striped
          variant="success"
          now={(expense / projectCost) * 100}
          key={3}
        />
      ) : (
        <ProgressBar>
          <ProgressBar
            striped
            variant="success"
            now={(projectCost / expense) * 100}
            key={1}
          />
          <ProgressBar
            variant="danger"
            now={((profit * -1) / expense) * 100}
            key={2}
          />
        </ProgressBar>
      )}
      {/* </ProgressBar> */}
      {/* <div className={`progress-bar ${progressBarColor}`} role="progressbar" style={progressBarStyles} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      {profit<0? <sapn className="text-profit-loss">Loss = {-1*profit}</sapn>:<sapn className="text-profit-loss">Profit = {profit}</sapn>}
    </div> */}
    </div>
  );
};
export default function projectprogress() {
  let dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    let req = {
      projectId: location?.state?.data?._id,
      keyValue: location?.state?.keyValue,
    };
    dispatch(projectProgressDataAction(req));
    // simulateProgress()
    
  }, []);
  const userReducer = useSelector((state) => state?.user);
  
  const projectCost =
    userReducer?.getProjectProgressData?.finalProjectCost?.projectCost; // Sample project cost
  const expense = userReducer?.getProjectProgressData?.totalCost;
  const profit = userReducer?.getProjectProgressData?.profitLossData;
  const columns = [
    {
      text: "Resource Name",
      dataField: "resourceName",
      selector: (row) => row,
      sort: true,
    },
    {
      text: "Logged Time",
      dataField: "loggedTime",
      selector: (row) => row,
      sort: true,
    },
    {
      text: "Resource Expense",
      dataField: "totalCostPerResource",
      // selector: (row) =>$+row.toFixed(2),
      formatter: (row) => {
        return (
          <>
            <div className="text-dark">
              <span>{row ? "$" + row.toFixed(2) : "Add Resource Salary"}</span>
            </div>
          </>
        );
      },
      sort: true,
      align: "center",
      headerAlign: "center",
      sort: true,
    },
  ];

  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={1}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">
                  {
                    userReducer?.getProjectProgressData?.finalProjectCost
                      ?.projectName
                  }
                </h5>
              </div>
            </Col>
            <Col lg={3}>
              <div className="container">
                <ProgressBardd
                  projectCost={projectCost}
                  expense={expense}
                  profit={profit}
                />
              </div>
            </Col>
            <Col lg={2}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">
                  Project Total Cost :$
                  {
                    userReducer?.getProjectProgressData?.finalProjectCost
                      ?.projectCost
                  }
                </h5>
              </div>
            </Col>
            <Col lg={3}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">
                  Project Total Expenses :$
                  {parseFloat(
                    userReducer?.getProjectProgressData?.totalCost
                  ).toFixed(2)}
                </h5>
              </div>
            </Col>
            <Col lg={3}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">
                  Project Profit :{"$"}
                  {userReducer?.getProjectProgressData?.profitLossData}
                </h5>
              </div>
            </Col>
          </Row>
          <Row className=" blog-table table-responsive">
            {userReducer?.getProjectProgressDataLoading === true && (
              <div className="text-center user-listing-loader">
                {" "}
                <ScaleLoader color="#0f71b0" />
              </div>
            )}
            {userReducer?.getProjectProgressDataFailure === true && (
              <span className="text-danger text-center">Network Error</span>
            )}
            {userReducer &&
              userReducer.getProjectProgressDataSuccess === true && (
                <BootstrapTable
                  className=""
                  // bootstrap4
                  noDataIndication={"No Record Found"}
                  keyField="projectId"
                  data={
                    userReducer?.getProjectProgressData?.finaResult
                      ? userReducer?.getProjectProgressData?.finaResult
                      : []
                  }
                  columns={columns}
                  // selectRow={selectRow}
                  hover
                  // pagination={paginationFactory(options)}
                />
              )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
