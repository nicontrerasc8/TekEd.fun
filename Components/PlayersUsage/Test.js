import { MathJax, MathJaxContext } from 'better-react-mathjax'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import UseUserContext from '../../Lib/context'
import FeedBack from '../Play/FeedBack'
import Potencia from '../Play/Potencia'
import InformsContainer from '../TeacherUsage/InformsContainer'
import TimerComponent from '../Timer'
import TestParams from './TestParams'

const Test = ({
                SetArrFn, 
                CanvasFn, 
                IsPot = false, 
                IsCircle, 
                CanvasRef, 
                Theme, 
                operator, 
                IncrementCounter,
                Table = false
              }) => {
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
      if(!cifras && (operator != "radicacion" && operator != "potenciacion")){
        toast.error("Selecciona el nivel")
        return
      }
      if(Number(time) > 0){
        setTime(time)
        setSetLevel(false)
        setTimerRunning(true)
        setArrayOfQuestions(SetArrFn(cifras))
      }
      else toast.error("El tiempo debe ser mayor a 0 segundos")
     }

     const SetCanvasDimensions = () => {
          if(window !== undefined){
            if(window.innerWidth > 850) {
              setInnerWidth(window.innerWidth/4)
              setInnerHeight(window.innerWidth/4)
            }
            else {
              setInnerWidth(window.innerWidth * 0.9)
              setInnerHeight(window.innerWidth* .9)
            } 
          }
          if(Question < 7 && ArrayOfQuestions.length) CanvasFn(InnerWidth, InnerHeight) 
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
          if(Question-1 < 7){
            setQuestion(Question+1)
            IncrementCounter()
          } 
          if(Question < 7-1) setArrayResponse(ArrayResponse => [...ArrayResponse, Arr])
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
          if(Question < 7 - 1)setTimerRunning(true)
          
        }
        useEffect(() => {
          console.log(ArrayOfQuestions)
          if(window !== undefined){
            SetCanvasDimensions()
          window.addEventListener('resize', SetCanvasDimensions)
          }
        }, [ArrayOfQuestions, IsLightTheme, Question, ])

     return <>
                        <TimerComponent max={TimeQ} isOn={TimerRunning} Next={() => CheckAnswer(-1)}/>
                        <div className='play-page'>
                            <TestParams IsIn={SetLevel} Submit={SetTestParameters} IsNotRadix={operator != "radicacion"}/>
                            {ArrayOfQuestions.length && 
                              Question < 7 && 
                              <FeedBack close={Next} 
                                        visible={feedBackOn} 
                                        wasCorrect={IsCorrect} 
                                        feedText={
                                          <span style={{fontSize: "calc(1vmax + 5px)"}}>La respuesta es: {ArrayOfQuestions[Question].result} {ArrayOfQuestions[Question].unidad} 
                                          {
                                            Theme === 1 && operator == "area" && 
                                            <strong>
                                              &nbsp;cuadrad{ArrayOfQuestions[Question].unidad == "pulgadas" ? 'a' : 'o'}s
                                            </strong>
                                          }
                                          </span>}/>
                              }
                      {
                        Question < 7 ? <>
                        <p className='header'>Pregunta <span className='green'>#{Question+1}</span></p>
                        {ArrayOfQuestions.length > 0 && <h2>{ArrayOfQuestions[Question].text}</h2>}
                        {
                          Table && ArrayOfQuestions.length && <div className='data-table'>
                            {
                            ArrayOfQuestions[Question].dataSet.map((data, idx) =>{
                                return <span key={idx}>{data}</span>
                              })
                            }
                          </div>
                        }
                        {IsCircle && <p>Para hallar la respuesta, usa: Pi = 3.14</p>}
                        <canvas ref={CanvasRef} width={InnerWidth} height={InnerHeight} className={IsPot || Theme === 3 ? "display-none" : "figures-canva"}/> 
                        {IsPot && ArrayOfQuestions.length &&
                        ArrayOfQuestions.map((data,idx) => {
                          if(idx === Question)return <div key={idx} className='exponencial'>
                              <Potencia num={data.num} exp={data.exp}/>
                            </div>
                        })}
                        <p className='selectAnswer'>Selecciona la respuesta correcta</p>
                        <div className='grid-alternative-button v2'>
                        {
                          ArrayOfQuestions.length > 0 && ArrayOfQuestions[Question].opciones.map((data, idx) => {
                            return <span key={idx} onClick={() => CheckAnswer(data)}>
                              <p>
                              {data} {Theme === 1 && ArrayOfQuestions[Question].unidad} {Theme === 1 && operator == "area" &&
                                <>cuadrad{ArrayOfQuestions[Question].unidad == "pulgadas" ? 'a' : 'o'}s</>
                              }
                              </p>
                            </span>
                          })
                        }
                        </div>
                        </> : 
                        <>
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