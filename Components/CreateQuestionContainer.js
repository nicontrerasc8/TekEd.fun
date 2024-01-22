import { parse } from '@fortawesome/fontawesome-svg-core'
import React, { useEffect, useState } from 'react'
import CreateAP from "./TeacherUsage/CreateQuestion/AreaPerimetro"
import {FaChevronDown, FaChevronUp, FaDivide, FaMinus, FaTimes} from "react-icons/fa"
import CreateSRMD from './TeacherUsage/CreateQuestion/SRMD'
import CreatePR from './TeacherUsage/CreateQuestion/PotRad'



const Categories = [
  {
    cat: "Sumas",
    n: 0,
    symbol: '+'
  },
  {
    cat: "Restas",
    n: 0,
    symbol: '-'
  },
  {
    cat: "Multiplicaciones",
    n: 0,
    symbol: '✕'
  },
  {
    cat: "Divisiones",
    n: 0,
    symbol: '÷'
  },
  {
    cat: "Área",
    n: 1
  },
  {
    cat: "Perimetro",
    n: 1
  },
  {
    cat: "Potenciación",
    n: 2
  },
  {
    cat: "Radicación",
    n:2
  },
]

const ChooseCategoryGameType = ({Actual, Change}) => {

  const [Show, setShow] = useState(false)
  const ChangeFN = (cat) => {
    setShow(false)
    Change(cat)
  }

  return <div className='choose-category-div'>
    <button className='btn-primary choose-cat' onClick={() => setShow(!Show)}>
      {Actual.cat} {
        Show ? <FaChevronUp/> : <FaChevronDown/>
      }
    </button>
    {
      Show && Categories.length && Categories.map((info, idx) => {
       if(Actual.cat != info.cat) return <button key={idx} className='btn-primary choose-cat' onClick={() => ChangeFN(info)}>
          {info.cat}
        </button>
      })
    }
  </div>

}





const CreateQuestionContainer = ({SetNew, NewQuestion, NewQuestions}) => {

    const [ExCat, setExCat] = useState(0)
    const [IsOn, setIsOn] = useState(true)
    const [GameType, setGameType] = useState({
      cat: "Sumas",
      n: 0,
      symbol: '+'
    },)

    const SetNewQuestion = () => {
      SetNew()
      setIsOn(false)
    }

    useEffect(() => {
      setExCat(GameType.n)
    }, [GameType.n])

  return <div>
      {
        IsOn && <div style={{marginTop: "15px", display:"flex", flexDirection: "column", alignItems: "center"}}>
        <h2>Añade la preguntas a tu examen</h2>
      <h4>Elige la temática de la pregunta</h4>
    <ChooseCategoryGameType Actual={GameType} Change={(e) => setGameType(e)}/>
    </div>
      }
    {
      !ExCat ? <CreateSRMD type={GameType} SetNew={SetNew} NewQuestion={NewQuestion} NewQuestions={NewQuestions} Open={() => setIsOn(false)} ResetFN={() => setIsOn(true)}/>
      : ExCat === 1 ? <CreateAP type={GameType} SetNew={SetNew} NewQuestion={NewQuestion} NewQuestions={NewQuestions}  Open={() => setIsOn(false)} ResetFN={() => setIsOn(true)}/>
      : ExCat === 2 && <CreatePR type={GameType} SetNew={SetNew} NewQuestion={NewQuestion} NewQuestions={NewQuestions} Open={() => setIsOn(false)} ResetFN={() => setIsOn(true)}/>
    }
  </div>
}

export default CreateQuestionContainer