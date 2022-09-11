import { useState, createContext} from "react";
import axios from "axios";


const ClimaContext = createContext()

const ClimaProvider = ( {children} ) => {

    const [noResultado, setNoResultado] = useState('')
    const [resultado, setResultado] = useState({})
    const [cargando, setCargando] = useState(false)
    const [busqueda, setBusqueda] = useState({
        ciudad : '',
        pais : ''
    })

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value 
        })
    }

    const consultarClima = async busquedaForm => {
        setCargando(true)
        setNoResultado(false)
        try {
            const {ciudad, pais} = busquedaForm;
            const appKey = import.meta.env.VITE_API_KEY
            const urlUbicacion = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=${1}&appid=${appKey}
            `;
            const {data} = await axios(urlUbicacion)
            const {lat, lon} = data[0];
            
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}
            ` ;
            const {data:clima} = await axios(urlClima)
            setResultado(clima)

        } catch (error) {
            setNoResultado('No hay resultados')
        } finally{
            setCargando(false)
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                resultado,
                cargando,
                noResultado
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext