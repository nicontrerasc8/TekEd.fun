import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Exam from '../../../../Components/Play/Exam';
import Link from 'next/link';
import MetaTags from '../../../../Components/Utils/Metatags';
import ExerciseContainer from '../../../../Components/Play/ExerciseContainer';
import UseUserContext from '../../../../Lib/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRocket } from '@fortawesome/free-solid-svg-icons';
import ChooseAlgebraGameType from "../../../../Components/PlayersUsage/ChooseAlgebraGameType"
import SetOptions from '../../../../Functions/SetTestOptions';

const TableNumber = () => {

  const [Questions, setQuestions] = useState([])
  const [ExamData, setExamData] = useState({preguntas: [], Operador: "Multiplicaciones"})
  const [IsChooseLevelsOpen, setIsChooseLevelsOpen] = useState(false)
  const [ChooseWay, setChooseWay] = useState(true)
  const [Title, setTitle] = useState('');
  const router = useRouter()
  const [IsAvailable, setIsAvailable] = useState(false)
  const [IsTableVisible, setIsTableVisible] = useState(false);
  const [MultNumbers, setMultNumbers] = useState([]);
  const { CorrectAnswers, WrongAnswers } = UseUserContext()
  const {num} = router.query
  const {maxNum} = router.query



  const Restart = () => {
    setIsChooseLevelsOpen(true)
    setQuestions([])
    setExamData({
         preguntas: [],
         Operador: "Multiplicaciones"
    })
}

const ChooseWaye = () => {
  setChooseWay(false)
  setIsTableVisible(false)
  setIsChooseLevelsOpen(true)
}

  const SetLevels = (timer) => {
    var arr = []
     for (let i = 0; i < maxNum; i++) {
         arr.push({
              value1: i+1,
              value2: num,
              timePerQuestion: timer,
              options: SetOptions(i+1 , (num * (i+1)))
         })
     }
     for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
     setIsChooseLevelsOpen(false)
     console.table(arr)
     setQuestions(arr)
}


  useEffect(() => {
    setTitle(`Practica ejercicios de la tabla del ${num}`)
  }, [num]);

  useEffect(() => {
    var MultArr = []
    for (let i = 1; i <= maxNum; i++) {
      MultArr.push(i)
      setMultNumbers(MultArr)
    }
  }, [maxNum, num, ]);
  

  useEffect(() => {
    if(Questions.length > 0) {
         setIsAvailable(true)
         setExamData({
              preguntas: Questions,
              Operador: "multiplicaciones"
         })
    }
  }, [Questions])
  
  

  return <>
    <MetaTags title={Title}/>
    <ChooseAlgebraGameType IsIn={IsChooseLevelsOpen} Submit={SetLevels} ShowDigits={false}/>
    <div className='play-page'>
      <h2>{Title}</h2>
      {
        ChooseWay ? <>
          <button style={{margin: "1rem 0"}}
        type='button'
        onClick={() => setIsTableVisible(!IsTableVisible)}
        className="btn-primary">
        {
          IsTableVisible ? 'Ocultar la tabla' : 'Ver la tabla'
        }
      </button>
      <button 
        type='button'
        className='btn-secondary'
        onClick={ChooseWaye}
        >
        Empezar a practicar
      </button>
      {IsTableVisible && <div className='multiplication-table'>
           {
              MultNumbers && MultNumbers.map((data,idx) => {
               return <div key={idx} className='multiplication-example'>
                 {num} &#10005; {data} = <span className='multiplication-result'>{num * data}</span>
               </div>
             })
           }
         </div>
         }
        </> : <>
        <div className='multiplication-table'>
           {
             MultNumbers && IsTableVisible && MultNumbers.map((data,idx) => {
               return <div key={idx} className='multiplication-example'>
                 {num} &#10005; {data} = <span className='multiplication-result'>{num * data}</span>
               </div>
             })
           }
         </div>
          <>
         {
              IsAvailable && (
                   ExamData.preguntas.length > 0 && <Exam Data={ExamData} IsClass={false}/>
              )
         }
         <button className='btn-primary m-top-2rem little-btn' onClick={Restart}>
              <FontAwesomeIcon icon={faRocket}/> Reiniciar
         </button>
           <Link href={"/jugar"}>
              <button className='btn-secondary m-top-1rem little-btn'>
                  <FontAwesomeIcon icon={faHome}/> Volver al inicio
              </button>
         </Link>
         </>
        </>
        
    
      }
    </div>
  </>
};

export default TableNumber;
