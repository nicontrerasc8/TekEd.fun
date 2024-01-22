import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Counter = ({x, setX, min, max, IsGreen, OtherValue = -1, IsTheSecond = false, dif = 1}) => {


     const [SelectorOpened, setSelectorOpened] = useState(false)
     const [Options, setOptions] = useState([])

     const Aumentar = () => {
          var parseX = Number(x)
          if(parseX < max) {
               if(IsTheSecond){
                    if(parseX < OtherValue) setX(parseX + dif)
                    return
               } 
               else {
                    if(parseX + dif > min)setX(parseX + dif)
                    else setX(min)
               }
          } 
     }
     const Disminuir = () => {
          var parseX = Number(x)
          if(parseX > min) {
               if(!IsTheSecond){
                    if(parseX > OtherValue) setX(parseX - dif)
               }
               else setX(parseX - dif)
          }
     }

     const DefineParameters = (e) => {
          var val = Number(e.target.value)
          if(val <= max) {
               if(val > 0) setX(val)
               else setX("")
          }
     }

     const CloseContainer = (data) => {
          setX(data)
          setSelectorOpened(false)
     }

     const OpenSelector = () => {
          if(max-min < 10) 
               setSelectorOpened(!SelectorOpened)
     }

     useEffect(() => {
       if(max - min < 10){
          var arr = []
          
          for (let i = min; i <= max; i++) 
               arr.push(i)
          
          setOptions(arr)
       }
     }, [min, max])
     

     return <div className={IsGreen ? 'counter green-counter' : 'counter'}>
          <button onClick={Disminuir}>
               -
          </button>
             <input type={max-min < 10 ? "button" : "number"} value={x} onChange={(e) => DefineParameters(e)} onClick={OpenSelector}/>
          {
               SelectorOpened && <div className="dropdown-counter">
               <div>
               {
                    Options.length ? Options.map((data,idx) => {
                         return <span key={idx} onClick={() => CloseContainer(data)}>{data}</span>
                    }) : ""
               }
               </div>
          </div>
          }     
          <button onClick={Aumentar}>
               +
          </button>
     </div>
}

export default Counter