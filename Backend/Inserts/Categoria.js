const oracle = require('oracledb')
cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/orcl18"
}

 async function categorias(obj,res,puesto,pues){
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "categoria":
                if(puesto==null && pues==false){
                await inser_categoria(obj.children[i],res)
                }else{
                    await puesto_categoria(obj.children[i],puesto,res)
                }
                break;
        
            default:
                break;
        }
        
    }
}

async function inser_categoria(obj,res){
    let nombre=null
    metido=false;
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                nombre=obj.children[i].value
                break;
        
            default:
                break;
        }
        if(nombre!=null && metido==false){
            metido=true
            let sql = ""
            let conexion
            try {
                conexion = await oracle.getConnection(cns)
                console.log("Se establecio la conexion")
                sql="begin inser_cat('"+nombre+"'); end;"
                
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

async function puesto_categoria(obj,puesto,res){
    let nombre=null
    let metido=false
    
    for (let i = 0; i <obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                nombre=obj.children[i].value
                break;
        
            default:
                break;
        }
        if(nombre!=null && metido==false){
            
            let sql = ""
            let conexion
            metido = true
            try {
                conexion = await oracle.getConnection(cns)
                console.log("Se establecio la conexion")


                sql = "insert into puesto_categoria (id_puesto,id_categoria) select p.id_puesto,c.id_categoria from puesto p inner join categoria c on p.nombre='" + puesto + "' and c.nombre='" + nombre + "'"
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
    categorias:categorias,
    puesto_cat:puesto_categoria
}