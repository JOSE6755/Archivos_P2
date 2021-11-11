import React from "react";
import { Navbar,Nav } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { NavLink } from "react-router-dom";
import useAuth from "../Auth/UseAuth";

export default function Navigation(params) {

    

    const {logout}=useAuth()
    const {isLogged}=useAuth()
    const {hasRole,getDep}=useAuth()

    

    return(
        <Navbar variant="dark" bg="dark" >
            <Navbar.Brand>Menu</Navbar.Brand>
            <NavbarCollapse>
                <Nav>
                {isLogged()&&hasRole("Admin")&&<><Nav.Link as={NavLink} to="/cargar">Cargar XML</Nav.Link> <Nav.Link as={NavLink} to="/Usuarios">Usuarios</Nav.Link>
                <Nav.Link as={NavLink} to="/Ver">Ver Usuarios</Nav.Link> <Nav.Link as={NavLink} to="/Eliminar">Eliminar Usuarios</Nav.Link></>}
                <Nav.Link onClick={logout} to="/" >Cerrar Sesion</Nav.Link>
                {isLogged()&& hasRole("Coordinador")&&<><Nav.Link as={NavLink} to={`/Planilla/${getDep()}`}>Asociados</Nav.Link>
                <Nav.Link as={NavLink} to={`/PlanillaN/${getDep()}`}>No asociados</Nav.Link> 
                 </>}
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
}