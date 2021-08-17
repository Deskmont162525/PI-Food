const express = require('express');
const { Types } = require('../db.js');
const { v4: uuidv4 } = require('uuid');


const router = express.Router();

router.get('/', async (req,res, next) => {
     
    try{
        const types = await Types.findAll({
            //include: Recipe
        })
        res.json(types);
    }catch (e) {
        next(e);
    }
    
});

router.post('/', async (req, res) => {
    const {Nombre} = req.body;
    try{
        const createdTipo_dieta = await Types.create({
            ID: uuidv4(),
            Nombre        
        })
        res.json(createdTipo_dieta);

    }catch (e){
        next(e);
    }
    
})


module.exports = router;