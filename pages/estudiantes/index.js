import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useKeypress from 'react-use-keypress'
import MetaTags from '../../Components/Utils/Metatags'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'

const Estudiantes = () => {

    const [Code, setCode] = useState("")
    const router = useRouter()

    const GoToExam = () => {
     if(Code.length > 8)
      router.push("/profesores/"+Code)
     else toast.error("Ingresa un código válido")
 }

 useKeypress(["Enter"],(event) => {
     if(event.key === "Enter"){
          GoToExam()
     }
 })

    

  return <>
  <MetaTags title="Panel de estudiantes"/>
     <div className='panel-main-div'>
    <h2>
      Ingresa el código del examen para rendirlo
    </h2>
    <input value={Code} onChange={(e) => setCode(e.target.value)}/>
    <button onClick={GoToExam} className='btn-primary' style={{fontSize: "calc(2vmin + 1rem)"}}>
     Ir al examen
    </button>
  </div>
  </>
}

export default Estudiantes