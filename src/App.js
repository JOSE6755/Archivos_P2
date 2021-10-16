import React from "react";
import Login from "./Components/Login";
import Expediente from "./Components/Expediente";
import "./Styles/App.css"
import { 
    BrowserRouter as Router,
    Switch,
    Route
 } from "react-router-dom";
export default function App(){
    return(
        <Router>
            <Switch>
                //<Route exact path="/Login" component={Login}/>
                <Route exact path="/Registro" component={Expediente}/>
            </Switch>
        </Router>
        
    )
}