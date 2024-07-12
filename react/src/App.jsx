import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Search from './components/Search'
import EmployeeList from './components/EmployeeList'

const App = () => {
  
  //const [employees, setEmployees] = useState(employeesData);

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
