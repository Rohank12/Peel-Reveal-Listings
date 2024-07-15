import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Peel & Reveal Listings</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginRight: '20px' }}>
                    <Link to="/login">
                        <button>Go to Login</button>
                    </Link>
                    <p style={{ fontSize: '14px' }}>Log in to your account</p>
                </div>
                <div>
                    <Link to="/employees">
                        <button>Go to Employees List</button>
                    </Link>
                    <p style={{ fontSize: '14px' }}>View the list of employees</p>
                </div>
            </div>
            <div>
                <p style={{ fontSize: '10px' }}>NOTE: If you are not logged in, you will not see any salaries</p>
            </div>
        </div>
    );
};

export default Home;