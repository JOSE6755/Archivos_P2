import React,{useState} from "react";
import "../Styles/Login.css"
export default function Login(){
    return(
        <div id="CLogin">
        <form className="Login" method="post">
            <h1>Login</h1>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <input type="submit" value="Login"/>
        </form>
        </div>
       
    );
} 