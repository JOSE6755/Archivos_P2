import React, { useState,useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../Styles/Info.css"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { Link } from "react-router-dom";
  

export default function Info(){
    let {Nombre}=useParams()
    let {Departamento}=useParams()
    const [datos,setDatos]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3100/Info/${Nombre}`)
        .then(response => {
            setDatos(response.data)
            console.log(response.data)
        })
    },[])


    return(
        <div id="contenedor">
        <div id="carta">
        <Card style={{textAlign:'center'}}>
          <CardImg height="400px" width="800px" src={datos.imagen} alt="Card image cap"/>
          <CardBody>
            <CardTitle tag="h5">Puesto de: {datos.puesto}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Salario del puesto: {datos.salario}</CardSubtitle>
            <CardText>Categorias a las que pertenece el puesto:</CardText>
            <Link to={`/Inicio/Puesto/${Departamento}/${datos.puesto}/Registro`}>
            <Button>Button</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
      </div>
    )
}