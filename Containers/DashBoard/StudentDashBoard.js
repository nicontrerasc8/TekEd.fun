import { faChalkboard, faMeteor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ClassFeed from '../../Components/ClassFeed/ClassFeed'
import JoinToClass from '../../Components/PlayersUsage/JoinToClass'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'

const StudentDashBoard = () => {

   const [Data, setData] = useState([])
   const {user} = UseUserContext()

   const FetchClassesData = () => {
      setData([])
      const ClassesCollection = firestore.collection("clases").where("estudiantes", "array-contains", (user.uid))
      ClassesCollection.get().then(
         (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                   setData(Data => [...Data, doc.data()])
              })
         }
    )
 }

 useEffect(() => {
      FetchClassesData()
 }, [user, ])

    return <>
    <ClassFeed clases={Data}/>
      <motion.div className='dashboard-sections'>
        <div>
            <FontAwesomeIcon icon={faMeteor}/>
            <h2>Juega y practica</h2>
            <p>Elige entre las 3 categorias y diviérte.</p>
            <Link href={"/jugar"}>
               <a>
                  <button className='btn-secondary'>
                     Jugar
                  </button>
               </a>
            </Link>
         </div>
         <div>
            <FontAwesomeIcon icon={faChalkboard}/>
            <h2>Únete a una clase</h2>
            <p>Pídele a tu profe el código y contraseña de la clase e ingresa</p>
            <JoinToClass/>
         </div>
    </motion.div>
    </>
}

export default StudentDashBoard
