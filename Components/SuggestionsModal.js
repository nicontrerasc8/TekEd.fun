import { motion } from 'framer-motion'
import emailjs from "@emailjs/browser"
import BackDrop from './BackDrop'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import LoadingContainer from './Loading'

const DropInFromLeft = {
    hidden: {
        x: "-100vw",
        transform: ""
    },
    visible: {
        x: 0,
        opacity: 1,
        transition:{
            duration:.2,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    }, 
    exit: {
        x: "100vw"
    }
}

const SuggestionsModal = ({handleClose, visible}) => {

    const form = useRef();
    const [Loading, setLoading] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true)
        emailjs.sendForm('service_f4cztw6', 'template_dpvw70p', form.current, 'user_kYaUkak2JxRBvs81TCFCh')
          .then((result) => {
              console.log(result.text);
              handleClose()
              setLoading(false)
              toast('¡Tu solicitud ha sido recibida!',
                {
                    icon: '🚀',
                    duration: 10000,
                    style: {
                        background: "var(--main-green)",
                        color: "var(--primary)",
                        fontWeight: "600"
                    },
                }
            );
          }, (error) => {
              console.log(error.text);
              toast.error("Ocurrió un error, inténtalo de nuevo")
          });
      };

   

    return <BackDrop onClick={handleClose} isOn={visible}>
        {Loading && <LoadingContainer/>}
        <motion.form 
            className='suggestions-container' 
            onClick={(e) => e.stopPropagation()}
            variants={DropInFromLeft}
            ref={form}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={sendEmail}
            >
            <h3>¡Llena el formulario para contactarnos con tu cole!</h3>
            <input placeholder='Nombre del colegio' name='colegio' autoComplete='off'/>
            <input placeholder='Provincia' name='provincia' autoComplete='off'/>
            <input placeholder='Teléfono del colegio' name='celular' autoComplete='off'/>
            <button className='btn-tertiary' type='submit'>
                Enviar
            </button>
        </motion.form>
    </BackDrop>
}

export default SuggestionsModal
