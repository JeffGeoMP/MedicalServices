import React from 'react';
import { Navigate } from 'react-router-dom';
import authenticate from '../auth/authenticate';

export default function PrivateRoute ({ children }) {
    const auth = authenticate.verifyToken();
    return auth ? children : <Navigate to="/login" />;
};

/**
 * const PrivateRoute = () => {
    const auth = authenticate.verifyToken();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
 */