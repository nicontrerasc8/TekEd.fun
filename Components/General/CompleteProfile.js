import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import { DropInFromTop } from '../../Animations'
import UseUserContext from '../../Lib/context'
import BackDrop from '../VisualComponents/BackDrop'

const CompleteProfileComponent = () => {
  const {CompleteProfile, setCompleteProfile} = UseUserContext()
  const router = useRouter()

  const GoToCreate = () => {
    setCompleteProfile(false)
    router.push("/completa-tu-perfil")
  }

  return <BackDrop isOn={CompleteProfile}>
    <motion.div 
          className='backdrop-form-container code'
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop}
          initial="hidden"
          animate="visible"
          exit="exit"
          >
               <h3>Completa tu registro como usuario</h3>
              <button type='button' className='btn-tertiary' onClick={GoToCreate}>
                Ir a completarlo
              </button>
          </motion.div>
  </BackDrop>
}

export default CompleteProfileComponent