const express = require('express')
const dotenv = require ('dotenv')
const colors = require ('colors')
const connectDB = require ('./config/db')
const  bootcampsRoutes = require ('./routes/bootcampsRoutes')
const coursesRoutes = require('./routes/coursesRoutes')

//establecer config

dotenv.config({
    path:'./config/.env'
})

//crear el objeto express

const app = express()
// dependecia formate json
app.use(express.json())
// ejecutar la conexion la base de datos

connectDB()


app.get('/prueba', (req, res)=>{
    //EJEMPLO DE RESPONNSE BASICO
    res.send("Hola")
})

//uri de bootcamps
app.use('/bootcamps',
    bootcampsRoutes)



// Uri de Cursos
app.use('/courses',
    coursesRoutes)









//Ruta del recurso reseñas

//Obtener todos las reseñas de un bootcamp
app.get( '/api/v1/devcamp/review/bootcamp', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : "Aqui van a mostrarse todos las reseñas de un bootcamp"
    })
})
//Obtener todos las reseñas
app.get( '/api/v1/devcamp/review', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" :  "Aqui van a mostrarse todos las reseñas"
    })
})

//Crear reseña
app.post( '/api/v1/devcamp/review', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : "Creando reseña"
    })
})
//Obtener el reseña por id
app.get( '/api/v1/devcamp/review/:id', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" :  `Obteniendo reseña con id ${ request.params.id }` 
    })
})

//Actualizar reseña
app.put( '/api/v1/devcamp/review/:id', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : `Actualizando reseña con id ${ request.params.id }`
    })
})

//Eliminar reseña
app.delete( '/api/v1/devcamp/review/:id', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : `eliminar reseña con id ${ request.params.id }`
    })
})

//Ruta del recurso usuario

//Obtener todos los usuarios
app.get( '/api/v1/devcamp/usuarios', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : "Aqui van a mostrarse todos los usuarios"
    })
})

//Obtener usuario por id
app.get( '/api/v1/devcamp/usuarios/:id', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" :  `Aqui van a mostrarse el usuario por id ${ request.params.id }` 
    })
})

//Crear usuario
app.post( '/api/v1/devcamp/usuarios', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : "Creando usuario"
    })
})

//Actualizar usuario
app.put( '/api/v1/devcamp/usuarios/:id', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : `Actualizando usuario con id ${ request.params.id }`
    })
})

//Eliminar usuario
app.delete( '/api/v1/devcamp/usuarios/:id', (request, response) =>{
    response.status(200).json({
        "sucess" : true,
        "msg" : `Eliminando usuario con id ${ request.params.id }`
    })
})



        
//definir puerto de servidor

const puerto = process.env.PUERTO

app.listen( puerto ,
           console.log(`servidor ejecutando en puerto en ${puerto}`.bgMagenta.green.bold))