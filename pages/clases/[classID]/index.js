import { route } from 'next/dist/server/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import IsTeacherHook from '../../../Hooks/IsTeacher';
import ValidateUserHook from '../../../Hooks/ValidateIsInClass';
import JoinToClass from '../../../Components/PlayersUsage/JoinToClass';
import MetaTags from "../../../Components/Utils/Metatags"
import Students from '../../../Containers/Class/Students';
import TeacherClass from '../../../Containers/Class/Teacher';
import {firestore} from "../../../Lib/firebase"
import LoadingContainer from '../../../Components/VisualComponents/Loading';

const Component = ({ClassData}) => {

     const [Exams, setExams] = useState([])

     useEffect( async() => {
          setExams([])
       if(ClassData){
          const ExamsCollection = firestore.collection("examenes").where("ClassID", "==", ClassData.ClassID)
          await ExamsCollection.get().then(
               (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setExams(Exams => [...Exams, doc.data()])
                    })
               })
       }
     }, [ClassData])
     

     return  <IsTeacherHook 
               TeacherSide={
               <TeacherClass Examenes={Exams} ClassID={ClassData.ClassID}/>
               } 
               StudentSide={<Students Examenes={Exams}/>}/>
}



const UnAvailableComponent = () => {

     return <IsTeacherHook 
               TeacherSide={<div className='unsubscribed'>
               <h2>Ups.... Esta es la clase de otro profesor.</h2>
               <Link href={"/"}>
               <button className='btn-secondary'>Vuelve al inicio</button>
               </Link>
          </div>}
          StudentSide={
               <div className='dashboard-sections'>
                    <div>
                         <h2>Aún no te has inscrito en la clase</h2>
                         <p>Pídele al profe el código y la contraseña del aula para que puedas ingresar.</p>
                         <JoinToClass/>
                    </div>
               </div>
          }
     />
}

const ClassID = () => {

     const router = useRouter()
     const [Data, setData] = useState(null)
     const {classID} = router.query
     useEffect(async() => {
          var Aux = firestore.doc(`clases/${classID}`)
          var ClassData = (await Aux.get()).data();
          setData(ClassData)
     }, [classID])
     

  return <>
     <MetaTags title={`Tu aula virtual | Matio`}/>
     {
          Data != null ? <div className='dashboard class'>
          <h1>Clase {Data.Title}</h1>
          <ValidateUserHook In={<Component ClassData={Data}/>} Out={<UnAvailableComponent/>} ClassData={Data}/>
     </div> : <LoadingContainer/>
     }
  </>;
};


export default ClassID;
