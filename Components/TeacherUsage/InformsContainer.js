import { faArrowLeft, faCheck, faChevronCircleRight, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DropInFromLeft } from '../../Animations'
import { Mensajes } from '../../Lib/arrays'
import BackDrop from '../VisualComponents/BackDrop'
import Counter from '../Utils/Counter'

const InformsContainer = ({IsIn, Data, Out, IsTeacher = true, IsFigures = false}) => {

     const [Total, setTotal] = useState(0)
     const [Correct, setCorrect] = useState(0)
     const [User, setUser] = useState('')
     const [Question, setQuestion] = useState(0)
     const [Message, setMessage] = useState('¡Felicidades!')

     const PreviousQuestion = () => {
          if(Question > 0) setQuestion(Question-1)
     }
     const NextQuestion = () => {
          if(IsIn && Question < Data.Respuestas.length - 1) setQuestion(Question+1)
          
     }

     useEffect(() => {
          setQuestion(0)
          if(IsIn){
               var c = 0
               var t = 0
               for (let i = 0; i < Data.Respuestas.length; i++) {
                    if(Data.Respuestas[i].correct) ++c
                    ++t                 
               }
               setUser(Data.User)
               setTotal(t)
               setCorrect(c)
          }
     }, [Data, IsIn])


     useEffect(() => {
       var randomN = Math.floor(Math.random() * (4));
       setMessage(Mensajes[randomN])
     }, [Question])
     

  return (
       <BackDrop onClick={Out} isOn={IsIn}>
       <motion.div 
          className='informs' 
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromLeft}
          initial="hidden"
          animate="visible"
          exit="exit"
       >
            {/* Meterle un onclick out */}
            <h4>{User}</h4>
            <h6>Puntuación: <strong className={(Correct / Total) * 100 <= 55 ? 'red' : ((Correct / Total) * 100 > 80 ? 'green' : undefined)}>
                    {Correct} 
               </strong>/{Total}
            </h6>
          {
               Data != null && Data.Respuestas.length > 0 && <div className='question-results'>
               <h4>
                 Pregunta #{Question+1}
               </h4>
             {IsFigures ? 
              <h3>{Data.Respuestas[Question].text}</h3> : 
             <h1>{Data.Respuestas[Question].v1} {Data.Respuestas[Question].operador} {Data.Respuestas[Question].v2}</h1>}
               <p>{IsTeacher ? "Respuesta del alumno" : "Tu respuesta"}: 
                    <br/>
                    <strong className={Data.Respuestas[Question].correct ? 'green' : "red"}>
                    <FontAwesomeIcon icon={Data.Respuestas[Question].correct ? faCheck : faTimes}/> {Data.Respuestas[Question].respuesta}</strong></p>
               {
                    IsTeacher ? !Data.Respuestas[Question].correct && <p>
                         Respuesta correcta: 
                         <br/>
                         <strong>
                              {Data.Respuestas[Question].resultado}
                         </strong>
                    </p> : 
                    Data.Respuestas[Question].correct ? <h2 className='green'>¡{Message}!</h2> :
                    <p>Respuesta correcta: 
                    <br/>
                    <strong>
                         {Data.Respuestas[Question].resultado}
                    </strong>
                    </p>
               }
          </div>
          }
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

export default InformsContainer