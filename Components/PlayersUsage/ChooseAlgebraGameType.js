import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackDrop from '../VisualComponents/BackDrop'
import Counter from "../Utils/Counter"

const ChooseAlgebraGameType = ({IsIn, Submit, IsDivision, ShowDigits = true, IsExam}) => {

     const [Counter1, setCounter1] = useState(IsDivision ? 2 : 1)
     const [Counter2, setCounter2] = useState(1)
     const [Timer, setTimer] = useState(60)

  return <BackDrop isOn={IsIn}>
     <motion.div className='backdrop-form-container low-label'>
    {/*       <h2>¡Practica en Matio!</h2>
          <h5>Elige tu tipo de examen</h5> */}
         {
              ShowDigits &&
              <>
               <label>Número de cifras del 1er número.</label>
               <Counter IsTheSecond={false} OtherValue={Counter2} x={Counter1} setX={setCounter1} min={IsDivision ? 2 : 1} max={4}/>
               <label>Número de cifras del 2do número.</label>
               <Counter IsTheSecond={true} OtherValue={Counter1} IsGreen={true} x={Counter2} setX={setCounter2} min={1} max={4}/>
              </>
         }
           <label>Tiempo por pregunta:</label>
               <Counter IsTheSecond={false} OtherValue={-1} x={Timer} dif={5} setX={setTimer} min={1} max={10000}/> 
         <label className='seconds-label'>segundos</label>
           <button className='btn-secondary' type='button' onClick={
                ShowDigits ? () => Submit(Counter1, Counter2, Timer) : () => Submit(Timer)
           }>
              Empezar
         </button>
     </motion.div>
  </BackDrop>
}

export default ChooseAlgebraGameType