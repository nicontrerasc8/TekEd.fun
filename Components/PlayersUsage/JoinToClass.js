import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useKeypress from 'react-use-keypress'
import UseUserContext from '../../Lib/context'
import { firestore } from '../../Lib/firebase'


const JoinToClass = () => {
     const [Code, setCode] = useState("")
     const {user} = UseUserContext()
     const [Password, setPassword] = useState("") 
     const [IsValid, setIsValid] = useState(false)
     const {TurnOnLoading, TurnOffLoading} = UseUserContext()


     const AddStudent = async(doc) => {
          const batch = firestore.batch()
          batch.set(doc, 
               {estudiantes:  [user.uid]},
               {merge: true}
          )
          await batch.commit()
     }


     const ValidateCode = async () => {
          TurnOnLoading()
          const ref = firestore.doc(`clases/${Code}`);
          const { exists } = await ref.get();
          if(exists){
               const ClassDoc = firestore.doc(`clases/${Code}`)
               ClassDoc.get().then((doc) => {
                    const DocData = doc.data()
                    if(Password == DocData.Password) {
                         AddStudent(ClassDoc) 
                         toast.success("¡Muy bien, te has unido a la clase!")
                    }
                    else toast.error("La contraseña que has ingresado no es correcta.")
              }) 
              TurnOffLoading()
          }
          else {
               toast.error("El código de clase que has ingresado no existe")
               TurnOffLoading()
          }
          setTimeout(() => {
               location.reload()
          }, 2000);
     }

     useEffect(() => {
          if(Code != "" && Password != "") setIsValid(true)
          else setIsValid(false)
     }, [Code, Password])


     useKeypress(["Enter"],(event) => {
          if(event.key === "Enter" && IsValid) ValidateCode()
      })

     return <>
          <input placeholder='Código de la clase' value={Code} onChange={(e) => setCode(e.target.value)}/>
          <input placeholder='Contraseña' value={Password} onChange={(e) => setPassword(e.target.value)}/>
          {
               IsValid ? 
               <button className='btn-secondary' onClick={ValidateCode}>
                    Unirme
               </button>
               : <button className='disabled' disabled>
                    Unirme
               </button>
          }
     </>
}

export default JoinToClass
