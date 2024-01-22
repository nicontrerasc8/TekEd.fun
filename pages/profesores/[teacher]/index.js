import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import BackDrop from '../../../Components/VisualComponents/BackDrop';
import {motion} from "framer-motion"
import { auth, firestore, fromMillis, getUserWithUserID, postToJSON } from '../../../Lib/firebase';
import { DropInFromLeft } from '../../../Animations';
import CopyToClipboard from 'react-copy-to-clipboard';
import MetaTags from '../../../Components/Utils/Metatags';
import LoadingContainer from '../../../Components/VisualComponents/Loading';


export const getServerSideProps = async ({query}) => {

    const {teacher} = query
    var examenes = []
    var Col = firestore.collection(`users`).doc(teacher).collection("examenes").orderBy("createdAt", "desc").limit(3)
    await Col.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        examenes.push(postToJSON(doc))
      })
    })

    return {
      props: {examenes, teacher}
    }
}

function Examen({info, teacher}){
  const [fecha, setDate] = useState(new Date())
  const [vinculo, setVinculo] = useState("")

  const [ShowCode, setShowCode] = useState(false)
  useEffect(() => {
    const createdAt = typeof info?.createdAt === 'number' ? new Date(info.createdAt) : info.createdAt.toDate();
    setDate(createdAt)
    var s = 'Hola, para unirte al exámen, ingresa al link: https://matio.vercel.app/profesores/'+teacher+"/"+info.id + " o ingresa con el código: " + teacher+"/"+info.id
    setVinculo(s)
  }, [info])
  

return <article>
  <BackDrop isOn={ShowCode} onClick={() => setShowCode(false)}>
  <motion.div 
          className='informs teacher-invitation' 
          onClick={(e) => e.stopPropagation()}
          variants={DropInFromLeft}
          initial="hidden"
          animate="visible"
          exit="exit"
       >
          <h2>
            Invita a tus alumnos a rendir el exámen
          </h2>
          <p>Copia el link del examen y envíalo a tus alumnos.</p>
          <CopyToClipboard text={vinculo}>
              <button className='btn-secondary'>
                Copia la invitación
              </button>
          </CopyToClipboard>
       </motion.div>
  </BackDrop>
            <h3>{info.title}</h3>
            <span>Creado el {fecha.toISOString().split('T')[0]}</span>
            <button className='btn-primary' onClick={() => setShowCode(true)}>
              Invitar a mis alumnos
            </button>
            <Link href={info.id ? `/profesores/${teacher}/${info.id}/analiticas` : "/"}>
              <button className='btn-secondary'>
                Ver los resultados
              </button>
            </Link>
          </article>
}

function Examenes ({examenes, teacher}){

  const [Examenes, setExamenes] = useState(examenes)
  const [ExamsEnd, setExamsEnd] = useState(false)
  const [Loading, setLoading] = useState(false)

  const GetMoreExams = async()=> {
    setLoading(true)
    const last = Examenes[Examenes.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collection(`users`).doc(teacher).collection("examenes")
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(3);

      const newExams = (await query.get()).docs.map((doc) => doc.data());

      setExamenes(Examenes.concat(newExams));

      if (newExams.length < 3) {
        setExamsEnd(true);
      }
      setLoading(false)

  }

  useEffect(() => {
    console.log(examenes)
    console.log(teacher)

  }, [examenes])

  return <>
    <MetaTags title='Mis examenes | Matio'/>
    {Loading ? <LoadingContainer/> : ""}
    <div className='exam-check'>
      <h1>Examenes creados:</h1>
      <section>
      {
        Examenes.length && Examenes.map((info, idx) => {
          return <Examen key={idx} info={info} teacher={teacher}/>
        })
      }
      </section>
      {
        ExamsEnd ? "" : 
        <button onClick={GetMoreExams} className='btn-primary exam-check-btn'>
          Ver más evaluaciones
        </button>
      }
    </div>
  </>
}

export default Examenes