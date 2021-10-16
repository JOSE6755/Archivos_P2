const express=require('express')
const app=express();
app.use(express.json())
//app.use(express.urlencoded({extended:false}))
const oracle=require('oracledb')
const port=3000
cns={
    user:"TEST",
    password:"1234",
    connectString:"172.17.0.2:1521/orcl18"
}

async function prueba(req,res){
    try{
        conexion=await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        resultado=await conexion.execute('SELECT * FROM PRUEBAS')
        conexion.commit()
    }catch(err){
        return res.send(err.message)
    }
    if(resultado.rows.length==0){
        return res.send("No hay datos ingresados en esta tabla")
    }else{
        return res.send(resultado.rows)
    }
}

async function meter(req,res){
    let resultado
    let conexion
    try{
        conexion=await oracle.getConnection(cns)
        console.log("Se establecio la conexion")
        console.log(req.body.nombre)
    
        resultado=await conexion.execute("insert into pruebas(nombre,celular)VALUES(:nombre,:numero)",[req.body.nombre,req.body.numero],{autoCommit:true})
        
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
       
    }
}




app.get('/',(req,res)=>{
    prueba(req,res)
})

app.post('/pruebas',(req,res)=>{
    meter(req,res)
})

app.listen(port,()=>{
    console.log("Servidor en el puerto",port)
})