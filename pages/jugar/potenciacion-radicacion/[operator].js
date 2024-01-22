import { text } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Test from '../../../Components/PlayersUsage/Test'
import MetaTags from '../../../Components/Utils/Metatags'
import SetOptions from '../../../Functions/SetTestOptions'
import UseUserContext from '../../../Lib/context'

const CheckIfIsInArray = (n, array) => {
  for (let index = 0; index < array.length; index++) 
       if(n === array[index].num) return true
  return false
}
const CheckIfIsInArray2 = (n, array) => {
  for (let index = 0; index < array.length; index++) 
       if(n === array[index].result) return true
  return false
}

const PotenciacionRadicacion = () => {

  const router = useRouter()
  const {operator} = router.query
  const [Operator, setOperator] = useState("")
  const [ArrOfQuestions, setArrOfQuestions] = useState({})
  const {ExpRad_Number, IsLightTheme} = UseUserContext()

  const [Question, setQuestion] = useState(0)
  const CanvasRef = useRef(null)

  const SetTestParameters = (cifras) => {
    var Arr = []

    if(operator == "potenciacion"){
      for (let i = 0; i < 7; i++) {
        var num
        do {
          num = Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1))
        } while (CheckIfIsInArray(num, Arr));
        var result = Math.pow(num, Number(ExpRad_Number))
        var textVar 
        if(ExpRad_Number == 2) textVar = "l cuadrado"
        else if(ExpRad_Number == 3) textVar = "l cubo"
        else if(ExpRad_Number == 4) textVar = " la cuarta" 
        var texto = "¿Cuánto es " + num + " a" + textVar + "?"
        var aux = {
          num: num,
          exp: ExpRad_Number,
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
      for (let i = 0; i < 7; i++) {
        if(cifras === 2){
          do {
            result = Math.ceil(Math.random() * 10)
          } while (CheckIfIsInArray2(result, Arr));
        }
        else if(cifras === 3){
          do {
            result = Math.floor(Math.random() * (31 - 10) + 11)
          } while (CheckIfIsInArray2(result, Arr));
        }
        num = Math.pow(result, ExpRad_Number)
        var typeOfRad
        if(ExpRad_Number == 2) typeOfRad = "cuadrada" 
        else if(ExpRad_Number == 3) typeOfRad = "cúbica"
        var texto = "¿Cuánto es la raíz " + typeOfRad + " de " + num + "?"
        var aux = {
          num: num,
          rad: ExpRad_Number,
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

  const Draw = (width, height) => {
    var Canvas = CanvasRef.current
    var CanvasContext = Canvas.getContext('2d')
    CanvasContext.clearRect(0, 0, width, height)
    if(IsLightTheme) {
      CanvasContext.fillStyle = "#cad4e4"
      CanvasContext.strokeStyle = "#134fb0"
    }
    else {
      CanvasContext.fillStyle = "#162333"
      CanvasContext.strokeStyle = "#84aef2"
    }
    if(operator == "radicacion"){
      console.log(ArrOfQuestions)
      CanvasContext.beginPath()
      CanvasContext.moveTo(10, height*.5)
      CanvasContext.lineTo(width * 1/8, height*.8)
      CanvasContext.lineTo(width * 2/8, height*.2)
      CanvasContext.lineTo(width - 10, height*.2)
      CanvasContext.stroke()
      if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
      else CanvasContext.fillStyle = "#ffffff"
      CanvasContext.font = "80px Times New Roman";
      CanvasContext.fillText(ArrOfQuestions[Question].rad, width*1/16, height*.45)
      CanvasContext.font = "150px Times New Roman";
      var n = ArrOfQuestions[Question].num
      var Margin = 3 - n.toString().length
      CanvasContext.fillText(ArrOfQuestions[Question].num, width*5/16 + width * Margin/10, height*.65)
    }
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