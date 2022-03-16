import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BottomNavBar from '../../Components/BottomNavBar';
import CreateExamContainer from '../../Components/CreateExamContainer';
import { firestore } from '../../Lib/firebase';
import UseUserContext from "../../Lib/context"

const ExamCart = ({data, idx}) => {

     const router = useRouter()
     const {TurnOnLoading, TurnOffLoading} = UseUserContext() 


     const DisableExam = async () => {
          const examRef = firestore.collection('examenes').doc(data.uniqueExamID)
          const doIt = confirm('¿Estás seguro(a) que quieres inhabilitar este exámen?');
          if (doIt) {
               await examRef.update({
                    available: false
               })
               location.reload()
          }
        };

        const EnableExam = async () => {
          const examRef = firestore.collection('examenes').doc(data.uniqueExamID)
          const doIt = confirm('¿Estás seguro(a) que quieres habilitar este exámen?');
          if (doIt) {
               await examRef.update({
                    available: true
               })
               location.reload()
          }
        }
 
     return <article className={idx % 2 != 0 ? 'exam-cart border-green' : 'exam-cart border-blue'} key={idx}>
               <h1>
                    {data.ExamTitle}
               </h1>
               {/* <button className='btn-primary'>
                    Editar
               </button> */}
               <button onClick={() => router.push(`/clases/${data.ClassID}/${data.uniqueExamID}`)} className={idx % 2 != 0 ? 'btn-primary' : 'btn-secondary'}>
                    Resultados
               </button>
               {/* <button className={data.available ? 'b-red' : 'btn-secondary'} onClick={data.available ? DisableExam : EnableExam}>
                    {data.available ? 'Inhabilitar' : 'Habilitar'}
               </button> */}
          </article>
}

const TeacherClass = ({Examenes, ClassID}) => {

     const [OpenCreateExam, setOpenCreateExam] = useState(false);

     return <>
               <CreateExamContainer handleClose={() => setOpenCreateExam(false)} IsVisible={OpenCreateExam} ClassID={ClassID}/>
                    {Examenes.length > 0 && <h1 className='text-center' style={{transform: "scale(.85)"}}>Tus examenes:</h1>}
                    <div className='class-feed'>
                         {
                              Examenes.length > 0 ? Examenes.map((data, idx) => {
                                   return <ExamCart data={data} key={idx}/>
                              }) : <div className='no-exam-message'>
                                   <p>
                                        Actualmente no tienes <span className='blue'>exámenes</span>. 
                                        Crea uno para medir el rendimiento de tus <span className='green'>estudiantes</span>.
                                   </p>
                              </div>
                         }
                    </div>
          {/*           <BottomNavBar/> */}
                    <div className='dashboard-sections'>
                         <div>
                              <h2>
                                   Crea un exámen
                              </h2>
                              <p>
                                   No tardarás más de 30 segundos.
                              </p>
                              <button className='btn-secondary' onClick={() => setOpenCreateExam(true)}>
                                   Crear
                              </button>
                         </div>
                         {/* <div>
                         <h2>Crea un anuncio</h2>
                         <p>Comúnica lo que tengas que decir con tus alumnos.</p>
                         <button className='btn-secondary'>
                         Crear
                         </button>
                         </div> */}
                    </div>
               </>; 
};

export default TeacherClass;
