const oracle = require('oracledb')
cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/orcl18"
}
const formatos = require("./Formatos")
const Puesto = require('./Puesto')

async function requisitos(obj, res, puesto, requi) {
    for (let i = 0; i < obj.children.length; i++) {
        if (obj.children[i].name == "requisito") {
            if (puesto == null && requi == false) {
                await inser_requisito(obj.children[i], res)
            } else {
                await puesto_requisito(obj.children[i],res,puesto)
                await requisito_formato(obj.children[i], res, puesto)
            }
        }

    }
}

async function inser_requisito(obj, res) {
    let metido = false
    let datos = {
        nombre: null,
    }

    for (let i = 0; i < obj.children.length; i++) {

        switch (obj.children[i].name) {
            case "nombre":

                datos.nombre = obj.children[i].value
                break;
            case "formatos":
                await formatos.formatos(obj.children[i], res, null, false)
                break;

            default:
                break;
        }
        if (datos.nombre != null && metido == false) {
            metido = true
            let sql = ""
            let conexion
            try {
                conexion = await oracle.getConnection(cns)
                console.log("Se establecio la conexion")
                sql = "begin inser_requisito('" + datos.nombre + "'); end;"

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

async function puesto_requisito(obj, res, puesto) {
    
    let metido = false
    let datos = {
        nombre: null,
        tamanio: null,
        obligatorio:null
    }
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break
            case "tamanio":
                datos.tamanio = obj.children[i].value
                break;
            case "obligatorio":
                datos.obligatorio=obj.children[i].value
                break;
            default:
                break;
        }
        if (datos.nombre != null && datos.tamanio != null && datos.obligatorio!=null && metido == false) {
            let sql = ""
            let conexion
            metido = true
            console.log("SI entre aca pendejazo")
            try {
                conexion = await oracle.getConnection(cns)
                //console.log("Se establecio la conexion")
    
    
                sql = "insert into requisito_puesto (id_requisito,id_puesto,tamanio,obligatorio) select r.id_requisito,p.id_puesto,"+ datos.tamanio+","+datos.obligatorio+" from requisito r inner join puesto p on r.nombre='" + datos.nombre + "' and p.nombre='" + puesto + "'"
    
    
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


async function requisito_formato(obj, res, puesto) {
    let metido = false
    let datos = {
        nombre: null
    }
    for (let i = 0; i < obj.children.length; i++) {
        switch (obj.children[i].name) {
            case "nombre":
                datos.nombre = obj.children[i].value
                break
            default:
                break;
        }



    }
    if (datos.nombre != null && metido == false) {
        for (let i = 0; i < obj.children.length; i++) {
            switch (obj.children[i].name) {
                case "formatos":
                    await formatos.formatos(obj.children[i], res, datos.nombre, true)
                    break
                default:
                    break;
            }



        }

    }
}

module.exports = {
    requisitos: requisitos
}