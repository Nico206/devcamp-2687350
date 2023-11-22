const express = require('express')
const  Bootcamp = require('../models/bootcampsModel')
const { default: mongoose } = require('mongoose')
//definir ruteador de bootcamps
const router = express.Router()

router.get (('/'),
        async (req, res)=> {
            // traer los bootcamps en bd 
            const bootcamps = 
                  await Bootcamp.find()
            
            //escenario : no hay bootcxamps en mongo 
            if (bootcamps.length > 0){
              //hay bootcamps
              res.status(200).json({
                  succes: true,
                  data: bootcamps
              })
            }else{
              //no hay bootcamps
              res.status(404).json({
                  succes: false,
                  msg: "no hay bootcamps"
              })
            }
        })

router.get ('/:id',
        async(req , res) => {
        const bootcampId = req.params.id
        try {
          //scenario: bootcampId sea invalido (1,a)
          if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            return res.status(500).json({
                success:false,
                msg: "Id invalido"
            })
          }else{

            //Consultar bootcamp po id
            const bootcamp = await Bootcamp.
                            findById(bootcampId)
            if(!bootcamp){
              //no hay boootcamp
              res.status(404).json(
                {
                  suucess:false,
                  msg : "bootcamp no encontrado"
                }
              )
            }else{
              return res.status(200).json(
                {
                  succes : true,
                  data :bootcamp
                }
              )
            }

          }
        } catch (error) {
          res.status(500).json({
            success:false,
            msg: `Error encontrado: ${error.message}` 
          })
        }
    })

    //crear un bootcamp
    router.post('/', async (req, res) => {
        try{
          // guardar el bootcamp del body .)
          const newBootcamp = 
              await Bootcamp.create(req.body);
          return res.status(201).json({
            success: true,
            data: newBootcamp,
          })
        }catch(error){
          res.status(500).json({
            success: false,
            msg: `Error encontrado: ${error.message}` 
          })
        }})



    router.put ('/:id',
      async (req , res) => {
        const bootcampId = req.params.id
        try {
          //scenario: bootcampId sea invalido (1,a)
          if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            return res.status(500).json({
                success:false,
                msg: "Id invalido"
            })
          }else{

            //Consultar bootcamp po id
            const bootcamp = await Bootcamp.
                            findByIdAndUpdate(bootcampId, 
                                              req.body,
                                              {
                                                new:true
                                              })
            if(!bootcamp){
              //no hay boootcamp
              res.status(404).json(
                {
                  suucess:false,
                  msg : "bootcamp no encontrado"
                }
              )
            }else{
              return res.status(200).json(
                {
                  succes : true,
                  data :bootcamp
                }
              )
            }

          }
        } catch (error) {
          res.status(500).json({
            success:false,
            msg: `Error encontrado: ${error.message}` 
          })
        }
      })
//4. eliminar

router.delete ('/:id',
        async (req , res) => {
          try {
         //scenario: bootcampId sea invalido (1,a)
          if(!mongoose.Types.ObjectId.isValid(bootcampId)){
          return res.status(500).json({
              success:false,
              msg: "Id invalido"
          })
        }else{

        
          if(!bootcamp){
            //no hay boootcamp
            res.status(404).json(
              {
                suucess:false,
                msg : "bootcamp no encontrado"
              }
            )
          }else{
            return res.status(200).json(
              {
                succes : true,
                data :[]
              }
            )
          }

        }
          } catch (error) {
            
          }
        bootcampId = req.params.id
        await Bootcamp.findByIdAndDelete(bootcampId)
        return res.json({
            succes : true,
            data : []
        }
        )
        })
module.exports = router;