import { React } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const listing  = useLocation();
    return listing.state == null ? <Navigate to='/admin'/> : children;
}

export default PrivateRoute;