import { motion } from 'framer-motion'
import emailjs from "@emailjs/browser"
import BackDrop from '../VisualComponents/BackDrop'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { DropInFromLeft } from '../../Animations'

const SuggestionsModal = ({handleClose, visible}) => {

    const form = useRef();
    const [FormCompleted, setFormCompleted] = useState(false)
    const [Name, setName] = useState("")
    const [Province, setProvince] = useState("")
    const [Phone, setPhone] = useState("")

    const sendEmail = (e) => {
            e.preventDefault();
        emailjs.sendForm('service_f4cztw6', 'template_dpvw70p', form.current, 'user_kYaUkak2JxRBvs81TCFCh')
        toast.success("Perfecto, has enviado los datos de tu cole")
        handleClose()
      };

    const AlertCompleteForm = () => {
        toast.error('¡Por favor, completa el formulario!');
      }

      useEffect(() => {
          if(Name != "" && Phone != "" && Province != "") setFormCompleted(true)
          else setFormCompleted(false)
      }, [Name, Phone, Province])

   

    return <BackDrop onClick={handleClose} isOn={visible}>
            <motion.form 
                className='backdrop-form-container' 
                onClick={(e) => e.stopPropagation()}
                variants={DropInFromLeft}
                ref={form}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={sendEmail}
                >
                <h3>¡Llena el formulario para contactarnos con tu cole!</h3>
                <input type="text" placeholder='Nombre del colegio' name='colegio' autoComplete='off'
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="text" placeholder='Provincia' name='provincia' autoComplete='off'
                    onChange={(e) => setProvince(e.target.value)}
                />
                <input type="tel" placeholder='Teléfono del colegio' name='celular' autoComplete='off'
                    onChange={(e) => setPhone(e.target.value)}
                />
                {
                    FormCompleted ?  <button className='btn-tertiary' type='submit'>
                    Enviar
                </button> : <button type='button' className='disabled' onClick={AlertCompleteForm}>
                    Enviar
                </button>
                }
            </motion.form>
        </BackDrop>
}

export default SuggestionsModal
