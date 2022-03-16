import toast from "react-hot-toast"

const Counter = ({x, setX, min, max, IsGreen, OtherValue, IsTheSecond}) => {

     const Aumentar = () => {
          if(x < max) {
               if(IsTheSecond){
                    if(x < OtherValue) setX(x + 1)
                    else toast.error("El primer número debe ser mayor o igual que el segundo.")
               } 
               else setX(x + 1)
          } 
     }
     const Disminuir = () => {
          if(x > min) {
               if(!IsTheSecond){
                    if(x > OtherValue) setX(x-1)
                    else toast.error("El primer número debe ser mayor o igual que el segundo.")
               }
               else setX(x - 1)
          }
     }

     return <div className={IsGreen ? 'counter green-counter' : 'counter'}>
          <button onClick={Disminuir}>
               -
          </button>
          {x}
          <button onClick={Aumentar}>
               +
          </button>
     </div>
}

export default Counter