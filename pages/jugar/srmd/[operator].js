import { faHome, faRocket, faTruckLoading, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ChooseAlgebraGameType from '../../../Components/PlayersUsage/ChooseAlgebraGameType';
import Exam from "../../../Components/Play/Exam"
import InformsContainer from '../../../Components/TeacherUsage/InformsContainer';
import MetaTags from '../../../Components/Utils/Metatags';
import UseUserContext from '../../../Lib/context';
import SetOptions from '../../../Functions/SetTestOptions';



const SRMDcontainer = () => {
     
     const router = useRouter()
     const [IsChooseLevelsOpen, setIsChooseLevelsOpen] = useState(true)
     const [Questions, setQuestions] = useState([])
     const [ExamData, setExamData] = useState({
          preguntas: [],
          Operador: undefined
     })
     const {operator} = router.query
     const [Operador, setOperador] = useState("");
     const [Title, setTitle] = useState('');
     const [IsAvailable, setIsAvailable] = useState(false)

     const Restart = () => {
          setIsChooseLevelsOpen(true)
          setQuestions([])
          setExamData({
               preguntas: [],
               Operador: operator
          })
     }

     const SetLevels = (c1, timer) => {
          var arr = []
           var v1, v2
           for (let i = 0; i < 7; i++) {
               v1 = Math.floor(Math.random() * Math.pow(10, c1) + 1);
               v2 = Math.floor(Math.random() * Math.pow(10, c1) + 1);
               if (c1 === 2 && v1 < 10) v1 += 10;
               if (c1 === 3 && v1 < 100) v1 += 100;
               if (c1 === 4 && v1 < 1000) v1 += 1000;
               if (c1 === 2 && v2 < 10) v2 += 10;
               if (c1 === 3 && v2 < 100) v2 += 100;
               if (c1 === 4 && v2 < 1000) v2 += 1000;
               if(v2 > v1){
                    var aux = v1
                    v1 = v2
                    v2 = aux
               }
               var resp 
               if(operator == "divisiones"){
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
               if(operator == "sumas") resp = v1 + v2
               else if(operator == "restas") resp = v1 - v2
               else if(operator == "multiplicaciones") resp = v1 * v2
               arr.push({
                    value1: v1,
                    value2: v2, 
                    timePerQuestion: timer,
                    options: SetOptions(v1, resp)
               })
               console.log(arr)
           }
           setIsChooseLevelsOpen(false)
           setQuestions(arr)
     }

     

     useEffect(() => {
       setTitle(`Practica ejercicios de ${operator}`)
     }, [operator]);

     useEffect(() => {
          setQuestions([])
          switch (operator) {
               case "sumas":
                    setOperador("+")
                    break;
               case "restas":
                    setOperador("-")
                    break;
               case "multiplicaciones":
                    setOperador("✕")
                    break;
               case "divisiones":
                    setOperador("÷")
                    break;
               default:
                    break;
          }
     }, [ operator ]);
     
     useEffect(() => {
          if(Questions.length > 0) {
               setIsAvailable(true)
               setExamData({
                    preguntas: Questions,
                    Operador: operator,
               })
          }
        }, [Questions])

  return <>
     <MetaTags title={Title}/>
     <ChooseAlgebraGameType IsIn={IsChooseLevelsOpen} Submit={SetLevels} IsDivision={operator == "divisiones"}/>
     <div className='play-page'>
          <h2>{Title}</h2>
          <br style={{height: "1rem"}}/>
          {
               IsAvailable && (
                    ExamData.preguntas.length > 0 &&  <Exam Data={ExamData} IsClass={false}/>
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
     </div>
  </>;
};

export default SRMDcontainer;
