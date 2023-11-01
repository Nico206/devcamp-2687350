const express = require('express')
const  Course = require('../models/coursesModel')
//definir ruteador de courses
const router = express.Router()

router.get (('/'),
        async (req, res)=> {
            // traer los courses en bd 
            const courses = await Course.find()

            return res.json({
                succes: true,
                data: courses
            })
        })

router.get ('/:id',
        async(req , res) => {
        const courseId = req.params.id
        //Consultar course po id
        const course = await Course.findById(courseId)
        return res.json({
            succes : true,
            data :course

         })

    })


    router.post('/', 
    async (req, response) => {
        const newcourse = await Course.create(req.body);
        return response.json({
          success: true,
          data: newcourse,
        });
      });



    router.put ('/:id',
      async (req , res) => {
      courseId = req.params.id
      updcourse = await Course.findByIdAndUpdate(
          courseId,
          req.body,
          {
            new: true,
            RunValidators: true
          }
      )
      return res.json({
          succes : true,
          data : updcourse
      }
      )
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