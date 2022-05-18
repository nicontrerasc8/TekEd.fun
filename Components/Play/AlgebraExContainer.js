import React, { useEffect, useState } from 'react';
import InputArea from './InputArea';
import useKeypress from "react-use-keypress"
import FeedBack from './FeedBack';
import UseUserContext from '../../Lib/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFire, faTimes } from '@fortawesome/free-solid-svg-icons';

const Input = ({x, y, Refe, isOut}) => {
    return <input 
               className={isOut ? "display-none": null} 
               maxLength="1" 
               ref={Refe} 
               min={0}
               type={"number"}
               autoComplete="off" 
               placeholder="-" 
               value={x} 
               onChange={(e) => y(e.target.value)}/>
}

const ExerciseContainer = ({
     FinalResult,
     FirstValue,
     SecondValue,
     Operator,
     Next,
     IsExam = false,
     FinishedExam,
}) => {

    const [Value, setValue] = useState("")
    const [Value2, setValue2] = useState("")
    const [Value3, setValue3] = useState("")
    const [Value4, setValue4] = useState("")
    const [Value5, setValue5] = useState("")
    const [Value6, setValue6] = useState("")
    const [Value7, setValue7] = useState("")
    const [Value8, setValue8] = useState("")
    const [Value9, setValue9] = useState("")
    const [Value10, setValue10] = useState("")
    const [Value11, setValue11] = useState("")
    const [Value12, setValue12] = useState("")
    const [Aux, setAux] = useState("")
    const [IsCorrect, setIsCorrect] = useState(false);
    const [IsFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const { CorrectAnswers,
            WrongAnswers,
            Streak,
            IncrementCorrect, 
            IncrementWrong, 
            IncrementStreak, 
            ResetStreak, 
            ResetAll } = UseUserContext()


    const SubmitResults = (validation) => {
        setIsCorrect(validation)
        setIsFeedbackVisible(true)
        if(validation) IncrementStreak()
        else ResetStreak()
    }

     const Verify = () => {
          if (Value === "") {
               alert("Escribe tu respuesta para luego comprobarla")
           }else if(isNaN(Value)){
               alert("Escribe un valor numérico")
           }
           else {
               var response
               response = Value8 + Value7 + Value6 + Value5 + Value4 + Value3 + Value2 + Value
               setAux(response)
               SubmitResults(response == FinalResult)
           }
           setValue("")
           setValue2("")
           setValue3("")
           setValue4("")
           setValue5("")
           setValue6("")
           setValue7("")
           setValue8("")
           setValue9("")
           setValue10("")
           setValue11("")
           setValue12("")
     }

     const CloseContainer = () => {
         setIsFeedbackVisible(false)
         if(IsCorrect) IncrementCorrect()
         else IncrementWrong()
        Next(IsCorrect, Aux)
     }

     useKeypress(["Enter"],(event) => {
          if(event.key === "Enter"){
              Verify()
          }
      })

      useEffect(() => {
        if(IsExam) ResetAll()
      }, [IsExam])
      

  return <div className='exercise-container'>
      <FeedBack isAlgebra visible={IsFeedbackVisible} v1={FirstValue} v2={SecondValue} operator={Operator} close={CloseContainer} wasCorrect={IsCorrect} answer={FinalResult}/>
       {
        <div className='score'>
           <span className='fire'>
               <FontAwesomeIcon icon={faFire}/> {Streak} 
           </span>
           <span className='green'>
               <FontAwesomeIcon icon={faCheck}/> {CorrectAnswers}
           </span>
           <span className='red'>
               <FontAwesomeIcon icon={faTimes}/> {WrongAnswers}
           </span>
      </div>
       }
       <div className='exercise'>
          <h2>{FirstValue}x = {SecondValue}</h2>
       </div>
          <div className='input-area'>
          x = &#160;<input placeholder='-' value={Value} onChange={(e) => setValue(e.target.value)}/>
          </div>
       <button className='btn-tertiary' onClick={Verify}>
            {IsExam ? FinishedExam ? "Enviar exámen" : "Siguiente pregunta" : "Comprobar"}
       </button>
  </div>
};

export default ExerciseContainer;
