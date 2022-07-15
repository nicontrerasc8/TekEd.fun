import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Test from '../../../Components/PlayersUsage/Test'
import MetaTags from '../../../Components/Utils/Metatags'
import SetOptions from '../../../Functions/SetTestOptions'
import UseUserContext from '../../../Lib/context'

const PotenciacionRadicacion = () => {

  const router = useRouter()
  const {operator} = router.query
  const [Operator, setOperator] = useState("")
  const [ArrOfQuestions, setArrOfQuestions] = useState({})
  const {IsLightTheme} = UseUserContext()
  const [Cifras, setCifras] = useState(2)
  const [Question, setQuestion] = useState(0)
  const CanvasRef = useRef(null)

  const SetTestParameters = (cifras) => {
    setCifras(cifras)
    var Arr = []
    var rand 

    if(operator == "potenciacion"){
      for (let i = 0; i < 10; i++) {
        rand = Math.floor(Math.random()*3)
        var num = Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1))
        var result = Math.pow(num,2)
        var texto = "¿Cuánto es " + num + " al cuadrado?"
        var aux = {
          num: num,
          result: result,
          text: texto,
          result: result,
          opciones: SetOptions(num, result)
        }
        Arr.push(aux)
      }
      setArrOfQuestions(Arr)
      return Arr
    }

    else if(operator == "radicacion"){
      for (let i = 0; i < 10; i++) {
        rand = Math.floor(Math.random()*3)
        var result = Math.floor(Math.random() * (18) + 2)
        var num = Math.pow(result,2)
        var texto = "¿Cuánto es la raíz cuadrada de " + num + "?"
        var aux = {
          num: num,
          result: result,
          text: texto,
          result: result,
          opciones: SetOptions(num, result)
        }
        Arr.push(aux)
      }
      setArrOfQuestions(Arr)
      return Arr
    }

  }

  const Draw = () => {
    
  }

  const SetInitialParams = () => {
    switch (operator) {
      case "potenciacion":
        setOperator("potenciación")
        break;
      case "radicacion":
        setOperator("radicación")
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    SetInitialParams()
    return 0
  }, [operator])

  return <>
    <MetaTags title={"Ejercicios de " + Operator}/>
    <Test CanvasRef={CanvasRef} IsPot={operator == "potenciacion"} IncrementCounter={() => setQuestion(Question + 1)} Theme={2} operator={operator} SetArrFn={SetTestParameters} CanvasFn={Draw} IsCircle={false}/>
  </>
}

export default PotenciacionRadicacion