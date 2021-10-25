import React from "react";
import Login from "./Components/Login";
import Expediente from "./Components/Expediente";
import CargaXML from "./Components/Cargarxml";
import C_User from "./Components/C_Users";
import "./Styles/App.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from "./Components/Inicio"
import Info from "./Components/Info";
import PrivateRoute from "./Route/PrivateRoute";
import PublicRoute from "./Route/PublicRoute";
import AuthProvider from "./Auth/AuthProvider";
import { 
    BrowserRouter as Router,
    Switch,
    Route
 } from "react-router-dom";
import Layout from "./Route/Layout";
export default function App(){
    return(
        <AuthProvider>
        
        <Router>
        <Layout>
            <Switch>
                <PublicRoute exact path="/" component={Login}/>
                <PublicRoute exact path="Inicio/Puesto/:Departamento/:Puesto/Registro" component={Expediente}/>
                <PrivateRoute hasRole="admin" exact path="/cargar" component={CargaXML}/>
                <PrivateRoute hasRole="admin" exact path="/Usuarios" component={C_User}/>
                <PublicRoute exact path="/Inicio" component={Inicio}/>
                <PublicRoute exact path="/Inicio/Puesto/:Departamento/:Nombre" component={Info}/>
            </Switch>
            </Layout>
        </Router>
        </AuthProvider>
        
    )
}