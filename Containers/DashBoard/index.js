import { faChalkboard, faMeteor, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import IsTeacherHook from '../../Hooks/IsTeacher'
import LoadingContainer from '../../Components/Loading'
import MetaTags from '../../Components/Metatags'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'
import StudentDashBoard from './StudentDashBoard'
import TeacherDashBoard from './TeacherDashBoard'

const Dashboard = () => {
   
   return <IsTeacherHook TeacherSide={<TeacherDashBoard/>} StudentSide={<StudentDashBoard/>}/>
}

const DashBoard = () => {

   return <>
      <MetaTags title='Tablero de inicio - Matio'/>
      <article className='dashboard'>
         <Dashboard/>
      </article>
   </>
   
}

export default DashBoard


