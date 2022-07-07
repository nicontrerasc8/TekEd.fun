import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useKeypress from 'react-use-keypress'
import MetaTags from '../Components/Utils/Metatags'
import UseUserContext from '../Lib/context'
import { firestore } from '../Lib/firebase'

const Perfil = () => {

     const [Name, setName] = useState("")
     const [School, setSchool] = useState("")
     const [EnableRegistration, setEnableRegistration] = useState(false)
     const {ChangeTheme, IsLightTheme, setCompleteProfile} = UseUserContext()
     const {user, UserName} = UseUserContext()
     const router = useRouter()

     const AlertCorrectSubmission = () => {
          toast.error('Por favor, completa el formulario');
      }

      const EditData = async() => {
           const UserDoc = firestore.doc(`users/${user.uid}`)
           await UserDoc.update({
                UserName: Name,
                UserSchool: School,
                LightTheme: IsLightTheme,
           })
           toast.success("Tus cambios fueron guardados con éxito.")
           router.push("/")
      }

      useKeypress(["Enter"],(event) => {
          if(event.key === "Enter" && EnableRegistration){
              EditData()
          }
      })

     useEffect(() => {
          if(Name === "" || School === "") setEnableRegistration(false)
          else setEnableRegistration(true)
      }, [Name, School])

     useEffect(() => {
          
          if(!user) router.push("/")
          else if(user && UserName == null){
               setCompleteProfile(true)
          }
          else{
               var DocRef = firestore.collection('users').doc(user.uid)
               DocRef.get().then((doc) => {
               var Data = doc.data()
               setName(Data.UserName)
               setSchool(Data.UserSchool)
             })
          }
     }, [user])

     return <>
          <MetaTags title='Edita tu perfil | Matio'/>
          <div className='register-form'>
               <h2>Edita tu perfil</h2>
               <form>
                    <label>Nombre completo</label>
                    <input placeholder='Escribe tu nombre' value={Name} onChange={(e) => setName(e.target.value)}/> 
                    <label>Colegio</label>
                    <input placeholder='Escribe el nombre de tu colegio' value={School} onChange={(e) => setSchool(e.target.value)}/> 
                    <label>¿Prefieres el tema claro o el tema oscuro?</label>
                    <div>
                         <button className="btn-light" disabled={IsLightTheme} onClick={ChangeTheme} type='button'>
                              <FontAwesomeIcon icon={faSun}/> 
                              <span>Tema claro</span>
                         </button>
                         <button className="btn-dark" type='button' disabled={!IsLightTheme} onClick={ChangeTheme}>
                              <FontAwesomeIcon icon={faMoon}/> 
                              <span>Tema oscuro</span>
                         </button>
                    </div>
                   <article>
                         {
                              EnableRegistration ? 
                              <button className='btn-tertiary' type='button' onClick={EditData}>
                                   Guardar cambios
                              </button>
                              : 
                              <button className='disabled' type='button' onClick={AlertCorrectSubmission}>
                                   Guardar cambios
                              </button>
                         }
                    </article>
               </form>
          </div>

     </>
}

export default Perfil
