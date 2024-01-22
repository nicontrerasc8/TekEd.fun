import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackDrop from '../VisualComponents/BackDrop'
import Counter from "../Utils/Counter"
import { Dificultades } from '../../Lib/arrays'
import toast from 'react-hot-toast'



const ChooseAlgebraGameType = ({IsIn, Submit, ShowDigits = true}) => {

     const [dificultad, setDificultad] = useState(0)
     const [Timer, setTimer] = useState(60)

  return <BackDrop isOn={IsIn}>
     <motion.div className='backdrop-form-container low-label'>
          {
               ShowDigits && <>
               <label>Selecciona la dificultad.</label>
               <div className='chooseDificultad'>
               {
                    Dificultades.length && Dificultades.map((info, idx) => {
                         return <button key={idx} 
                         onClick={() => setDificultad(info.n)}
                         className={dificultad === info.n ? info.back : !dificultad ? info.back : "dark"}>
                              {info.d}
                         </button>
                    })
               }
               </div>
              </>
          }

           <label>Tiempo por pregunta:</label>
               <Counter x={Timer} dif={5} setX={setTimer} min={1} max={10000}/> 
         <label className='seconds-label'>segundos</label>
           <button className='btn-secondary' type='button' onClick={
               ShowDigits ? dificultad ? () => Submit(dificultad, Timer) : () => toast.error("Elige un nivel de dificultad") : () => Submit(Timer)
           }>
              Empezar
         </button>
     </motion.div>
  </BackDrop>
}

export default ChooseAlgebraGameType