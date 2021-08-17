import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {getFoodsById} from '../../actions/index'
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom'
import './styls.css';
import ImgDefault from '../foodCard/img_default.gif';




export default function FoodDetail(){
	//constante para detallar el usedispatch
	const dispatch = useDispatch();
	//constante para recoger el id enviado por url
	const id = useParams().idReceta;
	//obtengo el detalle
	useEffect(() => {
		dispatch (
			getFoodsById(id))
	  }, [dispatch, id])
    
	// debe traer el detalle por id
	const recipe = useSelector(state => state.recipe);
	
	//manipulo el texto de el resumen del plato para pintarlo
	var Resumen = "";
	if(recipe.Resumen_del_plato){
		Resumen = recipe.Resumen_del_plato.replaceAll('<b>','').replaceAll('</b>','');
	}
	//manipulo el texto de el paso a paso del plato para pintarlo
	var PasoA = "";
	if(recipe.Paso_a_paso){
		if( typeof recipe.Paso_a_paso !== "string"){
			PasoA = recipe.Paso_a_paso.map((e) => {
			return e.steps.map((e, i) =>
			<li key={i}>
				<br/>
				<strong>Step : {i}</strong> {e.step}
			</li>
			);
		})	;
		}
		else{
			
			PasoA = <li><strong>Step : </strong>{recipe.Paso_a_paso}</li>
		}
		
	}

	// manipular la info de la bd los typos
	var type = "";
	if (recipe.types !== undefined){
		type = recipe.types.map((e) => {			
		 	 return type = e.Nombre; 
		})	
	}else{
		type = recipe.type
	}
	// imagen por defecto 
	var Image = ""
	if (typeof id === "string" && id.length > 10) {
		Image = ImgDefault;
	}else{
		Image = recipe.Image
	}
	
	return (
        
        <div id="container1">
			<div className="product">
			
				<h1>{recipe?.Nombre}</h1>
				<span className="hint-star star">
					<i className="fa fa-star" aria-hidden="true"></i>
					<i className="fa fa-star" aria-hidden="true"></i>
					<i className="fa fa-star" aria-hidden="true"></i>
					<i className="fa fa-star-half-o" aria-hidden="true"></i>
					<i className="fa fa-star-o" aria-hidden="true"></i>
				</span>
				<p className="information"><strong >The Summary</strong></p>				 
				<p className="information">{Resumen}</p>
					
			</div>
			
			<div className="product-image1">
		
				<img src={Image} alt="No hay imagen :/"/>
				

				<div className="info1">
					<h2>The Details</h2>
					<ul>
						<li><strong>Id: </strong>{id}</li>
						<li><strong>Nivel_de_comida_saludable: </strong>{recipe?.Nivel_de_comida_saludable}</li>
						<li><strong>Puntuacion: </strong>{recipe?.Puntuacion}</li>
						<li><strong>Tipo_de_plato: </strong>{recipe?.Tipo_de_plato}</li>
						<li><strong>Tipo de dieta: </strong>{type}</li>
						{PasoA}
					</ul>					
				</div>
			</div>
			<div className="control1">
				<button className="btn1">
					<Link to={`/recipe`}>
						<span className="buy">Regresar al Listado</span>
					</Link>
				</button>
						
			</div>
		</div>
    )
    
}