import React, { useEffect, useState } from 'react'
import MetaTags from '../../../Components/Metatags'
import ExerciseContainer from '../../../Components/Play/AlgebraExContainer';

const Page = () => {

    const [IsTableVisible, setIsTableVisible] = useState(false);
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    const [Z, setZ] = useState(0)
    useEffect(() => {
        var x;
        var y = Math.floor(Math.random() * 10 + 1)
        var z = Math.floor(Math.random() * 10 + 1)*y
        x = z/y;
        console.log(`${y}x = ${z}`)
        console.log(`x = ${x}`)
        setX(x)
        setY(y)
        setZ(z)
    }, [])
    

  return <>
    <MetaTags title='Algebra'/>
    <div className='play-page'>
      <h2>Ecuaciones de primer grado</h2>
      <ExerciseContainer FirstValue={Y} SecondValue={Z} FinalResult={X} />
    </div>
  </>
}

export default Page