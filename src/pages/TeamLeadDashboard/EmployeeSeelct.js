import React, { useState } from 'react';

const EmployeeSelect = ({ employeeData, onSelectEmployee }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedEmployee(selectedValue);
    onSelectEmployee(selectedValue);
  };

  return (
    <select value={selectedEmployee} onChange={handleChange} className='form-control w-25'>
      <option value="">Select resource</option>
      {employeeData.map((employee) => (
        <option key={employee.name} value={employee.name}>
          {employee.name}
        </option>
      ))}
    </select>
  );
};

export default EmployeeSelect;