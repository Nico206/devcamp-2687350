const express = require('express')
const  Bootcamp = require('../models/bootcampsModel')
//definir ruteador de bootcamps
const router = express.Router()

router.get (('/'),
        async (req, res)=> {
            // traer los bootcamps en bd 
            const bootcamps = await Bootcamp.find()

            return res.json({
                succes: true,
                data: bootcamps
            })
        })

router.get ('/:id',
        async(req , res) => {
        const bootcampId = req.params.id
        //Consultar bootcamp po id
        const bootcamp = await Bootcamp.findById(bootcampId)
        return res.json({
            succes : true,
            data :bootcamp

         })

    })


    router.post('/', async (req, response) => {
        const newBootcamp = await Bootcamp.create(req.body);
        return response.json({
          success: true,
          data: newBootcamp,
        });
      });



    router.put ('/:id',
      async (req , res) => {
      bootcampId = req.params.id
      updBootcamp = await Bootcamp.findByIdAndUpdate(
          bootcampId,
          req.body,
          {
            new: true,
            RunValidators: true
          }
      )
      return res.json({
          succes : true,
          data : updBootcamp
      }
      )
      })
//4. eliminar

router.delete ('/:id',
        async (req , res) => {
        bootcampId = req.params.id
        await Bootcamp.findByIdAndDelete(bootcampId)
        return res.json({
            succes : true,
            data : []
        }
        )
        })
module.exports = router;