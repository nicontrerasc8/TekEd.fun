import React, { useEffect, useState } from 'react'
import ExamResults from '../../../../Components/TeacherUsage/TeacherExamTracking/ExamResults'
import InfCont from '../../../../Components/TeacherUsage/TeacherInformsContainer'
import MetaTags from '../../../../Components/Utils/Metatags'
import { firestore, postToJSON } from '../../../../Lib/firebase'

export async function getServerSideProps({query}){
  const {teacher, exam} = query
  var Examen = {}
  var obj = firestore.collection(`users`).doc(teacher).collection("examenes").doc(exam)
  await obj.get().then((doc) => {
    if(doc.exists) Examen = postToJSON(doc)
  })
  return {
    props: {Examen}
  }
}

const Analiticas = ({Examen}) => {

  const [IsIn, setIsIn] = useState(false)
  const [RespData, setRespData] = useState({})

  const OpenFN = (Info) => {
    console.log(Info.r[0])
    setRespData(Info)
    setIsIn(true)
  }

  useEffect(() => {
    console.log(Examen)
  }, [Examen])

  return <>
  <MetaTags title={Examen.title + " | Matio"}/>
  <div className='analytics'>
    <h2>{Examen.title}</h2>
    <InfCont IsIn={IsIn} Data={RespData} Out={() => setIsIn(false)}  Exam={Examen}/>
    {
      Examen.respuestas.length ? Examen.respuestas.map((info, idx) =>{
        return <ExamResults info={info} key={idx} idx={idx} Open={() => OpenFN(info)}/>
      })
      : <p>Todavía no hay respuestas en este exámen</p> 
    }
  </div>
  </>
}

export default Analiticas