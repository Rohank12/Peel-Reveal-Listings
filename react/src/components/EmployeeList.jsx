import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { FixedSizeList as List } from 'react-window'
import Search from './Search'
import '../App.css'

const EmployeeList = () => {
    const { user } = useAuth(); // currently logged in user
    const [employees, setEmployees] = useState([]);
    const [sortNameOrder, setSortNameOrder] = useState(1);
    const [sortSalaryOrder, setSortSalaryOrder] = useState(1);
    const ROW_HEIGHT = 50;
    const COLUMN_WIDTH = 150;
  
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
        // show user salary 
        return convertSalaryToCurrency(employee.salary);
      } else {
        // hide salary
        return "Salary Hidden";
      }
    };

    const sortEmployees = () => {
      console.log(sortSalaryOrder)
      setEmployees(prevEmployees => {
        return [...prevEmployees].sort((a, b) => {
          const aSalary = salaryLogic(a) === 'Salary Hidden' ? -1 : a.salary;
          const bSalary = salaryLogic(b) === 'Salary Hidden' ? -1 : b.salary;
          return sortSalaryOrder * bSalary - aSalary;
        });
      });
      setSortSalaryOrder(sortSalaryOrder * -1); // reverse search
    };

    const sortByName = () => {
      console.log(sortNameOrder)
      setEmployees(prevEmployees => {
        return [...prevEmployees].sort((a, b) => {
          const aName = a.lastName;
          const bName = b.lastName;
          return sortNameOrder * aName.localeCompare(bName);
        });
      });
      setSortNameOrder(sortNameOrder * -1); // reverse search
    };
    return (
      <div>
        <h2>Employee Directory</h2>
        <Search setData={setEmployees}/>
        <table className = "table table-striped">
          <thead>
          <tr>
            <th onClick={sortByName}>Name</th>
            <th>Phone Number</th>
            <th>Job Role</th>
            <th>Work Location</th>
            <th onClick={sortEmployees}>Salary</th>
          </tr>
          </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.jobRole}</td>
              <td>{employee.location}</td>
              <td>{salaryLogic(employee)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  };
  

export default EmployeeList;