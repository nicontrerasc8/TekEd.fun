import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChalkboardTeacher, faCheck, faComment, faFileContract, faMailBulk, faMeteor, faPhone, faPhoneSquare, faRocket, faSatellite, faSchool, faSpaceShuttle, faTerminal, faUserAstronaut, faVoicemail } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import styled from "styled-components"
import Image from "next/image"
import {motion} from "framer-motion"
import LogoLight from "../public/logo-light.png"
import LogoNight from "../public/logo-dark.png"
import MetaTags from "../Components/Utils/Metatags"
import SuggestionsModal from "../Components/General/SuggestionsModal"
import { auth, googleAuthProvider } from "../Lib/firebase"
import UseUserContext from "../Lib/context"
import Link from "next/link"
import ParticlesComponent from "../Components/VisualComponents/Particles"
import toast from "react-hot-toast"

const StyledHome = styled.div`
position: relative;
z-index: 1;
display: flex;
flex-direction: row;
margin-top: 7rem;
min-height: calc(100vh - 7rem);
align-items: center;
justify-content: space-between ;
padding: 5vh 5vw;
gap: 1rem;
  article{
    align-items: center;
    width: clamp(300px, 60%, 60%);
    justify-content: space-between;
    gap: 5%;
  }
  h2{
    margin-bottom: 20px;
    color: var(--main-blue);
    font-size: calc(3vh + 2vw + 1rem);
  }
  p{
    font-weight: 600;
    font-size: calc(1vh + 12px);
    margin-bottom: 2rem;
  }
  div{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
    button{
      font-size: calc(1vh + 1rem);
      padding: 10px;
      font-weight: 600;
      cursor: pointer;
      border-radius: 5px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    div{
      justify-content: center;
    }
  }
`

const LandingPage = () => {
  const [SuggestionsOpen, setSuggestionsOpen] = useState(false)
  const CloseSuggestions = () => setSuggestionsOpen(false)
  const OpenSuggestions = () => setSuggestionsOpen(true)
  const {IsLightTheme} = UseUserContext()

    const SignInWithGoogle = async () => {
      /* await auth.signInWithPopup(googleAuthProvider) */
      toast.success("Actualmente estamos mejorando esta característica del app.")
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
  return <>
      <MetaTags/>
      <ParticlesComponent/>
      <StyledHome>
        <article>
        <h2>
            Aprende matemáticas <br/>
           <span className="typewriter">
           <Typewriter 
                words={[" jugando.", " divirtiéndote.", " practicando."]}
                loop={Infinity}
                cursor
                className="typewriter"
                cursorStyle='|'
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={3000}
            />
           </span>
        </h2>
        <p>Matio es una plataforma didáctica para el aprendizaje de matemáticas en niños y jovenes.</p>
        <div>
        <Link href={"/jugar"}>
          <button className="btn-primary">
              Juegos <FontAwesomeIcon icon={faMeteor}/>
          </button>
          </Link>
          <button className="btn-secondary" onClick={OpenSuggestions}>
              Contacto <FontAwesomeIcon icon={faComment}/>
          </button>
         
          {/* <button className="btn-tertiary" onClick={SignInWithGoogle}>
              Ingresar <FontAwesomeIcon icon={faUserAstronaut}/>
          </button> */}
        </div>
    </article>
    <SuggestionsModal handleClose={CloseSuggestions} visible={SuggestionsOpen}/>
    <span className='rocket-init'>
        <Image src={IsLightTheme ? LogoLight : LogoNight}/>
    </span>
    </StyledHome>
    <div className="landing-pt2">
      <h2>¿Qué <span className="blue">beneficios</span> tiene <span className="green">Matio</span>?</h2>
      <section className="grid">
      <motion.article
           initial={{ opacity: 0, right: "100px" }}
           whileInView={{ opacity: 1, right: "0px" }}
        >
          <FontAwesomeIcon icon={faUserAstronaut}/>
          <h5>Los estudiantes pueden aprender matemáticas con juegos y recibir retroalimentación de sus equivocaciones.</h5>
        </motion.article>
        <motion.article
           initial={{ opacity: 0, right: "100px" }}
           whileInView={{ opacity: 1, right: "0px" }}
        >
          <FontAwesomeIcon icon={faChalkboardTeacher}/>
          <h5>Los profesores pueden crear examenes con unos pocos clicks y enviarsélos a sus alumnos para medir su rendimiento.</h5>
        </motion.article>
      </section>
      <div className="img-landing-1">
      <article>
        <p className="blue">Estudiantes</p>
      <h3 className="main-h3">
        En <span className="blue">Mat</span><span className="green">io</span> puedes practicar mientras juegas. 
      </h3>
      <Link href={"/jugar"}>
      <button className="btn-primary">
        Empieza a jugar
      </button>
      </Link>
      </article>
      <section className="image-landing-1">
        <Image src={"/captura2.png"} layout="fill"/>
      </section>
      </div>
      <div className="img-landing">
      <article>
        <p className="green">Profesores</p>
      <h3 className="main-h3">
        Con <span className="blue">Mat</span><span className="green">io</span> crea exámenes para tus estudiantes y mide su progreso.
      </h3>
      <Link href={"/login"}>
      <button className="btn-secondary">
        Regístrate como profesor
      </button>
      </Link>
      </article>
      <section className="image-landing">
        <Image src={"/captura.png"} layout="fill"/>
      </section>
      </div>
    </div>
    </> 


}

export default LandingPage