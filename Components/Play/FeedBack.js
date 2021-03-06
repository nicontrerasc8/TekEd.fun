import { faCheck, faFire, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';
import { DropInFromLeft } from '../../Animations';
import UseUserContext from '../../Lib/context';
import BackDrop from '../VisualComponents/BackDrop';

const FeedBack = ({close, visible, wasCorrect, answer, v1, v2, operator, isAlgebra = false, feedText}) => {
  
     const {Streak} = UseUserContext()
  
  return <BackDrop onClick={close} isOn={visible}>
       <motion.div 
          onClick={(e) => e.stopPropagation()}
          className='feed-back'
          variants={DropInFromLeft}
          initial="hidden"
          animate="visible"
          exit="exit"
          >
         {
              Streak > 0 &&  <p className='fire'><FontAwesomeIcon icon={faFire}/> {Streak}</p>
         }
          <span className={wasCorrect ? 'feedback-icon green' : 'feedback-icon red'}>
               <FontAwesomeIcon icon={wasCorrect ? faCheck : faTimes}/>
          </span>
          <h2>{wasCorrect ? "Es correcto" : "Incorrecto"}</h2>
          {!isAlgebra && !feedText && <p>{v1} {operator} {v2} = <span className={wasCorrect ? 'green' : undefined}>{answer}</span></p>}
          {feedText && <p>{feedText}</p>}
       </motion.div>
  </BackDrop>
};

export default FeedBack;
