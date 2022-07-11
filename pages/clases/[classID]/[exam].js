import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Exam from '../../../Components/Play/Exam'
import LoadingContainer from '../../../Components/VisualComponents/Loading'
import MetaTags from '../../../Components/Utils/Metatags'
import TeacherExamTracking from '../../../Components/TeacherUsage/TeacherExamTracking'
import IsTeacherHook from '../../../Hooks/IsTeacher'
import { firestore } from '../../../Lib/firebase'

const ExamContainer = () => {

    const router = useRouter()
     const [ExamData, setExamData] = useState()
     const {exam} = router.query
     useEffect(async() => {
          var Aux = firestore.doc(`examenes/${exam}`)
          var Data = (await Aux.get()).data();
          setExamData(Data)
     }, [exam])

  return <>
    {
      ExamData ? <>
         <MetaTags title={`${ExamData.ExamTitle} | Matio`}/>
         <IsTeacherHook TeacherSide={<TeacherExamTracking Data={ExamData}/>} 
            StudentSide={
              <div className='play-page'>
                  <h2>{ExamData.ExamTitle}</h2>
                  <Exam Data={ExamData} IsClass IsEv/>
              </div>
            }/>
      </> : <LoadingContainer/>
    }
  </>
}

export default ExamContainer