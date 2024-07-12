import React from "react";

const EmployeeList = ({ employees }) => {
  return (
    <div>
      <h2>Employee Directory</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <strong>{employee.name}</strong> - {employee.jobRole}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;