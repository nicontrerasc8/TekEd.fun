import React from 'react'
import UseUserContext from '../../Lib/context'
import BackDrop from '../VisualComponents/BackDrop'
import {motion} from "framer-motion"
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DropInFromTop } from '../../Animations'

const ThemeBackDrop = ({IsIn, Out}) => {

     const { ChangeTheme, IsLightTheme } = UseUserContext()

     const ChangeTheTheme = (isForLight) => {
          if(isForLight && !IsLightTheme || !isForLight && IsLightTheme) ChangeTheme()
          Out()
     }


  return <BackDrop isOn={IsIn} onClick={Out}>
       <motion.div 
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop}
          initial="hidden"
          animate="visible"
          exit="exit"
       className='btns-light-dark'>
                         <button className="btn-light" onClick={() => ChangeTheTheme(true)} type='button'>
                              <FontAwesomeIcon icon={faSun}/> 
                              <span>Tema claro</span>
                         </button>
                         <button className="btn-dark" type='button' onClick={() => ChangeTheTheme(false)}>
                              <FontAwesomeIcon icon={faMoon}/> 
                              <span>Tema oscuro</span>
                         </button>
       </motion.div>
  </BackDrop>
}

export default ThemeBackDrop