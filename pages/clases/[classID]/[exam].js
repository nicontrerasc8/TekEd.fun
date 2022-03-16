import React from 'react'
import Exam from '../../../Components/Exam'
import MetaTags from "../../../Components/Metatags"
import TeacherExamTracking from '../../../Components/TeacherExamTracking'
import IsTeacherHook from '../../../Hooks/IsTeacher'
import { firestore } from '../../../Lib/firebase'

const ExamContainer = ({ExamData}) => {

  return <>
     <MetaTags title={`${ExamData.ExamTitle} | Matio`}/>
         <IsTeacherHook TeacherSide={<TeacherExamTracking Data={ExamData}/>} 
            StudentSide={
              <div className='play-page'>
                  <h2>{ExamData.ExamTitle}</h2>
                  <Exam Data={ExamData} IsClass/>
              </div>
            }/>
  </>
}

export default ExamContainer

export async function getServerSideProps({query}){
     /* Get the class */
     const {exam} = query
     var Aux = firestore.doc(`examenes/${exam}`)
     var ExamData = (await Aux.get()).data();

     return {props: {ExamData}}
}
