import Link from 'next/link'
import React from 'react'
import { faGamepad, FaGamepad, faPaperclip, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaChalkboardTeacher} from "react-icons/fa"
import UseUserContext from '../Lib/context'
import {GiNotebook} from "react-icons/gi"
import MetaTags from '../Components/Utils/Metatags'

const Dashboard = () => {

  const {user} = UseUserContext()

  return <>
  <MetaTags title='Panel principal | Matio'/>
    <div className='two-option-div'>
    {
      user ? 
      <>
         <Link href={"/profesores/crear"}>
          <button>
          <FontAwesomeIcon icon={faGamepad}/> 
          <h2>Crea un nuevo examen</h2>
          <p></p>
          </button>
        </Link>
          <Link href={`/profesores/${user.uid}`}>
          <button>
            <FontAwesomeIcon icon={faStickyNote}/>
            <h2>Exámenes creados</h2>
          </button>
          </Link>
      </>
      : 
      <>
        <Link href={"/jugar"}>
      <button>
      <FontAwesomeIcon icon={faGamepad}/> 
      <h2>Juega y practica</h2>
      <p></p>
      </button>
    </Link>
      <Link href="/estudiantes">
      <button>
        <GiNotebook/>
        <h2>Entra a un examen</h2>
      </button>
      </Link>
      </>
}
  </div>
  </>
}

export default Dashboard