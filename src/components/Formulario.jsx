import useClima from "../hooks/useClima"
import { useState } from "react"

const Formulario = () => {
    
    const [alerta, setAlerta] = useState('');

    const {busqueda, datosBusqueda, consultarClima} = useClima()
    const {ciudad, pais} = busqueda

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son obligatorios')
            return
        }
        setAlerta('')
        consultarClima(busqueda)
    }
    
    return(
        <div className="contenedor">
            {alerta && <p className="">{alerta}</p>}
            <form onSubmit={handleSubmit} >
                <div className="campo">
                    <label htmlFor="ciudad" className=""> 
                        Escribe la ciudad
                    </label>
                    <input 
                        type="text" 
                        name="ciudad" 
                        id="ciudad" 
                        onChange={datosBusqueda} 
                        value={ciudad}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="pais" className=""> 
                        Selecciona el pais
                    </label>
                    <select 
                        name="pais" 
                        id="pais"
                        onChange={datosBusqueda} 
                        value={pais}
                    >
                        <option value="">Seleccione un pais</option>
                        <option value="US">Estados unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                    </select>
                </div>

                <input type="submit" className="" value="Consultar clima" />
            </form>
        </div>
    )
}

export default Formulario