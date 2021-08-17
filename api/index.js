//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { conn, Types } = require('./src/db.js');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const {
  API_KEY, API_KEY_OPCI, API_KEY_OPCI1
} = process.env;



// Syncing all the models at once.
conn.sync({ force: false })
.then( async () => {
  const apiTypesResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_OPCI1}&addRecipeInformation=true`);
  let apiTypes = apiTypesResponse.data.results.map((type) => {
    return type.diets    
  });
  //creo array para filtrar los tipos
  let apiTypesFil =[];
  
  //creo un array de objetos para ingresarlos a la bd
  for(var i=0; i<apiTypes.length; i++) {
    //Bucle que recorre el array que está en la posición i
    for(var j=0; j<apiTypes[i].length; j++) {
        apiTypesFil.push({
          ID: uuidv4(),
          Nombre:apiTypes[i][j]
        })
    }
  }
  
  //limpio los repetidos para que la bd me quede sin redundancia de datos
  var temp = {};
  apiTypesFil = apiTypesFil.filter(function(current) {
    var exists = !temp[current.Nombre];
    temp[current.Nombre] = true;
    return exists;
  });

  //estas lineas son para evitar que los vuelva a cargar si ya 
  //estan en la base de datos
  const types = await Types.findAll({    
  })
  if (types.length === 0){

    //soy el mejor logre la precarga OK
    await Types.bulkCreate(apiTypesFil);
  }   
  
  server.listen(3001, () => {
    console.log('soy el mejor %s listening at 3001'); // eslint-disable-line no-console
  });
});


