import axios from "axios";
import React, { useState, useEffect } from "react";
import {Table} from "react-bootstrap"
import {Link} from "react-router-dom"
import {Button} from 'reactstrap'
export default function EL_users() {
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

    function borrar(items) {
        let datos={id:items[0]}
        try {
            const res = axios.post(
              "http://localhost:3100/eliminar_us",
              datos
            );
            console.log(res);
          } catch (ex) {
            console.log(ex);
          }
    }



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
                        <th>Eliminar?</th>
                    </tr>
                </thead>
                <tbody>    
                {datos?datos.map((items)=>{
                    cont=true
                        return(
                            
                            <tr key={items}>
                                {items.map((e)=>{
                                    
                                    
                                    return(
                                        
                                        <td key={cont}>{e} </td>
                                       
                                       
                                    )
                                })}
                                <td><Button color="danger" onClick={()=>{borrar(items)}} >Eliminar</Button></td>
                            </tr>
                        )
                    }):null}
                </tbody>
            </Table>
        </div>
    )
}