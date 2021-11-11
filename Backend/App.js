const express = require('express')
var cors = require('cors')
const fileupload = require('express-fileupload')
const app = express();
app.use(express.json())
app.use(cors())
app.use(fileupload())
const fs = require('fs')
//app.use(express.urlencoded({extended:false}))
const oracle = require('oracledb')
const port = 3100
const Departamentos = require("./Inserts/Departamentos")
const Expediente = require("./Inserts/Expediente")
const nodeMailer = require('nodemailer')
cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/orcl18"
}
var transport = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pedrito67557@gmail.com',
        pass: 'nogamenolife675'

    }
})

async function info(nombre, res) {
    let conexion
    let resultado
    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select p.nombre,salario,imagen from departamento_puesto rp inner join puesto p on p.id_puesto=rp.id_puesto and p.nombre='" + nombre + "' inner join departamento d on d.id_departamento=rp.id_departamento"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {
        let datos = { puesto: null, salario: null, imagen: null }
        datos.puesto = resultado.rows[0][0]
        datos.salario = resultado.rows[0][1]
        datos.imagen = resultado.rows[0][2]

        return res.send(datos)
    }
}

async function prueba(req, res) {
    let conexion
    let resultado
    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select id_departamento_puesto, d.nombre, p.nombre,salario,imagen from departamento_puesto rp inner join puesto p on p.id_puesto=rp.id_puesto inner join departamento d on d.id_departamento=rp.id_departamento"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        console.log(err.message)
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {

        let arreglo = []
        for (let i = 0; i < resultado.rows.length; i++) {
            let datos = {
                puesto: null,
                departamento: null,
                salario: null,
                imagen: null,
                id: null
            }
            datos.id = resultado.rows[i][0]
            datos.departamento = resultado.rows[i][1]
            datos.puesto = resultado.rows[i][2]
            datos.salario = resultado.rows[i][3]
            datos.imagen = resultado.rows[i][4]

            arreglo.push(datos)


        }

        return res.send(arreglo)
    }
}

async function meter(req, res) {
    datos = req
    //insertar departamentos,puestos,categorias y requisitos
    for (let i = 0; i < datos.children.length; i++) {

        switch (datos.children[i].name) {
            case "departamento":
                await Departamentos.insertarDepa(datos.children[i], null, res)
                break;

            default:
                break;
        }

        //console.log(datos.children[i].children)
    }
    //insertar en tabla departamento_puesto
    for (let i = 0; i < datos.children.length; i++) {

        switch (datos.children[i].name) {
            case "departamento":
                await Departamentos.depa_puesto(datos.children[i], res)
                break;

            default:
                break;
        }

        //console.log(datos.children[i].children)
    }





    /*let resultado
    let conexion
    try{
        conexion=await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        console.log(req.body)
        let sql="insert into pruebas(nombre,celular)VALUES('"+req.body.nombre+"','"+req.body.celular+"')"
        //faltan comillas en la consulta para meter strings
        resultado=await conexion.execute(sql,[],{autoCommit:true})
        
    }catch(err){
        return res.send(err.message)
    }finally{
       if(conexion){
        try{
            await conexion.close()
            console.log("Conexion finalizada")
            return res.send("Datos ingresados correctamente")
        }catch(err){
            return res.send(err.message)
        }
       }
       
    }*/
}

app.get('/archivos', (req, res) => {

    /*const path="../public/Archivos_P/"
    const file=req.files.file
    const filename=file.name

    file.mv(`${path}${filename}`,(err)=>{
        if(err){
            res.status(500).send({message:"archivo fallado",code:200})
        }else{
            res.status(200).send({message:"archivo subido",code:200})
        }
    })*/
    const path = "../public/Archivos_P/SublimeDance-1-1-1-1.mp4"
    if (fs.existsSync(path)) {
        res.contentType("video/mp4")
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
        console.log("no se encontro")
        res.send("no se encontro")
    }
    //console.log(JSON.parse(req.body.datos),req.files.file)
})


async function Expedientes(req, res, ruta) {
    let datos = req
    let resultado
    let conexion
    console.log(datos)
    try {
        /*const path = "/home/jose675/Escritorio/archivos_proye2/public/Archivos_P"
        const file = req.files.file
        const filename = file.name
        const direccion=path+"/"+filename
        file.mv(`${path}${filename}`)*/
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion expedientes")
        let sql = "begin inser_expe('" + datos.DPI + "','" + datos.Nombre + "','" + datos.Apellido + "','" + datos.Correo + "','" + datos.Direccion + "','" + datos.Telefono + "',TO_DATE('" + datos.Fecha + "','dd/mm/yyyy'),'" + datos.Departamento + "','" + datos.Puesto + "','" + ruta + "');end;"
        //faltan comillas en la consulta para meter strings
        console.log(sql)
        resultado = conexion.execute(sql, [], { autoCommit: true })


    } catch (err) {
        return res.send(err.message)
    } finally {
        if (conexion) {
            try {
                await conexion.close()
                console.log("Conexion finalizada")
                //return res.send("Datos ingresados correctamente")
            } catch (err) {
                return res.send(err.message)
            }
        }

    }
}
async function gDepartamentos(req, res) {
    let conexion
    let resultado
    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select nombre from departamento"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {

        return res.send(resultado.rows)
    }
}

async function inser_us(req, res) {
    let datos = req
    let resultado
    let conexion
    console.log("holaaaaaaaaa")
    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "begin inser_user('" + datos.user + "', '" + datos.pass + "', TO_DATE('" + datos.Inicio + "' , 'dd/mm/yyyy'), '" + datos.rol + "', 1,'" + datos.departamento + "',1); end;"
        //faltan comillas en la consulta para meter strings

        resultado = conexion.execute(sql, [], { autoCommit: true })


    } catch (err) {
        return res.send(err.message)
    } finally {
        if (conexion) {
            try {
                await conexion.close()
                console.log("Conexion finalizada")
                //return res.send("Datos ingresados correctamente")
            } catch (err) {
                return res.send(err.message)
            }
        }

    }
}

async function eliminar_us(req, res) {
    let datos = req
    let resultado
    let conexion
    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "update usuario set estado=0 where id_usuario=" + datos.id
        //faltan comillas en la consulta para meter strings

        resultado = conexion.execute(sql, [], { autoCommit: true })


    } catch (err) {
        return res.send(err.message)
    } finally {
        if (conexion) {
            try {
                await conexion.close()
                console.log("Conexion finalizada")
                //return res.send("Datos ingresados correctamente")
            } catch (err) {
                return res.send(err.message)
            }
        }

    }
}

async function gUsuario(req, res) {
    let conexion
    let resultado
    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select u.id_usuario,u.user_name,u.fecha_in,u.rol,u.estado,d.nombre from usuario u inner join departamento d on d.id_departamento=u.id_departamento"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {

        return res.send(resultado.rows)
    }
}

async function g_User(req, res) {
    let conexion
    let resultado

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select u.user_name,u.pass,u.rol,d.nombre from usuario u inner join departamento d on d.id_departamento=u.id_departamento and u.id_usuario=" + req
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {
        let datos = { user: null, pass: null, rol: null, departamento: null }
        datos.user = resultado.rows[0][0]
        datos.pass = resultado.rows[0][1]
        datos.rol = resultado.rows[0][2]
        datos.departamento = resultado.rows[0][3]
        return res.send(datos)
    }
}

async function logear(req, res) {
    let conexion
    let resultado
    let datos = req

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select id_usuario,user_name,pass,rol,estado,id_departamento from usuario where user_name='" + datos.user + "' and pass='" + datos.pass + "'"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {
        let resp = { id: null, user: null, pass: null, role: null, estado: null, departamento: null }
        resp.id = resultado.rows[0][0]
        resp.user = resultado.rows[0][1]
        resp.pass = resultado.rows[0][2]
        resp.role = resultado.rows[0][3]
        resp.estado = resultado.rows[0][4]
        resp.departamento = resultado.rows[0][5]
        return res.send(resp)
    }
}

async function Exp_Revi(req, res) {
    let conexion
    let resultado
    let datos = req

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select e.id_expediente,e.nombre,e.apellido,e.dpi,e.correo from expediente e inner join revisor r on r.id_revisor=e.revisor and r.id_usuario=" + datos + " and e.aceptado=2"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {
        let arreglo = []
        for (let i = 0; i < resultado.rows.length; i++) {
            let resp = { id: null, nombre: null, apellido: null, dpi: null, correo: null }
            resp.id = resultado.rows[i][0]
            resp.nombre = resultado.rows[i][1]
            resp.apellido = resultado.rows[i][2]
            resp.dpi = resultado.rows[i][3]
            resp.correo = resultado.rows[i][4]
            arreglo.push(resp)

        }

        return res.send(arreglo)
    }
}

async function infoExp(req, res) {
    let conexion
    let resultado
    let datos = req

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select dpi,nombre,apellido,correo,direccion,telefono,cv from expediente where id_expediente=" + datos
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {

        let resp = { dpi: null, nombre: null, apellido: null, correo: null, direccion: null, telefono: null, cv: null }
        resp.dpi = resultado.rows[0][0]
        resp.nombre = resultado.rows[0][1]
        resp.apellido = resultado.rows[0][2]
        resp.correo = resultado.rows[0][3]
        resp.direccion = resultado.rows[0][4]
        resp.telefono = resultado.rows[0][5]
        resp.cv = resultado.rows[0][6]

        return res.send(resp)
    }
}

async function acep_exp(req, res) {
    let datos = req
    let resultado
    let conexion

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "begin acep_expe(" + datos.acept + "," + datos.revisor + ",'" + datos.dpi + "',TO_DATE('" + datos.fecha + "' , 'dd/mm/yyyy')" + "); end;"
        //faltan comillas en la consulta para meter strings

        resultado = conexion.execute(sql, [], { autoCommit: true })
        var mailoptions = {
            from: "pedrito67557@gmail.com", to: "joseamvi58@gmail.com", subject: "Nuevo Aplicante", text: "Haz sido aceptado para ser parte del departamento que seleccionaste!\n tus credenciales son:\nUsuario:" + datos.dpi + "\nPassword:user"

        }
        transport.sendMail(mailoptions, function (err, info) {
            if (err) {
                console.log(err)
            }
        })


    } catch (err) {
        return res.send(err.message)
    } finally {
        if (conexion) {
            try {
                await conexion.close()
                console.log("Conexion finalizada")
                //return res.send("Datos ingresados correctamente")
            } catch (err) {
                return res.send(err.message)
            }
        }

    }
}

async function planilla(req, res) {
    let conexion
    let resultado
    let datos = req

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select user_name,fecha_in,rol,estado from usuario where id_departamento=" + datos + " and asociado=1"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {

        let arreglo = []
        for (let i = 0; i < resultado.rows.length; i++) {
            let datos = {
                user: null,
                fecha: null,
                rol: null,
                estado: null
            }
            datos.user = resultado.rows[i][0]
            datos.fecha = resultado.rows[i][1]
            datos.rol = resultado.rows[i][2]
            datos.estado = resultado.rows[i][3]


            arreglo.push(datos)


        }

        return res.send(arreglo)

    }
}
async function planillaN(req, res) {
    let conexion
    let resultado
    let datos = req

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select user_name,fecha_in,rol,estado from usuario where id_departamento=" + datos + " and asociado=0"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {

        let arreglo = []
        for (let i = 0; i < resultado.rows.length; i++) {
            let datos = {
                user: null,
                fecha: null,
                rol: null,
                estado: null
            }
            datos.user = resultado.rows[i][0]
            datos.fecha = resultado.rows[i][1]
            datos.rol = resultado.rows[i][2]
            datos.estado = resultado.rows[i][3]


            arreglo.push(datos)


        }

        return res.send(arreglo)

    }
}


async function Requisitos(req, res) {
    let conexion
    let resultado
    let datos = req

    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "select f.nombre,r.nombre,rp.tamanio,rp.obligatorio" + " from formato f inner join formato_requisito fr on fr.id_formato=f.id_formato" + " inner join requisito r on fr.id_requisito=r.id_requisito" + " inner join  requisito_puesto rp on rp.id_requisito=r.id_requisito" + " inner join puesto p on rp.id_puesto=p.id_puesto" + " inner join departamento_puesto dp on dp.id_puesto=p.id_puesto" + " inner join expediente e on e.id_departamento_puesto=dp.id_departamento_puesto" + " inner join usuario u on u.id_usuario=" + datos + " and e.propietario=" + datos + " order by r.nombre"
        resultado = await conexion.execute(sql)
        conexion.commit()
    } catch (err) {
        return res.send(err.message)
    }
    if (resultado.rows.length == 0) {
        return res.send("No hay datos ingresados en esta tabla")
    } else {

        let arreglo = []
        for (let i = 0; i < resultado.rows.length; i++) {
            let datos = {
                formato: null,
                requisito: null,
                tamanio: null,
                obligatorio: null
            }
            datos.formato = resultado.rows[i][0]
            datos.requisito = resultado.rows[i][1]
            datos.tamanio = resultado.rows[i][2]
            datos.obligatorio = resultado.rows[i][3]


            arreglo.push(datos)


        }

        return res.send(arreglo)

    }
}

async function Asociar(req, res) {
    let datos = req
    let resultado
    let conexion
    try {
        conexion = await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql = "update usuario set asociado=" + datos.asociado + "where user_name='" + datos.id+"'"
        //faltan comillas en la consulta para meter strings

        resultado = conexion.execute(sql, [], { autoCommit: true })
        var mailoptions = {
            from: "pedrito67557@gmail.com", to: "joseamvi58@gmail.com", subject: "Nuevo Aplicante", text: "Haz sido aceptado para ser parte del departamento que seleccionaste!"

        }
        transport.sendMail(mailoptions, function (err, info) {
            if (err) {
                console.log(err)
            }
        })



    } catch (err) {
        return res.send(err.message)
    } finally {
        if (conexion) {
            try {
                await conexion.close()
                console.log("Conexion finalizada")
                //return res.send("Datos ingresados correctamente")
            } catch (err) {
                return res.send(err.message)
            }
        }

    }
}

app.post("/Asociar_Us/", (req, res) => {
    Asociar(req.body, res)
})

app.post("/eliminar_us", (req, res) => {
    eliminar_us(req.body, res)
})
//Aqui va para guardar los archivos y meterlos a la base
app.post("/Req_Archivos/:id", (req, res) => {
    let datos = []
    console.log(req.body.datos)
    for (let i = 0; i < req.body.datos.length; i++) {
        datos.push(JSON.parse(req.body.datos[i]))

    }
    console.log(datos)

})

app.get("/Requisitos/:id", (req, res) => {
    let id = req.params.id
    console.log(id)
    Requisitos(id, res)
})


app.get("/planillaN/:id", (req, res) => {
    let id = req.params.id
    console.log(id)
    planillaN(id, res)
})


app.get("/planilla/:id", (req, res) => {
    let id = req.params.id
    console.log(id)
    planilla(id, res)
})



app.post('/acept_Exp', (req, res) => {
    let datos = req.body
    acep_exp(datos, res)
})

app.get('/infoExp/:id', (req, res) => {
    let datos = req.params.id
    infoExp(datos, res)
})

app.get('/Revisor/:id', (req, res) => {
    let datos = req.params.id
    Exp_Revi(datos, res)
})

app.get('/login/:user/:pass', (req, res) => {
    let datos = { user: req.params.user, pass: req.params.pass }
    logear(datos, res)
})


app.get("/V_User/:id", (req, res) => {
    let id = req.params.id
    g_User(id, res)
})

app.get("/V_User", (req, res) => {
    gUsuario(req, res)
})

app.post("/usuario", (req, res) => {
    inser_us(req.body, res)
})

app.get('/departamentos', (req, res) => {
    gDepartamentos(req, res)
})

app.post('/expediente', (req, res) => {
    let datos = (JSON.parse(req.body.datos))
    const path = "/home/jose675/Escritorio/archivos_proye2/public/Archivos_P"
    const file = req.files.file
    let filename = file.name
    file.mv(`${path}${filename}`)
    const direccion = path + "/" + filename

    console.log(direccion)

    Expedientes(datos, res, direccion)
})

app.get('/inicio', (req, res) => {
    prueba(req, res)
})

app.get('/Info/:Nombre', (req, res) => {
    let nombre = req.params.Nombre
    info(nombre, res)
})

app.post('/pruebas', (req, res) => {
    let resul = meter(req.body, res)
    return res.send(resul)
})

app.listen(port, () => {
    console.log("Servidor en el puerto", port)
})