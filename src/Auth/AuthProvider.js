import React from "react";
import { createContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";

export const AuthContext=createContext()

export default function AuthProvider({children}) {
    
    //const[user,setUser]=useState(null)

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
        setUser({id:1,role:'admin'})
        
    }

    const logout=()=>setUser(null)


    const isLogged=()=>!!user
    const hasRole=(role)=>user?.role===role 


    const contextvalue={
        user,
        isLogged,
        hasRole,
        login,
        logout
    };

    return <AuthContext.Provider value={contextvalue}>
        {children}
    </AuthContext.Provider>
}