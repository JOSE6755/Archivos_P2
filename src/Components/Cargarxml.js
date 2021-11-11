import React, { useState } from "react";
import axios from "axios";
import { Button } from 'reactstrap';
import "../Styles/XML.css"
import useAuth from "../Auth/UseAuth";


export default function CargaXML() {
    console.log(localStorage.getItem("Sesion"))
    var xmlparser = require('react-xml-parser')
    //var xml2 = require('xml2js')
    const [archivo, setArchivo] = useState(null)
    const [texto, setTexto]=useState("")
    var temporal=[]
    //const {user}=useAuth()
    //var json = {}

    const subir = e => {
        let file = e[0]
        if (!file) {
            return
        }
        const fileReader = new FileReader()

        fileReader.readAsText(file)
        fileReader.onload = () => {
            let xml = new xmlparser().parseFromString(fileReader.result)
            setArchivo(xml)
            setTexto(fileReader.result)
            /*xml2.parseString(fileReader.result,(err,result)=>{
                if (err){
                    throw err
                }
                const json=JSON.stringify(result)
                var jsoi=JSON.parse(json)
                setArchivo(jsoi)
            })*/

        }
        fileReader.onerror = () => {
            console.log(fileReader.error)
        }
        
    }
    function recorrer(e) {
        /*for (let i = 0; i < archivo.children.length; i++) {
            recorrer2(archivo.children[i], null)

        }*/
        
        axios.post("http://localhost:3100/pruebas",archivo)
    }
    function recorrer2(param, padre) {
        let nombre_param = null
        let nombre_padre = padre
        let capital_param = null

        for (let i = 0; i < param.children.length; i++) {
            switch (param.children[i].name) {
                case "nombre":
                    nombre_param = param.children[i].value
                    break;
                case "capital_total":
                    capital_param = param.children[i].value
                    break;
                case "departamentos":
                    for (let j = 0; j < param.children[i].children.length; j++) {
                        recorrer2(param.children[i].children[j], nombre_param)
                    }
                    break;
                case "puestos":
                    for (let j = 0; j < param.children[i].children.length; j++) {
                        let nombre_puesto
                        let salario_puesto
                        let imagen_puesto
                        let requisitos
                        let categorias

                        for (let n4 = 0; n4 < param.children[i].children[j].children.length; n4++) {
                            if (param.children[i].children[j].children[n4].name === "nombre") {
                                nombre_puesto = param.children[i].children[j].children[n4].value;
                            } else if (param.children[i].children[j].children[n4].name === "salario") {
                                salario_puesto = param.children[i].children[j].children[n4].value;
                            } else if (param.children[i].children[j].children[n4].name === "imagen") {
                                imagen_puesto = param.children[i].children[j].children[n4].value;
                            } else if (param.children[i].children[j].children[n4].name === "requisitos") {
                                requisitos = param.children[i].children[j].children[n4].getElementsByTagName('requisito');
                            } else if (param.children[i].children[j].children[n4].name === "categorias") {
                                categorias = param.children[i].children[j].children[n4].getElementsByTagName('categoria');
                            }
                        }

                        let carga = {
                            departamento_padre: nombre_padre,
                            departamento_nombre: nombre_param,
                            departamento_capital: capital_param,
                            puesto_nombre: nombre_puesto,
                            puesto_salario: salario_puesto,
                            puesto_imagen: imagen_puesto,
                            puesto_requisitos: requisitos,
                            puesto_categorias: categorias
                        };
                        temporal.push(carga)

                        
                    }
                    break;

                default:
                    break;
            }

        }



    }



    return (
        <div id="Ccargar">
            <div id="xmlCaja">
               <textarea id="areaT" wrap="hard" value={texto} readOnly />
                <input type="file" name="files" onChange={(e) => subir(e.target.files)} />
                <br></br>
                <Button color="primary" onClick={recorrer}>Insertar</Button>
            </div>

        </div>

    );
}