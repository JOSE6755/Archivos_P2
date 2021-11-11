import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap'
import useAuth from "../Auth/UseAuth";
import "../Styles/Expediente.css"
export default function D_Exp() {
    let { ID } = useParams()
    const { getId } = useAuth()
    const [datos, setDatos] = useState(null);
    const [info, setInfo] = useState({ acept: null, revisor: null, dpi: null, fecha: null })
    const [enviar, setEnviar] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:3100/infoExp/${ID}`)
            .then(response => {
                setDatos(response.data)
                console.log(response.data)
            })

    }, [])

    useEffect(() => {
        if (enviar !== false) {
            axios.post("http://localhost:3100/acept_Exp",info)
        }
    }, [info])

    function acept() {
        let fecha = new Date()
        let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
        setEnviar(true)
        setInfo({ ...info, acept: 1, revisor: getId(), dpi: datos.dpi, fecha: fechaE })
    }
    function recha() {
        let fecha = new Date()
        let fechaE = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
        setEnviar(true)
        setInfo({ ...info, acept: 0, revisor: getId(), dpi: datos.dpi, fecha: fechaE })
    }

    /*function subir(e){
        e.preventDefault()
        console.log(datos)
        const data=new FormData()
        data.append("file",archivo)
        data.append("datos",JSON.stringify(datos))

        
        try {
            const res =axios.post(
              "http://localhost:3100/expediente",
              data
            );
            console.log(res);
          } catch (ex) {
            console.log(ex);
          }
        //axios.post("http://localhost:3100/archivos",datos)
        
        
    }*/





    return (
        <div id="Expbox">
            {datos != null ? <><form className="boxito">
                <h1>Expediente</h1>
                <input type="text" className="campos" placeholder="DPI" value={datos.dpi} maxLength="13" readOnly />
                <input type="text" className="campos" placeholder="Nombre" value={datos.nombre} readOnly />
                <input type="text" className="campos" placeholder="Apellido" value={datos.apellido} readOnly />
                <input type="email" className="campos" placeholder="Correo Electronico" value={datos.correo} readOnly />
                <input type="text" className="campos" placeholder="Direccion" value={datos.direccion} readOnly />
                <input type="text" className="campos" placeholder="Telefono" value={datos.telefono} readOnly />

                <Link to={datos.cv}>Ver CV</Link>
                <br />
                <Button color="success" onClick={acept} >Aceptar</Button>
                <Button color="danger" onClick={recha} >Rechazar</Button>
            </form></> : null}


        </div>

    );
}