import React from 'react'
import useClima from '../hooks/useClima'
const Resultado = () => {
    const {resultado} = useClima()
    const {name, main} = resultado

    const kalvin = 273.15

    return (
        <div className='contenedor clima'>
            <h2>El clima de {resultado.name} es: </h2>
            <p>
                { parseInt(main.temp - kalvin)} <span>&#x2103;</span>
            </p>
            <div className='temp_min_max'>
                <p>
                    Minima: { parseInt(main.temp_min - kalvin)} <span>&#x2103;</span>
                </p>
                <p>
                    Maxima: { parseInt(main.temp_max - kalvin)} <span>&#x2103;</span>
                </p>
            </div>
        </div>
    )
}

export default Resultado
