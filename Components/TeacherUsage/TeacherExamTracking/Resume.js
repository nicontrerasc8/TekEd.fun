import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const Resume = ({Data}) => {

     const [Operador, setOperador] = useState('')
     const [ShowQuestions, setShowQuestions] = useState(false)

     useEffect(() => {
       if(Data.Operador === 'sumas') setOperador("+")
       else if(Data.Operador === 'restas') setOperador("-")
       else if(Data.Operador === 'multiplicaciones') setOperador("&#10005;")
       else setOperador("&divide;")
     }, [Data])

  return <div className='resume'>
      <h1>Examen {Data.ExamTitle}</h1>
    <p>Número de preguntas: <span className='blue'>{Data.preguntas.length}</span></p>
    <p>Operador del examen: <span className='green'>{Data.Operador}</span></p>
    <button className='btn-tertiary' type='button' onClick={() => setShowQuestions(!ShowQuestions)}>
      {ShowQuestions ? <>
      <FontAwesomeIcon icon={faEyeSlash}/> Ocultar preguntas
      </>
     : <>
          <FontAwesomeIcon icon={faEye}/> Ver preguntas
     </> 
     }
    </button>
    <ul>
    {
     ShowQuestions && Data.preguntas.map((data,idx) => {
        return <article key={idx} className={idx % 2 === 0 ? 'border-green' : 'border-blue'}>
          <span className={idx % 2 === 0 ? 'blue' : 'green'}>{idx + 1}.</span> {data.value1} {Operador} {data.value2}
        </article>
      })
    }
    </ul>
  </div>
}

export default Resume