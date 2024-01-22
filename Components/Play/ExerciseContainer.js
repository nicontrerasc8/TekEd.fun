import React, { useEffect, useState } from 'react';
import InputArea from './InputArea';
import useKeypress from "react-use-keypress"
import FeedBack from './FeedBack';
import UseUserContext from '../../Lib/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faFire, faTimes } from '@fortawesome/free-solid-svg-icons';
import TimerComponent from '../Timer';

const ExerciseContainer = ({
     FinalResult,
     FirstValue,
     SecondValue,
     Timer,
     Operator,
     Next,
     Options,
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
    const [TimePerQuestion, setTimePerQuestion] = useState(300229)
    const [TimerRunning, setTimerRunning] = useState(false)
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
            ResetAll,
            IsTimerOn, 
            setIsTimerOn } = UseUserContext()


    const SubmitResults = (validation) => {
        setIsCorrect(validation)
        setIsFeedbackVisible(true)
        if(validation) IncrementStreak()
        else ResetStreak()
        setTimePerQuestion(0)
    }

    const SubmitedAnswer = (v) => {
        setAux(v)
        SubmitResults(v == FinalResult)
        setIsTimerOn(false)
        setTimePerQuestion(Timer)
    }


     const CloseContainer = () => {
         setIsFeedbackVisible(false)
         if(IsCorrect) IncrementCorrect()
         else IncrementWrong()
        Next(IsCorrect, Aux)
        setIsTimerOn(true)
     }


      useEffect(() => {
        if(IsExam) ResetAll()
      }, [IsExam])


      useEffect(() => {
        setTimePerQuestion(Timer)
        if(Timer > 0) setIsTimerOn(true)
        else setIsTimerOn(false)
      }, [Timer])
      

  return <>
  <TimerComponent max={TimePerQuestion} isOn={IsTimerOn} Next={SubmitedAnswer}/>
  <div className='exercise-container'>
      <FeedBack visible={IsFeedbackVisible} v1={FirstValue} v2={SecondValue} operator={Operator} close={CloseContainer} wasCorrect={IsCorrect} answer={FinalResult}/>
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
          <h2>{FirstValue}</h2>
          <h2>{Operator} {SecondValue}</h2>
       </div>
       <div className='grid-alternative-button v2'>
       {
            Options.length && Options.map((info, idx) => {
                return <span key={idx} onClick={() => SubmitedAnswer(info)}>
                    {info}
                </span>
            })
       }
       </div>
       {/* <InputArea 
          val={FinalResult}
          x1={Value}
          x2={Value2}
          x3={Value3}
          x4={Value4}
          x5={Value5}
          x6={Value6}
          x7={Value7}
          x8={Value8}
          x9={Value9}
          x10={Value10}
          x11={Value11}
          x12={Value12}
          y1={setValue}
          y2={setValue2}
          y3={setValue3}
          y4={setValue4}
          y5={setValue5}
          y6={setValue6}
          y7={setValue7}
          y8={setValue8}
          y9={setValue9}
          y10={setValue10}
          y11={setValue11}
          y12={setValue12}
       /> */}
       {/* <button className='btn-tertiary' onClick={Verify}>
            {IsExam ? FinishedExam ? "Enviar exámen" : "Siguiente pregunta" : "Comprobar"}
       </button> */}
  </div>
  </>
};

export default ExerciseContainer;
