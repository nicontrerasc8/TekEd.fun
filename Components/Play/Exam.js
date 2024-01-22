import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { auth, firestore } from '../../Lib/firebase';
import ExerciseContainer from "./ExerciseContainer"
import toast from 'react-hot-toast';
import UseUserContext from '../../Lib/context';
import InformsContainer from '../TeacherUsage/InformsContainer';

const Exam = ({Data, IsClass}) => {

     const [Counter, setCounter] = useState(0)
     const [V1, setV1] = useState(Number);
     const [V2, setV2] = useState(Number);
     const [Timer, setTimer] = useState(3202002320)
     const [Operador, setOperador] = useState("");
     const [Result, setResult] = useState(0);
     const [Finished, setFinished] = useState(false)
     const [ShowResults, setShowResults] = useState(false)
     const [Options, setOptions] = useState([])
     const [ArrayResponse, setArrayResponse] = useState([])
     const { user, UserName, TurnOnLoading, TurnOffLoading, setIsTimerOn } = UseUserContext()
     const [FinalArray, setFinalArray] = useState({
          Respuestas: [],
          User: undefined,
     })


     const NextQuestion = (WasCorrect, Answer) => {
          
          setArrayResponse(ArrayResponse => [...ArrayResponse, {
               v1: V1,
               v2: V2,
               correct: WasCorrect,
               operador: Operador,
               resultado: Result,
               respuesta: Answer
          }])

          /* mandar todo a que se genere un array como el que se manda en el examen original */

          if(Counter+1 < Data.preguntas.length) {
               setCounter(Counter +1)
               setIsTimerOn(false)
          }
          else {
               setIsTimerOn(false)
               Send(WasCorrect, Answer)
               setFinished(true) 
          }
     }

     const Send = async(WasCorrect, Answer) => {
          var AuxResponse = ArrayResponse
          AuxResponse.push({
               v1: V1,
               v2: V2,
               correct: WasCorrect,
               operador: Operador,
               resultado: Result,
               respuesta: Answer
          })
          setFinalArray({
               User: UserName,
               Respuestas: AuxResponse
          })

         if(IsClass){
          var AuxArr = [
               {
                    User: UserName,
                    UserID: user.uid,
                    Respuestas: AuxResponse
               }
          ]

          const ResponseDoc = firestore.doc(`examenes/${Data.uniqueExamID}`);
          const batch = firestore.batch();
          batch.set(ResponseDoc, { 
               respuestas: AuxArr
          },
          {merge: true});
          TurnOnLoading()
           await batch.commit()
           toast.success("Listo, ya enviaste tu exámen.")
           TurnOffLoading()
         }
         console.log("Exam")
     }
     useEffect(() => {
          if(Finished) setIsTimerOn(false)
     }, [Finished])

     useEffect(() => {
          console.log(Data.Operador)
          if(Counter < Data.preguntas.length){
               var v1 = Data.preguntas[Counter].value1
               var v2 = Data.preguntas[Counter].value2
               var time = Data.preguntas[Counter].timePerQuestion
               var OptionsArr = Data.preguntas[Counter].options

          if(Data.Operador == "sumas" || Data.Operador == "Sumas") {
               setOperador("+")
               setResult(v1 + v2)
          }
          else if(Data.Operador == "restas" || Data.Operador == "Restas") {
               setOperador("-")
               setResult(v1 - v2)
          }
          else if(Data.Operador == "multiplicaciones" || Data.Operador == "Multiplicaciones") {
               setOperador("✕")
               setResult(v1 * v2)
          }
          else if(Data.Operador == "divisiones" || Data.Operador == "Divisiones"){
               setOperador("÷")
               setResult(v1 / v2)
          }
          setV1(v1)
          setV2(v2)
          setTimer(time)
          setOptions(OptionsArr)
          }
     }, [Counter, Data])     
     

  return <>
     {
          Finished ? <> 
          <InformsContainer IsTeacher={false} IsIn={ShowResults} Data={FinalArray} Out={() => setShowResults(false)} IsPlay={!IsClass}/>
          <div className='finished-exam'>
          <h1>¡Listo!, ya terminaste</h1>
          <button className='btn-tertiary' onClick={() => setShowResults(true)}>
               Mostrar resultados
          </button>
          <Link href={IsClass ? `/clases/${Data.ClassID}` : "/jugar"}>
               <button className='btn-tertiary'>
               {IsClass ? "Volver a la clase" : "Volver al inicio"}
               </button>
          </Link>
       </div></> : <> 
          <h3 className='question-number'>Pregunta <span className='blue'>#{Counter+1}</span> de <span className='green'>{Data.preguntas.length}</span></h3>
        <ExerciseContainer 
               IsExam={true}
               Operator={<span>{Operador}</span>} 
               FirstValue={V1} 
               SecondValue={V2} 
               Timer={Timer}
               TotalLength={Data.preguntas.length}
               Current={Counter}
               Options={Options}
               FinalResult={Result} 
               Next={NextQuestion}
               FinishedExam={Finished}
               /> </>
     }
  </>
}

export default Exam