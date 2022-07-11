import { counter } from '@fortawesome/fontawesome-svg-core'
import { result } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { contextType } from 'react-copy-to-clipboard'
import FeedBack from '../../../../Components/Play/FeedBack'
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
    const [InnerWidth, setInnerWidth] = useState(400)
    const [InnerHeight, setInnerHeight] = useState(400)

    const CheckAnswer = (data) => {
      setFeedBackOn(true)
      setIsCorrect(data == Variants.result)
      if(data == Variants.result) IncrementStreak()
      else ResetStreak()
    }

    const Next = () => {
      setFeedBackOn(false)
      SetParams()
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
                else N = (Result - Math.pow(i,2) - 1)
                for (let i = 0; i < options.length; i++) {
                  if(N == options[i]) N = (d1 + i*i)*2*Math.PI
                }
              }
              options.push(N.toFixed(2))
            }

            return options
    }
      
    const SetParams = () => {
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
     
      var Arr = {}
      var Randomic = Math.floor(Math.random()*3 + 1)
      setUnit(Units[Randomic])

      if(operator == "area"){
        setType("área")
        if(figure == "circulo"){
            var Ratio =  Math.floor(Math.random() * 38) + 2;
            var Result = Math.round(100*3.14*Ratio*Ratio)/100
            Arr = {
                ratio: Ratio,
                result: Result,
                opciones: SetOptions(Ratio, Result)
            }
            setVariants(Arr)
            return
        }
      }
      else if(operator == "perimetro") {
        setType("perimetro")
        if(figure == "circulo"){
          var Ratio = Math.floor(Math.random()*18 + 2);
          var Result = Math.round(100*3.14*Ratio*2)/100
          Arr = {
            ratio: Ratio,
            result: Result,
            opciones: SetOptions(Ratio, Result)
          }
          setVariants(Arr)
          return
        }
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
        
        CanvasContext.fillText("Radio = "+Variants.ratio, x, y-10)
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
      Draw(InnerWidth, InnerHeight) 
    }

    useEffect(() => {
      SetParams()
      return 0
    }, [figure])

    useEffect(() => {
      SetCanvasDimensions()
      window.addEventListener('resize', SetCanvasDimensions)
    }, [Variants, IsLightTheme, ])
    
    

  return <>
    <MetaTags title={"Encuentra el " + type + " del " + Figure}/>
    <div className='play-page'>
    <FeedBack close={Next} visible={feedBackOn} wasCorrect={IsCorrect} feedText={<span>La respuesta es: {Variants.result}</span>}/>
    <h2>¿Cuál es el {type} de un {Figure} de {Variants.ratio} {Unit} de radio?</h2>
    <p style={{marginTop: "10px"}}>Para hallar la respuesta, usa: Pi = 3.14</p>
    <canvas ref={CanvasRef} width={InnerWidth} height={InnerHeight} className="figures-canva"/>
    <p className='selectAnswer'>Selecciona la alternativa correcta</p>
    <section>
    {
      Variants.opciones && Variants.opciones.map((data, idx) => {
        return <article key={idx} onClick={() => CheckAnswer(data)}>
          {data} {Unit} cuadrad{Unit == "pulgadas" ? 'a' : 'o'}s
        </article>
      })
    }
    </section>
    </div>
  </>
}

export default Figura