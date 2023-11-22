const mongoose = require("mongoose");

const BootcampSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,
             "el nombre es requerido"],
        unique: true, 
        maxlength: [20, "nombre de bootcamp no mayor a 20 caracteres"]
    },
    phone:{
        type: Number,
        max: [9999999999, "telefono de bootcamp no mayor a 10 digitos"]
    },
    address:{
        type:String,
        required: [true,
            "la direccion es requerida"],
        maxlength:[100, "direccion de bootcamp no mayor a 100 caracteres "]
    },
    topics:{
        type:[String],
        required: [true, 
            "temas son requeridos"],
        enum:["Frontend","Backend","AI","DevOps"]
    },
    averageRating:Number,
    createdAt: Date

})

module.exports = mongoose.model('Bootcamp', BootcampSchema)