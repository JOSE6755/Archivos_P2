import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAuth from "../Auth/UseAuth";
import "../Styles/Expediente.css"
export default function Requisitos() {
    const { getId } = useAuth()
    const [datos, setDatos] = useState(null);
    const [archivo, setArchivo] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3100/Requisitos/${getId()}`)
            .then(response => {
                setDatos(response.data)
                console.log(response.data)
            })


    }, [])

    useEffect(()=>{
        console.log(archivo)
    },[archivo])

    function subir(e) {
        console.log(e)
        setArchivo([...archivo,e])
    }

    function mandar(e){
        e.preventDefault()
        console.log(datos)
        const data=new FormData()
        for (let i = 0; i < archivo.length; i++) {
            data.append("file",archivo[i])
            
        }

        for (let i = 0; i < datos.length; i++) {
            data.append("datos",JSON.stringify(datos[i]))
            
        }
        
        
        

        
        try {
            const res =axios.post(
              `http://localhost:3100/Req_Archivos/${getId()}`,
              data
            );
            console.log(res);
          } catch (ex) {
            console.log(ex);
          }
        //axios.post("http://localhost:3100/archivos",datos)
        
        
    }





    return (
        <div id="Expbox" onSubmit={mandar}>
            <form className="boxito"  >
                <h1>Requisitos</h1>
                {datos ? datos.map((items) => {
                    if (items.obligatorio === 0) {
                        return (
                            <>
                            <label key={items.requisito + items.formato} style={{ color: "white" }} >{items.requisito}
                            </label>
                            <input type="file" accept={`.${items.formato}`} onChange={(e)=>{subir(e.target.files[0])}} key={items.requisito+items.formato+items.obligatorio+items.tamanio} /> 
                            </>
                        )
                    }else{
                        return(
                            <>
                            <label key={items.requisito + items.formato} style={{ color: "white" }} >{items.requisito}
                            </label>
                            <input type="file" accept={`.${items.formato}`} onChange={(e)=>{subir(e.target.files[0])}} key={items.requisito+items.formato+items.obligatorio + items.tamanio} /> 
                            </>
                            
                        )
                    }

                }) : null}
                <input type="submit" />
            </form>
        </div>

    );
}