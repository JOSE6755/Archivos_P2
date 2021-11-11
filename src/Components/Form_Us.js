import React,{useState} from "react";
import { useEffect } from "react";

export default function Form_Us({dep,insertar,info}){
    const [datos,setDatos]=useState({user:null,pass:null,rol:null,departamento:null,Inicio:null})
    //const [dep,setDep]=useState(null)

    useEffect(()=>{
        
        let fecha=new Date()
        let fechaE=fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()
        setDatos({...datos,Inicio:fechaE})
    },[dep])
    

    return(
        <div>
            <form onSubmit={(e)=>insertar(e,datos)}>
                <input type="text" placeholder="Username" onChange={(e)=>setDatos({...datos,user:e.target.value})}  />
                <input type="text" placeholder="Password" onChange={(e)=>setDatos({...datos,pass:e.target.value})}/>
                <select onChange={(e)=>setDatos({...datos,rol:e.target.value})}  >
                    <option>Elige un Rol </option>
                    <option>Coordinador</option>    
                    <option>Revisor</option>   
                </select>
                <select onChange={(e)=>setDatos({...datos,departamento:e.target.value})} >  
                    <option>Elija un departamento</option>
                    {dep?dep.map((items)=>{
                    return <option key={items}>{items}</option>
                }):null}
                </select>
                <input type="submit"/>
            </form>
        </div>
    )
} 