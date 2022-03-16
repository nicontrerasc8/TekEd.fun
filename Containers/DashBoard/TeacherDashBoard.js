import { motion } from "framer-motion"
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import { DropInFromBottom, DropInFromLeft, DropInFromRight, DropInFromTop } from "../../Animations";
import BackDrop from "../../Components/BackDrop"
import ClassFeed from "../../Components/ClassFeed/ClassFeed";
import CoolCreateClassContainer from "../../Components/CoolCreateClassContainer";
import LoadingContainer from "../../Components/Loading";
import UseUserContext, { UserContext } from "../../Lib/context";
import { firestore } from "../../Lib/firebase"


const TeacherDashBoard = () => {
     const [OpenClassEditor, setOpenClassEditor] = useState(false)
     const [Data, setData] = useState([])
     const {user} = UseUserContext()

     const FetchClassesData = () => {
          setData([])
          const ClassesCollection = firestore.collection("clases").where("TeacherID", "==", user.uid)
          ClassesCollection.get().then(
               (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                         setData(Data => [...Data, doc.data()])
                    })
               }
          )
     }

     useEffect(() => {
          FetchClassesData()
     }, [user, ])


     return <>
     <CoolCreateClassContainer 
          refresh={FetchClassesData}
          IsVisible={OpenClassEditor} 
          handleClose={() => setOpenClassEditor(false)}
          />
      <ClassFeed clases={Data}/> 
          <motion.section 
               variants={DropInFromBottom}
               initial="hidden"
               animate="visible"

          className='dashboard-sections'>
               <div>
               <h2>
                    Crea un aula 
               </h2>
                    <p>
                         No tardarás más de 30 segundos.
                    </p>
                    <button className='btn-secondary' onClick={() => setOpenClassEditor(true)}>
                         Crear
                    </button>
               </div>
          </motion.section>
     </>
}

export default TeacherDashBoard
