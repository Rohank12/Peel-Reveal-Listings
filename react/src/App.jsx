import { useState } from 'react'
import './App.css'
import employeesData from "./components/employees";
import Home from './components/Home'
import Search from './components/Search'
import EmployeeList from './components/EmployeeList'

const App = () => {
  
  const [employees, setEmployees] = useState(employeesData);

  return (
    <div className="App">
      <Home />
      
      
    </div>
  );
};

export default App
