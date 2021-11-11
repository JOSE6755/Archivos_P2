import axios from "axios";
import React,{useState,useEffect} from "react";
import { useParams } from "react-router";
export default function E_users(){
   const [info,setInfo]=useState({user:"",pass:"",rol:"",departamento:"",Inicio:""})
    const [datos,setDatos]=useState(null)
    const {id}=useParams()
    useEffect(()=>{
        axios.get("http://localhost:3100/departamentos")
        .then((response)=>{
            setDatos(response.data)
            console.log(response.data)
            
        })
        axios.get(`http://localhost:3100/V_User/${id}`)
        .then((response)=>{
            setInfo(response.data)
        })
        
    },[])

    function Handlechange(e) {
        setInfo({...datos,[e.target.name]:e.target.value})
    }

    

    



    
    

    return(
        <div>
            <form>
                <input name="user" type="text" placeholder="Username" onChange={(e)=>Handlechange(e)} value={info.user} />
                <input name="pass" type="text" placeholder="Password" onChange={(e)=>Handlechange(e)} value={info.pass}/>
                <select name="rol" onChange={(e)=>Handlechange(e)}  >
                    <option>Elige un Rol </option>
                    <option>Coordinador</option>    
                    <option>Revisor</option>   
                </select>
                <select name="departamento" onChange={(e)=>Handlechange(e)} value={info.departamento} >  
                    <option>Elija un departamento</option>
                    {datos?datos.map((items)=>{
                    return <option key={items}>{items}</option>
                }):null}
                </select>
                <input type="submit"/>
            </form>
        </div>
    )
} 