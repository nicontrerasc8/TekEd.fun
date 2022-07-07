import { faMeteor, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InformsContainer from '../../Components/TeacherUsage/InformsContainer'
import UseUserContext from '../../Lib/context'

const ExamCart = ({data, idx, ShowInform}) => {

     const [Done, setDone] = useState(false)
     const {user} = UseUserContext()

     const [Data, setData] = useState(null)

     useEffect(() => {
       for (let i = 0; i < data.respuestas.length; i++) {
            if(data.respuestas[i].UserID == user.uid) {
               setDone(true)
               setData(data.respuestas[i])
            }
       }
     }, [])
     

     return <>
          <article className={idx % 2 != 0 ? 'exam-cart border-green' : 'exam-cart border-blue'} key={idx}>
               <span className={`cart-icon ${idx % 2 === 0 ? 'green' : 'blue'}`}>
               <FontAwesomeIcon icon={idx % 2 == 0 ? faMeteor : faSpaceShuttle}/>
               </span>
               <h4>
                    {data.ExamTitle}
               </h4>
               {
                    Done ?
                    <button onClick={() => ShowInform(Data)} className={idx % 2 != 0 ? 'btn-primary' : 'btn-secondary'}>
                         Ver resultados
                    </button> :
                    <Link href={`/clases/${data.ClassID}/${data.uniqueExamID}`}>
                         <button className={idx % 2 != 0 ? 'btn-primary' : 'btn-secondary'}>
                              Rendir examen
                         </button>
                    </Link>
               }
          </article>
     </>
}

const Students = ({Examenes}) => {

     const [Data, setData] = useState(null)
     const [IsInform, setIsInform] = useState(false)

     const SetTheInform = (i) => {
          setData(i)
          setIsInform(true)
     }
     

  return <>
      {Examenes.length > 0 && <h1 className='text-center' style={{transform: "scale(.85)"}}>Examenes:</h1>}
      <InformsContainer IsIn={IsInform} Data={Data} Out={() => setIsInform(false)}/>
     <div className='class-feed'>
          {
               Examenes.length > 0 ? Examenes.map((data, idx) => {
                    return <ExamCart data={data} key={idx} idx={idx} ShowInform={SetTheInform}/>     
                    }) : <div className='no-exam-message'>
                         <p>
                              Por ahora no tienes ningún <span className='blue'>exámen</span>. 
                              Puedes <span className='green'>jugar en Matio</span> y practicar para tu siguiente exámen.
                         </p>
                         <Link href={"/jugar"}>
                              <button className='btn-primary'>
                                   Jugar
                              </button>
                         </Link>
                         <Link href={"/"}>
                              <button className='btn-secondary'>
                                   Volver al inicio
                              </button>
                         </Link>
                    </div>

          }
     </div>
  </>
}

export default Students