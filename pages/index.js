import { faRocket, faSatellite, faSchool, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import styled from 'styled-components'
import MetaTags from '../Components/Metatags'
import SuggestionsModal from '../Components/SuggestionsModal'

const StyledHome = styled.div`
display: flex;
flex-direction: row;
margin-top: 8rem;
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

export default function Home() {
  const [SuggestionsOpen, setSuggestionsOpen] = useState(false)
  const CloseSuggestions = () => setSuggestionsOpen(false)
    const OpenSuggestions = () => setSuggestionsOpen(true)
  return <>
      <MetaTags/>
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
        <p>TekEd es una plataforma didáctica para el aprendizaje de matemáticas en niños de primaria.</p>
        <div>
          <button className="btn-primary" onClick={OpenSuggestions}>
            Quiero para mi cole <FontAwesomeIcon icon={faSchool}/>
          </button>
          <button className="btn-secondary">
              Ingresar <FontAwesomeIcon icon={faUserAstronaut}/>
          </button>
        </div>
    </article>
    <SuggestionsModal handleClose={CloseSuggestions} visible={SuggestionsOpen}/>
    <span className='rocket-init'>
        <FontAwesomeIcon icon={faRocket}/>
    </span>
    </StyledHome>
    </>
}
