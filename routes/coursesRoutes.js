const express = require('express')
const  Course = require('../models/coursesModel')
const { default: mongoose } = require('mongoose')
//definir ruteador de courses
const router = express.Router()

router.get (('/'),
        async (req, res)=> {
            // traer los courses en bd 
            const courses = 
                  await Course.find()
            
            //escenario : no hay courses en mongo 
            if (courses.length > 0){
              //hay bootcamps
              res.status(200).json({
                  succes: true,
                  data: courses
              })
            }else{
              //no hay courses
              res.status(404).json({
                  succes: false,
                  msg: "no hay cursos"
              })
            }
        })

router.get ('/:id',
        async(req , res) => {
          const courseId = req.params.id
          try {
            //scenario: courseId sea invalido (1,a)
            if(!mongoose.Types.ObjectId.isValid(courseId)){
              return res.status(500).json({
                  success:false,
                  msg: "Id invalido"
              })
            }else{
  
              //Consultar bootcamp po id
              const course = await Course.
                              findById(courseId)
              if(!course){
                //no hay boootcamp
                res.status(404).json(
                  {
                    suucess:false,
                    msg : "Curso no encontrado"
                  }
                )
              }else{
                return res.status(200).json(
                  {
                    succes : true,
                    data :course
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


    router.post('/', async (req, res) => {
      try{
        // guardar el curso del body .)
        const newCourse = 
            await Course.create(req.body);
        return res.status(201).json({
          success: true,
          data: newCourse,
        })
      }catch(error){
        res.status(500).json({
          success: false,
          msg: `Error encontrado: ${error.message}` 
        })
      }})

    



    router.put ('/:id',
    async (req , res) => {
      const courseId = req.params.id
      try {
        //scenario: courseId sea invalido (1,a)
        if(!mongoose.Types.ObjectId.isValid(courseId)){
          return res.status(500).json({
              success:false,
              msg: "Id invalido"
          })
        }else{

          //Consultar course po id
          const course = await Course.
                          findByIdAndUpdate(courseId, 
                                            req.body,
                                            {
                                              new:true
                                            })
          if(!course){
            //no hay curso
            res.status(404).json(
              {
                suucess:false,
                msg : "Curso no encontrado"
              }
            )
          }else{
            return res.status(200).json(
              {
                succes : true,
                data :course
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
        courseId = req.params.id
        await Course.findByIdAndDelete(courseId)
        return res.json({
            succes : true,
            data : []
        }
        )
        })
module.exports = router;