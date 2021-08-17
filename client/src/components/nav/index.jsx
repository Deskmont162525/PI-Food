import React from 'react';
import './styls.css';
import imgFodd from './cooking.png'

export default function Nav(){
    //debo configurar en los a por que genera alertas
    return (<div className="nav1"><nav>
    <div className="nav" >            
        <img className="img" src={imgFodd} alt="no hay imagen" />  
    </div>
    
    <button>

</button>
    <a href="/inicio">Soy el Mejor</a>
    <a href="/inicio">Soy el Mejor</a>
    <a href="/inicio">Soy el Mejor</a>
  
  </nav>
  </div>
    )
}