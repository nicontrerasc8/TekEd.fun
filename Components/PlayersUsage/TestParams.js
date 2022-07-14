import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackDrop from '../VisualComponents/BackDrop'
import Counter from "../Utils/Counter"

const TestParams = ({IsIn, Submit}) => {

     const [CounterX, setCounter] = useState(1)
     const [Timer, setTimer] = useState(60)

  return <BackDrop isOn={IsIn}>
     <motion.div className='backdrop-form-container low-label'>
              <>
               <label>Número de cifras de los números.</label>
               <Counter IsTheSecond={false} OtherValue={-1} x={CounterX} setX={setCounter} min={1} max={3}/>
              </>
           <label>Tiempo por pregunta:</label>
               <Counter IsTheSecond={false} OtherValue={-1} x={Timer} setX={setTimer} min={1} max={10000} dif={5}/> 
         <label className='seconds-label'>segundos</label>
           <button className='btn-secondary' type='button' onClick={
                () => Submit(CounterX, Timer)
           }>
              Empezar
         </button>
     </motion.div>
  </BackDrop>
}

export default TestParams