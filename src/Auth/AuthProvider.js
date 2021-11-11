import React from "react";
import { createContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import axios from "axios";

export const AuthContext=createContext()

export default function AuthProvider({children}) {
    
    //const[user,setUser]=useState(null)
    //localStorage.removeItem("Sesion")
    const [user,setUser]=useState(()=>{
        const data=localStorage.getItem("Sesion")
        if(data){
            return JSON.parse(data)
        }else{
            return null
        }
    })
    useEffect(()=>{
        localStorage.setItem("Sesion",JSON.stringify(user))
    },[user])

    function login(credenciales) {
       //console.log(credenciales)
        setUser(credenciales)
    
    }

    const logout=()=>setUser(null)
    function getRole() {
        if(user!=null){
            return user.role
        }
    }

    function getId() {
        return user.id
    }
    function getDep() {
        return user.departamento
    }

    const isLogged=()=>!!user
    const hasRole=(role)=>user?.role===role 


    const contextvalue={
        user,
        isLogged,
        hasRole,
        login,
        logout,
        getRole,
        getId,
        getDep
    };

    return <AuthContext.Provider value={contextvalue}>
        {children}
    </AuthContext.Provider>
}