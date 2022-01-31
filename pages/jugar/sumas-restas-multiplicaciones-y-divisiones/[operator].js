import { toLower } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MetaTags from "../../../Components/Metatags"
import ExerciseContainer from '../../../Components/Play/ExerciseContainer';
import UseUserContext from '../../../Lib/context';


const Info = [
     {
          fn1: 1,
          fn2: 1, 
      },
     {
         fn1: 2,
         fn2: 1, 
     },
     {
         fn1: 3,
         fn2: 1, 
     },
     {
         fn1: 4,
         fn2: 1, 
     },
     {
         fn1: 2,
         fn2: 2, 
     },
     {
         fn1: 3,
         fn2: 2, 
     },
     {
         fn1: 4,
         fn2: 2, 
     },
     {
         fn1: 3,
         fn2: 3, 
     },
     {
         fn1: 4,
         fn2: 3, 
     },
     {
         fn1: 4,
         fn2: 4, 
     },
 ]

 const BtnContainer = ({ChangeLevels, Operator}) => {
      return  <div className='choose-level'>
      {
           Info && Info.map((data, idx) => {
                return <button key={idx}
                              onClick={() => ChangeLevels(data.fn1, data.fn2)} 
                              className={idx % 2 == 0 ? 'btn-primary' : 'btn-secondary'}>
                              <div>
                              <span>
                                  {data.fn1 === 1 && 8} 
                                  {data.fn1 === 2 && 54} 
                                  {data.fn1 === 3 && 820}
                                  {data.fn1 === 4 && 3264}
                            </span>   
                          <span>
                                  {Operator}&#160;
                                  {data.fn2 === 1 && 6} 
                                  {data.fn2 === 2 && 32} 
                                  {data.fn2 === 3 && 464}
                                  {data.fn2 === 4 && 7427}
                          </span>
                              </div>
                              <span className='text'>
                                   {data.fn1} cifra{data.fn1 > 1 && "s"} {Operator} {data.fn2} cifra{data.fn2 > 1 && "s"}
                              </span>
                </button>
           })
      }
 </div>
 }


const SRMDcontainer = () => {
     
     const router = useRouter()
     const {operator} = router.query
     const [ChooseLevel, setChooseLevel] = useState(false);
     const [Operador, setOperador] = useState("");
     const [Result, setResult] = useState(0);
     const { CorrectAnswers, WrongAnswers } = UseUserContext()
     const [V1, setV1] = useState(Number);
     const [V2, setV2] = useState(Number);
     const [Level, setLevel] = useState(1);
     const [Level2, setLevel2] = useState(1);
     const [Title, setTitle] = useState('');

     const ChangeLevel = (value1, value2) => {
          setChooseLevel(false)
          setLevel(value1)
          setLevel2(value2)
          window.scrollTo(0,0)
     }

     useEffect(() => {
       setTitle(`Ejercicios de ${operator.toLowerCase()}`)
     }, [operator]);

     useEffect(() => {
          var v1, v2, result
          v1 = Math.floor(Math.random() * Math.pow(10, Level) + 1);
          v2 = Math.floor(Math.random() * Math.pow(10, Level2) + 1)
          if (Level === 2 && v1 < 10) v1 += 10;
          if (Level === 3 && v1 < 100) v1 += 100;
          if (Level === 4 && v1 < 1000) v1 += 1000;
          if (Level2 === 2 && v2 < 10) v2 += 10;
          if (Level2 === 3 && v2 < 100) v2 += 100;
          if (Level2 === 4 && v2 < 1000) v2 += 1000;
          
          switch (operator) {
               case "Sumas":
                    result = v1 + v2
                    setOperador("+")
                    break;
               case "Restas":
                    if(v1 < v2){
                         var aux = v1
                         v1 = v2
                         v2 = aux
                    }
                    result = v1 - v2
                    setOperador("-")
                    break;
               case "Multiplicaciones":
                    result = v1 * v2
                    setOperador("✕")
                    break;
               case "Divisiones":
                    setLevel(2)
                    setLevel2(1)
                    do {
                         v1 = Math.floor(Math.random() * (Math.pow(10, Level) - 2) + 2);
                         v2 = Math.floor(Math.random() * (Math.pow(10, Level2) - 2) + 2);
                         if (Level === 2 && v1 < 10) v1 += 10;
                         if (Level === 3 && v1 < 100) v1 += 100;
                         if (Level === 4 && v1 < 1000) v1 += 1000;
                         if (Level2 === 2 && v2 < 10) v2 += 10;
                         if (Level2 === 3 && v2 < 100) v2 += 100;
                         if (Level2 === 4 && v2 < 1000) v2 += 1000;
                     } while (v1 % v2 != 0 || v2/2 % 2 != 0);
                     if (v1 === v2) v2 = v1/2 
                         var result = v1/v2
                         setOperador("÷")
                     break
               default:
                    break;
          }

          setV1(v1)
          setV2(v2)
          setResult(result)

     }, [ CorrectAnswers, WrongAnswers, Level, Level2 ]);
     
     

  return <>
     <MetaTags title={Title}/>
     <div className='play-page'>
          <h2>{Title}</h2>
          {
               ChooseLevel ? 
               <BtnContainer Operator={Operador} ChangeLevels={ChangeLevel}/>
               : <button 
                    onClick={() => setChooseLevel(true)}
                    className='btn-tertiary top-1rem'>
                    Elige un nivel
               </button>
          }
          <ExerciseContainer FinalResult={Result} FirstValue={V1} SecondValue={V2} Operator={<span>{Operador}</span>}/>
     </div>
  </>;
};

export default SRMDcontainer;
