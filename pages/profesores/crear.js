import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import {FaChevronDown, FaChevronUp, FaDivide, FaMinus, FaPlus, FaTimes} from "react-icons/fa"
import CreateQuestionContainer from '../../Components/CreateQuestionContainer'
import QuestionsInformsContainer from '../../Components/TeacherUsage/QuestionsInfoContainer'
import { auth, firestore, serverTimestamp } from '../../Lib/firebase'
import uuid from 'react-uuid';
import toast from 'react-hot-toast'
import UseUserContext from '../../Lib/context'
import BackDrop from '../../Components/VisualComponents/BackDrop'
import { motion } from 'framer-motion'
import { DropInFromLeft } from '../../Animations'
import LoadingContainer from '../../Components/VisualComponents/Loading'
import MetaTags from '../../Components/Utils/Metatags'


const Profesores = () => {

  const [OpenBackdrop, setOpenBackdrop] = useState(false)
  const [QuestionsOn, setQuestionsOn] = useState(false)
  const [ArrayOfQuestions, setArrayOfQuestions] = useState([])
  const [Questions, setQuestions] = useState([])
  const [CreateQuestion, setCreateQuestion] = useState(false)
  const [Title, setTitle] = useState('')
  const [CounterAdded, setCounterAdded] = useState(0)
  const [Loading, setLoading] = useState(false)

  const DeleteQuestion = (e) => {
    ArrayOfQuestions.splice(
      ArrayOfQuestions.findIndex(p => p === e)
    )
  }

  const UploadAll = async(e) => {
    e.preventDefault();
    if(Title.length){
      toast.success("Tu examen se está subiendo...")
      const uid = auth.currentUser.uid;
     if(uid){
      var uniqueID = uuid()
      const ref = firestore.collection('users').doc(uid).collection("examenes").doc(uniqueID);
      var data = {
          questions: ArrayOfQuestions,
          createdAt: serverTimestamp(),
          id: uniqueID,
          respuestas: [],
          title: Title
      }
      await ref.set(data)
      toast.success("Tu examen ha sido creado con éxito")
      setArrayOfQuestions([])
      setOpenBackdrop(false)
      return
     }
    }
    else {
      toast.error("Escribe un nombre para tu examen")
    }
  }



  const AddQuestion = (e) => {
    setArrayOfQuestions(ArrayOfQuestions => [...ArrayOfQuestions, e])
  }

  const AddQuestions = (e) => {
    var aux = ArrayOfQuestions
    for (let i = 0; i < e.length; i++) {
      aux.push(e[i])
    }
    setCounterAdded(CounterAdded+1)
    setArrayOfQuestions(aux)
    console.log(aux)
  }

  useEffect(() => {
    setQuestions(ArrayOfQuestions)
  }, [ArrayOfQuestions, CounterAdded, ])
  
  

  

  return <>
  <MetaTags title='Crea un examen | Matio'/>
  {Loading && <LoadingContainer/>}
    <div className='panel-main-div'>
        <section className='cool-sec'>
        {
         Questions.length > 0  ?
          <button className='btn-tertiary' onClick={() => setQuestionsOn(true)}>Mostrar las preguntas &#40;{Questions.length}&#41;</button> : ""
        }
        <QuestionsInformsContainer Eliminate={DeleteQuestion} IsIn={QuestionsOn} Data={ArrayOfQuestions} Out={() => setQuestionsOn(false)} Upload={UploadAll}/>
          <CreateQuestionContainer NewQuestions={(e) => AddQuestions(e)} NewQuestion={(e) => AddQuestion(e)} SetNew={() => setCreateQuestion(!CreateQuestion)} IsOn={CreateQuestion}/>
          {Questions.length > 0  ? 
          <>
                    <p style={{marginTop: "4vh"}}>¿Ya tienes todo listo?</p>
          <button 
            style={{marginTop: "20px"}} 
            className="btn-secondary" 
            onClick={() => setOpenBackdrop(true)}>
              Sube el examen
          </button> 
          </>
          : ""}
        </section>  
  </div>
  <BackDrop isOn={OpenBackdrop} onClick={() => setOpenBackdrop(false)}>
  <motion.div
    className='backdrop-form-container add-exam' 
    onClick={(e) => e.stopPropagation()}
    variants={DropInFromLeft}
  >
    <label>
      Escribe el título del examen
    </label>
    <input value={Title} onChange={(e) => setTitle(e.target.value)}/>
    <button style={{marginTop: "20px"}} className="btn-secondary" onClick={UploadAll}>Subir exámen</button>
  </motion.div>
</BackDrop>
  </>
}

export default Profesores
