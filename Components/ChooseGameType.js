import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackDrop from './BackDrop'
import Counter from './Counter'

const ChooseGameType = ({IsIn, Sumbit, IsDivision}) => {

     const [Counter1, setCounter1] = useState(IsDivision ? 2 : 1)
     const [Counter2, setCounter2] = useState(1)
     const [Counter3, setCounter3] = useState(10)

  return <BackDrop isOn={IsIn}>
     <motion.div className='backdrop-form-container low-label'>
    {/*       <h2>¡Practica en Matio!</h2>
          <h5>Elige tu tipo de examen</h5> */}
          <label>Número de cifras del 1er número.</label>
          <Counter IsTheSecond={false} OtherValue={Counter2} x={Counter1} setX={setCounter1} min={IsDivision ? 2 : 1} max={4}/>
          <label>Número de cifras del 2do número.</label>
          <Counter IsTheSecond={true} OtherValue={Counter1} IsGreen={true} x={Counter2} setX={setCounter2} min={1} max={4}/>
          <label>Número de preguntas:</label>
          <Counter IsTheSecond={false} OtherValue={-1} x={Counter3} setX={setCounter3} min={1} max={100}/>
          <button className='btn-tertiary' type='button' onClick={() => Sumbit(Counter1,Counter2,Counter3)}>
               Empezar
          </button>
     </motion.div>
  </BackDrop>
}

export default ChooseGameType