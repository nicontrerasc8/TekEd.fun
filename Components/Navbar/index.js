import { faBars, faMeteor, faMoon, faOutdent, faRocket, faRoute, faShuttleVan, faSignOutAlt, faSun, faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import LogoLight from "../../public/logo-light.png"
import LogoDark from "../../public/logo-dark.png"
import Link from "next/link"
import { auth, googleAuthProvider } from '../../Lib/firebase'
import { UserContext } from "../../Lib/context"
import toast from "react-hot-toast"


const Navbar = ({Theme, Callback}) => {
    const [IsActive, setIsActive] = useState(false)
    
    const ChangeIsActive = () => {
        setIsActive(!IsActive)
    }

    const SignInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider)
        /* .then(
            toast('¡Ingresaste!',
                {
                    icon: '🚀',
                    duration: 10000,
                    style: {
                        background: "var(--main-green)",
                        color: "var(--primary)",
                        fontWeight: "600"
                    },
                }
        )) */
    }

    const { user, UserName } = useContext(UserContext)
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if(UserName != null){
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    }, [])


    return <nav>
        <Link href="/" className="Nav-Logo">
            <button className="Nav-Logo">
                <Image src={Theme == "light" ? LogoLight : LogoDark} 
                    width={100} height={100}
                />
            </button>
        </Link>
            <Link href="/">
                <span>TekEd</span>
            </Link>
                    <div>
                        <button className="btn-toggle-color" onClick={Callback}>
                            <FontAwesomeIcon icon={Theme == "light" ? faMoon : faSun}/>
                        </button>
                        {
                            user ? <>
                            {
                                IsLoggedIn ? 
                                <button className="btn-primary" >
                                    Perfil <FontAwesomeIcon icon={faUserAstronaut}/>
                                </button> : 
                                <Link href="/completa-tu-perfil">
                                <button className="btn-primary">
                                Completar perfil <FontAwesomeIcon icon={faUserAstronaut}/>
                            </button> 
                            </Link>
                           }
                            <button className="btn-secondary" onClick={() => auth.signOut()}>
                            Salir <FontAwesomeIcon icon={faSignOutAlt}/>
                        </button>
                        </>
                            :  
                            <>
                            <button className="btn-primary" onClick={SignInWithGoogle}>
                                Ingresa <FontAwesomeIcon icon={faUserAstronaut}/>
                            </button>
                             <button className="btn-secondary">
                             Juega <FontAwesomeIcon icon={faMeteor}/>
                         </button> 
                            </>
                        }
                        <button className="toggle-btn" onClick={ChangeIsActive}>
                            <FontAwesomeIcon icon={IsActive ? faOutdent : faBars}/>
                        </button>
                    </div>
           <aside className={IsActive ? "active" : null}>
                        {
                            user ? <>
                            {
                                IsLoggedIn ? 
                                <button className="btn-primary" >
                                    Perfil <FontAwesomeIcon icon={faUserAstronaut}/>
                                </button> : 
                                <Link href="/completa-tu-perfil">
                                <button className="btn-primary">
                                Completar perfil <FontAwesomeIcon icon={faUserAstronaut}/>
                            </button> 
                            </Link>
                           }
                            <button className="btn-secondary" onClick={() => auth.signOut()}>
                            Salir <FontAwesomeIcon icon={faSignOutAlt}/>
                        </button>
                        </>
                        :  
                            <>
                            <button className="btn-primary" onClick={SignInWithGoogle}>
                                Ingresa <FontAwesomeIcon icon={faUserAstronaut}/>
                            </button>
                             <button className="btn-secondary">
                             Juega <FontAwesomeIcon icon={faMeteor}/>
                         </button> 
                            </>
                        }
           </aside>
    </nav>
}

export default Navbar
