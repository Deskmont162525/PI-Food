const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {
    ID: {
        type: DataTypes.UUID,
        primaryKey:true
      },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });  
};
