import React from "react";
import Login from "./Components/Login";
import Expediente from "./Components/Expediente";
import CargaXML from "./Components/Cargarxml";
import C_User from "./Components/C_users";
import E_users from "./Components/Editar_U";
import V_users from "./Components/Ver_Us";
import EL_users from "./Components/Eliminar_Us";
import Rev_Exp from "./Components/Rev_Exp";
import No_Aso from "./Components/No_Aso";
import Pruebitas from "./Components/Pruebitas";
import D_Exp from "./Components/D_Exp";
import Cord_Users from "./Components/Coordinacion";
import Requisitos from "./Components/Requisitos";
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
                <PublicRoute exact path="/Inicio/Puesto/:Departamento/:Puesto/Registro" component={Expediente}/>
                <PrivateRoute hasRole="normal" dir="/Planilla/:ID" exact path="/Requisitos" component={Requisitos}/>
                <PrivateRoute hasRole="Coordinador" dir="/Planilla/:ID" exact path="/Planilla/:ID" component={Cord_Users}/>
                <PrivateRoute hasRole="Coordinador" dir="/PlanillaN/:ID" exact path="/PlanillaN/:ID" component={No_Aso}/>
                <PrivateRoute hasRole="Revisor" dir="/Revisar" exact path="/Revisar" component={Rev_Exp}/>
                <PrivateRoute hasRole="Revisor" dir="/DatosExp/:ID" exact path="/DatosExp/:ID"  component={D_Exp}/>
                <PrivateRoute hasRole="Admin" dir="/cargar" exact path="/cargar" component={CargaXML}/>
                <PrivateRoute hasRole="Admin" dir="/Usuarios" exact path="/Usuarios" component={C_User}/>
                <PrivateRoute hasRole="Admin" dir="/Editar/:id" exact path="/Editar/:id" component={E_users}/>
                <PrivateRoute hasRole="Admin" dir="/Ver" exact path="/Ver" component={V_users}/>
                <PrivateRoute hasRole="Admin" dir="/Eliminar" exact path="/Eliminar" component={EL_users}/>
                <PublicRoute exact path="/Inicio" component={Inicio}/>
                <PublicRoute exact path="/Inicio/Puesto/:Departamento/:Nombre" component={Info}/>
            </Switch>
            </Layout>
        </Router>
        </AuthProvider>
        
    )
}