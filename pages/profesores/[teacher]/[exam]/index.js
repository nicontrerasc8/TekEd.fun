import React, { useEffect } from 'react'
import RealTest from '../../../../Components/PlayersUsage/OficialTest'
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
    props: {Examen, exam, teacher}
  }
}

const Index = ({Examen, exam, teacher}) => {

  useEffect(() => {
    console.log(Examen)
  }, [Examen])
  

  return <>
  <MetaTags title={Examen.title + " | Matio"}/>
    <div>
    <RealTest info={Examen} exam={exam} teacher={teacher}/>
  </div>
  </>
}

export default Index