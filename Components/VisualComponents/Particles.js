import { useEffect, useState } from "react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import UseUserContext from "../../Lib/context"


const ParticlesComponent = () => {

    const {IsLightTheme} = UseUserContext()
    const [BG, setBG] = useState("")
    const [PColor, setPColor] = useState("")

    const HandleInit = async(main) => {
        await loadFull(main)
      } 

      useEffect(() => {
        if(!IsLightTheme) {
            setBG("#020e21")
            setPColor("#fde974")
            return
        }
        setBG("#f9fcff") 
        setPColor("#d66700")      
      }, [IsLightTheme])
      

    return <div className="particles">
        <Particles id='particles' init={HandleInit}
  options={{
    background: {
      color: {
        value: BG,
      },
    },
    fpsLimit: 220,
    interactivity: {
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 1,
        },
      },
    },
    particles: {
      color: {
        value: PColor,
      },
      move: {
        direction: "up",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 3,
        straight: true,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: "star",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }}
  />
    </div>
}

export default ParticlesComponent