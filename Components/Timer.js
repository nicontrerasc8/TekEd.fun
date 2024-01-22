import React, { useEffect, useState } from 'react'
import UseUserContext from "../Lib/context"

const TimerComponent = ({max, isOn, Next}) => {

     const [TimeLeft, setTimeLeft] = useState(5)
     const {IsTimerOn, setIsTimerOn} = UseUserContext()

     const fillerStyles = {
          width: `${TimeLeft*100/max}%`,
     }

     useEffect(() => {
      if(!isOn || !max) setIsTimerOn(false)
       setTimeLeft(max)
     }, [max, isOn])
     

     useEffect(() => {
          var interval = null
              if(isOn){
               interval = setInterval(() => {
               if(TimeLeft > 1) setTimeLeft(TimeLeft-1)   
               else {
                    Next()    
                    setTimeLeft(max)
               }  
            }, 1000)
          }    
          return () => clearInterval(interval)
        }, [TimeLeft, isOn])

  if(isOn) return (
    <div className='timer'>
     <span style={fillerStyles}/>
     <h2>{TimeLeft}</h2>
    </div>
  )
  else return ""
}

export default TimerComponent