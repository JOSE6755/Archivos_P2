import React,{useState} from "react";
import "../Styles/Expediente.css"
export default function Expediente(){

    const [datos,setDatos]=useState ({DPI:'',Nombre:'',Apellido:'',Correo:'',Direccion:'',Telefono:''});

    return(
        
        <form className="box" method="post">
            <h1>Expediente</h1>
            <input type="text" placeholder="Nombre" value={datos.Nombre} onChange={(e)=>setDatos({...datos,Nombre:e.target.value})} />
            <input type="text" placeholder="Apellido" value={datos.Apellido} onChange={(e)=>setDatos({...datos,Apellido:e.target.value})}  />
            <input type="email" placeholder="Correo Electronico" value={datos.Correo} onChange={(e)=>setDatos({...datos,Correo:e.target.value})}  />
            <input type="text" placeholder="Direccion" value={datos.Direccion} onChange={(e)=>setDatos({...datos,Direccion:e.target.value})}  />
            <input type="text" placeholder="Telefono" value={datos.Telefono} onChange={(e)=>setDatos({...datos,Telefono:e.target.value})}  />
        </form>
       
    );
} 