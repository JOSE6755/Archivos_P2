import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useParams } from "react-router";
import {Button} from "reactstrap"
export default function No_Aso() {
    var cont = 0
    const [datos, setDatos] = useState(null)
    const { ID } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:3100/planillaN/${ID}`)
            .then(response => {
                setDatos(response.data)
                console.log(response.data)
            })
       

    }, [])

    function asociar(datos){
        let data={asociado:1,id:datos.user}
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
                                <td><Button color="success" onClick={()=>{asociar(items)}}>Asociar</Button></td>

                            </tr>
                        )
                    }) : null}
                </tbody>
            </Table>
        </div>
    )
}