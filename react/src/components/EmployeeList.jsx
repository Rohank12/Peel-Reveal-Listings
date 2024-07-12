import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const EmployeeList = () => {
    const { user } = useAuth(); // currently logged in user
    const [employees, setEmployees] = useState([]);
    console.log(user)
  
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
  
    return (
      <div>
        <h2>Employee Directory</h2>
        <div className="employee-list">
          {employees.map((employee) => (
            <div key={employee.id} className="employee-item">
              <p>{employee.firstName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default EmployeeList;