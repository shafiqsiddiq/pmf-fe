import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EmployeeGraph = ({ employeeData }) => {
  const employeeNames = employeeData.map((employee) => employee.name);
  const employeeAges = employeeData.map((employee) => employee.age);
  const employeeSalaries = employeeData.map((employee) => employee.salary);

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: '',
    },
    xAxis: {
      title: {
        text: 'Resource Name',
      },
      categories: employeeNames,
    },
    yAxis: [
      {
        title: {
          text: 'Cost',
        },
      },
      {
        title: {
          text: '',
        },
        labels: {
          formatter: function () {
            return null;
          },
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: 'Cost',
        data: employeeAges,
      },
      {
        name: 'Expense',
        data: employeeSalaries,
        yAxis: 1,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default EmployeeGraph;
