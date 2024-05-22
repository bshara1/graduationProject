import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path

function PrivateRoute({ element }) {
    const { authToken } = useAuth();

    return authToken ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
