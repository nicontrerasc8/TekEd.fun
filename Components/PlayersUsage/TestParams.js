import { motion } from 'framer-motion'
import React, { useState } from 'react'
import BackDrop from '../VisualComponents/BackDrop'
import Counter from "../Utils/Counter"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import UseUserContext from '../../Lib/context'
import { Dificultades } from '../../Lib/arrays'
import toast from 'react-hot-toast'

const TestParams = ({IsIn, Submit, IsNotRadix = true}) => {

   const router = useRouter()

   const [dificultad, setDificultad] = useState(0)
   const [Timer, setTimer] = useState(60)
   const [IsPotRad, setIsPotRad] = useState(false)
   const [IsMediaMedianaModa, setIsMediaMedianaModa] = useState(false)
   const {operator} = router.query

   const {ExpRad_Number, setExpRad_Number} = UseUserContext()

   useEffect(() => {
      if(router.pathname === "/jugar/potenciacion-radicacion/[operator]") {
         setIsPotRad(true)
         setDificultad(2)
      }
      else setIsPotRad(false)
      if(router.pathname === "/jugar/media-mediana-moda/[measure]") {
         setIsMediaMedianaModa(true)
         setDificultad(1)
      }
      else {
         setIsMediaMedianaModa(false)
         setDificultad(0)
      }
      setExpRad_Number(2)
   }, [router.pathname])

   useEffect(() => {
      if(IsPotRad) setDificultad(2)
   }, [IsPotRad])
     

     

  return <BackDrop isOn={IsIn}>
     <motion.div className='backdrop-form-container low-label'>
      {
       IsPotRad && <>
         <label>Selecciona el número de cifras del {IsNotRadix ? "exponente" : "radical"}.</label>
         <Counter x={ExpRad_Number} setX={setExpRad_Number} min={2} max={operator === "radicacion" ? 3 : 4}/>
       </>
      }
      {
         IsPotRad && IsNotRadix &&
         <>
         <label>
            Selecciona el número de cifras de{IsNotRadix ? " la base" : "l radicando"}
         </label>
                  <Counter x={dificultad} setX={setDificultad} min={1} max={operator === "radicacion" ? 3 : 4}/>
         </>
      }
         { !IsMediaMedianaModa && !IsPotRad &&
              <div className='chooseDificultad'>
                {
                    Dificultades.length && Dificultades.map((info, idx) => {
                         if(info.n < 4) return <button key={idx} 
                         onClick={() => setDificultad(info.n)}
                         className={dificultad === info.n ? info.back : !dificultad ? info.back : "dark"}>
                              {info.d}
                         </button>
                    })
               } 
               </div>
               }
           <label>Tiempo por pregunta:</label>
               <Counter x={Timer} setX={setTimer} min={1} max={10000} dif={5}/> 
         <label className='seconds-label'>segundos</label>
           <button className='btn-secondary' type='button' onClick={
                () => dificultad ? Submit(dificultad, Timer) : toast.error("Elige la dificultad")
           }>
              Empezar
         </button>
     </motion.div>
  </BackDrop>
}

export default TestParams