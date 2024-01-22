import RandomicOptionSet from "../RandomicOptionSet"
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import ChooseCategoryGameType from "./ChooseCatGameType"
import AutomateQuestion from "./AutomateQuestion"

const Unidades = [
  "Metro", "Kilometro", "Centimetro", 
]

const Categories = [
    {
      cat: "Círculo",
      n: 0
    },
    {
      cat: "Triángulo",
      n: 1
    }, 
    {
      cat: "Cuadrado",
      n: 2
    },
    {
      cat: "Rectángulo",
      n: 3
    },
  ]



const CreateAP = ({type, SetNew, NewQuestion, NewQuestions, ResetFN}) => {

    const [FirstNum, setFirstNum] = useState("")
    const [SecondNum, setSecondNum] = useState("")
    const [ThirdNum, setThirdNum] = useState("")
    const [Unidad, setUnidad] = useState("Metro")
    const [HTML, setHTML] = useState("")
    const [CorrectAns, setCorrectAns] = useState(undefined)
    const [GameType, setGameType] = useState({
      cat: "Cuadrado",
      n: 2
      })
    


    useEffect(() => {
      setFirstNum("")
      setSecondNum("")
      console.log(parseFloat(20))
      setHTML("")
      setCorrectAns(undefined)
    }, [type])

    
    

    const SendFN = () => {
        var html 
        if(isNaN(parseFloat(FirstNum))) {
          window.alert("Ingresa un valor numérico")
          return
        }
        switch (GameType.n) {
          case 0:
            html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un círculo de ${FirstNum} ${Unidad.toLowerCase()}${Unidad.length > 1 && "s"} de radio?</h2>`
            if(type.cat == "Área") setCorrectAns(Math.pow(parseFloat(FirstNum), 2) * 3.14)
            else setCorrectAns(parseFloat(FirstNum) * 2 * 3.14)
            break;
          case 1:
            if(isNaN(parseFloat(SecondNum))) {
              window.alert("Ingresa un valor numérico")
              return
            }
            if(type.cat == "Área"){
              html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un triángulo rectángulo de ${FirstNum} ${Unidad.toLowerCase()}${FirstNum > 1 && "s"} de base y ${SecondNum} ${Unidad}${SecondNum > 1 && "s"} de altura?</h2>`
              setCorrectAns(parseFloat(FirstNum) * parseFloat(SecondNum) / 2)
            } 
            else {
              `<h2 class='top-h2'>¿Cuál es el perimetro del triángulo?</h2>`
              setCorrectAns(parseFloat(FirstNum) + parseFloat(SecondNum) + parseFloat(ThirdNum))
            }
            break;
          case 2:
            html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un cuadrado cuyos lados miden ${FirstNum} ${Unidad.toLowerCase()}${FirstNum > 1 && "s"}?</h2>`
            if(type.cat == "Área") setCorrectAns(Math.pow(parseFloat(FirstNum),2))
            else setCorrectAns(parseFloat(FirstNum) * 4)
            break;
          case 3: 
          if(isNaN(parseFloat(SecondNum))) {
            window.alert("Ingresa un valor numérico")
            return
          }
          html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un rectángulo cuyos lados miden ${FirstNum} ${Unidad.toLowerCase()}${FirstNum > 1 && "s"} y ${SecondNum} ${Unidad.toLowerCase()}${SecondNum > 1 && "s"}?</h2>`
            if(type.cat == "Área") setCorrectAns(parseFloat(FirstNum) * parseFloat(SecondNum))
            else setCorrectAns(parseFloat(FirstNum) * 2 + parseFloat(SecondNum) * 2)
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
      var arr = {
        tema: type.cat,
        htmlContent: HTML,
        ArrOfOptions: e,
        correct: CorrectAns,
        data: {
          type: GameType,
          f1: FirstNum,
          f2: SecondNum,
          f3: ThirdNum
        },
        time: t
      }
      toast.success("¡La pregunta fue añadida al exámen!")
      NewQuestion(arr)
      SetNew()
      Reset()
    }

    useEffect(() => {
      console.log(GameType, type)
    }, [GameType])
    


    return (
      CorrectAns != undefined ? 
      <RandomicOptionSet 
        isCanvas
        type={GameType.cat}
        f1={FirstNum}
        f2={SecondNum}
        f3={ThirdNum}
        type2={type.cat}
       correct={CorrectAns} 
       Add={(e, t) => SubmitQuestion(e, t)} 
       HTML={HTML} 
       Change={Reset}/>
      : <>
        <AutomateQuestion type={type} AddQuestions={NewQuestions}/>
        <h5 style={{marginBottom: "calc(2vh + 10px)"}}>O generalas por tu cuenta</h5>
        <div className="exam-main-div">
        <h4>Elige el tipo de figura</h4>
        <ChooseCategoryGameType Actual={GameType} Change={(e) => setGameType(e)} Array={Categories}/>
        <p>{((GameType.n == 1 && type.cat === "Área") || GameType.n == 3)  ? "Escribe el valor de la base" : GameType.n == 0 ? "Escribe el valor del radio" : GameType.n == 1 ? "Escribe el valor del primer lado" : "Escribe el valor de un lado"}</p>
        <input value={FirstNum} onChange={(e) => setFirstNum(e.target.value)}/>
        {
             ((GameType.n === 1 && type.cat === "Área") || GameType.n === 3) &&
            <>
                <p>Escribe el valor de la altura</p>
                <input value={SecondNum} onChange={(e) => setSecondNum(e.target.value)}/>
            </>
        }
        {
          (GameType.n === 1 && type.cat === "Perimetro") && 
          <>
              <p>Escribe el valor del segundo lado</p>
              <input value={SecondNum} onChange={(e) => setSecondNum(e.target.value)}/>
              <p>Escribe el valor del tercer lado</p>
              <input value={ThirdNum} onChange={(e) => setThirdNum(e.target.value)}/>
          </>
        }
        <p style={{marginBottom: "calc(1vh + 5px)"}}>Unidad de la operación</p>
        <ChooseCategoryGameType Actual={Unidad} Change={(e) => setUnidad(e)} Array={Unidades}/>

        
    <button style={{marginTop: "calc(2vh + 5px)"}} onClick={SendFN} className="btn-tertiary">
        {HTML == "" ? " Generar pregunta" : "Editar pregunta"}
  </button>
        </div>
      </>
    )
}

export default CreateAP