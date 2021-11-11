import axios from "axios";
import React, { useState, useEffect } from "react";
import {Table} from "react-bootstrap"
import {Link} from "react-router-dom"
export default function V_users() {
    var cont=true
    const[datos,setDatos]=useState(null)
    useEffect(() => {
        axios.get("http://localhost:3100/V_User")
        .then(response => {
            setDatos(response.data)
            console.log(response.data)
        })
        console.log(datos)

    }, [])



    return (
        
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Fecha_Inicio</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>    
                {datos?datos.map((items)=>{
                    cont=true
                        return(
                            
                            <tr key={items}>
                                {items.map((e)=>{
                                    if (cont===true) {
                                        cont=false
                                        return <td key={cont}><Link to={`/Editar/${e}`}>{e} </Link></td>
                                    }
                                    
                                    return(
                                        
                                        <td key={cont}>{e} </td>
                                       
                                       
                                    )
                                })}
                            </tr>
                        )
                    }):null}
                </tbody>
            </Table>
        </div>
    )
}