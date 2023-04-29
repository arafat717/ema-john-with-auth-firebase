import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';


export const AuthContex = createContext(null);
const Authprovider = ({children}) => {
    const auth = getAuth(app);
    const [user,setUser]=useState(null);
    const [loader,setLoader]=useState(true);
    const createsignup =(email,password)=>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login = (email,password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout =()=>{
        return signOut(auth)
    }

    useEffect(()=>{
      
        const unsubscribe = onAuthStateChanged(auth, currentuser=>{
            setUser(currentuser)
            setLoader(false)
        })
        return ()=>{
            return unsubscribe;
        }
    },[])
    const authinfo = {
        user,
        createsignup,
        login,
        logout,
        loader
    }
    return (
        <AuthContex.Provider value={authinfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default Authprovider;