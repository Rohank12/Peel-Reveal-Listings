import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link }from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Search from './components/Search'
import EmployeeList from './components/EmployeeList'

const App = () => {
  
  //const [employees, setEmployees] = useState(employeesData);

  return (
    <>
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PSL</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </form>
          </div>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4"></main>

        <div>
          <Routes>
            <Route exact path="/employees" element={<EmployeeList />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
      
    </>
  );
};

export default App
