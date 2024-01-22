import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import MetaTags from '../../../Components/Utils/Metatags'
import Test from "../../../Components/PlayersUsage/Test"
import { first, result } from 'lodash'
import SetOptions from '../../../Functions/SetTestOptions'
import UseUserContext from '../../../Lib/context'
import CountDecimals from '../../../Functions/CountDecimals'
import SetPitagorasOptions from '../../../Functions/SetPitagorasOptions'
import PitagorasSetParams from '../../../Functions/PitagorasSetParams'
import DrawPitagoras from '../../../Functions/DrawPitagoras'

const Si = () => {

     const router = useRouter()
     const {side} = router.query
     const {IsLightTheme} = UseUserContext()
     const [Question, setQuestion] = useState(0)
     const [ArrOfQuestions, setArrOfQuestions] = useState([])
     const CanvasRef = useRef(null)
     const [Cifras, setCifras] = useState(0)

     const SetTestParameters = (cifras) => {
       setCifras(cifras)
      var Arr = PitagorasSetParams(false, side, cifras, Question)
          setArrOfQuestions(Arr)
       return Arr
}

const Draw = (width, height) => {
       var Canvas = CanvasRef.current
       var CanvasContext = Canvas.getContext('2d')
       CanvasContext.clearRect(0, 0, width, height)
       DrawPitagoras(ArrOfQuestions, IsLightTheme, CanvasContext, Question, height, Cifras)
}


  return <>
         <MetaTags title={"Encuentra el " + side + " | Teorema de Pitágoras"}/>
         <Test CanvasRef={CanvasRef} 
              IncrementCounter={() => setQuestion(Question+1)} 
              Theme={4} operator={side}
              SetArrFn={SetTestParameters}
              CanvasFn={Draw}
              />
  </>
}

export default Si