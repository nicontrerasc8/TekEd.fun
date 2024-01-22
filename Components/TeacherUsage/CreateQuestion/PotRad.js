import RandomicOptionSet from "../RandomicOptionSet"
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Counter from "../../Utils/Counter"
import AutomateQuestion from "./AutomateQuestion"


const CreatePR = ({type, SetNew, NewQuestion, NewQuestions, ResetFN}) => {

    const [FirstNum, setFirstNum] = useState("")
    const [SecondNum, setSecondNum] = useState("2")
    const [ThirdNum, setThirdNum] = useState("")
    const [Unidad, setUnidad] = useState("Metro")
    const [HTML, setHTML] = useState("")
    const [CorrectAns, setCorrectAns] = useState(undefined)


    useEffect(() => {
      setFirstNum("")
      setSecondNum("")
      setHTML("")
      setCorrectAns(undefined)
    }, [type])

    
    

    const SendFN = () => {
        var html 
        console.log(type.cat)
        if(isNaN(parseFloat(FirstNum)) || SecondNum < 2 || SecondNum > 4) {
          window.alert("Ingresa un valor numérico")
          return
        }
        switch (type.cat) {
          case 'Potenciación':
            var text = ""
            switch (SecondNum) {
              case 2:
                text = "l cuadrado"
                break;
              case 3: 
                text = "l cubo"
                break;
              case 4:
                text = " la cuarta"
                break
              default:
                break;
            }
            html = `<h2 class='top-h2'>¿Cuánto es ${FirstNum} a${text}?</h2>`
            setCorrectAns(Math.pow(FirstNum, SecondNum))
            break;
          case 'Radicación':
            var text = ""
            switch (SecondNum) {
              case 2:
                text = "cuadrada"
                break;
              case 3: 
                text = "cubica"
                break;
              case 4:
                text = "cuarta"
                break
              default:
                break;
            }
            html = `<h2 class='top-h2'>¿Cuál es la raíz ${text} de ${FirstNum}</h2>`
            var ans = Math.pow(FirstNum, 1/SecondNum)
            var aux = Math.pow(FirstNum, 1/SecondNum)
            if(ans.toFixed(2) != aux) ans = aux.toFixed(2) 
            setCorrectAns(ans)
            break;
          default:
            break;
        }

        setHTML(html)
      }

     
    const Reset = () => {
      setFirstNum("")
      setSecondNum("")
      setHTML("")
      setCorrectAns(undefined)
      ResetFN() 
    }

    const SubmitQuestion = (e, t) => {
      console.log(e, t)
      console.log()
      var arr = {
        tema: type.cat,
        htmlContent: HTML,
        ArrOfOptions: e,
        correct: CorrectAns,
        data: {
          f1: FirstNum,
          f2: SecondNum,
        },
        time: t
      }
      toast.success("¡La pregunta fue añadida al exámen!")
      NewQuestion(arr)
      SetNew()
      Reset()
    }

    


    return (
      CorrectAns != undefined ? 
      <RandomicOptionSet 
        isCanvas={type.cat == "Radicación"}
        type={type.cat}
        f1={FirstNum}
        f2={SecondNum}
        f3={ThirdNum}
        type2={type.cat}
       correct={CorrectAns} 
       Add={(e, t) => SubmitQuestion(e, t)} 
       HTML={HTML} 
       Change={Reset}/>
      : <div className="exam-main-div">
        <AutomateQuestion type={type} AddQuestions={NewQuestions}/>
        <p>Escribe el valor del número</p>
        <input value={FirstNum} onChange={(e) => setFirstNum(e.target.value)}/>
              <p>Escribe el valor de la potencia</p>
              <Counter x={SecondNum} setX={setSecondNum} dif={1} min={2} max={4}/>

        
    <button style={{marginTop: "calc(2vh + 5px)"}} onClick={SendFN} className="btn-tertiary">
        {HTML == "" ? "Generar pregunta" : "Editar pregunta"}
  </button>
        </div>
    )
}

export default CreatePR