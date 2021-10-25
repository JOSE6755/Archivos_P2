const express=require('express')
var cors=require('cors')
const fileupload=require('express-fileupload')
const app=express();
app.use(express.json())
app.use(cors())
app.use(fileupload())
const fs = require('fs')
//app.use(express.urlencoded({extended:false}))
const oracle=require('oracledb')
const port=3100
const Departamentos=require("./Inserts/Departamentos")
const Expediente=require("./Inserts/Expediente")
cns={
    user:"TEST",
    password:"1234",
    connectString:"172.17.0.2:1521/orcl18"
}

async function info(nombre,res){
    let conexion
    let resultado
    try{
        conexion=await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql="select p.nombre,salario,imagen from departamento_puesto rp inner join puesto p on p.id_puesto=rp.id_puesto and p.nombre='"+nombre+"' inner join departamento d on d.id_departamento=rp.id_departamento"
        resultado=await conexion.execute(sql)
        conexion.commit()
    }catch(err){
        return res.send(err.message)
    }
    if(resultado.rows.length==0){
        return res.send("No hay datos ingresados en esta tabla")
    }else{
        let datos={puesto:null,salario:null,imagen:null}
        datos.puesto=resultado.rows[0][0]
        datos.salario=resultado.rows[0][1]
        datos.imagen=resultado.rows[0][2]
        console.log(resultado.rows)
        return res.send(datos)
    }
}

async function prueba(req,res){
    let conexion
    let resultado
    try{
        conexion=await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql="select id_departamento_puesto, d.nombre, p.nombre,salario,imagen from departamento_puesto rp inner join puesto p on p.id_puesto=rp.id_puesto inner join departamento d on d.id_departamento=rp.id_departamento"
        resultado=await conexion.execute(sql)
        conexion.commit()
    }catch(err){
        return res.send(err.message)
    }
    if(resultado.rows.length==0){
        return res.send("No hay datos ingresados en esta tabla")
    }else{
        
        let arreglo=[]
        for (let i = 0; i < resultado.rows.length; i++) {
            let datos={
                puesto:null,
                departamento:null,
                salario:null,
                imagen:null,
                id:null
            }
            datos.id=resultado.rows[i][0]
            datos.departamento=resultado.rows[i][1]
            datos.puesto=resultado.rows[i][2]
            datos.salario=resultado.rows[i][3]
            datos.imagen=resultado.rows[i][4]
            console.log(datos)
            arreglo.push(datos)

            
        }
        console.log(arreglo)
        return res.send(arreglo)
    }
}

async function meter(req,res){
    datos=req
    //insertar departamentos,puestos,categorias y requisitos
    for (let i = 0; i < datos.children.length; i++) {
        
        switch (datos.children[i].name) {
            case "departamento":
                await Departamentos.insertarDepa(datos.children[i],null,res)
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
                await Departamentos.depa_puesto(datos.children[i],res)
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

app.get('/archivos',(req,res)=>{

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
    const path="../public/Archivos_P/SublimeDance-1-1-1-1.mp4"
    if(fs.existsSync(path)){
        res.contentType("video/mp4")
        fs.createReadStream(path).pipe(res)
    }else{
        res.status(500)
        console.log("no se encontro")
        res.send("no se encontro")
    }
    //console.log(JSON.parse(req.body.datos),req.files.file)
})


async function Expedientes(req,res) {
    let datos=req
    let resultado
    let conexion
    console.log(datos)
    try{
        conexion=await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        let sql="insert into expediente(DPI,NOMBRE,APELLIDO,CORREO,DIRECCION,TELEFONO,FECHA_POSTULACION,ACEPTADO,ID_DEPARTAMENTO_PUESTO) select '"+datos.DPI+"','"+datos.Nombre+"','"+datos.Apellido+"','"+datos.Correo+"','"+datos.Direccion+"','"+datos.Telefono+"',TO_DATE('"+datos.Fecha+"','dd/mm/yyyy'),2,dp.id_departamento_puesto from departamento d inner join puesto p on d.nombre='"+datos.Departamento+"' and p.nombre='"+datos.Puesto+"' inner join departamento_puesto dp on dp.id_departamento=d.id_departamento and dp.id_puesto=p.id_puesto"
        //faltan comillas en la consulta para meter strings
        console.log(sql)
        resultado=conexion.execute(sql,[],{autoCommit:true})
        
        
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


app.post('/expediente',(req,res)=>{
   Expedientes(req.body,res)
})

app.get('/inicio',(req,res)=>{
    prueba(req,res)
})  

app.get('/Info/:Nombre',(req,res)=>{
    let nombre=req.params.Nombre
    info(nombre,res)
})

app.post('/pruebas',(req,res)=>{
    let resul=meter(req.body,res)
    return res.send(resul)
})

app.listen(port,()=>{
    console.log("Servidor en el puerto",port)
})