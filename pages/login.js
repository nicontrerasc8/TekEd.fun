import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import UseUserContext from '../Lib/context'
import { auth, firestore, googleAuthProvider } from '../Lib/firebase'

const Login = () => {

    const {user, setUserName} = UseUserContext()
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [Name, setName] = useState("")
    const [School, setSchool] = useState()
    const router = useRouter()

    const SignInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider)
    }

    const VerifyUser = () => {
        if(School === "monterrico") {
            return true
        }
        toast.error("El código de prueba es monterrico")
        return false
    }

    const SubmitData = async (e) => {
        e.preventDefault()
       if(VerifyUser()){
        const userDoc = firestore.doc(`users/${user.uid}`)
        const batch = firestore.batch();
        batch.set(
            userDoc, 
            { userid: user.uid, UserName: Name }
        )
        setUserName(Name)
        await batch.commit().then(
            toast.success("Tu perfil se ha registrado con éxito"),
            router.push("/")
        )
       }
        
    }

    useEffect(async () => {
        if(user){
            const ref = firestore.doc(`users/${user.uid}`);
            const { exists } = await ref.get();
            if(exists) {
                toast.success("Tu perfil ya fue completado")
                router.push("/")
                return 0
            }
            else {
                setIsLoggedIn(true)
                setName(user.displayName)
            }
        } 
      
    }, [user])
    

  return <div className='register-form'>
    {
        IsLoggedIn ? 
        <>
        <input placeholder='Escribe tu nombre aquí' value={Name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder='Escribe el código de tu colegio' value={School} onChange={(e) => setSchool(e.target.value)}/>
            <button onClick={SubmitData}>
                Completar mi perfil
            </button>
        </>
        : <button onClick={SignInWithGoogle}>
            Login con Google
            </button>
    }

  </div>
}

export default Login