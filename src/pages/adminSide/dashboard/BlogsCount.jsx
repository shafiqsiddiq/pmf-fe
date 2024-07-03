import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { MdOutlineDashboard } from "react-icons/md";

import { HiOutlineDotsCircleHorizontal, HiUsers } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectAction, getAllUserWithoutLoginIdAction } from "../../../redux/actions/userAction";

export default function BlogsCount() {
  const user = useSelector((state) => state?.user);
  let dispatch = useDispatch();
  useEffect(() => {
    
    let req = {
      search_text: '',
      limit: 10,
      page: 1,
    };
    dispatch(getAllUserWithoutLoginIdAction(req));
  }, []);
  useEffect(() => {
    let req = {
      search_text: '',
      limit: 10,
      page: 1,
    };
    dispatch(getAllProjectAction(req));
  }, []);
  let resources = user?.getUserNoLoginIdData?.data
    ?.filter(
      (item) =>
        item?.userRole === "Resource"
    )
    .map((filtered) => filtered);
  let teamLeads = user?.getUserNoLoginIdData?.data
    ?.filter(
      (item) =>item?.userRole === "TeamLead"
    )
    .map((filtered) => filtered);
  const TOAT_COUNTS = [
    {
      title: "Total Teams Leads",
      totalCounts: "50",
      countsIcon: <HiUsers />,
    },
    {
      title: "Total Projects",
      totalCounts: "50",
      countsIcon: <HiOutlineDotsCircleHorizontal />,
    },
    {
      title: "Total Resources",
      totalCounts: "150",
      countsIcon: <MdOutlineDashboard />,
    },
  ];
  return (
    <div >
      <Row className="">
        <Col lg={4}>
          <Card className="h-100 mb-3 border-0 ps-0" style={{background:"#e7a3b9"}}>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between tiles-style">
                <div className={`bg-light mb-0 rounded count-user `}>
                  <HiUsers />
                </div>
                <h3 className="mb-0 font-style-tiles">{teamLeads?.length?teamLeads?.length:0}</h3>
                <p className="mb-0 font-style-tiles"> Total Teams Leads</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="h-100 mb-3 border-0 ps-0" style={{background:"darkseagreen"}}>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between tiles-style">
                <div className={`bg-light mb-0 rounded count-user `}>
                  <HiUsers />
                </div>
                <h3 className="mb-0 font-style-tiles">{user?.getAllProjectData?.data?.length?user?.getAllProjectData?.data?.length:0}</h3>
                <p className="mb-0 font-style-tiles"> Total Projects</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="h-100 mb-3 border-0 ps-0" style={{background:"cadetblue"}}>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between tiles-style">
                <div className={`bg-light mb-0 rounded count-user `}>
                  <HiUsers />
                </div>
                <h3 className="mb-0 font-style-tiles">{resources?.length?resources?.length:0}</h3>
                <p className="mb-0 font-style-tiles"> Total Resources</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
