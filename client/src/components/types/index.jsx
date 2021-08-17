import { useSelector } from 'react-redux';
import './styls.css';



export default function Types({onSearchChange}){
    var types = useSelector(state => state.types)
    return (
        <div>        
            <select className="select-css" id="producto">
                <option>Selecciona una opción</option>
                {
                    types.map(({ID, Nombre}) => {
                        return <option key={ID} value={Nombre} onChange={onSearchChange}>{Nombre}</option>
                    })
                }
                   
            </select>
        </div>

    )
    }