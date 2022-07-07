import { counter } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import MetaTags from '../../../../Components/Utils/Metatags'

const Figura = () => {

    const router = useRouter()
    const {figure, operator} = router.query
    const [Array, setArray] = useState({})
    const [Variants, setVariants] = useState({})
    const [Figure, setFigure] = useState("")
    const [type, setType] = useState("")
    const CanvasRef = useRef(null)

    useEffect(() => {

      switch (figure) {
        case "circulo":
          setFigure("círculo")
          break;
        case "rectangulo":
          setFigure("rectángulo")
          break;
        case "cuadrado":
          setFigure("cuadrado")
          break;
        case "triangulo":
          setFigure("triángulo");
          break;
        default:
          break;
      }
     
      var Arr = {}
      if(operator == "area"){
        setType("área")
        if(figure == "circulo"){
            var Ratio =  Math.floor(Math.random() * 18) + 2;
            var Result = Math.round(100*3.14*Ratio*Ratio)/100
            Arr = {
                ratio: Ratio,
                result: Result
            }
            setVariants(Arr)
            return
        }
      }
      else if(operator == "perimetro") {
        setType("perimetro")
        if(figure == "circulo"){
          var Ratio = Math.floor(Math.random()*18 + 2);
          var Result = Math.round(100*3.14*Ratio*2)/100
          Arr = {
            ratio: Ratio,
            result: Result
          }
          setVariants(Arr)
          return
        }
      }
    }, [figure])
    

  return <>
    <MetaTags title={"Encuentra el " + type + " del " + Figure}/>
    <div className='play-page'>
      <h2>Encuentra el {type} del {Figure}</h2>
      <canvas ref={CanvasRef} className="figures-canva"/>
        <h2>{Variants.ratio} = {Variants.result}</h2>
    </div>
  </>
}

export default Figura