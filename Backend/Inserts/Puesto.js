const oracle = require('oracledb')
const { puesto_cat } = require('./Categoria')
const Categoria = require('./Categoria')
const Requisito=require("./Requisito")
cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/orcl18"
}


async function puesto(obj, res, departamento, DP) {
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "puesto":
                if (DP == false) {
                    await datos_puesto(obj.children[i], res)
                } else {
                    
                    await depa_puesto(obj.children[i], departamento, res)
                    await inser_puesto_cat(obj.children[i],res)
                    await inser_puesto_req(obj.children[i],res)
                }
                break;

            default:
                break;
        }

    }
}

async function datos_puesto(obj, res) {
    let datos = {
        nombre: null,
        imagen:null
    }
    let metido = false
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break;
            case "imagen":
                datos.imagen=obj.children[i].value
                break;
            case "categorias":
                await Categoria.categorias(obj.children[i], res,null,false)
                break
            case "requisitos":
                await Requisito.requisitos(obj.children[i],res,null,false)
            default:
                break;
        }
        if (datos.nombre != null && datos.imagen!=null && metido == false) {
            let sql = ""
            let conexion
            metido = true
            try {
                conexion = await oracle.getConnection(cns)


                sql = "insert into puesto(nombre,imagen)VALUES('" + datos.nombre+ "','"+datos.imagen+"')"


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
}

async function depa_puesto(obj, depar, res) {
    let datos = {
        nombre: null,
        salario: null
    }
    let metido = false
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break;
            case "salario":
                datos.salario = parseInt(obj.children[i].value)
                break;

            default:
                break;
        }
        if (datos.nombre != null && datos.salario != null && metido == false) {
            let sql = ""
            let conexion
            metido = true
            try {
                conexion = await oracle.getConnection(cns)
                //console.log("Se establecio la conexion")


                sql = "insert into departamento_puesto (id_departamento,id_puesto,salario) select d.id_departamento,p.id_puesto,"+datos.salario+" from departamento d inner join puesto p on d.nombre='" + depar + "' and p.nombre='" + datos.nombre + "'"


                resultado = await conexion.execute(sql, [], { autoCommit: true })



                //faltan comillas en la consulta para meter strings


            } catch (err) {
                console.log(err.message)
            } finally {
                if (conexion) {
                    try {
                        await conexion.close()
                        //console.log("Conexion finalizada")

                    } catch (err) {
                        console.log(err.message)
                    }
                }

            }
        }

    }
}



async function inser_puesto_cat(obj, res) {
    let datos = {
        nombre: null,
        
    }
    let metido = false
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break;
            

            default:
                break;
        }
        
    }
    if (datos.nombre != null && metido == false) {
        metido=true
        for (let i = 0; i <obj.children.length; i++) {
            if(obj.children[i].name=="categorias"){
               await Categoria.categorias(obj.children[i],res,datos.nombre,true)
            }
            
        }

    }
}
async function inser_puesto_req(obj,res){
    let datos = {
        nombre: null,
        
    }
    let metido = false
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break;
            

            default:
                break;
        }
        
    }
    if (datos.nombre != null && metido == false) {
        metido=true
        for (let i = 0; i <obj.children.length; i++) {
            if(obj.children[i].name=="requisitos"){
               await Requisito.requisitos(obj.children[i],res,datos.nombre,true)
            }
            
        }

    }
}

    module.exports = {
        inserPuesto: puesto
    }