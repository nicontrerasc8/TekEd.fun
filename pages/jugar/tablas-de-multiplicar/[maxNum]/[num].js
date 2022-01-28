import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MetaTags from '../../../../Components/Metatags';
import ExerciseContainer from '../../../../Components/Play/ExerciseContainer';
import UseUserContext from '../../../../Lib/context';

const TableNumber = () => {

  const [Title, setTitle] = useState('');
  const router = useRouter()
  const [Multiplier, setMultiplier] = useState(0);
  const [Result, setResult] = useState(0);
  const [IsTableVisible, setIsTableVisible] = useState(false);
  const [MultNumbers, setMultNumbers] = useState([]);
  const { CorrectAnswers, WrongAnswers } = UseUserContext()
  const {num} = router.query
  const {maxNum} = router.query

  var MultArr = []

  useEffect(() => {
    setTitle(`Aprende la tabla del ${num}`)
  }, [num]);

  useEffect(() => {
    for (let i = 1; i <= maxNum; i++) {
      MultArr.push(i)
      setMultNumbers(MultArr)
    }
  }, [maxNum, num]);
  

  useEffect(() => {
    var m = Math.floor(Math.random() * (maxNum - 1) + 1)
    var r = m * num
    setMultiplier(m)
    setResult(r)
    return () => 0
  }, [CorrectAnswers, WrongAnswers, num, maxNum]);
  
  

  return <>
    <MetaTags title={Title}/>
    <div className='play-page'>
      <h2>{Title}</h2>
      <button style={{margin: "1rem 0"}}
        type='button'
        onClick={() => setIsTableVisible(!IsTableVisible)}
        className={IsTableVisible ? 'btn-secondary' : 'btn-primary'}>
        {
          IsTableVisible ? 'Practicar' : 'Ver la tabla'
        }
      </button>
      {
          IsTableVisible ? 
          <div className='multiplication-table'>
            {
              MultNumbers && MultNumbers.map((data,idx) => {
                return <div key={idx} className='multiplication-example'>
                  {num} &#10005; {data} = <span className='multiplication-result'>{num * data}</span>
                </div>
              })
            }
          </div>
          : <ExerciseContainer FinalResult={Result} FirstValue={Multiplier} SecondValue={num} Operator={<span>&#10005;</span>}/>
      }
    </div>
  </>
};

export default TableNumber;
