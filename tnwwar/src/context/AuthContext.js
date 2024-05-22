import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [userRole, setUserRole] = useState(null);

    const login = async (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        await fetchUserRole(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUserRole(null);
    };

    const fetchUserRole = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/profilePage', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserRole(data.user_role);
            } else {
                console.error('Failed to fetch user role');
            }
        } catch (error) {
            console.error('An error occurred while fetching user role:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            fetchUserRole(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authToken, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
