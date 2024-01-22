
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import FeedBack from '../../../../Components/Play/FeedBack'
import Test from '../../../../Components/PlayersUsage/Test'
import TestParams from '../../../../Components/PlayersUsage/TestParams'
import InformsContainer from '../../../../Components/TeacherUsage/InformsContainer'
import TimerComponent from '../../../../Components/Timer'
import MetaTags from '../../../../Components/Utils/Metatags'
import SetOptions from '../../../../Functions/SetTestOptions'
import UseUserContext from '../../../../Lib/context'

const Units = [
  "centímetros", "metros", "kilometros", "pulgadas"
]

const Figura = () => {

    const router = useRouter()
    const {figure, operator} = router.query
    const [ArrOfQuestions, setArrOfQuestions] = useState({})
    const {IsLightTheme} = UseUserContext()
    const [Figure, setFigure] = useState("")
    const [type, setType] = useState("")
    const [Cifras, setCifras] = useState(1)
    const CanvasRef = useRef(null)
    const [Question, setQuestion] = useState(0)



    const SetInitialParams = () => {
      switch (figure) {
        case "circulo":
          setFigure("círculo")
          break;
        case "rectangulo":
          setFigure("rectángulo")
          break;
        case "cuadrado":
          setFigure("cuadrado")
          break;
        case "triangulo":
          setFigure("triángulo");
          break;
        default:
          break;
      }
      if(operator == "area") setType("área")
      else setType("perimetro")
    }

    const SetTestParameters = (cifras) => {
      setCifras(cifras)

      var Arr = []
      var rand

      if(figure == "circulo"){
       for (let i = 0; i < 7; i++) {
        rand = Math.floor(Math.random()*3)
        var Ratio =  Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1));
        var Result
        var texto = "¿Cuál es el " + type + " de un círculo cuyo radio mide " + Ratio + " " + Units[rand] + "?"
        if(operator == "area") 
          Result = Math.round(100*3.14*Ratio*Ratio)/100
        
        else if(operator == "perimetro") 
          Result = Math.round(100*3.14*Ratio*2)/100
        
          var aux = {
          ratio: Ratio,
          text: texto, 
          unidad: Units[rand],
          result: Result.toFixed(2),
          opciones: SetOptions(Ratio, Result)
          }
        Arr.push(aux)
       }
       setArrOfQuestions(Arr)
          return Arr
      }

      if(figure == "cuadrado"){
        for (let i = 0; i < 7; i++) {
          rand = Math.floor(Math.random()*3)
          var lado =  Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1));
          var Result
          var texto = "¿Cuál es el " + type + " de un cuadrado cuyo lado mide " + lado + " " + Units[rand] + "?"
          if(operator == "area") 
          Result = Math.pow(lado,2)
        
        else if(operator == "perimetro") 
          Result = lado*4
        
          var aux = {
          lado: lado,
          unidad: Units[rand],
          text: texto,
          result: Result.toFixed(2),
          opciones: SetOptions(lado, Result)
          }
          Arr.push(aux)
        }
        
          setArrOfQuestions(Arr)
          return Arr
      }

      else if(figure == "rectangulo"){
        for (let i = 0; i < 7; i++) {
          rand = Math.floor(Math.random()*3)
          var lado1 =  Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1));
          var lado2 =  Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1));
          var Result
          var texto = "¿Cuál es el " + type + " de un rectángulo cuyo ancho mide " + lado1 + " " + Units[rand] + " y " + lado2 + " " + Units[rand] + " de largo?"
          if(operator == "area") 
          Result = lado1*lado2
        
        else if(operator == "perimetro") 
          Result = lado1*2 + lado2*2
        
          var aux = {
          lado1: lado1,
          lado2: lado2,
          unidad: Units[rand],
          text: texto,
          result: Result.toFixed(2),
          opciones: SetOptions(lado1, Result)
          }
          Arr.push(aux)
        }
        
          setArrOfQuestions(Arr)
          return Arr
      }

      else if(figure == "triangulo"){
        for (let i = 0; i < 7; i++) {
          rand = Math.floor(Math.random()*3)
          var base
          var altura
          do {
            base =  Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1));
            altura =  Math.floor(Math.random() * (Math.pow(10,cifras)-1 - Math.pow(10,cifras-1)) + Math.pow(10,cifras-1));
          } while (base/altura > 1.5 || altura/base > 1.5);
          var angle = (Math.random() * 0.35 + 0.1) 
          var Result
          var aux
          if(operator == "area") {
            Result = base*altura/2
            aux = {
              base: base,
              altura: altura,
              unidad: Units[rand],
              angle: angle, 
              text: "¿Cuál es el área de un triángulo cuya base mide " + base + " " + Units[rand] + " y cuya altura mide " + altura + " " + Units[rand] + "?",
              result: Result.toFixed(2),
              opciones: SetOptions(altura, Result)
              }
          }
        
        else if(operator == "perimetro") {
          var lado1 = Math.round(Math.sqrt(Math.pow(angle*base, 2) + Math.pow(altura, 2)))
          var lado2 = Math.round(Math.sqrt(Math.pow((base-(base*angle)), 2) + Math.pow(altura, 2)))
          Result = base + lado1 + lado2
          aux = {
            lado1: lado1,
            lado2: lado2,
            altura: altura,
            unidad: Units[rand],
            text: "¿Cuál es el perimetro de un triángulo cuyos lados miden " + lado1 + ", " + lado2 + " y " + base + " " + Units[rand] + " aproximadamente",
            base: base,
            angle: angle,
            result: Result.toFixed(2),
            opciones: SetOptions(altura, Result)
          }
        }
        
          
          Arr.push(aux)
        }
        
          setArrOfQuestions(Arr)
          return Arr
      }
    
    }



      

    const Draw = (width,height) => {
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
      if(figure == "circulo"){
        var x
        var y
        var ratio
        ratio = height * .45
        x = height*.5
        y = height *.5

        CanvasContext.beginPath()
        CanvasContext.arc(x,y,ratio,0,2*Math.PI)
        if(operator=="area")CanvasContext.fill()
        CanvasContext.stroke()
        CanvasContext.moveTo(x,y)
        CanvasContext.font = ratio*0.15+"px Times New Roman";
        CanvasContext.lineTo(x+ratio,y)
        CanvasContext.stroke()

          if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
          else CanvasContext.fillStyle = "#ffffff"
        
        if(ArrOfQuestions.length) CanvasContext.fillText("Radio = "+ArrOfQuestions[Question].ratio, x, y-10)
        return
      }
      if(figure == "cuadrado"){
        var lado = height*0.7
        var x = (height-lado)/2
        var y = (height-lado)/2
        CanvasContext.beginPath();
        CanvasContext.rect(x, y, lado, lado);
        CanvasContext.stroke();
        if(operator=="area")CanvasContext.fill()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        CanvasContext.font = "20px Times New Roman";
        CanvasContext.fillText(ArrOfQuestions[Question].lado, (lado)/2 + x - Cifras*10, y-10)
        CanvasContext.fillText(ArrOfQuestions[Question].lado, x+10+lado, (lado)/2 + y)
        return
      } 
      if(figure == "rectangulo"){
        var lado1, lado2
        if(ArrOfQuestions[Question].lado1 >= ArrOfQuestions[Question].lado2){
          lado1 = height*0.7
          lado2 = (ArrOfQuestions[Question].lado2 / ArrOfQuestions[Question].lado1) * lado1
        } else {
          lado2 = height*0.7
          lado1 = (ArrOfQuestions[Question].lado1 / ArrOfQuestions[Question].lado2) * lado2
        }
        var x = (height-lado1)/2
        var y = (height-lado2)/2
        CanvasContext.beginPath();
        CanvasContext.rect(x, y, lado1, lado2);
        CanvasContext.stroke();
        if(operator=="area")CanvasContext.fill()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        var min 
        if(lado1 < lado2)min = lado1
        else min = lado2
        CanvasContext.font = "20px Times New Roman";
        CanvasContext.fillText(ArrOfQuestions[Question].lado1, (lado1)/2 + x - Cifras*10, y-10)
        CanvasContext.fillText(ArrOfQuestions[Question].lado2, x+10+lado1, (lado2)/2 + y)
        return
      }   

      if(figure == "triangulo"){
        var baseCanvas, alturaCanvas
        if(ArrOfQuestions[Question].base >= ArrOfQuestions[Question].altura){
          baseCanvas = height*0.7
          alturaCanvas = (ArrOfQuestions[Question].altura / ArrOfQuestions[Question].base) * baseCanvas
        } else {
          alturaCanvas = height*0.7
          baseCanvas = (ArrOfQuestions[Question].base / ArrOfQuestions[Question].altura) * alturaCanvas
        }
        var x = (height-baseCanvas)/2
        var y = (height-alturaCanvas)/2
        var angle = baseCanvas*ArrOfQuestions[Question].angle
        CanvasContext.beginPath();
        CanvasContext.moveTo(x + angle, y)
        CanvasContext.lineTo(x, y+alturaCanvas)
        CanvasContext.lineTo(x+baseCanvas, y+alturaCanvas)
        CanvasContext.lineTo(x + angle, y)  
        CanvasContext.stroke();
        if(operator=="area")CanvasContext.fill()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        var min 
        if(baseCanvas < alturaCanvas)min = baseCanvas
        else min = alturaCanvas
        CanvasContext.font = "20px Times New Roman";
        CanvasContext.beginPath();

        if(operator == "area"){
          if(IsLightTheme) CanvasContext.strokeStyle= "#1ac26b"
          else CanvasContext.strokeStyle= "#6bedaa"
          CanvasContext.beginPath();
          CanvasContext.moveTo(x + angle, y)
          CanvasContext.lineTo(x+angle, y+alturaCanvas)
          CanvasContext.stroke()
          CanvasContext.fillText(ArrOfQuestions[Question].base, (baseCanvas)/2 + x - Cifras*15, y + alturaCanvas+25)
          CanvasContext.fillText(ArrOfQuestions[Question].altura, x+angle + 10, (alturaCanvas)/2 + y)
        }
        else if(operator == "perimetro"){
          var firstSide = x + (angle/2)
          var secondSide = x + angle + (baseCanvas-angle)/2 
          CanvasContext.fillText(ArrOfQuestions[Question].base, (baseCanvas)/2 + x - Cifras*15, y + alturaCanvas+25)
          CanvasContext.fillText(ArrOfQuestions[Question].lado1, firstSide - Cifras*15, y + alturaCanvas/2)
          CanvasContext.fillText(ArrOfQuestions[Question].lado2, secondSide + 10, y + alturaCanvas/2)
        }
        return
      }   
    }

     useEffect(() => {
      SetInitialParams()
      return 0
    }, [figure, ])

    
    

  return <>
    <MetaTags title={"Encuentra el " + type + " del " + Figure}/>
    <Test CanvasRef={CanvasRef} IncrementCounter={() => setQuestion(Question+1)} Theme={1} operator={operator} SetArrFn={SetTestParameters} CanvasFn={Draw} IsCircle={figure == "circulo"}/>
  </>
}

export default Figura