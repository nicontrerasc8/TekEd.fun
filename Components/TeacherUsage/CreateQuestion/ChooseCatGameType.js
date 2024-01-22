import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const ChooseCategoryGameType = ({Actual, Change, Array}) => {

    const [Show, setShow] = useState(false)
    const ChangeFN = (cat) => {
      setShow(false)
      Change(cat)
    }
  
    return <div className='choose-category-div'>
      <button className='btn-primary choose-cat' onClick={() => setShow(!Show)}>
        {Actual.cat ? Actual.cat : Actual} {
          Show ? <FaChevronUp/> : <FaChevronDown/>
        }
      </button>
      {
        Show && Array.length && Array.map((info, idx) => {
         if(Actual != info) return <button key={idx} className='btn-primary choose-cat' onClick={() => ChangeFN(info)}>
            {info.cat ? info.cat : info}
          </button>
        })
      }
    </div>
  
  }
  export default ChooseCategoryGameType