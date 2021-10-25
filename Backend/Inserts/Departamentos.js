
const oracle = require('oracledb')
cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/orcl18"
}
const puesto=require("./Puesto")


async function datosD(obj, padre, res) {
    let metido = false
    let depas=0
    let datos = {
        nombre: null,
        capital: null
    }
    for (let i = 0; i < obj.children.length; i++) {
        
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break;
            case "capital_total":
                datos.capital = obj.children[i].value
                break;
            case "puestos":
                await puesto.inserPuesto(obj.children[i],res,null,false)
                break;
            default:
                break;
        }
        if (datos.nombre != null && datos.capital != null && metido==false) {
           
            let sql = ""
            let conexion
            metido=true
            try {
                conexion = await oracle.getConnection(cns)
                
                if (padre == null) {
                    //console.log("no tengo papa")
                    sql = "insert into departamento(nombre,capital,departamento)VALUES('" + datos.nombre + "','" + datos.capital + "',null)"

                } else {
                    //console.log("holas")
                    let id = await conexion.execute("SELECT ID_DEPARTAMENTO FROM DEPARTAMENTO WHERE NOMBRE='" + padre + "'", [], { autoCommit: false })
                    id=id.rows[0]
                    sql = "insert into departamento(nombre,capital,departamento)VALUES('" + datos.nombre + "','" + datos.capital + "'," + id + ")"

                }
                
                resultado = await conexion.execute(sql, [], { autoCommit: true })



                //faltan comillas en la consulta para meter strings


            } catch (err) {
                console.log(err.message)
            } finally {
                if (conexion) {
                    try {
                        await conexion.close()
                        
                        
                    } catch (err) {
                        console.log(err.message)
                    }
                }

            }
        }
    }
    for (let i = 0; i < obj.children.length; i++){
        if(obj.children[i].name=="departamentos"){
            for (let j = 0; j < obj.children[i].children.length; j++) {
                if(obj.children[i].children[j].name=="departamento"){
                    await datosD(obj.children[i].children[j],datos.nombre,res)
                }
                
            }
        }
    }

}

async function depa_puesto(obj,res){
    let metido = false
    let depas=0
    let datos = {
        nombre: null,
        capital: null
    }
    for (let i = 0; i < obj.children.length; i++) {
        
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break;
            case "capital_total":
                datos.capital = obj.children[i].value
                break;
            default:
                break;
        }
        
    }
    if (datos.nombre != null && datos.capital != null) {
        for (let i = 0; i < obj.children.length; i++){
            if(obj.children[i].name=="puestos"){
                await puesto.inserPuesto(obj.children[i],res,datos.nombre,true)
            }
        }
        
    }
    for (let i = 0; i < obj.children.length; i++){
        if(obj.children[i].name=="departamentos"){
            for (let j = 0; j < obj.children[i].children.length; j++) {
                if(obj.children[i].children[j].name=="departamento"){
                   await depa_puesto(obj.children[i].children[j],res)
                }
                
            }
        }
    }
    
}

/*function insertarDatos(obj,padre,res){
   let sql=""
   let conexion
   
   try{
       conexion=await oracle.getConnection(cns)
       console.log("Se establecio la conexion")
       if (padre==null){
           console.log("no tengo papa")
           sql="insert into departamento(id_departamento,nombre,capital,departamento)VALUES(id_departamento.nextval,'"+obj.nombre+"','"+obj.capital+"',null)"
           
       }else{
           console.log("holas")
           let id=await conexion.execute("SELECT ID_DEPARTAMENTO FROM DEPARTAMENTO WHERE NOMBRE='"+padre+"'",[],{autoCommit:true})
           console.log(id)
           sql="insert into departamento(id_departamento,nombre,capital,departamento)VALUES(id_departamento.nextval,'"+obj.nombre+"','"+obj.capital+"',"+id+")"
           
       }
       resultado=await conexion.execute(sql,[],{autoCommit:true})
       

       
       //faltan comillas en la consulta para meter strings
       
       
   }catch(err){
        console.log(err.message)
   }finally{
      if(conexion){
       try{
           await conexion.close()
           console.log("Conexion finalizada")
           console.log(sql)
       }catch(err){
           console.log(err.message)
       }
      }
      
   }
   
}*/





module.exports = {
    insertarDepa: datosD,
    depa_puesto:depa_puesto
}