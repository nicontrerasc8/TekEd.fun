import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useKeypress from 'react-use-keypress';
import { DropInFromTop } from '../../Animations';
import { SRMDdata } from '../../Lib/arrays';
import { firestore } from '../../Lib/firebase';
import BackDrop from '../VisualComponents/BackDrop';
import LoadingContainer from '../VisualComponents/Loading';
import uuid from "react-uuid"
import { useRouter } from 'next/router';
import Counter from "../Utils/Counter"

const CreateExamContainer = ({handleClose, IsVisible, ClassID}) => {
     const [PageIndex, setPageIndex] = useState(0);
     const [ClassTitle, setClassTitle] = useState('');
     const [Loading, setLoading] = useState(false);
     const [NofQuestion, setNofQuestion] = useState(10);
     const [TimePerQuestion, setTimePerQuestion] = useState(15)
     const [Operator, setOperator] = useState('');
     const [Counter1, setCounter1] = useState(1);
     const [Counter2, setCounter2] = useState(1);
     const router = useRouter()
     const {classID} = router.query

     const CloseAll = () => {
          handleClose()
          setPageIndex(0)
          setNofQuestion(10)
          setClassTitle('')
     }

     const SetOperator = (n) => {
          setOperator(n)
          setPageIndex(PageIndex + 1)
     }

     useKeypress(["Enter"],(event) => {
          if(event.key === "Enter"){
               if(PageIndex === 0 && ClassTitle.length > 3) setPageIndex(1)
               if(PageIndex === 1 && NofQuestion > 0) setPageIndex(2) 
          }
      })

      const CreateExam = async () => {
           setLoading(true)
           CloseAll()
           var arr = []
           var v1, v2
           for (let i = 0; i < NofQuestion; i++) {
               v1 = Math.floor(Math.random() * Math.pow(10, Counter1) + 1);
               v2 = Math.floor(Math.random() * Math.pow(10, Counter2) + 1);
               if (Counter1 === 2 && v1 < 10) v1 += 10;
               if (Counter1 === 3 && v1 < 100) v1 += 100;
               if (Counter1 === 4 && v1 < 1000) v1 += 1000;
               if (Counter2 === 2 && v2 < 10) v2 += 10;
               if (Counter2 === 3 && v2 < 100) v2 += 100;
               if (Counter2 === 4 && v2 < 1000) v2 += 1000;
               if(v2 > v1){
                    var aux = v1
                    v1 = v2
                    v2 = aux
               }
               arr.push({
                    value1: v1,
                    value2: v2, 
                    timePerQuestion: TimePerQuestion
               })
               if(Operator === "Divisiones") do {
                    v1 = Math.floor(Math.random() * (Math.pow(10, Counter1) - 2) + 2);
                    v2 = Math.floor(Math.random() * (Math.pow(10, Counter2) - 2) + 2);
                    if (Counter1 === 2 && v1 < 10) v1 += 10;
                    if (Counter1 === 3 && v1 < 100) v1 += 100;
                    if (Counter1 === 4 && v1 < 1000) v1 += 1000;
                    if (Counter2 === 2 && v2 < 10) v2 += 10;
                    if (Counter2 === 3 && v2 < 100) v2 += 100;
                    if (Counter2 === 4 && v2 < 1000) v2 += 1000;
                } while (v1 % v2 != 0 || v2/2 % 2 != 0);
                if (v1 === v2) v2 = v1/2 
           }
           var uniqueId = uuid()
           const ExamDoc = firestore.doc(`examenes/${uniqueId}`);
      
           // Commit both docs together as a batch write.
           const batch = firestore.batch();
           batch.set(ExamDoc, { 
                preguntas: arr, 
                ExamTitle: ClassTitle, 
                Operador: Operator, 
                ClassID: ClassID,
                uniqueExamID: uniqueId,
                available: true,
                respuestas: []
               });

           await batch.commit().then(
                toast.success("Has creado el examen con éxito.")
           )
          router.push(`/clases/${classID}/${uniqueId}`)
      }
  
  return ( Loading ? <LoadingContainer/> :
<>
     <BackDrop onClick={CloseAll} isOn={IsVisible && PageIndex === 0}>
       <motion.div
          className='backdrop-form-container code'
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop}
          initial="hidden"
          animate="visible"
          exit="exit"
       >
            <h3>
                 Ingresa el título para el exámen
            </h3>
            <input className='code-class-input' value={ClassTitle} onChange={(e) => setClassTitle(e.target.value)}/>
          {
               ClassTitle.length > 3 ? <button type='button' className='btn-tertiary' onClick={() => setPageIndex(PageIndex + 1)}>
                    Siguiente
               </button>
               : 
               <button className='disabled' type='button' onClick={() => toast.error("El exámen debe tener como título al menos 4 caracteres.")}>
                    Siguiente
               </button>
          }
       </motion.div>
  </BackDrop>
  <BackDrop onClick={CloseAll} isOn={IsVisible && PageIndex === 1}>
       <motion.div
          className='backdrop-form-container code'
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop}
          initial="hidden"
          animate="visible"
          exit="exit"
       >
            <h3>Número de preguntas</h3>
            <Counter IsTheSecond={false} OtherValue={-1} x={NofQuestion} setX={setNofQuestion} min={1} max={10000}/> 

          <h3>Tiempo por pregunta (en segundos)</h3>
            <Counter IsTheSecond={false} OtherValue={-1} x={TimePerQuestion} setX={setTimePerQuestion} min={1} max={10000}/>
          {
               NofQuestion > 0 && TimePerQuestion > 0 ?
               <button className='btn-tertiary' type='button' onClick={() => setPageIndex(PageIndex + 1)}>
                    Siguiente
               </button> : 
               <button className='disabled' type='button' onClick={() => toast.error("Debe tener al menos 1 pregunta")}>
                    Siguiente
               </button>
          }
       </motion.div>
  </BackDrop>
  <BackDrop onClick={CloseAll} isOn={IsVisible && PageIndex === 2}>
       <motion.div
          className='backdrop-form-container code'
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop}
          initial="hidden"
          animate="visible"
          exit="exit"
       >
            <h3>Elige el operador del examen</h3>
            <div className='SRMD-btns'>
                 {
                      SRMDdata && SRMDdata.map((data, idx) => {
                           return <button 
                                        key={idx} 
                                        className={idx % 2 == 0 ? 'btn-primary' : 'btn-secondary'} 
                                        onClick={() => SetOperator(data.text)}>
                                <FontAwesomeIcon icon={data.icon}/>
                           </button>
                      })
                 }
            </div>
       </motion.div>
  </BackDrop>
  <BackDrop onClick={CloseAll} isOn={IsVisible && PageIndex === 3}>
     <motion.div
          className='backdrop-form-container'
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromTop}
          initial="hidden"
          animate="visible"
          exit="exit"
     >
          <label>Número de cifras del 1er número.</label>
          <Counter IsTheSecond={false} OtherValue={Counter2} x={Counter1} setX={setCounter1} min={1} max={4}/>
          <label>Número de cifras del 2do número.</label>
          <Counter IsTheSecond={true} OtherValue={Counter1} IsGreen={true} x={Counter2} setX={setCounter2} min={1} max={4}/>
          <button 
               className='btn-tertiary' 
               type='button'
               onClick={CreateExam}
               >
                    Crear exámen
          </button>
     </motion.div>
  </BackDrop>
  </>
  )
};

export default CreateExamContainer;
