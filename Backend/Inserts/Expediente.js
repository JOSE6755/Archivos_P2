const oracle = require('oracledb')
cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/orcl18"
}

async function Expedientes(req,res) {
    let datos=req
    let resultado
    let conexion
    console.log(datos)
    try{
        conexion=await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql="insert into expediente(DPI,NOMBRE,APELLIDO,CORREO,DIRECCION,TELEFONO,FECHA_POSTULACION,ACEPTADO,ID_DEPARTAMENTO_PUESTO) select '"+datos.DPI+"','"+datos.Nombre+"','"+datos.Apellido+"','"+datos.Correo+"','"+datos.Direccion+"','"+datos.Telefono+"','"+datos.Fecha+"',2,dp.id_departamento_puesto from departamento d inner join puesto p on d.nombre='"+datos.Departamento+"' and p.nombre='"+datos.Puesto+"' inner join departamento_puesto dp on dp.id_departamento=d.id_departamento and dp.id_puesto=p.id_puesto"
        //faltan comillas en la consulta para meter strings
        console.log(sql)
        resultado=await conexion.execute(sql,[],{autoCommit:true})
        console.log(resultado)
        
    }catch(err){
        return res.send(err.message)
    }finally{
       if(conexion){
        try{
            await conexion.close()
            console.log("Conexion finalizada")
            //return res.send("Datos ingresados correctamente")
        }catch(err){
            return res.send(err.message)
        }
       }
       
    }
}

module.exports={
    Expediente:Expedientes
}