import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating an authentication context
const AuthContext = createContext(null);

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // check localStorage for user data on app start
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

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
                localStorage.setItem('user', JSON.stringify(data));
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            throw error; // throw again for login
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
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