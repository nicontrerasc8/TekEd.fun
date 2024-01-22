import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Dificultades } from '../../../Lib/arrays'
import Counter from '../../Utils/Counter'
import ChooseCategoryGameType from './ChooseCatGameType'

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
const Unidades = [
  "Metro", "Kilometro", "Centimetro", 
]

function Options(correct){
  var randomic = Math.floor(Math.random() * 2.99)
  var AuxArr = []
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
    AuxArr.push({
      c: classB,
      n: n
    })
  }
  return AuxArr
} 

const AutomateQuestion = ({type, AddQuestions, close}) => {

    const [dificultad, setDificultad] = useState(0)
    const [Segundos, setSegundos] = useState(10)
    const [Minutos, setMinutos] = useState(1)
    const [Questions, setQuestions] = useState(10)
    const [Expo, setExpo] = useState(2)
    const [OpenAutomated, setOpenAutomated] = useState(false)
    const [SelectedCategoryAP, setSelectedCategoryAP] = useState({
      cat: "Círculo",
      n: 0
    })

    const Set = () => {
        var arr = []
        if(!dificultad){
          toast.error("Elije un nivel de dificultad")
          return 0
        }
        if((!Minutos && Segundos < 1) || isNaN(Minutos) || isNaN(Segundos)){
          toast.error("El tiempo debe ser un valor válido")
          return 0  
        }
        var v1, v2, v3
        var TotalTime = parseFloat(Minutos) * 60 + parseFloat(Segundos)
        var ArrOfOptions = []
        var correct
        for (let i = 0; i < Questions; i++) {
          switch (type.n) {
            case 0:
              v1 = Math.floor(Math.random() * Math.pow(10, dificultad) + 1);
              v2 = Math.floor(Math.random() * Math.pow(10, dificultad) + 1);
              if (dificultad === 2 && v1 < 10) v1 += 10;
              if (dificultad === 3 && v1 < 100) v1 += 100;
              if (dificultad === 4 && v1 < 1000) v1 += 1000;
              if (dificultad === 2 && v2 < 10) v2 += 10;
              if (dificultad === 3 && v2 < 100) v2 += 100;
              if (dificultad === 4 && v2 < 1000) v2 += 1000;
              if(v2 > v1){
                   var aux = v1
                   v1 = v2
                   v2 = aux
              }
              if(type.cat == "Divisiones"){
               do {
                    v1 = Math.floor(Math.random() * (Math.pow(10, c1) - 2) + 2);
                    v2 = Math.floor(Math.random() * (Math.pow(10, c1) - 2) + 2);
                    if (c1 === 2 && v1 < 10) v1 += 10;
                    if (c1 === 3 && v1 < 100) v1 += 100;
                    if (c1 === 4 && v1 < 1000) v1 += 1000;
                    if (c1 === 2 && v2 < 10) v2 += 10;
                    if (c1 === 3 && v2 < 100) v2 += 100;
                    if (c1 === 4 && v2 < 1000) v2 += 1000;
                } while (v1 % v2 != 0 || v2/2 % 2 != 0);
                if (v1 === v2) v2 = v1/2 
                resp = v1/v2
          }


              var html = `<div class="exercise-container">
              <div class='exercise'>
              <h2>${v1}</h2>
              <h2>${type.symbol} ${v2}</h2>
           </div>
              </div>`
            

              switch (type.cat) {
               case 'Sumas':
                 correct = parseFloat(v1) + parseFloat(v2)
                 break;
               case 'Restas':
                correct = parseFloat(v1) - parseFloat(v2)
                 console.log
                 break;
               case 'Multiplicaciones':
                 correct = parseFloat(v1) * parseFloat(v2)
                 break;
               case 'Divisiones':
                 correct = parseFloat(v1) / parseFloat(v2)
                 break;
               default:
                 break;
             }
             ArrOfOptions = Options(correct)

              arr.push({
               tema: type.cat,
               htmlContent: html,
               ArrOfOptions: ArrOfOptions,
               correct: correct,
               time: TotalTime
            })
              break;
            case 1:
              var Unidad = Unidades[Math.floor(Math.random() * 3)]
              v1 = Math.floor(Math.random() * Math.pow(10, dificultad) + 1);
              v2 = Math.floor(Math.random() * Math.pow(10, dificultad) + 1);
              v3 = Math.floor(Math.random() * Math.pow(10, dificultad) + 1);
              if (dificultad === 2 && v1 < 10) v1 += 10;
              if (dificultad === 3 && v1 < 100) v1 += 100;
              if (dificultad === 4 && v1 < 1000) v1 += 1000;
              if (dificultad === 2 && v2 < 10) v2 += 10;
              if (dificultad === 3 && v2 < 100) v2 += 100;
              if (dificultad === 4 && v2 < 1000) v2 += 1000;
              if (dificultad === 2 && v2 < 10) v3 += 10;
              if (dificultad === 3 && v2 < 100) v3 += 100;
              if (dificultad === 4 && v2 < 1000) v3 += 1000;
              switch (SelectedCategoryAP.n) {
                case 0:
                  html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un círculo de ${v1} ${Unidad.toLowerCase()}${Unidad.length > 1 && "s"} de radio?</h2>`
                  if(type.cat == "Área") correct = Math.pow(parseFloat(v1), 2) * 3.14
                  else correct = parseFloat(v1) * 2 * 3.14
                  break;
                case 1:
                  if(type.cat == "Área"){
                    html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un triángulo rectángulo de ${v1} ${Unidad.toLowerCase()}${v1 > 1 && "s"} de base y ${v2} ${Unidad}${v2 > 1 && "s"} de altura?</h2>`
                    correct = parseFloat(v1) * parseFloat(v2) / 2
                  } 
                  else {
                    correct = parseFloat(v1) + parseFloat(v2) + parseFloat(v3)
                    html = `<h2 class='top-h2'>¿Cuál es el perimetro del triángulo?</h2>`
                  }
                  break;
                case 2: 
                  html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un cuadrado cuyos lados miden ${v1} ${Unidad.toLowerCase()}${v1 > 1 && "s"}?</h2>`
                  if(type.cat == "Área") correct = Math.pow(parseFloat(v1),2)
                  else correct = parseFloat(v1) * 4
                  break;
                case 3:
                  html = `<h2 class='top-h2'>¿Cuál es el ${type.cat.toLowerCase()} de un rectángulo cuyos lados miden ${v1} ${Unidad.toLowerCase()}${v1 > 1 && "s"} y ${v2} ${Unidad.toLowerCase()}${v2 > 1 && "s"}?</h2>`
                  if(type.cat == "Área") correct = parseFloat(v1) * parseFloat(v2)
                  else correct = parseFloat(v1) * 2 + parseFloat(v2) * 2
                default:
                  break;
              }
              ArrOfOptions = Options(correct)

              arr.push({
               tema: type.cat,
               htmlContent: html,
               ArrOfOptions: ArrOfOptions,
               correct: correct,
               time: TotalTime,
               data: {
                type: SelectedCategoryAP,
                f1: v1,
                f2: v2,
                f3: v3
              },
            })
              break;
            case 2:
              v1 = Math.floor(Math.random() * Math.pow(10, dificultad) + 1);
              switch (type.cat) {
                case 'Potenciación':
                  var text = ""
                  switch (Expo) {
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
                  html = `<h2 class='top-h2'>¿Cuánto es ${v1} a${text}?</h2>`
                   correct = Math.pow(v1, Expo)
                  break;
                case 'Radicación':
                  var text = ""
                  switch (Expo) {
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
                  html = `<h2 class='top-h2'>¿Cuál es la raíz ${text} de ${v1}</h2>`
                  var ans = Math.pow(v1, 1/Expo)
                  var aux = Math.pow(v1, 1/Expo)
                  if(ans.toFixed(2) != aux) ans = aux.toFixed(2) 
                  correct = ans
                  break;
                default:
                  break;
              }
              ArrOfOptions = Options(correct)

              arr.push({
               tema: type.cat,
               htmlContent: html,
               ArrOfOptions: ArrOfOptions,
               correct: correct,
               time: TotalTime,
               data: {
                f1: v1,
                f2: v2,
              },
            })


            default:
              break;
          }

        }
        AddQuestions(arr)
        toast.success("Tus preguntas han sido añadidas con éxito!")
        window.scrollTo(0,0)
        setOpenAutomated(false)
    }

  return <>
  <button onClick={() => setOpenAutomated(!OpenAutomated)} className="btn-secondary" style={{margin: "calc(1vh + 10px) auto"}}>Crea las preguntas automáticamente</button>
  {
    OpenAutomated && <div className='automate-question'>
    {
      type.n === 1 ?
      <>
        <ChooseCategoryGameType Actual={SelectedCategoryAP} Change={(e) => setSelectedCategoryAP(e)} Array={Categories}/>
      </>
      : ""
    }
  {
    type.n === 2 ? <>
    <p>Elije tu {type.cat == "Potenciación" ? "exponente" : "radical"}</p>
      <Counter x={Expo} setX={setExpo} min={2} max={type.cat === "Radicación" ? 3 : 4}/>
    </> : ""
  }
  <p style={{marginBottom: "10px"}}>¿De qué dificultad quieres que sean la pregunta?</p>
  <div className='chooseDificultad'>
      {
          Dificultades.length && Dificultades.map((info, idx) => {
               if((type.n != 1|| (type.n === 1  && info.n < 4)) && ((type.n != 2) || type.cat === "Potenciación" || (type.cat === "Radicación" && info.n < 4)))
               return <button key={idx} 
               onClick={() => setDificultad(info.n)}
               className={dificultad === info.n ? info.back : !dificultad ? info.back : "dark"}>
                    {info.d} &#40;{info.n} cifra{(info.n > 1) ? "s" : ""}&#41; 
               </button>
          })
     } 

      <p>Tiempo por pregunta:</p>
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
      <p>Cantidad de preguntas</p>
      <Counter x={Questions} dif={1} setX={setQuestions} min={1} max={10000}/>
      </div>
      <button className='btn-tertiary'  onClick={Set}>Crea las preguntas</button>
     
</div>
  }
  </>
}

export default AutomateQuestion