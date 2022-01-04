import { faBookReader, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { firestore } from '../Lib/firebase'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MetaTags from '../Components/Metatags'
import { UserContext } from '../Lib/context'
 
const Register = () => {
    const { user, UserName } = useContext(UserContext)
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
            { UserID: user.uid, UserName: Name, UserSchool: School, Teacher: IsTeacher }
        )
        await batch.commit().then(
            router.push("/")
        )
    }

    useEffect(() => {
        if(Name === "" || School === "") setEnableRegistration(false)
        else setEnableRegistration(true)
    }, [Name, School])

    useEffect(() => {
        if(!user){
            router.push("/")
            setName("")
        } 
        
    }, [user])

    return <>
    <MetaTags title='Completa tu registro'/>
    <div className='register-form'>
        <h2>
            Ingresa tus datos y completa tu registro
        </h2>
        <form onSubmit={SubmitData}>
            <label>Nombre completo</label>
            <input placeholder='Escribe tu nombre' value={Name} onChange={(e) => setName(e.target.value)}/> 
            <label>Colegio</label>
            <input placeholder='Escribe el nombre de tu colegio' value={School} onChange={(e) => setSchool(e.target.value)}/> 
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
            <article>
                {
                    EnableRegistration ? 
                    <button className='btn-tertiary' type='submit'>
                        Registrarme en TekEd
                    </button>
                    : 
                    <button className='disabled' type='button' onClick={AlertCorrectSubmission}>
                        Registrarme en TekEd
                    </button>
                }
            </article>
        </form>
    </div>
    </>
}

export default Register
