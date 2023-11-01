const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true,
            "El titulo es requerido"],
        unique: true,
        maxlength:[50, "No puedes poner mas de 50 carcateres"]
    },
    description:{
        type: String,
        required: [true,
             "La descripcion es  requerido"],
        minlength: [10, "La descricion debe tener minimo de 10 caracteres "]
    },
    weeks:{
        type: Number,
        required: [true,
            "Las semanas son requerido"],
        maxlength: [1, "El numero maximo de semanas es 9"]
    },
    tuition:{
        type:Number,
        required: [true,
            "la direccion es requerida"],
    },
    miniumSkill:{
        type:[String],
        required: [true, 
            "Habilidades son requeridas"],
        enum:["beginner","intermediate","Advanced"]
    },
    createdAt: Date

})

module.exports = mongoose.model('Course', CourseSchema)