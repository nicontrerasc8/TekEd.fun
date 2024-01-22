import { faBookReader, faChalkboardTeacher, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { firestore } from '../Lib/firebase'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MetaTags from '../Components/Utils/Metatags'
import UseUserContext, { UserContext } from '../Lib/context'
import LoadingContainer from '../Components/VisualComponents/Loading'
import Link from 'next/link'
 
const Register = () => {
    const { user, UserName, setUserName } = UseUserContext()
    const [Loading, setLoading] = useState(false)
    const [Name, setName] = useState(user ? user.displayName : "")
    const [School, setSchool] = useState("")
    const [IsTeacher, setIsTeacher] = useState(false)
    const [EnableRegistration, setEnableRegistration] = useState(false)
    const router = useRouter()

    const setToStudent = () => {
        if(IsTeacher) setIsTeacher(false)
    }
    const setToTeacher = () => {
        if(!IsTeacher) setIsTeacher(true)
    }

    const AlertCorrectSubmission = () => {
        toast.error('Por favor, completa el formulario');
    }

    const SubmitData = async (e) => {
        e.preventDefault()
        const userDoc = firestore.doc(`users/${user.uid}`)
        const batch = firestore.batch();
        batch.set(
            userDoc, 
            { UserID: user.uid, UserName: Name }
        )
        setUserName(Name)
        await batch.commit()
        
    }

    useEffect(() => {
        if(Name === "") setEnableRegistration(false)
        else setEnableRegistration(true)
    }, [Name])


    return <>
    <MetaTags title='Completa tu registro'/>
    {Loading && <LoadingContainer/>}
    {
       UserName != null ? <div className='register-form'>
           <h2>
               ¡Tu registro ha sido completado con éxito!
           </h2>
           <Link passHref href="/">
            <button className='btn-tertiary'>
                Ir al tablero de actividades
            </button>
           </Link>
       </div> : 
        <div className='register-form'>
        <h2>
            Ingresa tus datos y completa tu registro
        </h2>
        <form onSubmit={SubmitData}>
            <label>Nombre completo</label>
            <input placeholder='Escribe tu nombre' value={Name} onChange={(e) => setName(e.target.value)}/> 
            <label>¿Eres estudiante o profesor(a)?</label>
            <div>
                <button className={IsTeacher ? 'disabled' : 'btn-primary'} onClick={setToStudent} type='button'>
                    <FontAwesomeIcon icon={faBookReader}/> 
                    <span>Estudiante</span>
                </button>
                <button className={IsTeacher ? 'btn-secondary' : 'disabled'}type='button' onClick={setToTeacher}>
                    <FontAwesomeIcon icon={faChalkboardTeacher}/> 
                    <span>Profesor(a)</span>
                </button>
            </div>
            <label>Tu cuenta será registrada como una cuenta de {!IsTeacher ? <span className='blue'>estudiante</span> : <span className='green'>profesor</span>}.</label>
            <article>
                {
                    EnableRegistration ? 
                    <button className='btn-tertiary' type='submit'>
                        Registrarme en Matio
                    </button>
                    : 
                    <button className='disabled' type='button' onClick={AlertCorrectSubmission}>
                        Registrarme en Matio
                    </button>
                }
            </article>
        </form>
    </div>
    }
    </>
}

export default Register
