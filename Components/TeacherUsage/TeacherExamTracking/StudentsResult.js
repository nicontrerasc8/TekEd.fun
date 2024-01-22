import { faCheck, faEye, faHandPaper, faInfo, faInfoCircle, faPaperclip, faPercent, faTimes, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InformsContainer from '../InformsContainer'

const StudentCart = ({info, setInform}) => {

  const [Efficiency, setEfficiency] = useState(0)

  useEffect(() => {
    var c = 0
    var w = 0
    for (let i = 0; i < info.Respuestas.length; i++) {
        if(info.Respuestas[i].correct) ++c;
        ++w;
    }
    setEfficiency(c/w * 100)
  }, [info])
  

  return <tr>
    <td>{info.User}</td>
    <td className={Efficiency <= 55 ? 'red' : (Efficiency > 80 ? 'green' : undefined)}>{Efficiency}</td>
    <td>
        <button onClick={() => setInform(info)} className={Efficiency <= 55 ? 'b-red' : (Efficiency > 80 ? 'btn-secondary' : "btn-tertiary")}>
          <strong>
            <FontAwesomeIcon icon={faEye}/>
          </strong> <span>
            Ver informe
          </span>
        </button>
    </td>
  </tr>
}

const StudentsResult = ({data}) => {

  const [InformsData, setInformsData] = useState(null)
  const [IsInform, setIsInform] = useState(false)

  const SetTheInform = (i) => {
      setInformsData(i)
      setIsInform(true)
  }

  return (
      data.respuestas.length > 0 ? <>
      <InformsContainer IsIn={IsInform} Data={InformsData} Out={() => setIsInform(false)}/>
        <table className='results'>
          <tr>
            <th>
              <FontAwesomeIcon icon={faUserAstronaut}/> <span>Alumno(a)</span>
            </th>
            <th>

                <FontAwesomeIcon icon={faPercent}/> <span>efectividad</span>
            </th>
            <th>
              <FontAwesomeIcon icon={faInfoCircle}/> <span>informe</span>
            </th>
          {/*   <h2>% de efectividad</h2> */}
          </tr>
          {
            data.respuestas.map((information,idx) => {
              return <StudentCart key={idx} info={information} i={idx} setInform={SetTheInform}/>
            })
          }
        </table>
      </> : <p className="center">Aún no hay <span className='blue'>respuestas</span> por parte de tus <span className='green'>estudiantes</span>.</p>
    )
}

export default StudentsResult