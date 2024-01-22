import RandomicOptionSet from "../RandomicOptionSet"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Dificultades } from "../../../Lib/arrays"
import AutomateQuestion from "./AutomateQuestion"

const CreateSRMD = ({type, SetNew, NewQuestion, NewQuestions, Open, ResetFN}) => {

    const [FirstNum, setFirstNum] = useState("")
    const [SecondNum, setSecondNum] = useState("")
    const [HTML, setHTML] = useState("")
    const [CorrectAns, setCorrectAns] = useState(undefined)

    useEffect(() => {
      setFirstNum("")
      setSecondNum("")
      setHTML("")
      setCorrectAns(undefined)
    }, [type])

    
    

    const SendFN = () => {
      if(isNaN(parseFloat(SecondNum)) || isNaN(parseFloat(FirstNum))) {
        window.alert("Ingresa valores numéricos")
        return
      }
      console.log(type.symbol)
      Open()
      console.log("si")
        var html = `<div class="exercise-container">
        <div class='exercise'>
        <h2>${FirstNum}</h2>
        <h2>${type.symbol} ${SecondNum}</h2>
     </div>
        </div>`
        setHTML(html)

        switch (type.cat) {
          case 'Sumas':
            setCorrectAns(parseFloat(FirstNum) + parseFloat(SecondNum) )
            break;
          case 'Restas':
            setCorrectAns(parseFloat(FirstNum) - parseFloat(SecondNum))
            console.log
            break;
          case 'Multiplicaciones':
            setCorrectAns(parseFloat(FirstNum) * parseFloat(SecondNum))
            break;
          case 'Divisiones':
            setCorrectAns(parseFloat(FirstNum) / parseFloat(SecondNum))
            break;
          default:
            break;
        }
    }
    const Reset = () => {
      setFirstNum("")
      setSecondNum("")
      setHTML("")
      setCorrectAns(undefined)
      ResetFN() 
    }

    const SubmitQuestion = (e, t) => {
      var arr = {
        tema: type.cat,
        htmlContent: HTML,
        ArrOfOptions: e,
        correct: CorrectAns,
        time: t
      }
      toast.success("¡La pregunta fue añadida al exámen!")
      NewQuestion(arr)
      SetNew()
      Reset()
    }


    return (
      CorrectAns != undefined ? <RandomicOptionSet correct={CorrectAns}  Add={(e, t) => SubmitQuestion(e, t)}  HTML={HTML} Change={Reset}/>
      : <>
      <article>
        <AutomateQuestion type={type} AddQuestions={NewQuestions}/>
        <h5>O generalas por tu cuenta</h5>
      </article>
          <article className='srmd'>
        <input value={FirstNum} onChange={(e) => setFirstNum(e.target.value)}/>
        {type.symbol}
        <input value={SecondNum} onChange={(e) => setSecondNum(e.target.value)}/>
    </article>
    <button onClick={SendFN} className="btn-tertiary">
        {HTML == "" ? " Generar pregunta" : "Editar pregunta"}
  </button>
        </>
    )
}

export default CreateSRMD