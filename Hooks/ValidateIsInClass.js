import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import UseUserContext from '../Lib/context';
import { firestore } from '../Lib/firebase';

function ValidateUserHook({In, Out, ClassData}){
     const [IsTeacher, setIsTeacher] = useState(true);
     const { user,UserName, TurnOnLoading, TurnOffLoading } = UseUserContext()
     const [IsIn, setIsIn] = useState(false)
     const router = useRouter()

     useEffect(() => {
          if(user && UserName != null){
             const userDoc = firestore.doc(`users/${user.uid}`)
             userDoc.get().then((doc) => {
                const DocData = doc.data()
                if(DocData.Teacher) setIsTeacher(true)
                else setIsTeacher(false)
                if(DocData.Teacher){
                     if(ClassData.TeacherID == DocData.UserID) setIsIn(true)
                }
                else{
                     var IsInTheClass = 0
                     for (let i = 0; i < ClassData.estudiantes.length; i++) {
                          if(ClassData.estudiantes[i] == DocData.UserID) IsInTheClass++
                     }
                     if(IsInTheClass) setIsIn(true)
                }
             })
          }
          else setIsIn(false)
     }, [user, UserName])

     if(IsIn) return <>{In}</>
     else return <>{Out}</>
}

export default ValidateUserHook