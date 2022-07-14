import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UseUserContext from '../../Lib/context'
import FeedBack from '../Play/FeedBack'
import InformsContainer from '../TeacherUsage/InformsContainer'
import TimerComponent from '../Timer'
import TestParams from './TestParams'

/* 
     Temas:
     1 => Figuras
     2 => Potenciación y radicación
*/

const Test = ({SetArrFn, CanvasFn, IsCircle, CanvasRef, Theme, operator, IncrementCounter}) => {
     const {UserName, IsLightTheme, IncrementStreak, ResetStreak} = UseUserContext()
     const [TimerRunning, setTimerRunning] = useState(false)
     const [SetLevel, setSetLevel] = useState(true)
     const [TimeQ, setTime] = useState(10)
     const [feedBackOn, setFeedBackOn] = useState(false)
     const [IsCorrect, setIsCorrect] = useState(false)
     const [ShowResults, setShowResults] = useState(false)
     const [Question, setQuestion] = useState(0)
     const [InnerWidth, setInnerWidth] = useState(400)
     const [InnerHeight, setInnerHeight] = useState(400)
     const [ArrayResponse, setArrayResponse] = useState([])
     const [Selected, setSelected] = useState("")
     const [ArrayOfQuestions, setArrayOfQuestions] = useState([])
     const [FinalArray, setFinalArray] = useState({
          Respuestas: [],
          User: undefined,
     })

     const SetTestParameters = (cifras, time) => {
          setTime(time)
          setSetLevel(false)
          setArrayOfQuestions(SetArrFn(cifras))
     }

     const SetCanvasDimensions = () => {
          if(window.innerWidth > 850) {
            setInnerWidth(window.innerWidth/4)
            setInnerHeight(window.innerWidth/4)
          }
          else {
            setInnerWidth(window.innerWidth * 0.9)
            setInnerHeight(window.innerWidth* .9)
          }
          if(Question < 10 && ArrayOfQuestions.length) CanvasFn(InnerWidth, InnerHeight) 
        }

     const CheckAnswer = (data) => {
          setFeedBackOn(true)
          setTimerRunning(false)
          setSelected(data)
          setIsCorrect(data == ArrayOfQuestions[Question].result)
          if(data == ArrayOfQuestions[Question].result) IncrementStreak()
          else ResetStreak()
        }

     const Next = () => {
          setFeedBackOn(false)
          var Arr = {
            text: ArrayOfQuestions[Question].text,
            correct: IsCorrect,
            respuesta: Selected,
            resultado: ArrayOfQuestions[Question].result,
          }
          if(Question-1 < 10){
            setQuestion(Question+1)
            IncrementCounter()
          } 
          if(Question < 10-1) setArrayResponse(ArrayResponse => [...ArrayResponse, Arr])
          else {
            var Aux = ArrayResponse
            Aux.push(Arr)
            setFinalArray({
              User: UserName,
              Respuestas: ArrayResponse
            })
          }
          SetCanvasDimensions()
          window.scrollTo(0,0)
          if(Question < 10 - 1)setTimerRunning(true)
          
        }
        useEffect(() => {
          SetCanvasDimensions()
          window.addEventListener('resize', SetCanvasDimensions)
        }, [ArrayOfQuestions, IsLightTheme, Question, ])

     return <>
      <TimerComponent max={TimeQ} isOn={TimerRunning} Next={() => CheckAnswer(-1)}/>
      <div className='play-page'>
          <TestParams IsIn={SetLevel} Submit={SetTestParameters}/>
          <TestParams IsIn={SetLevel} Submit={SetTestParameters}/>
    {ArrayOfQuestions.length > 0 && Question < 10 && <FeedBack close={Next} visible={feedBackOn} wasCorrect={IsCorrect} feedText={<span>La respuesta es: {ArrayOfQuestions[Question].result} {ArrayOfQuestions[Question].unidad} cuadrad{ArrayOfQuestions[Question].unidad == "pulgadas" ? 'a' : 'o'}s</span>}/>}
    {
      Question < 10 ? <>
      <p className='header'>Pregunta <span className='green'>#{Question+1}</span></p>
      {ArrayOfQuestions.length > 0 && <h2>{ArrayOfQuestions[Question].text}</h2>}
      {IsCircle && <p style={{marginTop: "10px"}}>Para hallar la respuesta, usa: Pi = 3.14</p>}
      <canvas ref={CanvasRef} width={InnerWidth} height={InnerHeight} className="figures-canva"/>
      <p className='selectAnswer'>Selecciona la alternativa correcta</p>
      <section>
      {
        ArrayOfQuestions.length > 0 && ArrayOfQuestions[Question].opciones.map((data, idx) => {
          return <article key={idx} onClick={() => CheckAnswer(data)}>
            <p>
            {data} {Theme === 1 && ArrayOfQuestions[Question].unidad} {Theme === 1 && operator == "area" &&
              <span>cuadrad{ArrayOfQuestions[Question].unidad == "pulgadas" ? 'a' : 'o'}s</span>
            }
            </p>
          </article>
        })
      }
      </section>
      </> : <>
      <InformsContainer IsFigures IsTeacher={false} IsIn={ShowResults} Data={FinalArray} Out={() => setShowResults(false)}/>
      <div className='finished-exam'>
          <h1>¡Listo!, ya terminaste</h1>
          <button className='btn-tertiary' onClick={() => setShowResults(true)}>
               Mostrar resultados
          </button>
          <Link href={"/jugar"}>
               <button className='btn-tertiary'>
                    Volver al inicio
               </button>
          </Link>
       </div>
      </>
    }
      </div>
     </>
}

export default Test