import { route } from 'next/dist/server/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import IsTeacherHook from '../../../Hooks/IsTeacher';
import ValidateUserHook from '../../../Hooks/ValidateIsInClass';
import JoinToClass from '../../../Components/JoinToClass';
import MetaTags from "../../../Components/Metatags"
import Students from '../../../Containers/Class/Students';
import TeacherClass from '../../../Containers/Class/Teacher';
import {firestore} from "../../../Lib/firebase"

export async function getStaticPaths(){
     const snapshot = await firestore.collection("clases").get()
     console.log(snapshot)

     const paths = snapshot.docs.map((doc) => {
          const {classID} = doc.data()
          return {
               params: {classID}
          }
     })

     return {
          paths,
          fallback: "blocking",
     }

}

export async function getStaticProps({query}){
     /* Get the class */
     const {classID} = query
     var Aux = firestore.doc(`clases/${classID}`)
     var ClassData = (await Aux.get()).data();

     /* Get the Exams */
     var ExamsCollection = firestore.collection("examenes").where("ClassID", "==", classID)
     var Examenes = []

     await ExamsCollection.get().then(
          (querySnapshot) => {
               querySnapshot.forEach((doc) => {
                   Examenes.push(doc.data())
               })
          }
     )

     return {
          props: {ClassData, Examenes},
          revalidate: 5000,
     }
}


const Component = ({Examenes, ClassData}) => {
     return  <IsTeacherHook 
               TeacherSide={
               <TeacherClass Examenes={Examenes} ClassID={ClassData.ClassID}/>
               } 
               StudentSide={<Students Examenes={Examenes}/>}/>
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

const ClassID = ({ClassData, Examenes}) => {

  return <>
     <MetaTags title={`Aula ${ClassData.Title} | Matio`}/>
     <div className='dashboard class'>
          <h1>Clase {ClassData.Title}</h1>
          <ValidateUserHook In={<Component Examenes={Examenes} ClassData={ClassData}/>} Out={<UnAvailableComponent/>} ClassData={ClassData}/>
     </div>
  </>;
};


export default ClassID;