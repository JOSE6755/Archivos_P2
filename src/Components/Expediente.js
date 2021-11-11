import axios from "axios";
import React,{useState,useEffect} from "react";
import { useParams } from "react-router";
import "../Styles/Expediente.css"
export default function Expediente(){
    let {Departamento}=useParams()
    let {Puesto}=useParams()
    const [datos,setDatos]=useState ({DPI:'',Nombre:'',Apellido:'',Correo:'',Direccion:'',Telefono:'',Fecha:null,Departamento:Departamento,Puesto:Puesto});
    const [archivo,setArchivo]=useState(null)
    useEffect(()=>{
        fecha()
    },[])

    function subir(e){
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
        
        
    }

    function fecha() {
        let fecha=new Date()
        let fechaE=fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()
        setDatos({...datos,Fecha:fechaE})
        
    }

    function subir2(e) {
       
        
        //setArchivo(datos)
        setArchivo(e)
        
    }

    return(
        <div id="Expbox">
        <form className="boxito" onSubmit={subir}  >
            <h1>Expediente</h1>
            <input type="text" className="campos" placeholder="DPI" value={datos.DPI} maxLength="13" onChange={(e)=>setDatos({...datos,DPI:e.target.value})} />
            <input type="text" className="campos" placeholder="Nombre" value={datos.Nombre} onChange={(e)=>setDatos({...datos,Nombre:e.target.value})} />
            <input type="text" className="campos" placeholder="Apellido" value={datos.Apellido} onChange={(e)=>setDatos({...datos,Apellido:e.target.value})}  />
            <input type="email" className="campos" placeholder="Correo Electronico" value={datos.Correo} onChange={(e)=>setDatos({...datos,Correo:e.target.value})}  />
            <input type="text" className="campos" placeholder="Direccion" value={datos.Direccion} onChange={(e)=>setDatos({...datos,Direccion:e.target.value})}  />
            <input type="text" className="campos" placeholder="Telefono" value={datos.Telefono} onChange={(e)=>setDatos({...datos,Telefono:e.target.value})}  />
            <input type="file" onChange={(e) => subir2(e.target.files[0])}  />
            <input type="submit"/>
        </form>
        </div>
       
    );
} 