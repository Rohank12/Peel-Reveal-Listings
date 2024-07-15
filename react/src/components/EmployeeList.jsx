import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { FixedSizeList as List } from 'react-window'

const EmployeeList = () => {
    const { user } = useAuth(); // currently logged in user
    const [employees, setEmployees] = useState([]);
    const ROW_HEIGHT = 50;
    const COLUMN_WIDTH = 250;
  
    useEffect(() => {
      fetchEmployees();
    }, []);
  
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    const convertSalaryToCurrency = (salary) => {
      return salary.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    };

    const salaryLogic = (employee) => {
      if (!user) {
        return "Salary Hidden"; // not-logged in users
      } else if (user.isHR) {
        // show all salaries
        return convertSalaryToCurrency(employee.salary);
      } else if (employee.managedBy === user.id) {
        // show only salaries of people who direct report to id
        return convertSalaryToCurrency(employee.salary);
      } else if (employee.id === user.id) {
        // show only user salary and no one elses
        return convertSalaryToCurrency(employee.salary);
      } else {
        // hide salary
        return "Salary Hidden";
      }
    };

    return (
      <div>
        <h2>Employee Directory</h2>
        <div>
          <div style= {{ display: 'flex', borderBottom: '1px solid #ddd'}}>
          <div style= {{ width: COLUMN_WIDTH }}> Name </div>
          <div style= {{ width: COLUMN_WIDTH }}> Phone Number </div>
          <div style= {{ width: COLUMN_WIDTH }}> Job Role </div>
          <div style= {{ width: COLUMN_WIDTH }}> Work Location </div>
          <div style= {{ width: COLUMN_WIDTH }}> Salary </div>
        </div>
        <List
          height={600}
          itemCount={employees.length}
          itemSize={ROW_HEIGHT}
          width={COLUMN_WIDTH * 5}
          >
            {({ index, style }) => (
              <div style={{...style, display: 'flex', algignItems: 'center', borderbottom: '1px solid #ddd'}} className="row">
                <div style={{ width: COLUMN_WIDTH, textAlign: 'center'}}>{employees[index].firstName} {employees[index].lastName}</div>
                <div style={{ width: COLUMN_WIDTH, textAlign: 'center'}}>{employees[index].phoneNumber}</div>
                <div style={{ width: COLUMN_WIDTH, textAlign: 'center'}}>{employees[index].jobRole}</div>
                <div style={{ width: COLUMN_WIDTH, textAlign: 'center'}}>{employees[index].location}</div>
                <div style={{ width: COLUMN_WIDTH, textAlign: 'center'}}>{salaryLogic(employees[index])}</div>
              </div>
            )}
        </List>
      </div>
    </div>
    );
  };
  

export default EmployeeList;