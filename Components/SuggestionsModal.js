import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackDrop from './BackDrop'

const DropInFromLeft = {
    hidden: {
        x: "-100vw",
        transform: ""
    },
    visible: {
        x: 0,
        opacity: 1,
        transition:{
            duration:.2,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    }, 
    exit: {
        x: "100vw"
    }
}

const SuggestionsModal = ({handleClose, visible}) => {

    const [School, setSchool] = useState("")
    const [Ciudad, setCiudad] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")

    return <BackDrop onClick={handleClose} isOn={visible}>
        <motion.div 
            className='suggestions-container' 
            onClick={(e) => e.stopPropagation()}
            variants={DropInFromLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <h3>¡Llena el formulario para contactarnos con tu cole!</h3>
            <input placeholder='Nombre del colegio'/>
            <input placeholder='Provincia'/>
            <input placeholder='Teléfono del colegio'/>
        </motion.div>
    </BackDrop>
}

export default SuggestionsModal
