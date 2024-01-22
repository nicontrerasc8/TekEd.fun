import { faBars, faChalkboard, faChalkboardTeacher, faGamepad, faHome, faLightbulb, faMeteor, faMoon, faOutdent, faRocket, faRoute, faShuttleVan, faSignOutAlt, faSun, faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import LogoLight from "../../public/logo-light.png"
import LogoDark from "../../public/logo-dark.png"
import Link from "next/link"
import { auth, getUserWithUserID, googleAuthProvider } from '../../Lib/firebase'
import UseUserContext, { UserContext } from "../../Lib/context"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { DropInFromLeft, DropInFromRight } from "../../Animations"
import ThemeBackDrop from "./ThemeBackDrop"
import Aside from "./Aside"


const Navbar = () => {  
    const [IsActive, setIsActive] = useState(false)
    const [IsChangeTheme, setIsChangeTheme] = useState(false)
    const { IsLightTheme, IsTimerOn} = UseUserContext()
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const {user} = UseUserContext()
    const router = useRouter()
    
      const SignInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider)
    }

   const SignOut = async () => {
        await auth.signOut()
        router.push("/")
        setIsActive(false)
    }
     

    const ChangeRoute = (route) => {
        router.push(route)
        setIsActive(false)
    }

    



   if(!IsTimerOn) return <>
        <ThemeBackDrop IsIn={IsChangeTheme} Out={() => setIsChangeTheme(false)}/>
        <nav>
        <motion.i
                className="Nav-Logo"
                variants={DropInFromLeft}
                initial="hidden"
                animate="visible" >
            <Link href="/">
                    <Image src={IsLightTheme ? LogoLight : LogoDark}
                        width={90} height={90}
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
            <button className="btn-toggle-color" onClick={() => setIsChangeTheme(true)}>
                <FontAwesomeIcon icon={IsLightTheme ? faMoon : faSun} />
            </button>
            

                             <button className={user ? "btn-color-green" : "btn-color-blue"} onClick={() => ChangeRoute("/panel")}>
                                <code>{user ? "Examenes" : "Actividades"}</code> <FontAwesomeIcon icon={user ? faChalkboardTeacher : faUserAstronaut} />
                            </button>
     

        </motion.div>
        <Aside IsIn={IsActive} Out={() => setIsActive(!IsActive)} IsLoggedIn={IsLoggedIn}/>
    </nav>
    </>
    else return ""
}

export default Navbar
