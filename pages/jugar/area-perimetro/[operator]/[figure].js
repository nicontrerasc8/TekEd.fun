
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import FeedBack from '../../../../Components/Play/FeedBack'
import FiguresTest from '../../../../Components/PlayersUsage/FiguresTest'
import TimerComponent from '../../../../Components/Timer'
import MetaTags from '../../../../Components/Utils/Metatags'
import UseUserContext from '../../../../Lib/context'

const Units = [
  "centímetros", "metros", "kilometros", "pulgadas"
]

const Figura = () => {

    const router = useRouter()
    const {figure, operator} = router.query
    const [Variants, setVariants] = useState({})
    const {IsLightTheme, IncrementStreak, ResetStreak} = UseUserContext()
    const [Figure, setFigure] = useState("")
    const [type, setType] = useState("")
    const CanvasRef = useRef(null)
    const [Unit, setUnit] = useState(Units[0])
    const [feedBackOn, setFeedBackOn] = useState(false)
    const [IsCorrect, setIsCorrect] = useState(false)
    const [TotalText, setTotalText] = useState("")
    const [InnerWidth, setInnerWidth] = useState(400)
    const [InnerHeight, setInnerHeight] = useState(400)
    const [SetLevel, setSetLevel] = useState(true)
    const [Cifras, setCifras] = useState(1)
    const [TimerRunning, setTimerRunning] = useState(false)
    const [Question, setQuestion] = useState(0)
    const [TimeQ, setTime] = useState(10)

    const CheckAnswer = (data) => {
      setFeedBackOn(true)
      setTimerRunning(false)
      setIsCorrect(data == Variants[Question].result)
      if(data == Variants[Question].result) IncrementStreak()
      else ResetStreak()
    }

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

    const SetTestParameters = (cifras, time) => {
      console.log(cifras, time)
      setCifras(cifras)
      setTime(time)
      
      setSetLevel(false)

      var Arr = []
      var Randomic = Math.floor(Math.random()*3)
      setUnit(Units[Randomic])
      setTimerRunning(true)

      if(figure == "circulo"){
       for (let i = 0; i < 10; i++) {
        var Ratio =  Math.floor(Math.random() * 38) + 2;
        var Result
        if(operator == "area") 
          Result = Math.round(100*3.14*Ratio*Ratio)/100
        
        else if(operator == "perimetro") 
          Result = Math.round(100*3.14*Ratio*2)/100
        
          var aux = {
          ratio: Ratio,
          result: Result.toFixed(2),
          opciones: SetOptions(Ratio, Result)
          }
        Arr.push(aux)
       }
       setVariants(Arr)
          return
      }

      if(figure == "cuadrado"){
        for (let i = 0; i < 10; i++) {
          var lado =  (Math.floor(Math.random() * 78) + 2)/2;
          var Result
          if(operator == "area") 
          Result = Math.pow(lado,2)
        
        else if(operator == "perimetro") 
          Result = lado*4
        
          var aux = {
          lado: lado,
          result: Result.toFixed(2),
          opciones: SetOptions(lado, Result)
          }
          Arr.push(aux)
        }
        
          setVariants(Arr)
          return
      }

      if(figure == "rectangulo"){
        for (let i = 0; i < 10; i++) {
          var lado1 =  (Math.floor(Math.random() * 78) + 2);
          var lado2 =  (Math.floor(Math.random() * 78) + 2);
          var Result
          if(operator == "area") 
          Result = lado1*lado2
        
        else if(operator == "perimetro") 
          Result = lado1*2 + lado2
        
          var aux = {
          lado1: lado1,
          lado2: lado2,
          result: Result.toFixed(2),
          opciones: SetOptions(lado1, Result)
          }
          Arr.push(aux)
        }
        
          setVariants(Arr)
          return
      }

      if(figure == "triangulo"){
        for (let i = 0; i < 10; i++) {
          var base =  (Math.floor(Math.random() * 78) + 2)/2;
          var altura =  (Math.floor(Math.random() * 78) + 2)/2;
          var Result
          if(operator == "area") 
          Result = base*altura/2
        
        else if(operator == "perimetro") 
          Result = base + altura + Math.sqrt((Math.pow(base,2) + Math.pow(altura,2)))
        
          var aux = {
          base: base,
          altura: altura,
          result: Result.toFixed(2),
          opciones: SetOptions(altura, Result)
          }
          Arr.push(aux)
        }
        
          setVariants(Arr)
          return
      }
    
    }

    const Next = () => {
      setFeedBackOn(false)
      if(Question-1 < 10) setQuestion(Question+1)
      SetCanvasDimensions()
      window.scrollTo(0,0)
      setTimerRunning(true)
    }

    const SetOptions = (d1, Result) => {
      var Randomic2 = Math.floor(Math.random() * 3 + 1)
            var options = []
            for (let i = 1; i < 4; i++) {
              var N
              if(i == Randomic2) N = Result
              else {
                var av = true
                var random_boolean = Math.random() < 0.5;
                if(random_boolean) N = (Result + Math.pow(i,2) + 1)
                else N = (Result - i)
                for (let i = 0; i < options.length; i++) {
                  if(N == options[i]) N = (d1 + i*i)*(Math.random() * 3.5 + 2)*Math.PI
                }
              }
              if(Math.floor(N) === N) N = Math.floor(N)
              else N = N.toFixed(2)
              if(N < 0) N = N*-1
              options.push(N)
            }

            return options
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
        
        if(Variants.length) CanvasContext.fillText("Radio = "+Variants[Question].ratio, x, y-10)
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
        CanvasContext.fillText(Variants[Question].lado, (lado)/2 + x - 20, y-10)
        CanvasContext.fillText(Variants[Question].lado, x+10+lado, (lado)/2 + y)
        return
      } 
      if(figure == "rectangulo"){
        var lado1, lado2
        if(Variants[Question].lado1 >= Variants[Question].lado2){
          lado1 = height*0.7
          lado2 = (Variants[Question].lado2 / Variants[Question].lado1) * lado1
        } else {
          lado2 = height*0.7
          lado1 = (Variants[Question].lado1 / Variants[Question].lado2) * lado2
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
        CanvasContext.fillText(Variants[Question].lado1, (lado1)/2 + x - 20, y-10)
        CanvasContext.fillText(Variants[Question].lado2, x+10+lado1, (lado2)/2 + y)
        return
      }   

      if(figure == "triangulo"){
        var baseCanvas, alturaCanvas
        if(Variants[Question].base >= Variants[Question].altura){
          baseCanvas = height*0.7
          alturaCanvas = (Variants[Question].altura / Variants[Question].base) * baseCanvas
        } else {
          alturaCanvas = height*0.7
          baseCanvas = (Variants[Question].base / Variants[Question].altura) * alturaCanvas
        }
        var x = (height-baseCanvas)/2
        var y = (height-alturaCanvas)/2
        CanvasContext.beginPath();
        CanvasContext.moveTo(x, y)
        CanvasContext.lineTo(x, y+alturaCanvas)
        CanvasContext.lineTo(x+baseCanvas, y+alturaCanvas)
        CanvasContext.lineTo(x, y)
        CanvasContext.stroke();
        if(operator=="area")CanvasContext.fill()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        var min 
        if(baseCanvas < alturaCanvas)min = baseCanvas
        else min = alturaCanvas
        CanvasContext.font = "20px Times New Roman";
        CanvasContext.fillText(Variants[Question].base, (baseCanvas)/2 + x - 20, y + alturaCanvas+25)
        CanvasContext.fillText(Variants[Question].altura, x-40, (alturaCanvas)/2 + y)
        return
      }   
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
      if(Question < 10 && Variants.length) Draw(InnerWidth, InnerHeight) 
    }

     useEffect(() => {
      SetInitialParams()
      return 0
    }, [figure])

    useEffect(() => {
        if(Variants.length){
          switch (figure) {
            case "circulo":
              setTotalText("de " + Variants[Question].ratio + " " + Unit + " de radio")
              break;
            case "cuadrado":
                setTotalText("cuyo lado mide " + Variants[Question].lado + " " + Unit)
              break;
            case "rectangulo":
                setTotalText("cuyo ancho mide " + Variants[Question].lado1 + " " + Unit + " y cuya altura mide " + Variants[Question].lado2 + " " + Unit)
              break;
            case "triangulo":
                setTotalText("cuya base mide " + Variants[Question].base + " " + Unit + " y cuya altura mide " + Variants[Question].altura + " " + Unit)
            default:
              break;
          }
        }
      
    }, [Variants, Unit, Question, ])    

    useEffect(() => {
      SetCanvasDimensions()
      window.addEventListener('resize', SetCanvasDimensions)
    }, [Variants, IsLightTheme, Question, ])
    
    

  return <>
    <TimerComponent max={TimeQ} isOn={TimerRunning} Next={() => CheckAnswer(-1)}/>
    <MetaTags title={"Encuentra el " + type + " del " + Figure}/>
    <div className='play-page'>
    <FiguresTest IsIn={SetLevel} Submit={SetTestParameters}/>
    {Variants.length > 0 && Question < 10 && <FeedBack close={Next} visible={feedBackOn} wasCorrect={IsCorrect} feedText={<span>La respuesta es: {Variants[Question].result} {Unit} cuadrad{Unit == "pulgadas" ? 'a' : 'o'}s</span>}/>}
    {
      Question < 10 && <>
      <p className='header'>Pregunta <span className='green'>#{Question+1}</span></p>
      <h2>¿Cuál es el {type} de un {Figure} {TotalText}?</h2>
      {figure == "circulo" && <p style={{marginTop: "10px"}}>Para hallar la respuesta, usa: Pi = 3.14</p>}
      <canvas ref={CanvasRef} width={InnerWidth} height={InnerHeight} className="figures-canva"/>
      <p className='selectAnswer'>Selecciona la alternativa correcta</p>
      <section>
      {
        Variants.length > 0 && Variants[Question].opciones.map((data, idx) => {
          return <article key={idx} onClick={() => CheckAnswer(data)}>
            <p>
            {data} {Unit} {operator == "area" &&
              <span>cuadrad{Unit == "pulgadas" ? 'a' : 'o'}s</span>
            }
            </p>
          </article>
        })
      }
      </section>
      </>
    }
    </div>
  </>
}

export default Figura