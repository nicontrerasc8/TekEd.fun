import toast from "react-hot-toast"

const Counter = ({x, setX, min, max, IsGreen, OtherValue, IsTheSecond, dif = 1}) => {

     const Aumentar = () => {
          if(x < max) {
               if(IsTheSecond){
                    if(x < OtherValue) setX(x + dif)
               } 
               else setX(x + dif)
          } 
     }
     const Disminuir = () => {
          if(x > min) {
               if(!IsTheSecond){
                    if(x > OtherValue) setX(x-dif)
               }
               else setX(x - dif)
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