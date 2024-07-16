import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useEffect } from 'react';

const Navigation = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    // This effect runs whenever `user` changes
    console.log("User changed:", user);
  }, [user]); // Depend on `user` to re-run this effect whenever `user` changes

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/employees">Employee List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/predict">Predict</a>
            </li>
          </ul>
          <div className="nav-item" style={{ marginLeft: 'auto' }}>
          {user ? (
            <div className="nav-item" style={{ marginLeft: 'auto' }}>
              <span>Welcome Back, {user.firstName} {user.lastName}</span>
              <button className="btn btn-outline-danger btn-sm ms-2" onClick={logout}>Logout</button>
            </div>
          ) : ''}
          </div>
        </div>
      </div>
</nav>
    );
};

export default Navigation;