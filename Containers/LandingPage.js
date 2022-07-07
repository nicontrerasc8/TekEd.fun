import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMeteor, faRocket, faSatellite, faSchool, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import styled from "styled-components"
import Image from "next/image"
import LogoLight from "../public/logo-light.png"
import LogoNight from "../public/logo-dark.png"
import MetaTags from "../Components/Utils/Metatags"
import SuggestionsModal from "../Components/General/SuggestionsModal"
import { auth, googleAuthProvider } from "../Lib/firebase"
import UseUserContext from "../Lib/context"
import Link from "next/link"
import ParticlesComponent from "../Components/VisualComponents/Particles"

const StyledHome = styled.div`
position: relative;
z-index: 1;
display: flex;
flex-direction: row;
margin-top: 7rem;
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
        <p>Matio es una plataforma didáctica para el aprendizaje de matemáticas en niños de primaria.</p>
        <div>
          <button className="btn-primary" onClick={OpenSuggestions}>
            Quiero para mi cole <FontAwesomeIcon icon={faSchool}/>
          </button>
          <Link href={"/jugar"}>
          <button className="btn-secondary">
              Jugar <FontAwesomeIcon icon={faMeteor}/>
          </button>
          </Link>
          <button className="btn-tertiary" onClick={SignInWithGoogle}>
              Ingresar <FontAwesomeIcon icon={faUserAstronaut}/>
          </button>
        </div>
    </article>
    <SuggestionsModal handleClose={CloseSuggestions} visible={SuggestionsOpen}/>
    <span className='rocket-init'>
        <Image src={IsLightTheme ? LogoLight : LogoNight}/>
    </span>
    </StyledHome>
    </> 


}

export default LandingPage