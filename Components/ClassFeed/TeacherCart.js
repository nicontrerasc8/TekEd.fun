import { faMeteor, faRocket, faSpaceShuttle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import Link from "next/link"
import { DropInFromLeft, DropInFromRight, DropInFromTop } from "../../Animations"

const TeacherCart = ({information, i, OpenInvitationLink}) => {
     return <motion.section 
               variants={i % 3 == 0 ? DropInFromLeft : i % 2 == 0 ? DropInFromTop : DropInFromRight}
               initial="hidden"
               animate="visible"
               className={i % 2 == 0 ? "border-blue" : "border-green"}>
               <FontAwesomeIcon icon={i % 3 == 0 ? faMeteor : i % 2 == 0 ? faRocket : faSpaceShuttle}/>
               <h2>{information.Title}</h2>
               <h3>Número de estudiantes: {information.estudiantes.length}</h3>
               <Link href={`/clases/${information.ClassID}`}>
                    <a>
                         <button  className={i % 2 == 0 ? "btn-primary" : "btn-secondary"}>
                              Ir a la clase
                         </button>
                    </a>
               </Link>
               <button type="button" onClick={OpenInvitationLink} className={i % 2 == 0 ? "btn-secondary" : "btn-primary"}>
                    Invita a tus alumnos
               </button>
          </motion.section>
}
export default TeacherCart