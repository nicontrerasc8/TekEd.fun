import { faArrowLeft, faCheck, faChevronCircleRight, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import {FaCheck, FaTimes} from "react-icons/fa"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DropInFromLeft } from '../../Animations'
import { Mensajes } from '../../Lib/arrays'
import BackDrop from '../VisualComponents/BackDrop'
import parse from "html-react-parser"

const InfCont = ({IsIn, Data, Out, Exam, IsTeacher = true}) => {

     const [Question, setQuestion] = useState(0)
     const [Message, setMessage] = useState('¡Felicidades!')

     const PreviousQuestion = () => {
          if(Question > 0) setQuestion(Question-1)
     }
     const NextQuestion = () => {
          console.log(Data.r)
          if(IsIn && Question < Data.r.length - 1) setQuestion(Question+1)
          
     }



     useEffect(() => {
       var randomN = Math.floor(Math.random() * (4));
       setMessage(Mensajes[randomN])
     }, [Question])

     useEffect(() => {
       setQuestion(0)
     }, [Data, ])
     

     

  return (
       <BackDrop onClick={Out} isOn={IsIn}>
       <motion.div 
          className='informs teacher-info' 
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromLeft}
          initial="hidden"
          animate="visible"
          exit="exit"
       >
          <h6>Pregunta <span className='green'>#{Question + 1}</span></h6>
            {
               Exam &&
               parse(Exam.questions[Question].htmlContent)
            }
            {
               Data.r[Question].correcta ?
               <span className='green info-icon'><FaCheck/></span>
               : <span className='red info-icon'><FaTimes/></span>
            }
            <p>Respuesta correcta: <span className='green'>{Exam.questions[Question].correct}</span></p>
            {Data.r && <p>Respuesta {IsTeacher ? "del estudiante" : "dada"}: <span className={Data.r[Question].correcta ? "green" : "red"}>{Data.r[Question].respuesta}</span></p>}
          <div className='buttons'>
               <button className='btn-primary' onClick={PreviousQuestion}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
               </button>
               <button className='btn-secondary' onClick={NextQuestion}>
                    <FontAwesomeIcon icon={faChevronRight}/>
               </button>
          </div>
       </motion.div>
  </BackDrop>
  )
}

export default InfCont