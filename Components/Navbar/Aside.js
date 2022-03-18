import { faMeteor, faSignOutAlt, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React from 'react'
import { DropInFromLeft } from '../../Animations'
import UseUserContext from '../../Lib/context'
import { auth, googleAuthProvider } from '../../Lib/firebase'
import BackDrop from '../BackDrop'

const Aside = ({IsIn, Out, IsLoggedIn}) => {

     const router = useRouter()
     const { user, UserName, setUserName, IsLightTheme } = UseUserContext()

     const SignInWithGoogle = async () => {
          await auth.signInWithPopup(googleAuthProvider)
          Out()
      }

     const SignOut = async () => {
          await auth.signOut()
          router.push("/")
          setUserName(null)
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
                <button className="btn-primary" onClick={() => ChangeRoute("/jugar")}>
                              Inicio <FontAwesomeIcon icon={faMeteor} />
                         </button> 
                    {
                        IsLoggedIn ?
                            <>
                              <button className="btn-secondary" onClick={() => ChangeRoute("/perfil")}>
                                Perfil <FontAwesomeIcon icon={faUserAstronaut} />
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
                        <button className="btn-primary" onClick={SignInWithGoogle}>
                            Ingresa <FontAwesomeIcon icon={faUserAstronaut} />
                        </button>
                        <button className="btn-secondary" onClick={() => ChangeRoute("/jugar")}>
                            Juega <FontAwesomeIcon icon={faMeteor} />
                        </button>
                    </>
            }
       </section>
  </BackDrop>
}

export default Aside