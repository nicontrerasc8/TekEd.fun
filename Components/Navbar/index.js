import { faBars, faMeteor, faMoon, faOutdent, faRocket, faShuttleVan, faSun, faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useState } from "react"
import LogoLight from "../../public/logo-light.png"
import LogoDark from "../../public/logo-dark.png"

const Navbar = ({Theme, Callback}) => {
    const [IsActive, setIsActive] = useState(false)
    const ChangeIsActive = () => {
        setIsActive(!IsActive)
    }


    return <nav>
        <Image src={Theme == "light" ? LogoLight : LogoDark} 
            width={100} height={100}
        />
            <span>TekEd</span>
            <div>
                <button className="btn-toggle-color" onClick={Callback}>
                    <FontAwesomeIcon icon={Theme == "light" ? faMoon : faSun}/>
                </button>
                <button className="btn-primary">
                    Ingresa <FontAwesomeIcon icon={faUserAstronaut}/>
                </button>
                <button className="btn-secondary">
                    Juega <FontAwesomeIcon icon={faMeteor}/>
                </button>
                <button className="toggle-btn" onClick={ChangeIsActive}>
               <FontAwesomeIcon icon={IsActive ? faOutdent : faBars}/>
           </button>
           </div>
           <aside className={IsActive ? "active" : null}>
                <button className="btn-primary">
                    Ingresa <FontAwesomeIcon icon={faUserAstronaut}/>
                </button>
                <button className="btn-secondary">
                    Juega <FontAwesomeIcon icon={faMeteor}/>
                </button>
           </aside>
    </nav>
}

export default Navbar
