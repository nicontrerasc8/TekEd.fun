import { faChalkboard, faMeteor, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LoadingContainer from '../../Components/Loading'
import MetaTags from '../../Components/Metatags'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'
import StudentDashBoard from './StudentDashBoard'
import TeacherDashBoard from './TeacherDashBoard'

const LoggedDashboard = () => {

   const { user } = UseUserContext()
   const [IsStudent, setIsStudent] = useState(undefined)

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

   return <>
   {
            IsStudent === undefined ? <LoadingContainer/> : 
            IsStudent ? <StudentDashBoard/> : <TeacherDashBoard/>
         }
   </>
}

const UnLoggedDashboard = () => {
   return <>
      <section className='dashboard-sections'>
         <div>
            <FontAwesomeIcon icon={faUserAstronaut}/>
            <h2>Completa tu registro</h2>
            <p>No te tardará más de 30 segundos</p>
            <Link href="/completa-tu-perfil">
               <button className='btn-secondary'>
                  Registrarme
               </button>
            </Link>
         </div>
         <div>
            <FontAwesomeIcon icon={faMeteor}/>
            <h2>Juega y practica</h2>
            <p>Elige entre las 3 categorias y diviérte.</p>
            <button className='btn-secondary'>
               Jugar
            </button>
         </div>
      </section>
   </>
}

const DashBoard = () => {
   const { UserName } = UseUserContext()

   return <>
      <MetaTags title='Tablero de inicio - TekEd'/>
      <article className='dashboard'>
         {
            UserName != null ? <LoggedDashboard/> : <UnLoggedDashboard/>
         }
      </article>
   </>
   
}

export default DashBoard


