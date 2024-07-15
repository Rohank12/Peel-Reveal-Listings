import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import PredictForm from './components/PredictForm'
import EmployeeList from './components/EmployeeList'
import Login from './components/Login'
import Navigation from './components/Navigation';
import { AuthProvider } from "./hooks/AuthContext";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const App = () => {
  
  //const [employees, setEmployees] = useState(employeesData);
  return (
    <>
    <Router>
      <div>
        <Navigation />
        <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/employees" element={<EmployeeList />} />
          <Route exact path="/predict" element={<PredictForm />} />
          <Route exact path="/nav" element={<Navigation />} />
        </Routes>
        </AuthProvider>
      </div>
    </Router>
    </>
  );
};

export default App
