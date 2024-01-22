import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import Test from '../../../Components/PlayersUsage/Test'
import MetaTags from '../../../Components/Utils/Metatags'
import GetMedia from '../../../Functions/GetMedia'
import GetMediana from '../../../Functions/GetMediana'
import GetMode from '../../../Functions/GetMode'
import SetMTOptions from '../../../Functions/SetTestMTOptions'
import SetOptions from '../../../Functions/SetTestOptions'

const GetArray = () => {
  var array = []
  var rand = Math.floor(Math.random() * 7 + 8) 


  var num
  var initRandom = Math.round(Math.random() * rand + 1)

  for (let index = 0; index < rand; index++) {
    num = Math.round(Math.random() * 8) + initRandom
    array.push(num)
  }

  return array
}



const MMM_MainComponent = () => {
  const router = useRouter()
  const {measure} = router.query
  const [Measure, setMeasure] = useState("")
  const [Question, setQuestion] = useState(0)
  const CanvasRef = useRef(null)


  const SetTestParameters = () => {
    var Arr = []
    var aux
    var ArrayOfNumbers 
    var texto
    if(measure == "media"){
      texto = "Calcula la media en el siguiente conjunto de datos"
      for (let i = 0; i < 7; i++) {
        ArrayOfNumbers = GetArray()
        aux = {
          text: texto,
          dataSet: ArrayOfNumbers,
          opciones: SetMTOptions(1, ArrayOfNumbers),
          result: GetMedia(ArrayOfNumbers).toFixed(2),
        }
        Arr.push(aux)
      }
      return Arr
    }
    else if(measure == "mediana"){
        texto = "¿Cuál es la mediana en el siguiente conjunto de datos?"
      for (let i = 0; i < 7; i++) {
        ArrayOfNumbers = GetArray()
        aux = {
          text: texto,
          dataSet: ArrayOfNumbers,
          opciones: SetMTOptions(2, ArrayOfNumbers),
          result: GetMediana(ArrayOfNumbers, true),
        }
        Arr.push(aux)
      }
      return Arr
    }
    else if(measure == "moda"){
      texto = "¿Cuál es la moda en el siguiente conjunto de datos?"
      for (let i = 0; i < 7; i++) {
        ArrayOfNumbers = GetArray()

        aux = {
          text: texto,
          dataSet: ArrayOfNumbers,
          opciones: SetMTOptions(3, ArrayOfNumbers),
          result: GetMode(ArrayOfNumbers).finalResult,
        }
        Arr.push(aux)
      }
      return Arr
    }
  }

  return <>
    <MetaTags title={"Encuentra la " + measure + " | Matio"}/>
    <Test 
        Table
        CanvasRef={CanvasRef} 
        CanvasFn={() => console.log()} 
        IncrementCounter={() => setQuestion(Question + 1)} 
        Theme={3} 
        operator={measure} 
        SetArrFn={SetTestParameters}/>
  </>
}

export default MMM_MainComponent