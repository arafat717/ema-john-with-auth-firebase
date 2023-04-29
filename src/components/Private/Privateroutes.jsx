import React, { useContext } from 'react';
import { AuthContex } from '../Authprovider/Authprovider';
import {Navigate ,useLocation} from 'react-router-dom'

const Privateroutes = ({children}) => {
    const {user,loader}=useContext(AuthContex)
    const location = useLocation()
    if(user){
        return children;
    }
    if(loader){
        return <div>Loading...</div>
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default Privateroutes;