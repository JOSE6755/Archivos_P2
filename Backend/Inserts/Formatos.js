const oracle = require('oracledb')
const { Switch } = require('react-router')
cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/orcl18"
}


async function formatos(obj,res,requisito,requi){
    for (let i = 0; i < obj.children.length; i++) {
        if(obj.children[i].name=="formato"){
            if(requisito==null && requi==false){
            await inser_formato(obj.children[i],res)
            }else{
                await requi_forma(obj.children[i],res,requisito)
            }
        }
        
    }
}

async function inser_formato(obj,res){
    let metido=false
    let datos={
        nombre:null,
    }

    for (let i = 0; i < obj.children.length; i++) {
        
        switch (obj.children[i].name) {
            case "nombre":
                
                datos.nombre=obj.children[i].value
                break;
        
            default:
                break;
        }
        if(datos.nombre!=null && metido==false){
            metido=true
            let sql = ""
            let conexion
            try {
                conexion = await oracle.getConnection(cns)
                console.log("Se establecio la conexion")
                sql="begin inser_formato('"+datos.nombre+"'); end;"
                
                resultado = await conexion.execute(sql, [], { autoCommit: true })



                //faltan comillas en la consulta para meter strings


            } catch (err) {
                console.log(err.message)
            } finally {
                if (conexion) {
                    try {
                        await conexion.close()
                        console.log("Conexion finalizada")
                        
                    } catch (err) {
                        console.log(err.message)
                    }
                }

            }
        }
    }
}

async function requi_forma(obj,res,requisito){
    let metido=false
    let nombre=null
    for (let i = 0; i < obj.children.length; i++) {
        
        if(obj.children[i].name=="nombre"){
            nombre=obj.children[i].value
        }

        if(nombre!=null && metido==false){
            let sql = ""
            let conexion
            metido = true
            try {
                conexion = await oracle.getConnection(cns)
                console.log("Se establecio la conexion")

                sql="insert into formato_requisito(id_formato,id_requisito) select f.id_formato,r.id_requisito from formato f inner join requisito r on f.nombre='"+nombre+"' and r.nombre='"+requisito+"'"
                
                console.log(sql)

                resultado = await conexion.execute(sql, [], { autoCommit: true })



                //faltan comillas en la consulta para meter strings


            } catch (err) {
                console.log(err.message)
            } finally {
                if (conexion) {
                    try {
                        await conexion.close()
                        console.log("Conexion finalizada")

                    } catch (err) {
                        console.log(err.message)
                    }
                }

            }
        }
    }
}

module.exports={
    formatos:formatos
}