import { faChalkboard, faMeteor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const StudentDashBoard = () => {
    return <>
        <div>
            <FontAwesomeIcon icon={faMeteor}/>
            <h2>Juega y practica</h2>
            <p>Elige entre las 3 categorias y diviérte.</p>
            <button className='btn-secondary'>
               Jugar
            </button>
         </div>
         <div>
            <FontAwesomeIcon icon={faChalkboard}/>
            <h2>Únete a una clase</h2>
            <p>Pídele a tu profe el código de la clase e ingresa</p>
            <input placeholder='Código de la clase'/>
         </div>
    </>
}

export default StudentDashBoard
