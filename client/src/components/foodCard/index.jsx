import { Link } from 'react-router-dom';
import './styls.css';



export default function Food({id, Nombre, Image, Puntuacion, types}){
    return (
        
        <div id="container">
			<div className="product-details">
				<h1>{Nombre}</h1>
				<span className="hint-star star">
					<i className="fa fa-star" aria-hidden="true"></i>
					<i className="fa fa-star" aria-hidden="true"></i>
					<i className="fa fa-star" aria-hidden="true"></i>
					<i className="fa fa-star-half-o" aria-hidden="true"></i>
					<i className="fa fa-star-o" aria-hidden="true"></i>
				</span>	
				<p className="information"> <strong>Puntuacion: </strong>{Puntuacion}</p>						
					
				<div className="control">
					
					<button className="btn">
				<Link to={`/recipe/${id}`}>
				<span className="buy">Ver Detalle</span>
				</Link>
				</button>
					
				</div>
					
			</div>
			<div className="product-image">
		
				<img src={Image} alt="Soy el Mejor"/>
				

				<div className="info">
				<h2>The Types</h2>
				<ul>
					<li><strong>Types: </strong>{types}</li>
				</ul>										
				</div>
			</div>
		</div>



    )
    
}