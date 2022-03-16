import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState, useRef } from "react";
import useKeypress from "react-use-keypress";
import { DropInFromTop } from "../Animations";
import UseUserContext from "../Lib/context";
import { firestore } from "../Lib/firebase";
import BackDrop from "./BackDrop";
import LoadingContainer from "./Loading";

const CoolCreateClassContainer = ({handleClose, IsVisible, refresh}) => {

     const form = useRef();

     const {user} = UseUserContext()

     const [FormValue, setFormValue] = useState("")
     const [TitleValue, setTitleValue] = useState("")
     const [PassWord, setPassWord] = useState("")
     const [CodeIsValid, setCodeIsValid] = useState(false)
     const [IsTooShort, setIsTooShort] = useState(true)
     const [Loading, setLoading] = useState(false)
     const [IsSecondPage, setIsSecondPage] = useState(false)
     const [SubmitIsValid, setSubmitIsValid] = useState(false)

     const SubmitForm = async () => {

          const ClassDoc = firestore.doc(`clases/${FormValue}`);
      
          // Commit both docs together as a batch write.
          const batch = firestore.batch();
          batch.set(ClassDoc, { estudiantes: [], Password: PassWord, TeacherID: user.uid, Title: TitleValue, ClassID: FormValue });
          setLoading(true)
      
          await batch.commit().then(setTimeout(() => {
               setLoading(false)
          }, 1000))
          setFormValue("")
          setIsSecondPage(false)
          setSubmitIsValid(false)
          setTitleValue("")
          handleClose()
          refresh()
        };     

     const ValueChange = (e) => {

          const val = e.target.value.toLowerCase();
          const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      
          // Only set form value if length is < 3 OR it passes regex
          if (val.length < 8) {
            setFormValue(val);
            setCodeIsValid(false);
          }
      
          if (re.test(val)) {
            setFormValue(val);
            setCodeIsValid(false);
          }
        };


        useEffect(() => {
          checkClassID(FormValue);
        }, [FormValue]);
      
        // Hit the database for ClassID match after each debounced change
        // useCallback is required for debounce to work
        const checkClassID = useCallback(debounce(async (ClassID) => {
          if (ClassID.length >= 8) {
            const ref = firestore.doc(`clases/${ClassID}`);
            const { exists } = await ref.get();
            setCodeIsValid(!exists)
            setIsTooShort(false)
          }
          else {
               setIsTooShort(true)
               setCodeIsValid(false)
          }
        }, 200),
        []
        );

        const GeneratePassWord = () => {
             var generator = require('generate-password');
 
             var password = generator.generate({
                 length: 8,
                 numbers: true
             });

             setPassWord(password)
        }

        useEffect(() => {
             if(TitleValue != "" && PassWord.length >= 8) setSubmitIsValid(true)
             else setSubmitIsValid(false)
        }, [TitleValue, PassWord])

        useEffect(() => {
         GeneratePassWord()    
        }, [])

        useEffect(() => {
             GeneratePassWord()
        }, [handleClose])

        useKeypress(["Enter"],(event) => {
          if(event.key === "Enter" && CodeIsValid){
               if(IsSecondPage)SubmitForm()
              else setIsSecondPage(true)
          }
      })


     return (
          Loading ? <LoadingContainer/> : <>
               <BackDrop onClick={handleClose} isOn={IsVisible && !IsSecondPage}>
          <motion.form 
          className='backdrop-form-container code'
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop}
          ref={form}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={SubmitForm}
          >
               <h3>Ingresa un código personalizado para tu clase</h3>
               <input
                pattern="[A-Za-z]"
               className="code-class-input" placeholder="Código" value={FormValue} onChange={ValueChange}/>
               {
                    CodeIsValid ? 
                    <button className="btn-tertiary" type='button' onClick={() => setIsSecondPage(true)}>
                         Siguiente
                    </button> : 
                    <button className="disabled" disabled>
                         Siguiente
                    </button> 
               }
               {
                    IsTooShort ? <p className="red">El código debe tener al menos 8 carácteres. Solo debe contener letras y/o números.</p> :
                    CodeIsValid ?
                    <p className="green">El código que has ingresado es válido.</p>
                    : <p className="red">Otra clase ya tiene este código, intenta con un código similar.</p>
               }
          </motion.form>
     </BackDrop>
     <BackDrop onClick={handleClose} isOn={IsVisible && IsSecondPage}>
     <motion.form 
          className="backdrop-form-container create-class"
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop  }
          ref={form}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={SubmitForm}
          >
             <label>Grado y sección del aula</label>
             <input 
               placeholder="Ejemplo: 3ro B" 
               value={TitleValue} 
               onChange={(e) => setTitleValue(e.target.value)}/> 
               <label>Contraseña del aula</label>
               <input type="text" value={PassWord} onChange={(e) => setPassWord(e.target.value)}/>
               {PassWord.length < 8 && <p className="red password-advert">La contraseña debe tener al menos 8 carácteres</p>}
               {
                    SubmitIsValid ? <button type='button' className="btn-secondary" onClick={SubmitForm}>
                    Crear clase
               </button> : <button disabled className="disabled">
                    Crear clase
               </button>
               }
          </motion.form>
     </BackDrop>
          </>
     )
}

export default CoolCreateClassContainer