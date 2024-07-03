import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Highcharts from "highcharts/highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  MdFilterAlt,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
export default function TotalUsers() {
  const [countYear, setcountYear] = useState(2023);

  const leadsPerMonth ={
    chart: {
        type: 'column'
    },
    title: {
        text: null,
        align: 'left'
    },
    subtitle: {
        text:null,
        align: 'left'
    },
    xAxis: {
        categories: ['Covis', 'PMS', 'GSM', 'Randox', 'AMS', 'HEA'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: null
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Cost',
            data: [406292, 260000, 107000, 68300, 27500, 14500]
        },
        {
            name: 'Expense',
            data: [51086, 136000, 40000, 141000, 107180, 77000]
        },
        // {
        //     name: 'Remainig',
        //     data: [51086, 136000, 5500, 141000, 107180, 77000]
        // }
    ]
}
  
  return (
    <div>
      <Card className="border-0 h-100 mb-4">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12} className="total-user-component">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                <h5 className="generic-heading-level-2 generic-theme-color ">
                  Total Projects
                </h5>
                {/* <p className="mb-0">
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
                </p> */}
                {/* <div className="d-flex ">
                  <div className="cursor-pointer text-black">
                    <MdFilterAlt />
                  </div>
                </div> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="total-users">
              <HighchartsReact
                // highcharts={Highcharts}
                options={leadsPerMonth}
                isPureConfig={true}
                highcharts={Highcharts}
                // options={chartOptions}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
