import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useParams } from "react-router";
import {Button} from "reactstrap"
export default function Cord_Users() {
    var cont = 0
    const [datos, setDatos] = useState(null)
    const { ID } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:3100/planilla/${ID}`)
            .then(response => {
                setDatos(response.data)
                console.log(response.data)
            })
       

    }, [])

    function eliminar(datos) {
        let data={asociado:0,id:datos.user}
        console.log(data)
        try {
            const res =axios.post(
              "http://localhost:3100/Asociar_Us",
              data
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

                        <th>Usuario</th>
                        <th>Fecha_Inicio</th>
                        <th>Rol</th>
                        <th>Estado</th>

                    </tr>
                </thead>
                <tbody>
                    {datos ? datos.map((items) => {
                        return (

                            <tr key={items}>


                                <td key={items.user}>{items.user}</td>
                                <td key={items.fecha}>{items.fecha}</td>
                                <td key={items.rol}>{items.rol}</td>
                                <td key={items.estado}>{items.estado}</td>
                                <td><Button color="danger" onClick={()=>{eliminar(items)}}>Eliminar</Button></td>

                            </tr>
                        )
                    }) : null}
                </tbody>
            </Table>
        </div>
    )
}