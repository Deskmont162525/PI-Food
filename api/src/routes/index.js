const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoutes = require('./Recipe');
const tipo_dietaRoutes = require('./Tipo_Dieta');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', recipeRoutes );
router.use('/types', tipo_dietaRoutes );



module.exports = router;
