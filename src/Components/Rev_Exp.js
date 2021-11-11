import React, { useState,useEffect } from "react";
import "../Styles/Login.css"
import axios from "axios";
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import useAuth from "../Auth/UseAuth";

export default function Rev_Exp() {
  const {getId}=useAuth()
  const [datos,setDatos]=useState(null)
  useEffect(() => {
    axios.get(`http://localhost:3100/Revisor/${getId()}`)
    .then(response => {
        if(response.data!="No hay datos ingresados en esta tabla"){
        setDatos(response.data)
        console.log(response.data)
        }
    })
    

}, [])

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DPI</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
        {datos?datos.map((items)=>{ let cont=0
                        return(
                            
                            <tr key={items}>
                                <td key={items.id}><Link to={`/DatosExp/${items.id}`}>{items.id}</Link></td>
                                <td key={items.nombre}>{items.nombre}</td>
                                <td key={items.apellido}>{items.apellido}</td>
                                <td key={items.dpi}>{items.dpi}</td>
                                <td key={items.correo}>{items.correo}</td>
                            </tr>
                        )
                    }):null}
        </tbody>
      </Table>
    </div>
  );
}