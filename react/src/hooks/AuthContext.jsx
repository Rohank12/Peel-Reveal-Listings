import React, { createContext, useContext, useState } from 'react';

// Creating an authentication context
const AuthContext = createContext(null);

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try { // change link eventually
            const response = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log("DATA RECEIVED: ", data)
            if (data._id) {
                setUser(data);
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null); // In real scenarios, you might want to invalidate the session on the server as well
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);