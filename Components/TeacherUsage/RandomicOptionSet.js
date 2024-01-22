import { Drawer } from '@mui/material'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useState, useEffect, useRef } from 'react'
import parse from "html-react-parser"
import { FaMeteor, FaPlus, FaRocket } from 'react-icons/fa'
import UseUserContext from '../../Lib/context'
import Potencia from '../Play/Potencia'

const Option = ({data, className}) => {

    return <span className={className}>{data}</span>
  }
  
  const RandomicOptionSet = ({correct, Add, HTML, Change, f1, f2, f3, type, type2, isCanvas = false, setTimer}) => {
    const [Arr, setArr] = useState([])
    const canvasRef = useRef(null)
    const [InnerWidth, setInnerWidth] = useState(400)
    const [InnerHeight, setInnerHeight] = useState(400)
    const {IsLightTheme} = UseUserContext()
    const [Minutos, setMinutos] = useState("1")
    const [Segundos, setSegundos] = useState("00")
    const [TotalTime, setTotalTime] = useState(60)
  
    const SetOpt = () => {
      var randomic = Math.floor(Math.random() * 2.99)
      var arr = []
      for (let i = 0; i < 3; i++) {
        var classB
        switch (i) {
          case 0:
            classB = "redB"
            break;
          case 1: 
            classB = "yellowB"
            break;
          case 2:
            classB = "blueB"
            break;
          default:
            break;
        }
        var n = undefined
        if(randomic === i) n = correct
        else {
          var random_boolean = Math.random() < 0.5
          if(correct > 9 || correct < -9) var aux = Math.floor(Math.random() * 6 + 1)  
          else var aux = Math.floor(Math.random() * 2 + 1)  
          if(random_boolean) n = (correct+aux)
          else n = (correct-aux)
          if(n.toFixed(2) != n) n = n.toFixed(2)
        }
        arr.push({
          c: classB,
          n: n
        })
      }
      setArr(arr)
    } 

  
    const CanvasFN = (width, height) => {
      var Canvas = canvasRef.current
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
      if(type == "Radicación"){
        CanvasContext.beginPath()
        CanvasContext.moveTo(10, height*.5)
        CanvasContext.lineTo(width * 1/8, height*.8)
        CanvasContext.lineTo(width * 2/8, height*.2)
        CanvasContext.lineTo(width - 10, height*.2)
        CanvasContext.stroke()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        CanvasContext.font = "80px Times New Roman";
        CanvasContext.fillText(f2, width*1/16, height*.45)
        CanvasContext.font = "150px Times New Roman";
        var Margin = 3 - f1.toString().length
        CanvasContext.fillText(f1, width*5/16 + width * Margin/10, height*.65)
      }
      if(type == "Círculo"){
        var x
        var y
        var ratio
        ratio = height * .45
        x = height*.5
        y = height *.5

        CanvasContext.beginPath()
        CanvasContext.arc(x,y,ratio,0,2*Math.PI)
        CanvasContext.stroke()
        CanvasContext.moveTo(x,y)
        CanvasContext.font = ratio*0.15+"px Times New Roman";
        CanvasContext.lineTo(x+ratio,y)
        CanvasContext.stroke()
          if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
          else CanvasContext.fillStyle = "#ffffff"
        
        CanvasContext.fillText("Radio = "+ f1, x, y-10)
        return
      }
      if(type == "Cuadrado"){
        var lado = height*0.7
        var x = (height-lado)/2
        var y = (height-lado)/2
        CanvasContext.beginPath();
        CanvasContext.rect(x, y, lado, lado);
        CanvasContext.stroke();
        if(type2=="Área")CanvasContext.fill()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        CanvasContext.font = "20px Times New Roman";
        CanvasContext.fillText(f1, (lado)/2 + x - f1.toString().length*10, y-10)
        CanvasContext.fillText(f1, x+10+lado, (lado)/2 + y)
        return
      } 
      if(type == "Rectángulo"){
        var lado1, lado2
        if(parseFloat(f1) >= parseFloat(f2)){
          lado1 = height*0.7
          lado2 = (parseFloat(f2) / parseFloat(f1)) * lado1
        } else {
          lado2 = height*0.7
          lado1 = (parseFloat(f1) / parseFloat(f2)) * lado2
        }
        var x = (height-lado1)/2
        var y = (height-lado2)/2
        CanvasContext.beginPath();
        CanvasContext.rect(x, y, lado1, lado2);
        CanvasContext.stroke();
        if(type2=="Área")CanvasContext.fill()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        var min 
        if(lado1 < lado2)min = lado1
        else min = lado2
        CanvasContext.font = "20px Times New Roman";
        CanvasContext.fillText(f1, (lado1)/2 + x - f1.toString().length*10, y-10)
        CanvasContext.fillText(f2, x+10+lado1, (lado2)/2 + y)
        return
      }   
      if(type == "Triángulo"){
        var baseCanvas, alturaCanvas
        if(parseFloat(f1) >= parseFloat(f2)){
          baseCanvas = height*0.7
          alturaCanvas = (parseFloat(f2) / parseFloat(f1)) * baseCanvas
        } else {
          alturaCanvas = height*0.7
          baseCanvas = (parseFloat(f1) / parseFloat(f2)) * alturaCanvas
        }
        var x = (height-baseCanvas)/2
        var y = (height-alturaCanvas)/2
        var angle = baseCanvas*(Math.random() * 0.35 + 0.1) 
        CanvasContext.beginPath();
        CanvasContext.moveTo(x + angle, y)
        CanvasContext.lineTo(x, y+alturaCanvas)
        CanvasContext.lineTo(x+baseCanvas, y+alturaCanvas)
        CanvasContext.lineTo(x + angle, y)  
        CanvasContext.stroke();
        if(type2=="Área")CanvasContext.fill()
        if(IsLightTheme) CanvasContext.fillStyle = "#000000" 
        else CanvasContext.fillStyle = "#ffffff"
        var min 
        if(baseCanvas < alturaCanvas)min = baseCanvas
        else min = alturaCanvas
        CanvasContext.font = "20px Times New Roman";
        CanvasContext.beginPath();

        if(type2 == "Área"){
          if(IsLightTheme) CanvasContext.strokeStyle= "#1ac26b"
          else CanvasContext.strokeStyle= "#6bedaa"
          CanvasContext.beginPath();
          CanvasContext.moveTo(x + angle, y)
          CanvasContext.lineTo(x+angle, y+alturaCanvas)
          CanvasContext.stroke()
          CanvasContext.fillText(f1, (baseCanvas)/2 + x - f1.length*15, y + alturaCanvas+25)
          CanvasContext.fillText(f2, x+angle + 10, (alturaCanvas)/2 + y)
        }
        else if(type2 == "Perimetro"){
          var firstSide = x + (angle/2)
          var secondSide = x + angle + (baseCanvas-angle)/2 
          CanvasContext.fillText(f1, (baseCanvas)/2 + x - f1.length*15, y + alturaCanvas+25)
          CanvasContext.fillText(f2, firstSide - f2.length*15, y + alturaCanvas/2)
          CanvasContext.fillText(f3, secondSide + 10, y + alturaCanvas/2)
        }
        return
      }   
    }

    const SetCanvasDimensions = () => {
      if(window !== undefined){
        if(window.innerWidth > 850) {
          setInnerWidth(window.innerWidth/4)
          setInnerHeight(window.innerWidth/4)
        }
        else {
          setInnerWidth(window.innerWidth * 0.9)
          setInnerHeight(window.innerWidth* .9)
        } 
      }
      CanvasFN(InnerWidth, InnerHeight) 
    }
    const AddFN = () => {
      console.log(Arr)
      console.log(TotalTime)
      var t = TotalTime
      Add(Arr, TotalTime)
    }
  
    useEffect(() => {
      SetOpt()
    }, [correct])

    useEffect(() => {
      setTotalTime(parseFloat(Minutos) * 60 + parseFloat(Segundos))
      console.log(parseFloat(Minutos) * 60 + parseFloat(Segundos))
    }, [Minutos, Segundos, ])

    /* useEffect(() => {
      setTimer(TotalTime)
    }, [TotalTime]) */
    
    

    useEffect(() => {
        SetCanvasDimensions()
      window.addEventListener('resize', SetCanvasDimensions)
    }, [HTML, correct, InnerWidth, InnerHeight,  ])
  
    return <div className='question-teacher'>
    {
        parse(HTML)
      }
      <canvas ref={canvasRef} width={InnerWidth} height={InnerHeight} className={!isCanvas ? "display-none" : ""}/>
        {type == "Potenciación" && <Potencia num={f1} exp={f2}/>}
          <button className='btn-primary' style={{margin: "3vh auto 2vh auto"}} onClick={Change}><FaRocket/> Cambia la pregunta</button>
      <p style={{marginBottom: "20px"}}>Las opciones que le aparecerán a tus estudiantes son las siguientes:</p>
    <div className='grid-alternative-button'>
      {
        Arr.length && Arr.map((info, idx) => {
          return <Option key={idx} data={info.n} className={correct === info.n ? "greenB" : "redB"} isCorrect={correct}/>
        })
      }
    </div>
    <button className='btn-secondary' onClick={SetOpt}><FaMeteor/> Cambia las opciones</button>
    <p style={{marginBottom: "40px"}}>Las opciones de color <span className='red'>rojo</span> son las <span className='red'>erróneas</span> y la de color <span className='green'>verde</span> es la <span className='green'>correcta</span>.</p>

    <label style={{fontSize: "calc(2vmax + 10px)"}}>Tiempo para resolver la pregunta</label>
    <div className='set-the-time'>
      <div>
        <input style={{width: "calc(8vmax + 5vmin + 4rem)"}} placeholder="min" value={Minutos} onChange={(e) => setMinutos(e.target.value)}/>
        <label>Minutos</label>
      </div>
      <div>
        <input style={{width: "calc(8vmax + 5vmin + 4rem)"}} placeholder="seg" value={Segundos} onChange={(e) => setSegundos(e.target.value)}/>
        <label>Segundos</label>
      </div>
    </div>
    <p style={{marginBottom: "calc(3vh + 10px)"}}>El estudiante tendrá <span className='green'>{parseFloat(Minutos)} minutos y {parseFloat(Segundos)} segundos </span>para resolver el examen</p>
    <button className='btn-tertiary' onClick={AddFN}><FaPlus/> Agregar pregunta al examen</button>
    </div>
  }

export default RandomicOptionSet