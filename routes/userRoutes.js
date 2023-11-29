const UsersModel = 
      require('../models/usersModel');
const express = require('express');
const router = express.Router();

router.post('/register', async (req,res) =>{
        try{
            const user = await UsersModel
                            .create(req.body)
            res.status(201).json({
                succes: true,
                data: user
            })
        } catch (error){
            res.status(500).jsom({
                succes: false,
                msg: error.message})
        }
})

router.post('/login', async (req,res) =>{
    try{
        const { email, password } =req.body
        //buscar el usuario 
        //al que corresponda el email
        const user = await UsersModel.findOne({email})
        if(!user){
            return res.status(401).json({
                succes: false,
                msg: "El usuario no existe"
            })
        }else{
            const isMatch = await user.compararPassword(password)
            if(!isMatch){
                 res.status(401).json({
                    succes: false,
                    msg: "Credenciales invalidas"
                })
            }else{
                res.status(200).json({
                    succes: true,
                    msg: "Usuario logeado correctamente"
                })
            }
        }
    } catch (error){

    }
})

module.exports = router;