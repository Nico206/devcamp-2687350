const colors = require ('colors')
const mongoose = require ('mongoose')

//funcion para conctar a la base de datos

async function connectDB (){
    const conn =  await mongoose.connect(process.env.MONGO_URL)
    console.log (`conexion exitosa a mongodb:${conn.connection.host}`.bgGreen.blue)

}

module.exports = connectDB

