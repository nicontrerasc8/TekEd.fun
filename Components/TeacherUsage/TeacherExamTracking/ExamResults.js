import React from 'react'

const ExamResults = ({info, idx, Open}) => {
  return <article key={idx}>
    <span>{info.n}</span>
    <strong className={info.ef > 50 ? info.ef > 80 ? "green" : "blue" : "red"}>{info.ef}%</strong>
    <button className='btn-primary' onClick={Open}>
        Ver Respuestas
    </button>
  </article>
}

export default ExamResults