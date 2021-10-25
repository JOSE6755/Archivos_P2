import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../Auth/UseAuth";
export default function PrivateRoute({hasRole:role, ...rest}) {
   
    const {hasRole,isLogged}=useAuth()
    const {user}=useAuth()
    
    //if(role && user?.role!==role) return <Redirect to="/"/>


    if(role && !hasRole(role)) {
        console.log(localStorage.getItem("Sesion"))
        return <Redirect to="/"/>
    }

    if(!isLogged()){
        return(
            <Redirect to="/"/>
        )
    }
    
    return(
        
        <Route {...rest}  />
    )
}