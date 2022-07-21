import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackDrop from '../VisualComponents/BackDrop'
import Counter from "../Utils/Counter"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import UseUserContext from '../../Lib/context'

const TestParams = ({IsIn, Submit, IsNotRadix = true}) => {

   const router = useRouter()

   const [CounterX, setCounter] = useState(1)
   const [Timer, setTimer] = useState(60)
   const [IsPotRad, setIsPotRad] = useState(false)
   const {operator} = router.query

   const {ExpRad_Number, setExpRad_Number} = UseUserContext()

   useEffect(() => {
      if(router.pathname === "/jugar/potenciacion-radicacion/[operator]") setIsPotRad(true)
      else setIsPotRad(false)
      setExpRad_Number(2)
   }, [router.pathname])
     

     

  return <BackDrop isOn={IsIn}>
     <motion.div className='backdrop-form-container low-label'>
      {
       IsPotRad && <>
         <label>Selecciona el número de cifras del {IsNotRadix ? "exponente" : "radical"}.</label>
         <Counter x={ExpRad_Number} setX={setExpRad_Number} min={2} max={operator === "radicacion" ? 3 : 4}/>
       </>
      }
              {
               IsNotRadix && <>
               <label>Número de cifras de los números.</label>
               <Counter x={CounterX} setX={setCounter} min={1} max={3}/>
              </>
              }
           <label>Tiempo por pregunta:</label>
               <Counter x={Timer} setX={setTimer} min={1} max={10000} dif={5}/> 
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