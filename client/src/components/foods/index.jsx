import React, {useState} from 'react';
import { useSelector} from 'react-redux';
import {getFoodsByName} from '../../actions/index'
import Food from '../foodCard'
import Select from  'react-select'
import './styls.css';
import '../types/styls.css';
import lupa from './buscar.png';
import ImgDefault from '../foodCard/img_default.gif';



export default function Foods(){
    
    //trae toda la info de la api 3001
    var recipes = useSelector(state => state.recipes);
    //trae los typos de la api 3001
    var types = useSelector(state => state.types);
    // declaro la constante para el paginador
    const [currentPage, setCurrentPage] = useState(0);
    //creo las constantes para el select
    const [value, setvalue] = useState(null);
    //creo las constantes para el select Ordenamientos
    const [value1, setvalue1] = useState(null);
    //creo las constantes para el select
    const [Input, setInput] = useState('');
    const [Search, setSearch] = useState('');
    //filtro la info para el paginador 
   
    
    const filterRecipes = () => { 
      
      switch (Search){

        case "Select":
            //carga las comidas por typo
            const filteredType = recipes.filter(e => e.types.includes(value.value));
            return filteredType.slice(currentPage, currentPage + 9);
        case "Input":
            //carga las comidas por Nombre
            const filteredNombre = recipes.filter(e => e.Nombre.includes(Input));
            return filteredNombre.slice(currentPage, currentPage + 9);
        case "OrdenAsc":
            //carga las comidas por orden asc
            const filteredOrdenAsc = recipes.sort((a,b) => {
              const NombreA = a.Nombre.toLowerCase();
              const NombreB = b.Nombre.toLowerCase();

              if (NombreA < NombreB)return -1;
              if (NombreA > NombreB)return 1;
              return 0;
            });
            return filteredOrdenAsc.slice(currentPage, currentPage + 9);
        case "OrdenDsc":
          //carga las comidas por orden desc
          const filteredOrdenDsc = recipes.sort((a,b) => {
            const NombreA = a.Nombre.toLowerCase();
            const NombreB = b.Nombre.toLowerCase();

            if (NombreA > NombreB)return -1;
            if (NombreA < NombreB)return 1;
            return 0;
          });
          return filteredOrdenDsc.slice(currentPage, currentPage + 9);
        case "OrdenScoreAsc":
          //carga las comidas por scoreasc
          const filteredOrScoreAsc = recipes.sort((a,b) => {  
            if (a.Puntuacion > b.Puntuacion) {
              return -1;
            }
            if (a.Puntuacion > b.Puntuacion) {
              return 1;
            }       
            return 0
          });
          return filteredOrScoreAsc.slice(currentPage, currentPage + 9);
        case "OrdenScoreDsc":
          //carga las comidas por score desc
          const filteredOrdenScoreDsc = recipes.sort((a,b) => {            
            return a.Puntuacion - b.Puntuacion;
          });
          return filteredOrdenScoreDsc.slice(currentPage, currentPage + 9);        
        default:
          return recipes.slice(currentPage, currentPage + 9);
      }
      
    }
    //creo la constante con la info para el select
    const Options = types.map((type) => {
      return {
        value:type.Nombre,
        label:type.Nombre
      }
    })

    //creo la constante con la info para el select por ordenamiento
    const Options2 = [
      {value: "OrdenAsc", label:"Orden A a Z"},
      {value: "OrdenDsc", label:"Orden Z a A"},
      {value: "OrdenScoreAsc", label:"Orden Mayor a Menor Score"},
      {value: "OrdenScoreDsc", label:"Orden Menor a Mayor Score"}
    ]
     
  
    // funcion constante para el select
    const onSelectChange = (value) =>{
      setCurrentPage(0);
      setvalue1(null);
      setInput('');
      setSearch('Select');
      setvalue(value);
    }

    // funcion constante para el select
    const onSelectChangeOrde = (value1) =>{
      setCurrentPage(0);
      setInput('');      
      setvalue(null);
      setSearch(value1.value);
      setvalue1(value1);      
    }

    // funcion constante para el select
    const onInputChange = (Input) =>{
      setCurrentPage(0);
      setvalue1(null);  
      setvalue(null);
      setSearch('Input');    
      setInput(Input.target.value);
    }
    
    
    //funcion constante para el paginador avanza
    const nextPage = () => {
      if(filterRecipes().length >= currentPage + 9)
      setCurrentPage(currentPage + 9);
    }
    //funcion constante para el paginador retrocede
    const prevPage = () => {
      if(currentPage > 0)
      setCurrentPage(currentPage - 9);
    }

    const buscarNombre = (Input) => {      
      var nombre = document.getElementById("input").value;
      getFoodsByName(nombre);
      console.log("pruems",nombre);
      
    }
    //retorno del componente
    return (
      
      <div>
      <br/>
      <a className="boton1" href="/form/insert"  >Crear Reseta</a>
        <Select className="select-css"        
          value={value1}
          options={Options2} 
          placeholder="Ordenamientos por..."
          onChange={onSelectChangeOrde}
        />
        
        <Select className="select-css"        
          value={value}
          options={Options} 
          placeholder="Filtrar por Typo de Dieta"
          onChange={onSelectChange}
        /><br/>
        <div className="wrap">
        
          <div className="search">
              <input type="text" id="input" className="searchTerm" placeholder="Filtrar o Buscar por Nombre de Comida" 
                value={Input} onInput={e => setInput(e.target.value)} onChange={onInputChange}
              />
              
              <button type="submit" className="searchButton" onClick={buscarNombre}>
                <img src={lupa} className="lupa" alt="no hay imagen"/>
            </button>
          </div>
        </div> 
            
        {
          
          filterRecipes().map(({id, Nombre, Image, Puntuacion, types},i) => { 
                 
                 var type = types.map((e) => {
                    if (e.Nombre !== undefined){
                      return type = e.Nombre;                  
                    }else{
                      return type = types;
                    }               

                  })
                if (typeof id === "string" && id.length > 10) {
                  Image = ImgDefault;
                }
                
                return <Food 
                key={i}
                id={id}
                Nombre={Nombre}  
                Image={Image} 
                Puntuacion={Puntuacion}
                types={type} />
            })
            
        }        
        
        <div className="pagination">
          <button onClick={prevPage}>❮ Prev</button>
          <button onClick={nextPage}>Next ❯</button>
        </div>
       
      </div>

    )
}