import axios from "axios";
import React from "react";
import FileViewer from 'react-file-viewer'
export default function Pruebitas() {

    const ruta = "/prueba.pdf"
    function proando() {
        window.open("/home/jose675/Escritorio/archivos_proye2/public/Archivos_P/COECYS.pdf","_blank")
    }
    return (
        <a href="/home/jose675/Escritorio/archivos_proye2/public/Archivos_P/COECYS.pdf" target="_blank"> ver pdf</a>
     );
}