import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import { DropInFromLeft, DropInFromTop } from '../../Animations'
import BackDrop from '../BackDrop'

const InvitationModal = ({handleClose, Visible, Data}) => {

     const [CopyValue, setCopyValue] = useState("")
     const [Code, setCode] = useState("")
     const [Password, setPassword] = useState("")

     const CopiedMessage = () => {
          toast.success("El código y contraseña han sido copiados, envíaselo a tus alumnos.")
     }

     useEffect(() => {
          setCode(Data.ClassID)
          setPassword(Data.Password)
          setCopyValue(`Código de la clase: ${Data.ClassID}. Contraseña: ${Data.Password}`)
     }, [Data])

     return <BackDrop
     onClick={handleClose} isOn={Visible}>
          <motion.div 
          onClick={e => e.stopPropagation()}
               variants={DropInFromTop}
               initial="hidden"
               animate="visible"
               exit="exit"
               className='backdrop-form-container code'>
                    <h4>Envía a tus alumnos el código y la contraseña de la clase.</h4>
                    <h3>Código: <span className='blue'>{Code}</span></h3>
                    <h3>Contraseña: <span className='green'>{Password}</span></h3>
                    <CopyToClipboard text={CopyValue} onCopy={CopiedMessage}>
                         <button className='btn-tertiary' type='button'>
                              Copiar
                         </button>
                    </CopyToClipboard>
          </motion.div>
     </BackDrop>
}

export default InvitationModal
