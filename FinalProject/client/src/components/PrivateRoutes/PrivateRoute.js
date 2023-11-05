import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const isAuthenticated = localStorage.getItem("token") !== null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;