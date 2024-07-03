import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Highcharts from "highcharts/highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  MdFilterAlt,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

export default function TotalBlogs() {
  const [countYear, setcountYear] = useState(2023);

  const leadsPerMonth = {
    chart: {
      height: (9 / 16) * 40 + "%",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: [
        "Jan",
        "Fab",
        "MAr",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    exporting: { enabled: false },
    series: [
      {
        type: "column",
        name: "Unemployed",
        colorByPoint: true,
        data: [
          {
            x: 0,
            y: 10,
            color: "#F2F8FF",
          },
          {
            x: 1,
            y: 12,
            color: "#F2F8FF",
          },
          {
            x: 3,
            y: 40,
            color: "#F2F8FF",
          },
          {
            x: 2,
            y: 20,
            color: "#F2F8FF",
          },
          {
            x: 4,
            y: 10,
            color: "#F2F8FF",
          },
          {
            x: 5,
            y: 80,
            color: "#F2F8FF",
          },
          {
            x: 6,
            y: 90,
            color: "#F2F8FF",
          },
          {
            x: 7,
            y: 6,
            color: "#F2F8FF",
          },
          {
            x: 8,
            y: 70,
            color: "#F2F8FF",
          },
          {
            x: 9,
            y: 30,
            color: "#F2F8FF",
          },
          {
            x: 10,
            y: 80,
            color: "#F2F8FF",
          },
          {
            x: 11,
            y: 50,
            color: "#F2F8FF",
          },
        ],
        showInLegend: false,
      },
    ],
  };
  return (
    <Card className="border-0  mb-4">
      <Card.Body>
        <Row className="mb-3">
          <Col lg={12} className="total-user-component">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
              <h5 className="generic-heading-level-2 generic-theme-color ">
                Total Blogs
              </h5>
              <p className="mb-0">
                {" "}
                <MdKeyboardArrowLeft
                  className="me-2 cursor mb5px"
                  onClick={() => setcountYear(countYear - 1)}
                />
                {countYear}{" "}
                <MdKeyboardArrowRight
                  className="ms-2 cursor mb5px"
                  onClick={() => setcountYear(countYear + 1)}
                />
              </p>
              <div className="d-flex ">
                <div className="cursor-pointer text-black">
                  <MdFilterAlt />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="total-blogs">
            <HighchartsReact
              highcharts={Highcharts}
              options={leadsPerMonth}
              isPureConfig={true}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
