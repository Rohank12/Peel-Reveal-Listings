import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import PredictForm from './components/PredictForm'
import Search from './components/Search'
import EmployeeList from './components/EmployeeList'
import Login from './components/Login'
import { AuthProvider } from "./hooks/AuthContext";

const App = () => {
  
  //const [employees, setEmployees] = useState(employeesData);

  return (
    <Router>
      <div>
        <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/employees" element={<EmployeeList />} />
          <Route exact path="/predict" element={<PredictForm />} />
        </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App
