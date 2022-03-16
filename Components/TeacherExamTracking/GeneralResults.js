import { useRouter } from 'next/router'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const GeneralResults = ({efficiency, responses}) => {

  return <div className='class-feed'>
         <article className='exam-cart border-blue'>
            <h1 className={efficiency <= 55 ? 'red' : (efficiency > 80 ? 'green' : undefined)}>{efficiency ? efficiency : 0}%</h1>
            <h3>de respuestas correctas</h3>
         </article>
         <article className='exam-cart border-green'>
            <h1 className='blue'>{responses}</h1>
            <h3>alumno{responses != 1 && 's'} respondi{responses != 1 ? 'eron' : 'ó'} el exámen.</h3>
         </article>
         {/* <article className=''>
            <h1>12s</h1>
            <h3>fue el tiempo promedio.</h3>
         </article> */}
     </div>
}

export default GeneralResults