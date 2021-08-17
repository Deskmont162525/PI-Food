//import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './styls.css';
import {postFoodAdd} from '../../actions/index'
import imgFodd from '../nav/cooking.png';
import Select from  'react-select';
import { useSelector} from 'react-redux';


export default function FoodForms(){


    // creo el estado de los typos nuevos
    //const [msg, setmsg] = useState(null);
    // creo el estado de los typos nuevos
    const [typesNew, settypesNew] = useState(null);
    // creo el estado para enviar al post
    //Nombre, Resumen_del_plato,Puntuacion,Nivel_de_comida_saludable,Paso_a_paso,Image, types
    const [recipe, setrecipe] = useState("");

    //funcion para almacenar los cambios de los datos del formulario
    function onInputChangeForm (e){
      setrecipe((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        }
      })

    };
    
    
    //trae los typos de la api 3001
    var types = useSelector(state => state.types);
    //creo la constante con la info para el select
    const Options = types.map((type) => {
      return {
        value:type.ID,
        label:type.Nombre
      }
    });
    // funcion constante para el select    
    const onSelectChangeNew = (typesNew) =>{
      var tipesEnv = "";
      if (typesNew) {
        tipesEnv = typesNew.map((e) => {
          return e.value
        });
      }      
      settypesNew(typesNew); 
      addTypes(tipesEnv);     
    };
    
    function addTypes (tipesEnv) {
      setrecipe({
        ...recipe,
        types: tipesEnv 
      })
    }

    

    async function handelSubmit(e) {
      e.preventDefault();
      // if (msg !== null){
        
      // }else{
        
      // }
      
      await postFoodAdd(recipe);
      alert("se agrego correctamente soy el mejor");
      

    }

    
    return (
      <div className="body1">

      <header className="encabezado1">
      <img className="logo-tally" src={imgFodd} alt="No hay imangen " title="Logo Foods" />
    </header>
    
    <div className="wrap1">
    
      <form className="box-form" method="post" onSubmit={handelSubmit} encType="multipart/form-data">
        <span className="tittle-form">
          Food Insert
        </span>
    
        <div className="form-group">
          <input type="text" name="Nombre" className="inputF control-inputFs"  value={recipe.Nombre} required="required" onChange={onInputChangeForm} />
          <label htmlFor="user" className="control-label">
            Nombre
          </label>
          <i className="bar"></i>
        </div>

        <div className="form-group">
          <input type="text" name="Resumen_del_plato" className="inputF control-inputFs" value={recipe.Resumen_del_plato}  required="required" onChange={onInputChangeForm} />
          <label htmlFor="user" className="control-label">
          Resumen del plato
          </label>
          <i className="bar"></i>
        </div>

        <div className="form-group">
          <input type="text" name="Puntuacion" className="inputF control-inputFs" value={recipe.Puntuacion}  required="required" onChange={onInputChangeForm}/>
          <label htmlFor="user" className="control-label">
          Puntuacion
          </label>
          <i className="bar"></i>
        </div>

        <div className="form-group">
          <input type="text" name="Nivel_de_comida_saludable" className="inputF control-inputFs" value={recipe.Nivel_de_comida_saludable}  required="required" onChange={onInputChangeForm}/>
          <label htmlFor="user" className="control-label">
          Nivel de comida saludable
          </label>
          <i className="bar"></i>
        </div>
        

        <div className="form-group">
          <textarea name="Paso_a_paso" className="inputF control-inputFs" rows="10" cols="50" value={recipe.Paso_a_paso} onChange={onInputChangeForm}></textarea>
          <label htmlFor="user" className="control-label">
          Paso a paso
          </label>
          <i className="bar"></i>
        </div>

        <div className="form-group">
        <input type="file" name="Image" className="inputF control-inputFs" 
        value={recipe.Image} onChange={onInputChangeForm}
        />         
        </div> 

        <div className="form-group">
          <input type="text" name="Tipo_de_plato" className="inputF control-inputFs" value={recipe.Tipo_de_plato} onChange={onInputChangeForm}/>
          <label htmlFor="user" className="control-label">
          Tipo de plato
          </label>
          <i className="bar"></i>
        </div>

        <div className="form-group">
        <Select 
          value={typesNew} 
          options={Options} 
          isMulti
          onChange={onSelectChangeNew}
        />
        </div>
        

        <div>
          <input type="submit" className="btn-send" value="Enviar" />
        </div>
        <div>
        <a className="btn-send" href="/recipe"  >Regresar al Listado</a>
        </div>
      </form>
    </div>
    </div>



    )}