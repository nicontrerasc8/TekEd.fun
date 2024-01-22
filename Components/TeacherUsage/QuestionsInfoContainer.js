import { faArrowLeft, faCheck, faChevronCircleRight, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DropInFromLeft } from '../../Animations'
import { Mensajes } from '../../Lib/arrays'
import BackDrop from '../VisualComponents/BackDrop'
import Counter from '../Utils/Counter'
import parse from "html-react-parser"
import { FaTrash } from 'react-icons/fa'

const QuestionsInformsContainer = ({IsIn, Data, Out, Eliminate}) => {

     const [Question, setQuestion] = useState(0)
     const [Arr, setArr] = useState([])

     const PreviousQuestion = () => {
          if(Question > 0) setQuestion(Question-1)
     }
     const NextQuestion = () => {
          if(IsIn && Question < Data.length - 1) setQuestion(Question+1)
     }

     const EliminateQuestion = (e) => {
          if(window.confirm("Estás seguro(a) que quieres eliminar esta pregunta?")){
               Eliminate(e)
          if(Data.length < 1) Out()
          if(Question) setQuestion(Question -1)
          else setQuestion(0)
          }
     }

     useEffect(() => {
          console.log(Data)
       setArr(Data)
       if(!Data.length) Out()
     }, [Data, ])
     
     

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
          {
               Arr.length > 0 && <div className='question-results'>
               <h4>
                 Pregunta #{Question+1}
               </h4>
               {parse(Arr[Question].htmlContent)}
               <div className='grid-alternative-button'>
               {
                    Arr[Question].ArrOfOptions.length && Arr[Question].ArrOfOptions.map((info, idx) => {
                    return <span key={idx}className={info.c}>
                         {info.n}
                    </span>
                    })
               }
               </div>
          </div>
          }

              <div className='informs-buttons'>
              <button onClick={PreviousQuestion}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
               </button>
               <button onClick={NextQuestion}>
                    <FontAwesomeIcon icon={faChevronRight}/>
               </button>
              </div>
              <button onClick={() => EliminateQuestion(Data)} className="btn-red">
               <FaTrash/> Eliminar pregunta
              </button>
       </motion.div>
  </BackDrop>
  )
}

export default QuestionsInformsContainer