import React, { useState } from "react";
import { Redirect } from "react-router";
import useAuth from "../Auth/UseAuth";
import "../Styles/Login.css"
import axios from "axios";

export default function Login() {
    const { login } = useAuth()
    const [datos, setDatos] = useState({ userName: null, password: null })
    async function probando(e) {
        if (datos.userName != "admin") {
            e.preventDefault()
            let usuario = null
            await axios.get(`http://localhost:3100/login/${datos.userName}/${datos.password}`)
                .then(response => {
                    console.log(response.data, "hola")
                    usuario = response.data

                }).catch(err => {
                    console.log(err)
                })
            await login(usuario)
        }else{
            login({user:"administrador",role:"Admin"})
        }
    }

    return (
        <div id="CLogin">
            <form className="Login" onSubmit={probando}>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(e) => setDatos({ ...datos, userName: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setDatos({ ...datos, password: e.target.value })} />
                <input type="submit" value="Login" />
            </form>
        </div>

    );
}