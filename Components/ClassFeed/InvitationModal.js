import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import { DropInFromLeft, DropInFromTop } from '../../Animations'
import BackDrop from '../BackDrop'

const InvitationModal = ({handleClose, Visible, Data}) => {

     const [linkValue, setLinkValue] = useState("")

     const CopiedMessage = () => {
          toast.success("El link ha sido copiado en el portapales, envíalo a tus alumnos con CTRL + v.")
     }

     useEffect(() => {
          setLinkValue(`https://teked-fun.vercel.app/clases/${Data.Title}-${Data.TeacherID}`)
          console.log(Data)
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
                    <h3>Copia este link y envíaselo a tus alumnos</h3>
                    <input value={linkValue} readOnly/>
                    <CopyToClipboard text={linkValue} onCopy={CopiedMessage}>
                         <button className='btn-tertiary' type='button'>
                              Copiar link
                         </button>
                    </CopyToClipboard>
          </motion.div>
     </BackDrop>
}

export default InvitationModal
