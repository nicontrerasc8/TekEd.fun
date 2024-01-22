import { faMeteor, faSignOutAlt, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'
import { DropInFromLeft } from '../../Animations'
import UseUserContext from '../../Lib/context'
import { auth, googleAuthProvider } from '../../Lib/firebase'
import BackDrop from '../VisualComponents/BackDrop'

const Aside = ({IsIn, Out, IsLoggedIn}) => {

     const router = useRouter()
     const { user } = UseUserContext()

     const SignInWithGoogle = async () => {
        toast.success("Actualmente estamos mejorando el inicio de sesión.")
          /* await auth.signInWithPopup(googleAuthProvider)
          Out() */
      }

     const SignOut = async () => {
          await auth.signOut()
          router.push("/")
          Out()
      }
      const ChangeRoute = (route) => {
          router.push(route)
          Out()
      }

  return <BackDrop isOn={IsIn} onClick={Out}>
       <section className='aside'
          variants={DropInFromLeft}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}>
          {
                user ? <>
                        <button className="btn-primary" onClick={() => ChangeRoute("/")}>
                              Inicio <FontAwesomeIcon icon={faMeteor} />
                         </button> 
                    {
                        IsLoggedIn ?
                            <>
                              <button className="btn-secondary" onClick={() => ChangeRoute("/perfil")}>
                                <FontAwesomeIcon icon={faUserAstronaut} />
                            </button>
                            </>
                            :
                            <button className="btn-secondary"
                                onClick={() => ChangeRoute("/completa-tu-perfil")}>
                                Completar perfil <FontAwesomeIcon icon={faUserAstronaut} />
                            </button>
                    }
                    <button className="btn-tertiary" onClick={SignOut}>
                        Salir <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </>
                    :
                    <>
                        {/* <button className="btn-primary" onClick={SignInWithGoogle}>
                            Ingresa <FontAwesomeIcon icon={faUserAstronaut} />
                        </button> */}
                        <button className="btn-tertiary" onClick={() => ChangeRoute("/jugar")}>
                            Juega <FontAwesomeIcon icon={faMeteor} />
                        </button>
                    </>
            }
       </section>
  </BackDrop>
}

export default Aside