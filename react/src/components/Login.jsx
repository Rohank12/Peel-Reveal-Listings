import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(username, password);
        try {
            await login(username, password);
            navigate('/employees');
        } catch (error) {
            setError('Authentication Failed');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        </div>
    );
};

export default Login;