import React, { useEffect, useState } from 'react'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'
import LoadingContainer from '../Loading'
import StudentCart from './StudentCart'
import TeacherCart from './TeacherCart'


const ClassFeed = ({clases}) => {

     const {user} = UseUserContext()
     const [IsStudent, setIsStudent] = useState(undefined)

     useEffect(() => {
          if(user){
               const userDoc = firestore.doc(`users/${user.uid}`)
               userDoc.get().then((doc) => {
                  const DocData = doc.data()
                  if(DocData.Teacher) setIsStudent(false)
                  else setIsStudent(true)
                  console.log(DocData.Teacher)
               })
            }
     }, [user])
     
     return (IsStudent === undefined ? <LoadingContainer/> : <>
          <h2 className='class-feed-title'>{IsStudent ? "Clases en las que estás inscrito:" : "Aulas creadas:"}</h2>
          <article className='class-feed'>
               {
                    clases.length != 0 ? clases.map((data, idx) => {
                         return (
                              IsStudent ? <StudentCart/> : <TeacherCart information={data} i={idx}/>
                         )
                    }) : <p>{IsStudent ? "¡Inscríbete a una clase! " : "Crea tu primer aula virtual en Matespacial."}</p>
               }
          </article>
     </>
     )
}

export default ClassFeed
