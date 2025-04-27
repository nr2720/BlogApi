import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../components/AuthProvider'

const ProtectedRoute = () => {
    const token = useAuth().token;
    if(!token) {
        return <Navigate to="/login" />;
    } 
        return(
            <>
                <Outlet/>
            </>
        )
}

export default ProtectedRoute;