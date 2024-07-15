import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '30px' }}>Peel & Reveal Listings</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <div style={{ marginRight: '40px', textAlign: 'center' }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>Go to Login</button>
                    </Link>
                    <p style={{ fontSize: '16px', margin: 0 }}>Log in to your account</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/employees" style={{ textDecoration: 'none' }}>
                        <button style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>Go to Employees List</button>
                    </Link>
                    <p style={{ fontSize: '16px', margin: 0 }}>View the list of employees</p>
                </div>
            </div>
            <div style={{ marginTop: '30px' }}>
                <p style={{ fontSize: '14px', fontStyle: 'italic', margin: 0 }}>
                    NOTE: If you are not logged in, you will not see any salaries
                </p>
            </div>
        </div>
    );    

};

export default Home;