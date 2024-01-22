import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import parse from "html-react-parser"
import UseUserContext from "../../Lib/context"
import { firestore } from "../../Lib/firebase"
import FeedBack from "../Play/FeedBack"
import TimerComponent from "../Timer"
import { updateDoc, arrayUnion } from "firebase/firestore";
import uuid from "react-uuid"
import { set } from "lodash"
import Potencia from "../Play/Potencia"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faFire, faTimes } from "@fortawesome/free-solid-svg-icons"
import InformsContainer from "../TeacherUsage/InformsContainer"
import InfCont from "../TeacherUsage/TeacherInformsContainer"


const ExContainer = ({ Data, changeQuestion, Length, current, Finish, AddCorrect, pushToArr, start, canvasV }) => {

  const [IsFeedbackVisible, setIsFeedbackVisible] = useState(false)
  const [IsCorrect, setIsCorrect] = useState(false);
  const [TimerOn, setTimerOn] = useState(true)
  const [On, setOn] = useState(false)
  const [Response, setResponse] = useState(0)
  const [InnerWidth, setInnerWidth] = useState(400)
  const [InnerHeight, setInnerHeight] = useState(400)
  const canvasRef = useRef(null)
  const { IsLightTheme, ResetStreak, IncrementCorrect, IncrementWrong, IncrementStreak } = UseUserContext()


  const Check = (n) => {
    setIsCorrect(Data.correct === n)
    setResponse(n)
    setIsFeedbackVisible(true)
    if (Data.correct === n) {
      AddCorrect()
      IncrementStreak()
      IncrementCorrect()
    }
    else{
      IncrementWrong()
      ResetStreak()
    }
    setTimerOn(false)
  }



  const CloseContainer = () => {
    setIsFeedbackVisible(false)
    var objResponse = {
      correcta: IsCorrect,
      respuesta: Response
    }
    pushToArr(objResponse)
    if (current + 1 < Length) {
      setTimerOn(true)
      changeQuestion()
    }
    else {
      Finish(objResponse)
    }
  }


  const CanvasFN = (width, height) => {
    setOn(true)
    var Canvas = canvasRef.current
    var CanvasContext = Canvas.getContext('2d')
    CanvasContext.clearRect(0, 0, width, height)
    if (IsLightTheme) {
      CanvasContext.fillStyle = "#cad4e4"
      CanvasContext.strokeStyle = "#134fb0"
    }
    else {
      CanvasContext.fillStyle = "#162333"
      CanvasContext.strokeStyle = "#84aef2"
    }
    if (!(Data.hasOwnProperty('data'))) return
    console.log(Data.data)
    if (Data.tema == "Radicación") {
      CanvasContext.beginPath()
      CanvasContext.moveTo(10, height * .5)
      CanvasContext.lineTo(width * 1 / 8, height * .8)
      CanvasContext.lineTo(width * 2 / 8, height * .2)
      CanvasContext.lineTo(width - 10, height * .2)
      CanvasContext.stroke()
      if (IsLightTheme) CanvasContext.fillStyle = "#000000"
      else CanvasContext.fillStyle = "#ffffff"
      CanvasContext.font = "80px Times New Roman";
      CanvasContext.fillText(f2, width * 1 / 16, height * .45)
      CanvasContext.font = "150px Times New Roman";
      var Margin = 3 - f1.toString().length
      CanvasContext.fillText(Data.data.f1, width * 5 / 16 + width * Margin / 10, height * .65)
    }
    if (!(Data.data.hasOwnProperty('type'))) return
    if (Data.data.type.cat == "Círculo") {
      var x
      var y
      var ratio
      ratio = height * .45
      x = height * .5
      y = height * .5

      CanvasContext.beginPath()
      CanvasContext.arc(x, y, ratio, 0, 2 * Math.PI)
      CanvasContext.stroke()
      CanvasContext.moveTo(x, y)
      CanvasContext.font = ratio * 0.15 + "px Times New Roman";
      CanvasContext.lineTo(x + ratio, y)
      CanvasContext.stroke()
      if (Data.tema == "Área") CanvasContext.fill()
      if (IsLightTheme) CanvasContext.fillStyle = "#000000"
      else CanvasContext.fillStyle = "#ffffff"

      CanvasContext.fillText("Radio = " + Data.data.f1, x, y - 10)
      return
    }
    if (Data.data.type.cat == "Cuadrado") {
      var lado = height * 0.7
      var x = (height - lado) / 2
      var y = (height - lado) / 2
      CanvasContext.beginPath();
      CanvasContext.rect(x, y, lado, lado);
      CanvasContext.stroke();
      if (Data.tema == "Área") CanvasContext.fill()
      if (IsLightTheme) CanvasContext.fillStyle = "#000000"
      else CanvasContext.fillStyle = "#ffffff"
      CanvasContext.font = "20px Times New Roman";
      CanvasContext.fillText(Data.data.f1, (lado) / 2 + x - Data.data.f1.toString().length * 10, y - 10)
      CanvasContext.fillText(Data.data.f1, x + 10 + lado, (lado) / 2 + y)
      return
    }
    if (Data.data.type.cat == "Rectángulo") {
      var lado1, lado2
      if (parseFloat(Data.data.f1) >= parseFloat(Data.data.f2)) {
        lado1 = height * 0.7
        lado2 = (parseFloat(Data.data.f2) / parseFloat(Data.data.f1)) * lado1
      } else {
        lado2 = height * 0.7
        lado1 = (parseFloat(Data.data.f1) / parseFloat(Data.data.f2)) * lado2
      }
      var x = (height - lado1) / 2
      var y = (height - lado2) / 2
      CanvasContext.beginPath();
      CanvasContext.rect(x, y, lado1, lado2);
      CanvasContext.stroke();
      if (Data.tema == "Área") CanvasContext.fill()
      if (IsLightTheme) CanvasContext.fillStyle = "#000000"
      else CanvasContext.fillStyle = "#ffffff"
      var min
      if (lado1 < lado2) min = lado1
      else min = lado2
      CanvasContext.font = "20px Times New Roman";
      CanvasContext.fillText(parseFloat(Data.data.f1), (lado1) / 2 + x - Data.data.f1.toString().length * 10, y - 10)
      CanvasContext.fillText(parseFloat(Data.data.f2), x + 10 + lado1, (lado2) / 2 + y)
      return
    }
    if (Data.data.type.cat == "Triángulo") {

      var baseCanvas, alturaCanvas
      if (parseFloat(Data.data.f1) >= parseFloat(Data.data.f2)) {
        baseCanvas = height * 0.7
        alturaCanvas = (parseFloat(Data.data.f2) / parseFloat(Data.data.f1)) * baseCanvas
      } else {
        alturaCanvas = height * 0.7
        baseCanvas = (parseFloat(Data.data.f1) / parseFloat(Data.data.f2)) * alturaCanvas
      }
      var x = (height - baseCanvas) / 2
      var y = (height - alturaCanvas) / 2
      var angle = baseCanvas * (Math.random() * 0.35 + 0.1)
      CanvasContext.beginPath();
      CanvasContext.moveTo(x + angle, y)
      CanvasContext.lineTo(x, y + alturaCanvas)
      CanvasContext.lineTo(x + baseCanvas, y + alturaCanvas)
      CanvasContext.lineTo(x + angle, y)
      CanvasContext.stroke();
      if (Data.tema == "Área") CanvasContext.fill()
      if (IsLightTheme) CanvasContext.fillStyle = "#000000"
      else CanvasContext.fillStyle = "#ffffff"

      if (baseCanvas < alturaCanvas) min = baseCanvas
      else min = alturaCanvas
      CanvasContext.font = "20px Times New Roman";
      CanvasContext.beginPath();

      if (Data.tema == "Área") {
        if (IsLightTheme) CanvasContext.strokeStyle = "#1ac26b"
        else CanvasContext.strokeStyle = "#6bedaa"
        CanvasContext.beginPath();
        CanvasContext.moveTo(x + angle, y)
        CanvasContext.lineTo(x + angle, y + alturaCanvas)
        CanvasContext.stroke()
        CanvasContext.fillText(parseFloat(Data.data.f1), (baseCanvas) / 2 + x - Data.data.f1.length * 15, y + alturaCanvas + 25)
        CanvasContext.fillText(parseFloat(Data.data.f2), x + angle + 10, (alturaCanvas) / 2 + y)
      }
      else if (Data.tema == "Perimetro") {
        var firstSide = x + (angle / 2)
        var secondSide = x + angle + (baseCanvas - angle) / 2
        CanvasContext.fillText(parseFloat(Data.data.f1), (baseCanvas) / 2 + x - Data.data.f1.length * 15, y + alturaCanvas + 25)
        CanvasContext.fillText(parseFloat(Data.data.f2), firstSide - Data.data.f2.length * 15, y + alturaCanvas / 2)
        CanvasContext.fillText(parseFloat(Data.data.f3), secondSide + 10, y + alturaCanvas / 2)
      }
      return
    }
  }

  const SetCanvasDimensions = () => {

    if (window.innerWidth > 850) {
      setInnerWidth(window.innerWidth / 4)
      setInnerHeight(window.innerWidth / 4)
    }
    else {
      setInnerWidth(window.innerWidth * 0.9)
      setInnerHeight(window.innerWidth * .9)
    }

    CanvasFN(InnerWidth, InnerHeight)
  }

  useEffect(() => {
    if (Data.hasOwnProperty('data')) {
      SetCanvasDimensions()
      window.addEventListener('resize', SetCanvasDimensions())
    }
  }, [Data, On,])

  useEffect(() => {
    CanvasFN(InnerWidth, InnerHeight)
  }, [start])





  return <>
    <TimerComponent max={Data.time} isOn={TimerOn} Next={() => Check(undefined)} />
    <FeedBack visible={IsFeedbackVisible} close={CloseContainer} wasCorrect={IsCorrect} feedText={"La respuesta correcta es: " + Data.correct} />
    {
      parse(Data.htmlContent)
    }
    <canvas ref={canvasRef} width={InnerWidth} height={InnerHeight} className={(Data.data && Data.tema != "Potenciación") ? "" : "display-none"} />
    {
      Data.tema == "Potenciación" &&
      <Potencia num={Data.data.f1} exp={Data.data.f2} />
    }
    <div className='grid-alternative-button'>
      {
        Data.ArrOfOptions.length && Data.ArrOfOptions.map((info, idx) => {
          return <span key={idx} className={info.c} onClick={() => Check(info.n)}>
            {info.n}
          </span>
        })
      }
    </div>
  </>
}

const RealTest = ({ info, teacher, exam, canvasV = false }) => {

  const [QuestionN, setQuestionN] = useState(0)
  const [InInfo, setInInfo] = useState(false)
  const [Finished, setFinished] = useState(false)
  const [CorrectMargin, setCorrectMargin] = useState(0)
  const [ArrOfResponses, setArrOfResponses] = useState([])
  const [FinalData, setFinalData] = useState({})
  const [Started, setStarted] = useState(false)
  const [UserName, setUserName] = useState("")
  const { TurnOnLoading, TurnOffLoading, Streak, CorrectAnswers, WrongAnswers } = UseUserContext()

  const Start = () => {
    if (UserName.length < 3) {
      toast.error("Escribe tu nombre por favor")
      return
    }
    setStarted(true)
  }

  const Send = async (objRes, efficiency) => {
    var AuxResponse = ArrOfResponses
    AuxResponse.push(objRes)
    var Arr = [
      {
        n: UserName,
        id: uuid(),
        ef: efficiency,
        r: AuxResponse
      }
    ]
    setFinalData(Arr[0])

    const ResponseDoc = firestore.doc(`users/${teacher}/examenes/${exam}`);
    TurnOnLoading()
    await updateDoc(ResponseDoc, {
      respuestas: arrayUnion(...Arr)
    })
    toast.success("Listo, ya enviaste tu exámen.")
    TurnOffLoading()
  }

  const EndExam = (objRes) => {
    setFinished(true)
    var efficiency = CorrectMargin * 100 / info.questions.length
    setCorrectMargin(efficiency)
    Send(objRes, efficiency)
  }




  return <div className="exam-main">
    {
      Finished ? <>
        <h1>Has terminado el examen.</h1>
        <p>Tu efectividad ha sido de {CorrectMargin}%</p>
        <button onClick={() => setInInfo(!InInfo)} style={{marginTop: "calc(2vh + 10px)", fontSize: "calc(1vmax + 10px)"}} className="btn-tertiary">
          Ver respuestas
        </button>
        <InfCont IsTeacher={false} Exam={info} Data={FinalData} IsIn={InInfo} Out={() => setInInfo(!InInfo)}/>
      </>
        :
        (
          !Started ? <div className="init-exam">
            <h1>Empieza a resolver el exámen</h1>
            <input value={UserName} onChange={(e) => setUserName(e.target.value)} placeholder="Escribe aquí tu nombre" />
            <button className={UserName.length > 3 ? "btn-primary" : "btn-null"} onClick={Start}>
              Empieza el exámen
            </button>
          </div>
            :
            <>
              <h1>Pregunta <span className="blue">#{QuestionN + 1}</span> de <span className="green">{info.questions.length}</span></h1>
              <div className='score'>
           <span className='fire'>
               <FontAwesomeIcon icon={faFire}/> {Streak}
           </span>
           <span className='green'>
               <FontAwesomeIcon icon={faCheck}/> {CorrectAnswers}
           </span>
           <span className='red'>
               <FontAwesomeIcon icon={faTimes}/> {WrongAnswers}
           </span>
      </div>
              <ExContainer canvasV={canvasV} start={Started} exam={exam} pushToArr={(e) => setArrOfResponses([...ArrOfResponses, e])} AddCorrect={() => setCorrectMargin(CorrectMargin + 1)} Data={info.questions[QuestionN]} Finish={EndExam} changeQuestion={() => setQuestionN(QuestionN + 1)} current={QuestionN} Length={info.questions.length} />
            </>
        )
    }
  </div>
}

export default RealTest