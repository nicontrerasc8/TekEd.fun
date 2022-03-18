import React, { useEffect, useState } from 'react'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'
import LoadingContainer from '../Loading'
import InvitationModal from './InvitationModal'
import StudentCart from './StudentCart'
import TeacherCart from './TeacherCart'


const ClassFeed = ({clases}) => {

     const {user, UserName} = UseUserContext()
     const [IsStudent, setIsStudent] = useState(undefined)
     const [InvitationModalVisible, setInvitationModalVisible] = useState(false)
     const [InivationLinkModalData, setInivationLinkModalData] = useState([])

     useEffect(() => {
          if(user){
               const userDoc = firestore.doc(`users/${user.uid}`)
               userDoc.get().then((doc) => {
                  const DocData = doc.data()
                  if(DocData.Teacher) setIsStudent(false)
                  else setIsStudent(true)
               })
            }
     }, [user])

     const OpenModal = (info) => {
          setInvitationModalVisible(true)
          setInivationLinkModalData(info)
     }
     
     return (IsStudent === undefined ? <LoadingContainer/> : <>
          <InvitationModal 
               Visible={InvitationModalVisible} 
               handleClose={() => setInvitationModalVisible(false)} 
               Data={InivationLinkModalData}
               />

          <h2 className='class-feed-title'>{IsStudent ? "Clases en las que estás inscrito:" : "Aulas creadas:"}</h2>
          <article className='class-feed'>
               {
                    clases.length != 0 ? clases.map((data, idx) => {
                         return (
                              IsStudent ? <StudentCart information={data} key={idx} i={idx} /> : <TeacherCart information={data} i={idx} OpenInvitationLink={() => OpenModal(data)}/>
                         )
                    }) : <p>{IsStudent ? "¡Inscríbete a una clase! " : "Crea tu primer aula virtual en Matio."}</p>
               }
          </article>
     </>
     )
}

export default ClassFeed
