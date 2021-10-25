import React,{useState} from "react";
import { Redirect } from "react-router";
import useAuth from "../Auth/UseAuth";
import "../Styles/Login.css"
const credenciales={}
export default function Login(){
    const {login}=useAuth()
    const [datos,setDatos]=useState({userName:null,password:null})
    function probando(e) {
        e.preventDefault()
        if(datos.userName==="jose" && datos.password==="123"){
            login(credenciales)
        }
    }

    return(
        <div id="CLogin">
        <form className="Login" onSubmit={probando}>
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={(e)=>setDatos({...datos,userName:e.target.value})}/>
            <input type="password" placeholder="Password" onChange={(e)=>setDatos({...datos,password:e.target.value})}/>
            <input type="submit" value="Login"/>
        </form>
        </div>
       
    );
} 