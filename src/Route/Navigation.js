import React, { useState } from "react";
import { Navbar,Nav } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { NavLink } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import useAuth from "../Auth/UseAuth";

export default function Navigation(params) {

    const [admin,setAdmin]=useState(false)

    const {logout}=useAuth()
    const {isLogged}=useAuth()
    const {hasRole}=useAuth()

    useEffect(()=>{
        setAdmin(true)
    },[localStorage.getItem("Sesion")])

    return(
        <Navbar variant="dark" bg="dark" >
            <Navbar.Brand>Menu</Navbar.Brand>
            <NavbarCollapse>
                <Nav>
                {isLogged()&&hasRole("admin")&&<><Nav.Link as={NavLink} to="/cargar">Cargar XML</Nav.Link> <Nav.Link as={NavLink} to="/Usuarios">Usuarios</Nav.Link></>}
                <Nav.Link onClick={logout} to="/" >Cerrar Sesion</Nav.Link>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
}