const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey:true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Resumen_del_plato: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    Nivel_de_comida_saludable: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    Paso_a_paso: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tipo_de_plato: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  
};
