import React, { useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
// import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { IoIosArrowDown } from "react-icons/io";
import { RiFilter2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { useSelector } from "react-redux";
export default function TeamLeadDashoard() {
  const initialMonth = moment().format("MMM");
  const navigate=useNavigate()
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const originalChartData = {
    series: [
      {
        name: "Logged Time",
        type: "column",
        data: [
          40, 45, 44, 61, 27, 43, 21, 35, 22, 20, 27, 16, 27, 25, 32, 40, 45,
          44, 61, 27, 43, 21, 35, 22, 20, 27, 16, 27, 25, 32,
        ],
      },
      {
        name: "Extra Time",
        type: "column",
        data: [
          44, 44, 35, 14, 61, 27, 13, 21, 32, 32, 36, 27, 16, 32, 45, 66, 35,
          14, 61, 27, 13, 21, 32, 32, 36, 27, 16, 32, 45, 66,
        ],
      },
      {
        name: "Estimate Time",
        type: "line",
        data: [
          23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 2, 22, 2, 9, 23, 42, 35,
          27, 43, 22, 17, 31, 22, 22, 12, 2, 22, 2, 9,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: true,
      },
      colors: ["#26E7A6", "#FF0000", "#26A0FC"],
      stroke: {
        width: [1, 1, 1],
      },
      // title: {
      //   text: "Traffic Sources",
      // },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [2],
      },
      labels: [
        "01 Jan 2024",
        "02 Jan 2024",
        "03 Jan 2024",
        "01 Jan 2024",
        "05 Jan 2024",
        "06 Jan 2024",
        "07 Jan 2024",
        "08 Jan 2024",
        "01 Jan 2024",
        "10 Feb 2024",
        "11 Jan 2024",
        "12 Jan 2024",
        "13 Feb 2024",
        "14 Mar 2024",
        "15 Feb 2024",
        "16 Jan 2024",
        "17 Jan 2024",
        "18 Jan 2024",
        "19 Jan 2024",
        "20 Jan 2024",
        "21 Jan 2024",
        "22 Jan 2024",
        "23 Jan 2024",
        "24 Jan 2024",
        "25 Jan 2024",
        "26 Jan 2024",
        "27 Jan 2024",
        "28 Jan 2024",
        "29 Jan 2024",
        "30 Jan 2024",
      ],
      // xaxis: {
      //   type: "datetime",
      // },
      yaxis: [
        {
          // title: {
          //   text: "Website Blog",
          // },
        },
        {
          opposite: true,
          // title: {
          //   text: "Social Media",
          // },
        },
      ],
    },
  };
  const [chartData, setChartData] = useState(originalChartData);

  const handleDateFilter = (selectedDate) => {
    const formattedDate = moment(selectedDate).format("DD MMM YYYY");
    const filteredSeries = originalChartData.series.map((serie) => ({
      ...serie,
      data: serie.data.filter(
        (_, index) => originalChartData.options.labels[index] === formattedDate
      ),
    }));

    const filteredLabels = originalChartData.options.labels.filter(
      (label) => label === formattedDate
    );
    setChartData({
      ...originalChartData,
      series: filteredSeries,
      options: {
        ...originalChartData.options,
        labels: filteredLabels,
      },
    });
  };

  useEffect(() => {
    setChartData(originalChartData);
  }, []);

  // const handleMonthChange = (selectedValue) => {
  //   setSelectedMonth(selectedValue);

  //   // Convert the selected month to the desired format
  //   const formattedMonth = moment().month(selectedValue).format("MMM");

  //   if (selectedValue === "All Months") {
  //     // If "All Months" is selected, reset the chart data to the original data
  //     setChartData(originalChartData);
  //   } else {
  //     // Filter the original data based on the selected month
  //     const filteredSeries = originalChartData.series.map((serie) => ({
  //       ...serie,
  //       data: serie.data.filter(
  //         (_, index) =>
  //           moment(originalChartData.options.labels[index]).format("MMM") ===
  //           formattedMonth
  //       ),
  //     }));

  //     // Filter the labels based on the selected month
  //     const filteredLabels = originalChartData.options.labels.filter(
  //       (label) => moment(label).format("MMM") === formattedMonth
  //     );

  //     // Update the chart data state with the filtered data and labels
  //     setChartData({
  //       ...originalChartData,
  //       series: filteredSeries,
  //       options: {
  //         ...originalChartData.options,
  //         labels: filteredLabels,
  //       },
  //     });
  //   }
  // };
  // useEffect(() => {
  //   setChartData(originalChartData);
  // }, []);

  const handleMonthChange = (selectedValue) => {
    setSelectedMonth(selectedValue);

    // Convert the selected month to the desired format
    const formattedMonth = moment().month(selectedValue).format("MMM");

    if (selectedValue === "All Months") {
      // If "All Months" is selected, reset the chart data to the original data
      setChartData(originalChartData);
    } else {
      // Filter the original data based on the selected month
      const filteredSeries = originalChartData.series.map((serie) => ({
        ...serie,
        data: serie.data.filter(
          (_, index) =>
            moment(originalChartData.options.labels[index]).format("MMM") ===
            formattedMonth
        ),
      }));

      // Filter the labels based on the selected month and show only the day of the month
      const filteredLabels = originalChartData.options.labels
        .filter((label) => moment(label).format("MMM") === formattedMonth)
        .map((label) => moment(label).format("D"));

      // Update the chart data state with the filtered data and labels
      setChartData({
        ...originalChartData,
        series: filteredSeries,
        options: {
          ...originalChartData.options,
          labels: filteredLabels,
          dataLabels: {
            enabled: true, // Enable data labels for the entire chart
            style: {
              colors: ["#000"], // Customize the color of data labels
            },
            offsetY: -10, // Adjust the vertical position of data labels
          },
        },
      });
    }
  };

  // Reset the chart data to the original data when the component mounts
  useEffect(() => {
    setChartData(originalChartData);
  }, []);

  const extraTimeData = originalChartData.series[2]?.data.map(
    (estimateTime, index) =>
      estimateTime - originalChartData.series[0]?.data[index]
  );

  // Add Extra Time to the chart data
  originalChartData.series.push({
    name: "Extra Time Calculated",
    type: "column",
    data: extraTimeData,
  });

  return (
    <Row>
      <Col lg={3} md={6} sm={12}>
        <div
          className="bg-white p-3 main-tiles"
          // onClick={() => navigate("/user-list")}
        >
          <div className="d-flex">
            <p className="tiles-heading mb-1">Pending Task</p>
          </div>
          <p className=" text-end font-weight-600 font-style-tiles mb-0">3</p>
        </div>
      </Col>
      <Col lg={3} md={6} sm={12}>
        <div className="bg-white p-3 main-tiles">
          <p className="tiles-heading mb-1">Completed Projects</p>
          <p className=" text-end font-weight-600 font-style-tiles mb-0">5</p>
        </div>
      </Col>
      <Col lg={3} md={6} sm={12}>
        <div className="bg-white p-3 main-tiles">
          <div className="d-flex align-items-center justify-content-between">
            <p className="tiles-heading mb-1">Running Projects</p>
            <div className="dashboard-dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  drop="start"
                  variant="success"
                  id="dropdown-basic"
                >
                  <IoIosArrowDown />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Covis</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Domy</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Pms</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <p className=" text-end font-weight-600 font-style-tiles mb-0">3</p>
        </div>
      </Col>
      <Col lg={3} md={6} sm={12}>
        <div className="bg-white p-3 main-tiles">
          <div className="d-flex align-items-center justify-content-between">
            <p className="tiles-heading mb-1">Requests</p>
            <div className="dashboard-dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  drop="start"
                  variant="success"
                  id="dropdown-basic"
                >
                  <RiFilter2Fill />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p className="mb-0">Pending</p>
                    <p className="mb-0">10</p>
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p className="mb-0">Inprogress</p>
                    <p className="mb-0">12</p>
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p className="mb-0">Done</p>
                    <p className="mb-0">11</p>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <p className=" text-end font-weight-600 font-style-tiles mb-0">23</p>
        </div>
      </Col>
      <Col lg={12}>
        <div className="mt-5 bg-white font-weight-600 font-style-tiles">
          <Row className="">
            <Col
              lg={8}
              className="d-flex align-items-center justify-content-end"
            >
              <p className="mb-0 mt-4">Estimated Time</p>
              <p className="mb-0 mt-4 ms-3">Logged Time</p>
            </Col>
            <Col
              lg={4}
              className="d-flex align-items-center justify-content-end"
            >
              <div>
                <Form.Select
                  aria-label="Default select example"
                  // onChange={handleMonthChange}
                  // value={selectedMonth}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  value={selectedMonth}
                >
                  <option>All Months</option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </Form.Select>
              </div>
              <div>
                <input
                  type="date"
                  onChange={(e) => handleDateFilter(e.target.value)}
                  className="me-2 date-filter ms-2"
                  defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                />
              </div>
            </Col>
            <div>
              <div id="chart">
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="line"
                  height={350}
                />
              </div>
              <div id="html-dist"></div>
            </div>
            {/* <div>
              <div id="chart">
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
                  height={350}
                />
              </div>
              <div id="html-dist"></div>
            </div> */}
          </Row>
        </div>
      </Col>
    </Row>
  );
}