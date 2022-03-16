import { faBars, faLightbulb, faMeteor, faMoon, faOutdent, faRocket, faRoute, faShuttleVan, faSignOutAlt, faSun, faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import LogoLight from "../../public/logo-light.png"
import LogoDark from "../../public/logo-dark.png"
import Link from "next/link"
import { auth, googleAuthProvider } from '../../Lib/firebase'
import UseUserContext, { UserContext } from "../../Lib/context"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { DropInFromLeft, DropInFromRight } from "../../Animations"
import ThemeBackDrop from "./ThemeBackDrop"


const Navbar = () => {  
    const [IsActive, setIsActive] = useState(false)
    const [IsChangeTheme, setIsChangeTheme] = useState(true)
    const {setUserName} = UseUserContext()
    const router = useRouter()

    const ChangeIsActive = () => {
        setIsActive(!IsActive)
    }

    const SignInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider)
        setIsActive(false)
    }


    const SignOut = async () => {
        await auth.signOut()
        router.push("/")
        setUserName(null)
        setIsActive(false)
    }

    const ChangeRoute = (route) => {
        router.push(route)
        setIsActive(false)
    }

    const { user, UserName, IsLightTheme } = UseUserContext()
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (UserName != null) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [UserName])


    return <>
        {(!user || UserName == null) && <ThemeBackDrop IsIn={IsChangeTheme} Out={() => setIsChangeTheme(false)}/>}
        <nav>
        <motion.i
                className="Nav-Logo"
                variants={DropInFromLeft}
                initial="hidden"
                animate="visible" >
            <Link href="/">
                    <Image src={IsLightTheme ? LogoLight : LogoDark}
                        width={100} height={100}
                    />
            </Link>
        </motion.i> 
        <Link href="/">
            <span>Mat<strong>io</strong></span>
        </Link>
        <motion.div
            variants={DropInFromRight}
            initial="hidden"
           animate="visible" 
        >
            {(!user || UserName == null) && <button className="btn-toggle-color" onClick={() => setIsChangeTheme(true)}>
                <FontAwesomeIcon icon={faLightbulb} />
            </button>}
            {
                user ? <>
                    {
                        IsLoggedIn ?
                            <button className="btn-primary" onClick={() => ChangeRoute("/perfil")}>
                                Perfil <FontAwesomeIcon icon={faUserAstronaut} />
                            </button> :
                            <button className="btn-primary" onClick={() => ChangeRoute("/completa-tu-perfil")}>
                                Completar perfil <FontAwesomeIcon icon={faUserAstronaut} />
                            </button>
                    }
                    <button className="btn-secondary" onClick={SignOut}>
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
            <button className="toggle-btn" onClick={ChangeIsActive}>
                <FontAwesomeIcon icon={IsActive ? faOutdent : faBars} />
            </button>
        </motion.div>
        <aside className={IsActive ? "active" : null}>
            {
                user ? <>
                    {
                        IsLoggedIn ?
                            <button className="btn-primary" onClick={() => ChangeRoute("/perfil")}>
                                Perfil <FontAwesomeIcon icon={faUserAstronaut} />
                            </button> :
                            <button className="btn-primary"
                                onClick={() => ChangeRoute("/completa-tu-perfil")}>
                                Completar perfil <FontAwesomeIcon icon={faUserAstronaut} />
                            </button>
                    }
                    <button className="btn-secondary" onClick={SignOut}>
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
        </aside>
    </nav>
    </>
}

export default Navbar
