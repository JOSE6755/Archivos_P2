import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../Auth/UseAuth";
export default function PublicRoute({...rest}) {
    
    const {isLogged,getRole,getDep}=useAuth()
    console.log(getRole())
    if(isLogged() ){
        
       if(getRole()==="Admin"){
           return <Redirect to="/cargar"/>
       }else if(getRole()==="Revisor"){
           return <Redirect to="/Revisar"/>
       }else if(getRole()==="Coordinador"){
           return <Redirect to={`/Planilla/${getDep()}`}/>
       }else{
           return <Redirect to="/Requisitos"/>
       }
    }
    
    return(

        <Route {...rest}  />
    )
}