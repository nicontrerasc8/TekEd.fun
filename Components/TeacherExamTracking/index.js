import React, { useEffect, useState } from 'react'
import GeneralResults from './GeneralResults'
import StudentsResult from './StudentsResult'

const TeacherExamTracking = ({Data}) => {

  const [GeneralEfficiency, setGeneralEfficiency] = useState(0)
  const [Responses, setResponses] = useState(0)

  useEffect(() => {
      var c1 = 0
      var c2 = 0
      for (let i = 0; i < Data.respuestas.length; i++) {
        for (let j = 0; j < Data.respuestas[i].Respuestas.length; j++) {
          if(Data.respuestas[i].Respuestas[j].correct) ++c1
          ++c2;
        }
      }
      setGeneralEfficiency(c1/c2*100)
      setResponses(Data.respuestas.length)
  }, [])
  

  return <div className='dashboard class'>
    <h2 className='class-feed-title'>Resultados generales:</h2>
    <GeneralResults efficiency={GeneralEfficiency} responses={Responses}/>
    <h2 className='class-feed-title'>Resultados por estudiante:</h2>
    <StudentsResult data={Data}/>
  </div>
}

export default TeacherExamTracking