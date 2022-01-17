import { faChalkboard, faMeteor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import ClassFeed from '../../Components/ClassFeed/ClassFeed'
import JoinToClass from '../../Components/JoinToClass'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'

const StudentDashBoard = () => {

   const [Data, setData] = useState([])
   const {user} = UseUserContext()

   const FetchClassesData = () => {
      setData([])
      const ClassesCollection = firestore.collection("clases")
      ClassesCollection.get().then(
           (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                     var AuxArray = doc.data()
                        AuxArray.estudiantes.forEach((arrayDoc) => {
                           if(arrayDoc.UserID == user.uid){
                              setData(Data => [...Data, doc.data()])
                           }
                     })
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
            <button className='btn-secondary'>
               Jugar
            </button>
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
