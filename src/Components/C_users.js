import axios from "axios";
import React, { useState, useEffect } from "react";
import Form_Us from "./Form_Us";
export default function C_users() {
  const [info, setInfo] = useState(null)
  const [datos, setDatos] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:3100/departamentos")
      .then((response) => {
        setDatos(response.data)


      })

  }, [])

  useEffect(() => {
    if (info !== null) {
      try {
        const res = axios.post(
          "http://localhost:3100/usuario",
          info
        );
        console.log(res);
      } catch (ex) {
        console.log(ex);
      }
    }
    //axios.post("http://localhost:3100/archivos",datos)


  }, [info])

  function insertar(e, data) {
    e.preventDefault()
    setInfo(data)
  }






  return (
    <div>
      <Form_Us dep={datos} insertar={insertar} info={info} />
    </div>
  )
}