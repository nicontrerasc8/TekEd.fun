import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'


const BackDrop = ({ children, onClick, isOn }) => {
    return <AnimatePresence 
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
            >
        {
            isOn && <motion.section 
            className='backdrop' 
            onClick={onClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {children}
        </motion.section>
        }
    </AnimatePresence>
}

export default BackDrop
