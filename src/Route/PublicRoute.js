import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../Auth/UseAuth";
export default function PublicRoute(props) {
    
    const {isLogged}=useAuth()

    if(isLogged()){
        return(
            <Redirect to="/cargar"/>
        )
    }
    
    return(

        <Route {...props}  />
    )
}