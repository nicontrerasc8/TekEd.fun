import { 
     faRocket, 
     faMeteor,
     faSpaceShuttle,
      } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { UserContext } from '../Lib/context'
import { firestore } from '../Lib/firebase'
import LoadingContainer from './Loading'

const ClassCart = ({information, i}) => {
     console.log(information.icon)
     return <section className={i % 2 == 0 ? "border-blue" : "border-green"}>
               <FontAwesomeIcon icon={i % 3 == 0 ? faMeteor : i % 2 == 0 ? faRocket : faSpaceShuttle}/>
               <h2>{information.Title}</h2>
          </section>
}

const ClassFeed = ({clases}) => {

     const {user} = useContext(UserContext)
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
     
     return (IsStudent === undefined ? <LoadingContainer/> : <>
          <h2 className='class-feed-title'>{IsStudent ? "Clases en las que estás inscrito:" : "Aulas creadas:"}</h2>
          <article className='class-feed'>
               {
                    clases.length != 0 ? clases.map((data, idx) => {
                         return <ClassCart information={data} key={idx} i={idx}/>
                    }) : <p>{IsStudent ? "¡Inscríbete a una clase!" : "Crea tu primer aula virtual en TekEd."}</p>
               }
          </article>
     </>
     )
}

export default ClassFeed
