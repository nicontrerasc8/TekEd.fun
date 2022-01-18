import { faChalkboard, faMeteor, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingContainer from '../../Components/Loading'
import MetaTags from '../../Components/Metatags'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'
import StudentDashBoard from './StudentDashBoard'
import TeacherDashBoard from './TeacherDashBoard'

const Dashboard = () => {

   const [IsStudent, setIsStudent] = useState(undefined)
   const { user,UserName } = UseUserContext()
   const router = useRouter()

   useEffect(() => {
      if(user && UserName == "valid"){
         const userDoc = firestore.doc(`users/${user.uid}`)
         userDoc.get().then((doc) => {
            const DocData = doc.data()
            if(DocData.Teacher) setIsStudent(false)
            else setIsStudent(true)
         })
      } else router.push("/completa-tu-perfil")
   }, [user, UserName])

   return <>
   {
            IsStudent === undefined ? <LoadingContainer/> : 
            IsStudent ? <StudentDashBoard/> : <TeacherDashBoard/>
         }
   </>
}

const DashBoard = () => {

   return <>
      <MetaTags title='Tablero de inicio - TekEd'/>
      <article className='dashboard'>
         <Dashboard/>
      </article>
   </>
   
}

export default DashBoard


