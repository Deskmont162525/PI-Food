require('dotenv').config();
const { Router } = require('express');
//sequelize.models
const { Recipe, Types } = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const router = Router();
const axios = require('axios');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, __dirname + 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now  + '--' + file.originalname)
    }

});



const upload = multer({ storage: fileStorageEngine})


const {
    API_KEY, API_KEY_OPCI, API_KEY_OPCI1
  } = process.env;


router.get('/', async (req,res) => {
    const Nombre = req.query.name;
    
    if (Nombre){
        console.log("debe entrar aqui" , Nombre)
        try{        
            const dbRecipes = await Recipe.findAll({
                where: {
                    [Op.or]: [{
                        Nombre: 
                            {
                                [Op.like]: '%'+Nombre+'%'
                            }
                        }, {
                        Nombre: 
                            {
                                [Op.like]: Nombre+'%'
                            }}]
                    
                  },
                include: Types
            })
            res.status(200).json(dbRecipes);
        }catch (e) {
            console.log(e);
        }
    }else{

        try{        
            const dbRecipes = await Recipe.findAll({               
                include: Types
            })
            res.status(200).json(dbRecipes);
        }catch (e) {
            console.log(e);
        }
    }
      
});

router.get('/all', async (req,res) => {

    try{
        const apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_OPCI1}&addRecipeInformation=true`);
        var apiRecipesResult = apiRecipesPromise.data.results;
        const dbRecipes = await Recipe.findAll({
            //include: Types, attributes: ['Nombre']
            include:[
                  {
                    model : Types,
                     attributes: [  'Nombre' ],
                   }
                 ]
        });
        apiRecipesResult = await apiRecipesResult.map((recipe) => {
            return {
                id: recipe.id,
                Nombre: recipe.title,
                Resumen_del_plato: recipe.summary,
                Puntuacion: recipe.spoonacularScore,
                Nivel_de_comida_saludable: recipe.weightWatcherSmartPoints,
                Paso_a_paso: recipe.analyzedInstructions,
                Image: recipe.image,
                Tipo_de_plato:recipe.dishTypes,
                types: recipe.diets
            }
        })
        var allRecipesCon = apiRecipesResult.concat(dbRecipes);
        res.json(allRecipesCon);

    }catch (e) {
        console.log(e);
    }
    
       
});

//me queda pendiente la busqueda por id ----------//

router.get('/:idReceta', async (req,res, next) => { 
    
    const IdReceta = req.params.idReceta; 
        
    if (!IdReceta){
        return next({msg: "Debes enviar un id de reseta ", status: 500});
    }

    var RecipeResult
    try{
        if (typeof IdReceta === "string" && IdReceta.length > 10){
            RecipeResult = await Recipe.findByPk(IdReceta,{
                include: {
                    model:Types,
                    attributes: ['Nombre']
                }
                    
            });
        }else{
            const apiRecipesPromise = await axios.get(`https://api.spoonacular.com/recipes/${IdReceta}/information?apiKey=${API_KEY_OPCI1}`);
            
            RecipeResultfiltrado = apiRecipesPromise.data;
            RecipeResult = {
                id: RecipeResultfiltrado.id,
                Nombre: RecipeResultfiltrado.title,
                Resumen_del_plato: RecipeResultfiltrado.summary,
                Puntuacion: RecipeResultfiltrado.spoonacularScore,
                Nivel_de_comida_saludable: RecipeResultfiltrado.weightWatcherSmartPoints,
                Paso_a_paso: RecipeResultfiltrado.analyzedInstructions,
                Image: RecipeResultfiltrado.image,
                Tipo_de_plato:RecipeResultfiltrado.dishTypes,
                type: RecipeResultfiltrado.diets
            }
        }       
        //console.log("revisando ->", RecipeResult);
        res.json(RecipeResult);

    }catch (e) {
        next(e);
    }
      
});

router.post('/', upload.single("Image"), async (req, res, ) => {
    //const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log("preuba otra ", req.file);
   const {Nombre, Resumen_del_plato,Puntuacion,Nivel_de_comida_saludable,Paso_a_paso,Image, Tipo_de_plato,types} = req.body;
   
   try{
        const createdRecipe = await Recipe.create({
            id: uuidv4(),
            Nombre,
            Resumen_del_plato,
            Puntuacion,
            Nivel_de_comida_saludable,
            Paso_a_paso,
            Image,
            Tipo_de_plato
        })
        const createdRecipeWhitT = await createdRecipe.setTypes(types)
        res.json(createdRecipeWhitT);
   }catch (e) {
    console.log(e);
   }
  

});


module.exports = router;